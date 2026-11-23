---
name: planejar-mudanca
description: Transforme um pedido de mudança em uma SPEC curta com problema, público, limites e critérios de aceite observáveis para o caminho normal e uma falha relevante.
---

# Planejar uma mudança

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`, `.agents/architecture/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Definição de produto](./references/zaip/produto.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique quem enfrenta o problema, o que tenta fazer e o que acontece hoje. Se o pedido já trouxer essas respostas, aproveite-as. Se faltar uma decisão, explicite a hipótese que permite avançar ou pergunte pela escolha que realmente muda o resultado.

Delimite o que entra e o que fica de fora com base no pedido. Para cada comportamento importante, indique a condição inicial, a ação e o resultado que alguém consegue verificar. Inclua o caminho normal e uma falha representativa. Por exemplo, ao salvar uma preferência, o aceite pode exigir que o valor reapareça após reabrir a tela. Se a gravação falhar, a mensagem deixa a falha visível e o valor anterior continua disponível.

Use o [modelo de SPEC curta](./assets/spec-curta.md) no idioma e nível de detalhe solicitados. Só nomeie componentes depois de inspecioná-los e registre o caminho que sustenta a relação com a mudança. Com apenas um relato, descreva o comportamento e omita a seção técnica. Entregue a SPEC na conversa. Grave um arquivo somente se a pessoa pedir e respeite o destino ou a convenção documental do projeto.
