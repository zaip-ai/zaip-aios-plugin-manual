"""Compara o conteúdo do par local e mantém um único recibo da revisão vigente."""
import argparse
import hashlib
import io
import json
import os
import re
import stat
import tempfile
import unicodedata
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path


W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
ITEM = re.compile(r"^([ \t]*)(?:([-+*•])|(\d+)[.)])\s+(.+)$")
TITULO = re.compile(r"^(#{1,6})\s+(.+)$")
EFEITOS = {W + t for t in ("vanish", "webHidden", "specVanish", "strike", "dstrike", "vertAlign", "caps")}


def espacos(texto):
    return unicodedata.normalize("NFC", " ".join(texto.split()))


def texto_md(texto, limites):
    if "![" in texto:
        limites.add("imagens e suas descrições")
        texto = re.sub(r"!\[[^]]*\]\([^)]*\)", "", texto)
    if re.search(r"~~|<[/!]?\w|\[\^|\]\[|\\(?!\|)", texto):
        limites.add("marcação Markdown que requer leitura editorial")
    # Preserve o conteúdo literal de um trecho de código ao remover a ênfase.
    pedacos = re.split(r"(\x60[^\x60]+\x60)", texto)
    for i, pedaco in enumerate(pedacos):
        if i % 2:
            pedacos[i] = pedaco[1:-1]
        else:
            for delimitador in ("**", "__", "*", "_"):
                d = re.escape(delimitador)
                padrao = rf"(?<!\w){d}(?!\s)(.+?)(?<!\s){d}(?!\w)"
                pedaco = re.sub(padrao, r"\1", pedaco)
            pedacos[i] = pedaco
    return espacos("".join(pedacos))


def celulas_md(linha):
    texto = linha.strip()
    if texto.startswith("|"):
        texto = texto[1:]
    if texto.endswith("|") and not texto.endswith(r"\|"):
        texto = texto[:-1]
    return [c.strip().replace(r"\|", "|") for c in re.split(r"(?<!\\)\|", texto)]


def item_literal(match, conteudo):
    recuo, bala, numero, _ = match.groups()
    nivel = len(recuo.expandtabs(4)) // 2
    return (("lista", nivel, "•" if bala else int(numero)), conteudo)


def blocos_md(dados, limites):
    linhas = dados.decode("utf-8-sig").splitlines()
    blocos, paragrafo = [], []

    def fechar():
        texto = texto_md(" ".join(paragrafo), limites)
        if texto:
            blocos.append(("parágrafo", texto))
        paragrafo.clear()

    i = 0
    while i < len(linhas):
        linha = linhas[i]
        i += 1
        if not linha.strip():
            fechar()
            continue
        titulo = TITULO.match(linha)
        item = ITEM.match(linha)
        if "|" in linha and i < len(linhas) and "|" in linhas[i] and all(
                re.fullmatch(r":?-{3,}:?", c) for c in celulas_md(linhas[i])):
            fechar()
            linhas_tabela = [linha]
            i += 1
            while i < len(linhas) and "|" in linhas[i] and linhas[i].strip():
                linhas_tabela.append(linhas[i])
                i += 1
            tabela = [[texto_md(c, limites) for c in celulas_md(l)] for l in linhas_tabela]
            if any(len(l) != len(tabela[0]) for l in tabela):
                limites.add("tabela Markdown irregular")
            blocos.append(("tabela", tabela))
        elif titulo:
            fechar()
            blocos.append((("título", len(titulo[1])), texto_md(titulo[2], limites)))
        elif item:
            fechar()
            if item[1]:
                limites.add("hierarquia de lista aninhada")
            blocos.append(item_literal(item, texto_md(item[4], limites)))
        else:
            if re.match(r"^\s*(?:>|~~~|\x60{3}|---+$|===+$|\[[^]]+\]:)", linha) or linha.startswith("    "):
                limites.add("bloco Markdown que requer leitura editorial")
            paragrafo.append(linha)
    fechar()
    return blocos


def xml_opcional(zipado, caminho):
    if caminho not in zipado.namelist():
        return ET.Element("vazio")
    return ET.fromstring(zipado.read(caminho))


def valor(no, caminho, padrao=None):
    el = no.find(caminho) if no is not None else None
    return el.get(W + "val", padrao) if el is not None else padrao


def caminho_w(*tags):
    return "/".join(W + tag for tag in tags)


def texto_word(no, links, limites):
    tag = no.tag
    if tag == W + "t":
        return no.text or ""
    if tag in (W + "tab", W + "br", W + "cr"):
        return " "
    if tag in (W + "drawing", W + "pict", W + "del", W + "moveFrom"):
        return ""
    partes = "".join(texto_word(filho, links, limites) for filho in no)
    if tag == W + "hyperlink":
        alvo = links.get(no.get(R + "id"), "")
        ancora = no.get(W + "anchor")
        if ancora:
            alvo += "#" + ancora
        if not alvo:
            limites.add("destino de hiperlink não resolvido")
        return f"[{partes}]({alvo})"
    return partes


