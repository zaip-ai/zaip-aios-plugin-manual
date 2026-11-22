---
name: conectar-servico-api-mcp
description: "Vincule uma ferramenta ao projeto escolhendo um plugin oficial, MCP disponível ou integração direta por API conforme a operação necessária."
---

# Conectar um serviço por API, MCP ou plugin

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `fluxo` seguido do caminho do material. Use o [plano com evento repetido](./assets/exemplo-fluxo.json) para exercitar a deduplicação. Informe sempre o alcance do teste.

Use a [central de canais](./references/zaip/canais.md) e confira os ativos autorizados em `docs/zaip/canais.md` se a ficha de canais já existir. A matriz identifica capacidades a validar no cliente da pessoa. Uma exportação local permite análise quando o conector está ausente.

Confirme a operação, o ativo, o proprietário da integração e o ambiente. Descubra as opções do cliente e confira o publicador e a origem na documentação oficial. Prefira um recurso já conectado que atenda ao pedido. Para API ou MCP customizado, prepare autenticação no fluxo seguro, escopos mínimos e configuração separada por projeto.

A pedido, configure o vínculo pelo mecanismo suportado. Teste descoberta, identidade do ativo e uma operação de leitura delimitada. Para escrita, valide o contrato e só exerça uma mutação autorizada com destino definido. Documente o que falta quando o conector não cobre uma operação.
