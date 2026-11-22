---
name: implementar-backend
description: "Implemente uma regra de negócio no serviço da aplicação, preservando transações, contratos e comportamento em concorrência."
---

# Implementar lógica de backend

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`, `.agents/architecture/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Siga um caso desde a entrada até o estado persistido. Identifique o ponto que hoje valida permissão e a regra que deve permanecer verdadeira antes e depois da operação. Reutilize o serviço e o padrão de acesso existentes. Coloque na mesma transação as mudanças que precisam ter sucesso juntas e trate efeitos externos separadamente.

Teste o caso normal, erro parcial, repetição e disputa pelo mesmo recurso quando cabíveis. Observe o estado final e o que o próximo consumidor consegue ler. Informe quais dependências foram simuladas e se algum efeito ficou pendente. Para uma pergunta de desenho, entregue o fluxo e as invariantes sem criar arquivos por iniciativa própria.