class EstruturaWord:
    def __init__(self, arquivo, limites):
        self.limites = limites
        estilos = xml_opcional(arquivo, "word/styles.xml")
        self.estilos = {s.get(W + "styleId"): s for s in estilos.findall(W + "style")}
        self.padroes = {s.get(W + "styleId") for s in self.estilos.values() if s.get(W + "default") in ("1", "true")}
        padrao = estilos.find(W + "docDefaults")
        if padrao is not None and any(el.tag in EFEITOS for el in padrao.iter()):
            limites.add("formatação de texto com significado no estilo padrão")
        num = xml_opcional(arquivo, "word/numbering.xml")
        self.numeros = {n.get(W + "numId"): n for n in num.findall(W + "num")}
        self.modelos = {n.get(W + "abstractNumId"): n for n in num.findall(W + "abstractNum")}
        self.contadores = {}
        self.links = {el.get("Id"): el.get("Target", "") for el in
                      xml_opcional(arquivo, "word/_rels/document.xml.rels")}

    def conferir_estilos(self, corpo):
        usados = {el.get(W + "val") for el in corpo.iter() if el.tag in
                  (W + "rStyle", W + "pStyle", W + "tblStyle")}
        pendentes = list(usados | self.padroes)
        vistos = set()
        while pendentes:
            nome = pendentes.pop()
            if nome not in self.estilos or nome in vistos:
                continue
            vistos.add(nome)
            estilo = self.estilos[nome]
            if any(el.tag in EFEITOS for el in estilo.iter()):
                self.limites.add("estilo aplicado com texto oculto, riscado ou outra alteração de significado")
            pendentes.append(valor(estilo, W + "basedOn"))

    def classificacao(self, p):
        estilo = valor(p, caminho_w("pPr", "pStyle"), "")
        propriedades = [p]
        visitados = set()
        nome = estilo
        while nome in self.estilos and nome not in visitados:
            visitados.add(nome)
            propriedades.append(self.estilos[nome])
            nome = valor(self.estilos[nome], W + "basedOn")

        def prop(*tags, padrao=None):
            for contexto in propriedades:
                v = valor(contexto, caminho_w("pPr", *tags))
                if v is not None:
                    return v
            return padrao

        if estilo == "Title":
            return ("título Word", 0)
        if nivel := re.fullmatch(r"Heading([1-9])", estilo):
            return ("título Word", int(nivel[1]))
        nivel = prop("outlineLvl")
        if nivel is not None and int(nivel) < 9:
            return ("título Word", int(nivel) + 1)
        ident = prop("numPr", "numId")
        if ident and ident != "0":
            nivel = int(prop("numPr", "ilvl", padrao="0"))
            return self.lista(ident, nivel)
        return "parágrafo"

    def lista(self, ident, nivel):
        num = self.numeros.get(ident)
        modelo = self.modelos.get(valor(num, W + "abstractNumId"))
        def por_nivel(pai, tag):
            if pai is None:
                return None
            return next((el for el in pai.findall(W + tag) if el.get(W + "ilvl") == str(nivel)), None)
        override = por_nivel(num, "lvlOverride")
        lvl = override.find(W + "lvl") if override is not None else None
        if lvl is None:
            lvl = por_nivel(modelo, "lvl")
        formato = valor(lvl, W + "numFmt")
        if nivel or (formato == "decimal" and valor(lvl, W + "lvlText") not in (f"%{nivel+1}.", f"%{nivel+1})")):
            self.limites.add("hierarquia ou máscara da numeração Word")
        if formato == "bullet":
            return ("lista", nivel, "•")
        if formato != "decimal":
            self.limites.add("numeração Word personalizada ou desconhecida")
        inicio = int(valor(override, W + "startOverride", valor(lvl, W + "start", "1")))
        chave = (ident, nivel)
        numero = self.contadores.get(chave, inicio)
        self.contadores[chave] = numero + 1
        return ("lista", nivel, numero)

    def tabela(self, tabela):
        linhas = []
        for linha in tabela.findall(W + "tr"):
            celulas = []
            for celula in linha.findall(W + "tc"):
                ps = celula.findall(W + "p")
                if len(ps) != 1 or celula.find(W + "tbl") is not None:
                    self.limites.add("célula com múltiplos blocos")
                if any(self.classificacao(p) != "parágrafo" for p in ps):
                    self.limites.add("célula de tabela com título ou numeração Word")
                celulas.append(espacos(texto_word(celula, self.links, self.limites)))
            linhas.append(celulas)
        return linhas

    def blocos(self, corpo):
        self.conferir_estilos(corpo)
        blocos = []
        for e in corpo:
            if e.tag == W + "tbl":
                blocos.append(("tabela", self.tabela(e)))
            elif e.tag == W + "p":
                texto = espacos(texto_word(e, self.links, self.limites))
                if texto:
                    tipo = self.classificacao(e)
                    match = ITEM.match(texto) if tipo == "parágrafo" else None
                    blocos.append(item_literal(match, match[4]) if match else (tipo, texto))
            elif e.tag != W + "sectPr":
                self.limites.add("bloco Word fora do corpo simples")
        titulos = [tipo[1] for tipo, _ in blocos if isinstance(tipo, tuple) and tipo[0] == "título Word"]
        deslocamento = int(titulos[:1] == [0] and 1 in titulos[1:])
        return [(("título", 1 if t[1] == 0 else t[1] + deslocamento), v)
                if isinstance(t, tuple) and t[0] == "título Word" else (t, v) for t, v in blocos]


