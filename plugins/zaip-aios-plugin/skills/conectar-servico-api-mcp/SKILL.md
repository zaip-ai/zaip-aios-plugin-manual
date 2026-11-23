---
name: conectar-servico-api-mcp
description: "Vincule uma ferramenta ao projeto escolhendo um plugin oficial, MCP disponível ou integração direta por API conforme a operação necessária."
---

# Conectar um serviço por API, MCP ou plugin

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `fluxo` seguido do caminho do material. Use o [plano com evento repetido](./assets/exemplo-fluxo.json) para exercitar a deduplicação. Informe sempre o alcance do teste.

Use a [central de canais](./references/zaip/canais.md) e confira os ativos autorizados em `docs/zaip/canais.md` se a ficha de canais já existir. A matriz identifica capacidades a validar no cliente da pessoa. Uma exportação local permite análise quando o conector está ausente.

Confirme a operação, o ativo, o proprietário da integração e o ambiente. Descubra as opções do cliente e confira o publicador e a origem na documentação oficial. Prefira um recurso já conectado que atenda ao pedido. Para API ou MCP customizado, prepare autenticação no fluxo seguro, escopos mínimos e configuração separada por projeto.

A pedido, configure o vínculo pelo mecanismo suportado. Teste descoberta, identidade do ativo e uma operação de leitura delimitada. Para escrita, valide o contrato e só exerça uma mutação autorizada com destino definido. Documente o que falta quando o conector não cobre uma operação.
