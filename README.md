# ZAIP-AIOS Plugin

Plugin com 204 skills em português e 23 subagentes para desenvolvimento, design, marketing, vendas, growth e operações. A versão 1.3.0 entrega planos pontuais no chat. O plugin salva um arquivo quando você pede ou quando outra tarefa precisa reutilizá-lo.

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

## Atualizar uma instalação do GitHub

```sh
codex plugin marketplace upgrade zaip-manual
codex plugin add zaip-aios-plugin@zaip-manual
codex plugin list --marketplace zaip-manual --json
```

Confira na listagem a versão `1.3.0` ou posterior, com `installed: true` e `enabled: true`, e abra um novo chat. Se instalou pelo ZIP, atualize os arquivos do catálogo na mesma pasta permanente e execute novamente os comandos `plugin add` e `plugin list` acima.

Em um projeto já preparado, peça **“Atualize os subagentes das equipes que já escolhi.”** O plugin reconhece os perfis padrão da 1.0.6 e preserva os personalizados. Abra um novo chat na pasta do projeto para usar os nomes atualizados nas próximas delegações.

## Primeiro uso

Quando a listagem mostrar `installed: true` e `enabled: true`, abra a pasta da sua empresa em uma nova conversa e diga **“Prepare este projeto para minha empresa.”**

## Usar o ZAIP-AIOS como padrão

No campo de mensagem do Codex, selecione **ZAIP-AIOS Plugin** (`zaip-aios-plugin`) e diga por voz ou texto **“Configure o ZAIP-AIOS como padrão”**. O agente pergunta se a escolha vale para **todos os projetos deste perfil** ou **só para o projeto atual**. Para indicar o escopo de uma vez, chame a skill diretamente:

```text
$zaip-aios-plugin:entender-projeto Configure o ZAIP-AIOS como padrão só neste projeto.
```

O agente informa em qual arquivo de instruções do Codex guardou a preferência. Nos próximos chats, ela orienta a escolha da skill pertinente, o uso de `coordenar-trabalho` quando a entrega exigir coordenação e a inclusão da preferência em repasses já autorizados. A seleção depende das skills disponíveis no chat e do seu pedido.

**Para conferir**, abra um novo chat no mesmo projeto, sem selecionar o plugin, e pergunte **“Qual skill você usaria para criar um roteiro SPIN e de onde vem essa preferência?”** Confira se a resposta identifica `criar-roteiro-spin-selling` e o arquivo informado no preparo. Para conferir o escopo global, faça o teste em outro projeto do mesmo perfil.

**Para remover**, diga **“Remova a preferência do ZAIP-AIOS só deste projeto”** ou **“Remova a preferência global do ZAIP-AIOS”**. A remoção preserva as outras instruções. Se a preferência existir nos dois escopos, a remoção local mantém a global em vigor.

## Extrair o design system de um site

No chat do projeto, envie `$zaip-aios-plugin:design-system-maker https://exemplo.com/`. Com Node 22.16 ou posterior e Chrome, Edge ou Chromium instalados, a skill abre a página em um perfil temporário e coleta uma amostra visual. Os arquivos `DESIGN.md`, `diagnostico.pdf` e as evidências ficam em uma nova pasta em `.agents/design/diagnosticos/`.

## Onde ficam as entregas por área

O plugin guarda novos materiais de área em `.agents/<área>/` e cria a pasta quando há conteúdo para salvar. Os nomes usados incluem `design`, `marketing`, `development`, `architecture`, `growth`, `operations`, `branding`, `sales`, `data`, `product` e `governance`. Código e configuração seguem a estrutura do projeto. O [mapa de fontes por área](plugins/zaip-aios-plugin/skills/entender-projeto/assets/manual/MEMORIA.md#onde-ler-e-onde-escrever) indica os destinos. Guarde decisões duradouras diretamente na fonte da área. Word é indicado para entregáveis como Brandbooks, manuais e relatórios, conforme o pedido.
