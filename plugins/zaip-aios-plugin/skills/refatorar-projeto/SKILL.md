---
name: refatorar-projeto
description: "Reorganize uma pasta, módulo ou landing page para a stack escolhida preservando entradas, jornadas e contratos em uso."
---

# Refatorar ou migrar código existente

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/architecture/memoria.md`, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Inventarie os pontos de entrada e consumidores, arquivos estáticos, rotas, formulários, parâmetros de campanha e eventos relevantes. Capture um comportamento observável antes de alterar. Marque o que será preservado, adaptado ou retirado com base no pedido. No caso de uma LP, anote também redirecionamentos, metadados e destino após o envio.

Migre por fatias que possam ser exercitadas pelo caminho normal. Reavalie a jornada nas duas versões, inclusive em erro, e compare o resultado com a linha de base. Evite apagar a origem enquanto ela ainda tiver consumidores. Entregue a diferença encontrada e uma forma de reverter a migração se a evidência de equivalência for insuficiente.
