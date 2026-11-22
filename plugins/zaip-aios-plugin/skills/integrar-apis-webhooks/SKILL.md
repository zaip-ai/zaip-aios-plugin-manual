---
name: integrar-apis-webhooks
description: "Implemente um adaptador de API ou receptor de webhook com contrato explícito, autenticação apropriada, repetição segura e conciliação."
---

# Integrar APIs e webhooks

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `fluxo` seguido do caminho do material. Use o [plano com evento repetido](./assets/exemplo-fluxo.json) para exercitar a deduplicação. Informe sempre o alcance do teste.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Defina produtor, consumidor, evento de negócio e momento de confirmação. Converta o contrato externo em tipos locais e preserve um identificador estável. Para webhooks assinados, mantenha os bytes exigidos para verificação antes de interpretar o corpo. Configure timeout e diferencie falhas transitórias, permanentes e aceite assíncrono.

Use exemplos fictícios para exercitar sucesso, repetição, resposta atrasada e evento desconhecido. Se a integração cria algo no destino, localize um recibo ou uma consulta de conciliação antes de marcar a entrega. Entregue a implementação ou contrato pedido e indique se o último salto foi exercitado com um simulador ou com o destino real.
