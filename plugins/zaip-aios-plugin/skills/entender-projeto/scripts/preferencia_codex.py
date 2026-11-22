"""Consulta, ativa ou remove a preferência ZAIP nas instruções do escopo escolhido."""
import argparse
import os
from pathlib import Path
import stat
import tempfile


MODELO = Path(__file__).resolve().parents[1] / "assets" / "preferencia-codex.md"
MARCA = b"<!-- zaip-aios-plugin:preferencia:"


def verificar_caminho(caminho):
    for parte in (*reversed(caminho.parents), caminho):
        try:
            info = parte.lstat()
        except FileNotFoundError:
            if parte == caminho:
                return
            raise
        if stat.S_ISLNK(info.st_mode) or getattr(info, "st_file_attributes", 0) & stat.FILE_ATTRIBUTE_REPARSE_POINT:
            raise ValueError(f"Caminho indireto preservado: {parte}")
        if parte == caminho and (not stat.S_ISREG(info.st_mode) or info.st_nlink > 1):
            raise ValueError(f"O destino precisa ser um arquivo regular independente: {parte}")


def ler(caminho):
    verificar_caminho(caminho)
    try:
        return caminho.read_bytes()
    except FileNotFoundError:
        return None


def salvar(caminho, original, novo):
    # Prepare o conteúdo completo antes de publicá-lo no mesmo diretório.
    with tempfile.NamedTemporaryFile(dir=caminho.parent, delete=False) as saida:
        temporario = Path(saida.name)
    try:
        temporario.write_bytes(novo)
        if ler(caminho) != original:
            raise ValueError("As instruções mudaram durante a operação. Releia e repita.")
        if original is None:
            if os.name == "nt":
                os.rename(temporario, caminho)
            else:
                os.link(temporario, caminho)
        else:
            temporario.chmod(stat.S_IMODE(caminho.stat().st_mode))
            os.replace(temporario, caminho)
    finally:
        temporario.unlink(missing_ok=True)


def configurar(pasta, acao, global_):
    normal = pasta / "AGENTS.md"
    override = pasta / "AGENTS.override.md"
    fontes = {arquivo: ler(arquivo) for arquivo in (override, normal)}
    # No projeto, até um override vazio ocupa a posição de AGENTS.md.
    # No perfil, o Codex continua a busca se o override estiver em branco.
    dados_override = fontes[override]
    usar_override = dados_override is not None and (not global_ or dados_override.decode("utf-8").strip())
    ativo = override if usar_override else normal
    marcados = [arquivo for arquivo, dados in fontes.items() if MARCA in (dados or b"")]
    if len(marcados) > 1:
        raise ValueError("Há blocos nos dois arquivos deste escopo. Confira os caminhos antes de editar.")
    caminho = marcados[0] if marcados else ativo
    original = fontes[caminho]
    dados = original or b""
    dados.decode("utf-8-sig")  # Preserve instruções em outra codificação para revisão.
    if b"\0" in dados:
        raise ValueError(f"Codificação incompatível com as instruções UTF-8 do Codex: {caminho}")
    modelo = MODELO.read_bytes().replace(b"\r\n", b"\n").rstrip(b"\n") + b"\n"
    if marcados:
        if dados.count(MARCA) != 2:
            raise ValueError(f"Marcadores duplicados ou incompletos em {caminho}.")
        bloco = modelo.replace(b"\n", b"\r\n") if modelo.replace(b"\n", b"\r\n") in dados else modelo
        antes, encontrado, depois = dados.partition(bloco)
        if not encontrado or (antes and not antes.endswith(b"\n")):
            raise ValueError(f"O bloco foi editado. Confira o trecho delimitado em {caminho}.")
        if acao == "remover":
            # Uma quebra antes do bloco foi acrescentada durante a ativação.
            separador = b"\r\n" if bloco.endswith(b"\r\n") else b"\n"
            prefixo = antes.removesuffix(separador)
            if depois and prefixo and not prefixo.endswith(b"\n") and not depois.startswith((b"\n", b"\r\n")):
                prefixo = antes
            if not antes and not depois:
                # Somente um arquivo criado por esta ferramenta começa diretamente pelo bloco.
                if ler(caminho) != original:
                    raise ValueError("As instruções mudaram durante a remoção.")
                caminho.unlink()
            else:
                salvar(caminho, original, prefixo + depois)
            return caminho, "removida"
        if caminho != ativo:
            if acao == "ativar":
                raise ValueError(f"A preferência em {caminho} está encoberta por {ativo}. Remova-a antes de reativar.")
            return caminho, f"encoberta por {ativo}"
        return caminho, "configurada"
    if acao != "ativar":
        return caminho, "ausente"
    quebra = b"\r\n" if b"\r\n" in dados else b"\n"
    bloco = modelo.replace(b"\n", quebra)
    separador = b"" if original is None else quebra
    salvar(caminho, original, dados + separador + bloco)
    return caminho, "ativada"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("acao", choices=("ativar", "consultar", "remover"))
    escopo = parser.add_mutually_exclusive_group(required=True)
    escopo.add_argument("--global", dest="todos", action="store_true")
    escopo.add_argument("--projeto", type=Path, metavar="RAIZ")
    args = parser.parse_args()
    perfil = Path(os.environ.get("CODEX_HOME") or Path.home() / ".codex").absolute()
    pasta = perfil if args.todos else args.projeto.absolute()
    try:
        if not args.todos and (pasta.resolve() == Path.home().resolve() or pasta.resolve().is_relative_to(perfil.resolve())):
            raise ValueError("Indique a raiz do projeto fora do perfil do Codex.")
        caminho, estado = configurar(pasta, args.acao, args.todos)
        print(f"Preferência {estado} em {caminho}")
    except (OSError, ValueError) as erro:
        parser.exit(1, f"Preferência não confirmada: {erro}\n")


if __name__ == "__main__":
    main()
