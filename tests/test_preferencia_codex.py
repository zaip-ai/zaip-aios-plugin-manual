"""Testa a interface distribuída sem usar o perfil pessoal do Codex."""
import codecs
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


SCRIPT = (Path(__file__).resolve().parents[1] / "plugins/zaip-aios-plugin/skills"
          / "entender-projeto/scripts/preferencia_codex.py")
MARCA = b"<!-- zaip-aios-plugin:preferencia:"


class PreferenciaCodex(unittest.TestCase):
    def setUp(self):
        temporario = tempfile.TemporaryDirectory()
        self.addCleanup(temporario.cleanup)
        self.perfil = Path(temporario.name) / "perfil"
        self.projeto = Path(temporario.name) / "projeto"
        self.perfil.mkdir()
        self.projeto.mkdir()

    def executar(self, acao, *escopo, sucesso=True):
        resultado = subprocess.run(
            [sys.executable, str(SCRIPT), acao, *map(str, escopo)],
            env={**os.environ, "CODEX_HOME": str(self.perfil)}, capture_output=True,
        )
        self.assertEqual(resultado.returncode == 0, sucesso, resultado.stderr)
        return resultado.stdout

    def test_preserva_instrucao_e_repeticoes(self):
        arquivo = self.projeto / "AGENTS.md"
        for inicio in (b"", b"Regra\n", b"Regra sem quebra", codecs.BOM_UTF8 + "Atenção\r\nSegunda".encode()):
            with self.subTest(inicio=inicio):
                arquivo.write_bytes(inicio)
                self.executar("ativar", "--projeto", self.projeto)
                configurado = arquivo.read_bytes()
                self.assertTrue(configurado.startswith(inicio))
                self.assertEqual(configurado.count(MARCA), 2)
                data = arquivo.stat().st_mtime_ns
                self.executar("ativar", "--projeto", self.projeto)
                self.executar("consultar", "--projeto", self.projeto)
                self.assertEqual(arquivo.stat().st_mtime_ns, data)
                self.executar("remover", "--projeto", self.projeto)
                self.executar("remover", "--projeto", self.projeto)
                self.assertEqual(arquivo.read_bytes(), inicio)
                self.assertFalse(any(self.perfil.iterdir()))

    def test_escopos_independentes_e_criacao_reversivel(self):
        self.executar("consultar", "--global")
        self.executar("remover", "--global")
        self.assertFalse(any(self.perfil.iterdir()))
        self.executar("ativar", "--global")
        self.executar("ativar", "--projeto", self.projeto)
        self.executar("remover", "--projeto", self.projeto)
        self.assertFalse(any(self.projeto.iterdir()))
        self.assertIn(MARCA, (self.perfil / "AGENTS.md").read_bytes())
        self.executar("remover", "--global")
        self.assertFalse(any(self.perfil.iterdir()))

    def test_preserva_override_e_texto_acrescentado_depois(self):
        for escopo, pasta in ((["--global"], self.perfil), (["--projeto", self.projeto], self.projeto)):
            with self.subTest(pasta=pasta):
                normal = pasta / "AGENTS.md"
                normal.write_bytes(b"Normal")
                override = pasta / "AGENTS.override.md"
                override.write_bytes(b"Regra original")
                self.executar("ativar", *escopo)
                with override.open("ab") as saida:
                    saida.write(b"Regra posterior\n")
                self.executar("remover", *escopo)
                self.assertEqual(override.read_bytes(), b"Regra original\nRegra posterior\n")
                self.assertEqual(normal.read_bytes(), b"Normal")

    def test_conflito_preserva_arquivo(self):
        arquivo = self.projeto / "AGENTS.md"
        self.executar("ativar", "--projeto", self.projeto)
        original = arquivo.read_bytes()
        for alterado in (original + original, original.splitlines(keepends=True)[0],
                         original.replace(b"Quando", b"Desde que"), b"\xff\xfeX\0"):
            with self.subTest(alterado=alterado[:30]):
                arquivo.write_bytes(alterado)
                self.executar("ativar", "--projeto", self.projeto, sucesso=False)
                self.executar("remover", "--projeto", self.projeto, sucesso=False)
                self.assertEqual(arquivo.read_bytes(), alterado)

    def test_override_posterior(self):
        self.executar("ativar", "--global")
        override = self.perfil / "AGENTS.override.md"
        override.write_bytes(b"Outra regra")
        self.assertIn(b"encoberta", self.executar("consultar", "--global"))
        self.executar("ativar", "--global", sucesso=False)
        self.executar("remover", "--global")
        self.assertEqual(override.read_bytes(), b"Outra regra")

    def test_override_em_branco_tem_precedencia_distinta_no_perfil_e_projeto(self):
        for pasta in (self.projeto, self.perfil):
            (pasta / "AGENTS.md").write_bytes(b"Instrucao da equipe")
            (pasta / "AGENTS.override.md").write_bytes(b" \n")
        self.executar("ativar", "--projeto", self.projeto)
        self.executar("ativar", "--global")
        self.assertIn(MARCA, (self.projeto / "AGENTS.override.md").read_bytes())
        self.assertIn(MARCA, (self.perfil / "AGENTS.md").read_bytes())
        self.executar("remover", "--projeto", self.projeto)
        self.executar("remover", "--global")
        for pasta in (self.projeto, self.perfil):
            self.assertEqual((pasta / "AGENTS.md").read_bytes(), b"Instrucao da equipe")
            self.assertEqual((pasta / "AGENTS.override.md").read_bytes(), b" \n")

    def test_exige_escopo_inequivoco(self):
        self.executar("ativar", sucesso=False)
        self.executar("ativar", "--global", "--projeto", self.projeto, sucesso=False)
        self.executar("ativar", "--projeto", self.perfil, sucesso=False)
        self.assertFalse(any(self.perfil.iterdir()))
        self.assertFalse(any(self.projeto.iterdir()))


if __name__ == "__main__":
    unittest.main()