def blocos_word(dados, limites):
    with zipfile.ZipFile(io.BytesIO(dados)) as arquivo:
        if any(re.match(r"word/(?:header|footer|footnotes|endnotes|comments|media/|embeddings/|charts/)", n)
               for n in arquivo.namelist()):
            limites.add("cabeçalhos, rodapés, notas, comentários ou ativos incorporados")
        corpo = ET.fromstring(arquivo.read("word/document.xml")).find(W + "body")
        if corpo is None:
            raise ValueError("O arquivo Word não contém o corpo do documento.")
        complexos = set("drawing pict object altChunk sdt txbxContent fldSimple fldChar ins del moveFrom moveTo "
                        "vanish strike dstrike vMerge hMerge gridSpan commentReference footnoteReference "
                        "endnoteReference sym noBreakHyphen softHyphen smartTag customXml".split())
        if any(not el.tag.startswith(W) or el.tag in EFEITOS or el.tag[len(W):] in complexos for el in corpo.iter()):
            limites.add("objetos, campos, revisões ou formatação com significado")
        return EstruturaWord(arquivo, limites).blocos(corpo)


def comparar(md, word):
    if md is None or word is None:
        return {"conteudo": "incompleto"}
    limites = set()
    esquerda, direita = blocos_md(md, limites), blocos_word(word, limites)
    for i, (a, b) in enumerate(zip(esquerda, direita), 1):
        if a == b:
            continue
        onde = f"bloco {i}"
        if a[0] == b[0] == "tabela":
            for linha, (ra, rb) in enumerate(zip(a[1], b[1]), 1):
                if ra != rb:
                    coluna = next((j for j, (ca, cb) in enumerate(zip(ra, rb), 1) if ca != cb), min(len(ra), len(rb)) + 1)
                    onde += f", linha {linha}, coluna {coluna}"
                    break
            else:
                onde += f", linha {min(len(a[1]), len(b[1])) + 1}"
        return {"conteudo": "divergente", "local": onde}
    if len(esquerda) != len(direita):
        return {"conteudo": "divergente", "local": f"bloco {min(len(esquerda), len(direita)) + 1}"}
    if limites or not esquerda:
        return {"conteudo": "revisao-editorial", "revisar": sorted(limites or {"par sem texto comparável"})}
    return {"conteudo": "corresponde"}


def sha(dados):
    return hashlib.sha256(dados).hexdigest()


def hash_arquivo(caminho):
    if not caminho.exists():
        return None
    soma = hashlib.sha256()
    with caminho.open("rb") as entrada:
        for bloco in iter(lambda: entrada.read(1024 * 1024), b""):
            soma.update(bloco)
    return soma.hexdigest()


def caminho_local(raiz, relativo):
    if relativo.anchor or ".." in relativo.parts:
        raise ValueError("Informe um caminho relativo dentro do projeto.")
    atual = raiz
    for parte in relativo.parts:
        atual = atual / parte
        try:
            info = atual.lstat()
        except FileNotFoundError:
            continue
        if stat.S_ISLNK(info.st_mode) or getattr(info, "st_file_attributes", 0) & 1024:
            raise ValueError("Caminho indireto. Confira a fonte adotada pela equipe.")
    return atual


def ler_base(recibo, md, word):
    if not recibo.exists():
        return None, "ausente"
    bruto = recibo.read_bytes()
    base = json.loads(bruto)
    if (base.get("schema") not in (1, 2) or (base.get("md"), base.get("word")) != (md, word)
            or (base["schema"] == 2 and base.get("conferencia") not in {"estrutural", "editorial"})):
        raise ValueError("Recibo divergente. Preserve-o e confira os caminhos.")
    for chave in ("sha256_md", "sha256_word"):
        valor = base.get(chave)
        if not isinstance(valor, str) or len(valor) != 64 or any(c not in "0123456789abcdef" for c in valor):
            raise ValueError("Recibo inválido. Confira a última base comum.")
    return base, sha(bruto)


