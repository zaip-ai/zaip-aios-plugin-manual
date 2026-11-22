"""Conferência local de estruturas e exemplos. Não importa ou executa o material lido."""
import argparse
import json
import re
import stat
import unicodedata
import zipfile
from pathlib import Path, PurePosixPath


def exigir(condicao, mensagem):
    if not condicao:
        raise ValueError(mensagem)


def ler_json(caminho):
    return json.loads(caminho.read_text(encoding="utf-8-sig"))


def conferir_skill(caminho):
    arquivo = caminho / "SKILL.md"
    linhas = arquivo.read_text(encoding="utf-8-sig").splitlines()
    exigir(linhas and linhas[0] == "---" and "---" in linhas[1:], "Esperado frontmatter YAML")
    fim = linhas.index("---", 1)
    topo = "\n".join(linhas[1:fim])
    nome = re.search(r"^name:[ \t]*([^\n]+)$", topo, re.M)
    descricao = re.search(r"^description:[ \t]*(.*)$", topo, re.M)
    exigir(nome and nome[1].strip().strip("'\"") == caminho.name, "Confira name e o nome da pasta")
    exigir(re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", caminho.name) and len(caminho.name) <= 64,
           "Nome de skill inválido")
    texto = descricao[1].strip() if descricao else ""
    if texto in {"", "|", ">", "|-", ">-", "|+", ">+"}:
        texto = re.search(r"^description:[^\n]*\n[ \t]+\S", topo, re.M)
    elif texto in {"''", '""'}:
        texto = ""
    exigir(texto, "Falta a descrição de descoberta")
    exigir(any(l.strip() for l in linhas[fim+1:]), "O corpo da skill está vazio")
    return "Nome, cabeçalho simples e corpo conferidos. Faça também um teste de seleção e uso."


def conferir_api(caminho):
    dados = ler_json(caminho)
    exigir(str(dados.get("openapi", "")).startswith("3."), "Esperado contrato OpenAPI 3 em JSON")
    exigir(isinstance(dados.get("paths"), dict) and dados["paths"], "Contrato sem caminhos")
    metodos = {"get", "post", "put", "patch", "delete", "options", "head", "trace"}
    operacoes = 0
    for rota, item in dados["paths"].items():
        exigir(rota.startswith("/") and isinstance(item, dict), "Caminho inválido")
        for metodo in metodos.intersection(item):
            op = item[metodo]
            exigir(isinstance(op, dict) and op.get("responses"), f"Respostas ausentes em {metodo} {rota}")
            operacoes += 1
    exigir(operacoes, "Nenhuma operação inline verificada")
    return f"{operacoes} operação(ões) com respostas. Compatibilidade e execução exigem teste do consumidor."


def conferir_mcp(caminho):
    dados = ler_json(caminho)
    raiz = dados.get("result", dados)
    ferramentas = raiz.get("tools")
    exigir(isinstance(ferramentas, list) and ferramentas, "Esperada amostra tools/list não vazia")
    nomes = set()
    for item in ferramentas:
        nome = item.get("name")
        exigir(isinstance(nome, str) and nome and nome not in nomes, "Nome ausente ou duplicado")
        exigir(isinstance(item.get("inputSchema"), dict) and item["inputSchema"].get("type") == "object",
               f"Confira inputSchema de {nome}")
        nomes.add(nome)
    return f"{len(nomes)} ferramenta(s) no exemplo. O transporte e as chamadas não foram exercitados."


def conferir_plugin(caminho):
    with zipfile.ZipFile(caminho) as z:
        entradas = z.infolist()
        exigir(0 < len(entradas) <= 5000, "Quantidade inesperada de entradas")
        exigir(sum(i.file_size for i in entradas) <= 512 * 1024 ** 2, "Conteúdo descompactado excessivo")
        vistos = set()
        arquivos_normalizados = set()
        nomes = set()
        for entry in entradas:
            modo = stat.S_IFMT(entry.external_attr >> 16)
            exigir(modo in {0, stat.S_IFREG, stat.S_IFDIR}, "Tipo de arquivo inesperado no ZIP")
            exigir(entry.file_size <= 100 * 1024 ** 2 and not entry.flag_bits & 1, "Entrada excessiva ou cifrada")
            raw = entry.orig_filename
            if raw.endswith("/"):
                raw = raw[:-1]
            exigir(raw and not any(ord(c) < 32 for c in raw) and "\\" not in raw and not raw.startswith("/") and not re.match(r"^[A-Za-z]:", raw)
                   and all(p not in {"", ".", ".."} for p in raw.split("/")), "Caminho de ZIP inválido")
            chave = unicodedata.normalize("NFC", raw).casefold()
            exigir(chave not in vistos, "Colisão de caminhos")
            vistos.add(chave)
            if not entry.is_dir():
                arquivos_normalizados.add(chave)
                nomes.add(raw)
        for nome in vistos:
            exigir(not any(str(p) in arquivos_normalizados for p in PurePosixPath(nome).parents),
                   "Arquivo usado como diretório")
        exigir("plugin.json" in nomes, "Manifesto portátil ausente da raiz")
        exigir(z.getinfo("plugin.json").file_size < 1024 ** 2, "Manifesto muito grande para esta checagem")
        manifest = json.loads(z.read("plugin.json").decode("utf-8-sig"))
        exigir(manifest.get("name") and manifest.get("version"), "Identificador ou versão ausente")
        ext = manifest.get("extensions", {}).get("com.openai", {})
        interface = ext.get("interface", {})
        for ref in [ext.get("onboardingSkill"), *(interface.get(k) for k in ("logo","logoDark","composerIcon","composerIconDark"))]:
            if ref is not None:
                exigir(isinstance(ref, str) and ref.startswith("./") and ref[2:] in nomes, "Referência declarada ausente")
        total = sum(len(PurePosixPath(n).parts) == 3 and n.startswith("skills/") and n.endswith("/SKILL.md") for n in nomes)
        exigir(total, "Este modo espera um ZIP portátil com skills")
        exigir(z.testzip() is None, "Falha de integridade no ZIP")
    return f"Manifesto, caminhos e {total} skill(s) encontrados. O portal faz verificações adicionais."


def conferir_fluxo(caminho):
    dados = ler_json(caminho)
    for campo in ("gatilho", "destino", "chave", "confirmacao", "falha", "parada"):
        exigir(isinstance(dados.get(campo), str) and dados[campo].strip(), f"Defina {campo} no plano")
    eventos = dados.get("exemplos")
    exigir(isinstance(eventos, list) and eventos, "Forneça eventos sintéticos")
    ids = [e.get(dados["chave"]) for e in eventos]
    exigir(all(isinstance(i, str) and i for i in ids), "A chave está ausente em um exemplo")
    return f"{len(ids)} evento(s), {len(set(ids))} ocorrência(s) distinta(s). Simulação sem entrega ou agendamento."


def main():
    modos = {"skill": conferir_skill, "plugin": conferir_plugin, "api": conferir_api,
             "mcp": conferir_mcp, "fluxo": conferir_fluxo}
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("modo", choices=modos)
    parser.add_argument("caminho", type=Path)
    args = parser.parse_args()
    try:
        print(modos[args.modo](args.caminho))
    except (OSError, ValueError, TypeError, KeyError, AttributeError, zipfile.BadZipFile, NotImplementedError) as erro:
        parser.exit(1, f"Não conferido: {erro}\n")


if __name__ == "__main__":
    main()
