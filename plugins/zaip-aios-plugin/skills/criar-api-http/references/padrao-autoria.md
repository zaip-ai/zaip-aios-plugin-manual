# Padrão de autoria ZAIP para Codex

## Skill

Escolha uma tarefa reconhecível, pasta e `name` consistentes, em minúsculas e hífens, e uma descrição específica que indique quando a selecionar. Use frontmatter YAML e corpo Markdown. Coloque o passo decisivo no corpo, referências longas em `references/`, modelos em `assets/` e utilitários opcionais em `scripts/`. Resolva recursos a partir da própria skill. Deixe idioma, destino e escopo alinhados ao pedido. Teste um pedido normal e outro parecido que deveria selecionar uma skill vizinha.

## API e MCP

Para API, documente método, recurso, autenticação se aplicável, schema de entrada e saída, status de erro, paginação, limitação de taxa e repetição segura conforme a operação. Preserve dados e consumidores preexistentes. Para MCP, publique uma ferramenta por ação específica, descreva parâmetros e efeitos e valide-os no servidor. Identifique autenticação e limites de confiança. Por stdio, reserve stdout às mensagens do protocolo. Teste initialize, initialized, tools/list e tools/call com sucesso, erro e falta de acesso pertinente. Diferencie simulação de efeito remoto.

## Plugin

No formato portátil, coloque `plugin.json` na raiz e entradas em `skills/<nome>/SKILL.md`. Use as extensões de host para interface, onboarding e necessidade de executor local. No fluxo público de skills, mantenha o ZIP autocontido e sem hooks de lifecycle. Valide identidade, versão, caminhos, ícones e idiomas. Uma instalação isolada testa descoberta. Um teste no cliente e a análise do portal são etapas separadas.

## Integração e automação

Documente gatilho, contrato, escopos, destino, chave idempotente, confirmação no destino, retry limitado, recuperação da última posição e parada. Escolha o conector pelo recurso e capacidade realmente oferecidos. Use credenciais no fluxo seguro do host. Teste com exemplos fictícios de ocorrência nova, repetição e falha parcial. Um exemplo que passou não comprova que um agendamento já existe.

## Ferramenta local opcional

Exemplo para um plugin de skills já empacotado, a partir da pasta desta skill:

```text
python scripts/verificar_entrega.py plugin caminho/do/pacote.zip
```

Para um diretório de skill, use `python scripts/verificar_entrega.py skill caminho/para/preparar-briefing`. Para conferir um contrato OpenAPI JSON, troque o modo para `api` e indique o arquivo do contrato.

O utilitário Python usa a biblioteca padrão e apenas lê o caminho indicado. Execute o script incluído nesta skill com os argumentos `skill PASTA`, `plugin ARQUIVO.zip`, `api OPENAPI.json`, `mcp LISTAGEM.json` ou `fluxo PLANO.json`. Ele faz checagens estruturais no formato indicado, não é um validador completo de YAML, OpenAPI ou do protocolo. Sem Python, aplique as mesmas verificações manualmente. Para um resultado de execução, exercite o artefato por sua entrada normal.

## Manter os modelos alinhados às especificações

Para conferir mudanças de versão, use as páginas dos responsáveis pelo formato. Os exemplos locais podem ser usados sem acesso à internet.

- Skills e organização dos recursos no Codex — <https://developers.openai.com/codex/skills>
- Plugins portáteis, envio ao diretório e limites de arquivo — <https://developers.openai.com/plugins/deploy/submission>
- Plugins que executam no computador — <https://developers.openai.com/plugins/deploy/desktop-only>
- Contratos de API — <https://spec.openapis.org/oas/>
- Protocolo MCP, transporte e ferramentas — <https://modelcontextprotocol.io/specification>