def situacao(base, md, word):
    if md is None and word is None:
        return "ambos-ausentes"
    if md is None:
        return "falta-markdown"
    if word is None:
        return "falta-word"
    if base is None:
        return "comparar-primeira-base"
    mudancas = (md != base["sha256_md"], word != base["sha256_word"])
    inalterado = "base-legada-sem-alteracao" if base["schema"] == 1 else "sem-alteracao-desde-revisao"
    return {(False, False): inalterado, (True, False): "mudou-markdown",
            (False, True): "mudou-word", (True, True): "ambos-mudaram"}[mudancas]


def executar(args):
    raiz = Path.cwd().resolve()
    rel = Path(args.caminho)
    if rel.suffix.lower() not in {".md", ".docx"}:
        raise ValueError("Informe Markdown ou DOCX.")
    md = caminho_local(raiz, rel.with_suffix(".md"))
    word = caminho_local(raiz, rel.with_suffix(".docx"))
    # A grafia retornada pelo volume é usada nos dois pontos de entrada.
    existente = md if md.exists() else word
    if existente.exists():
        relativo = existente.resolve().relative_to(raiz)
        md = caminho_local(raiz, relativo.with_suffix(".md"))
        word = caminho_local(raiz, relativo.with_suffix(".docx"))
    nomes = [p.relative_to(raiz).as_posix() for p in (md, word)]
    recibo = caminho_local(raiz, Path(".agents/zaip-free/pares") / (sha(nomes[0].encode()) + ".json"))
    base, revisao = ler_base(recibo, *nomes)
    dados_md = md.read_bytes() if md.exists() else None
    dados_word = word.read_bytes() if word.exists() else None
    atual = {"schema": 2, "md": nomes[0], "word": nomes[1],
             "sha256_md": sha(dados_md) if dados_md is not None else None,
             "sha256_word": sha(dados_word) if dados_word is not None else None}
    estado = situacao(base, atual["sha256_md"], atual["sha256_word"])
    resultado = comparar(dados_md, dados_word)
    resposta = {**atual, "estado": estado, "base": revisao, **resultado}
    if base:
        resposta["conferencia_anterior"] = base.get("conferencia", "legada")
    if args.modo == "conferir":
        return resposta
    if not (args.md and args.word and args.base):
        raise ValueError("Registre apenas com os dois hashes revisados e a revisão da base.")
    if (args.md, args.word, args.base) != (atual["sha256_md"], atual["sha256_word"], revisao):
        raise ValueError("Os documentos ou a base mudaram desde a conferência.")
    conteudo = resultado["conteudo"]
    if conteudo == "divergente":
        raise ValueError(f"Conteúdo divergente em {resultado['local']}. Confira o trecho nos dois arquivos.")
    if conteudo == "incompleto":
        raise ValueError("Complete o par e confira seu conteúdo.")
    if estado == "sem-alteracao-desde-revisao" and (
            conteudo == "corresponde" or base["conferencia"] == "editorial"):
        return resposta
    if conteudo == "revisao-editorial" and not args.revisao_editorial:
        raise ValueError("Revisão editorial necessária: " + ", ".join(resultado["revisar"]))
    atual["conferencia"] = "editorial" if conteudo == "revisao-editorial" else "estrutural"
    recibo.parent.mkdir(parents=True, exist_ok=True)
    trava = recibo.with_suffix(".lock")
    with trava.open("xb"):
        pass
    temporario = None
    try:
        if (ler_base(recibo, *nomes)[1], hash_arquivo(md), hash_arquivo(word)) != (args.base, args.md, args.word):
            raise ValueError("Atualização concorrente. Releia o par.")
        dados = (json.dumps(atual, ensure_ascii=False, indent=2) + "\n").encode()
        with tempfile.NamedTemporaryFile(dir=recibo.parent, delete=False) as f:
            temporario = Path(f.name)
            f.write(dados)
        os.replace(temporario, recibo)
        return {**atual, **resultado, "estado": "base-registrada", "base": sha(dados)}
    finally:
        if temporario is not None:
            temporario.unlink(missing_ok=True)
        trava.unlink(missing_ok=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("modo", choices=["conferir", "registrar"])
    parser.add_argument("caminho")
    parser.add_argument("--md")
    parser.add_argument("--word")
    parser.add_argument("--base")
    parser.add_argument("--revisao-editorial", action="store_true",
                        help="Atesta que os elementos fora da comparação estrutural foram reabertos e revisados.")
    try:
        print(json.dumps(executar(parser.parse_args()), ensure_ascii=False))
    except (OSError, ValueError, TypeError, AttributeError, KeyError, ET.ParseError, zipfile.BadZipFile) as exc:
        parser.exit(1, f"Conferência pendente: {exc}\n")
