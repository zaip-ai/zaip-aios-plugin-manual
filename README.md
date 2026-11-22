# ZAIP-AIOS Plugin

Plugin com 203 skills em português para desenvolvimento, design, marketing, vendas, growth e operações. A versão 1.0.6 roda no computador do usuário e pode ser usada nos projetos que ele abrir no Codex.

## Instalar pelo agente

Abra o Codex com acesso ao terminal e envie esta mensagem:

> Instale o ZAIP-AIOS Plugin no meu perfil local do Codex. Use o repositório https://github.com/zaip-ai/zaip-aios-plugin-manual e siga o README. Ao terminar, confira se o plugin está instalado e habilitado.

Com o Codex CLI instalado, o agente executa os comandos abaixo. O primeiro baixa o catálogo do GitHub, o segundo instala o plugin e o terceiro mostra o resultado.

```sh
codex plugin marketplace add https://github.com/zaip-ai/zaip-aios-plugin-manual.git
codex plugin add zaip-aios-plugin@zaip-manual
codex plugin list --marketplace zaip-manual --json
```

Para instalar a partir de um arquivo, [baixe o ZIP do repositório](https://github.com/zaip-ai/zaip-aios-plugin-manual/archive/HEAD.zip), extraia em uma pasta permanente e abra um terminal na pasta que contém este README. Troque apenas o primeiro comando por `codex plugin marketplace add .`. A instalação vale para o perfil local desse computador.

## Primeiro uso

Quando a listagem mostrar `installed: true` e `enabled: true`, abra a pasta da sua empresa em uma nova conversa e diga **“Prepare este projeto para minha empresa.”**
