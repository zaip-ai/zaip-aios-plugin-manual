---
name: desenvolver-frontend
description: "Construa uma tela, componente ou fluxo de dados no frontend do projeto, incluindo estados de interação e acessibilidade."
---

# Implementar interfaces e fluxos de frontend

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`, `.agents/design/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Design system](./references/zaip/sistema.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Encontre a entrada usada pela aplicação, o componente responsável e a origem dos dados. Reaproveite as convenções do projeto para rotas, estado e estilo. Defina carregamento, vazio, sucesso, erro e nova tentativa. Separe estado de edição e dado persistido para preservar o que a pessoa digitou quando uma resposta chega atrasada.

Confira o fluxo em largura estreita, por teclado e com dados ausentes. Em operações concorrentes, teste se uma resposta antiga pode substituir a seleção atual. Entregue a mudança pedida e identifique os fluxos que efetivamente exercitou. Quando a entrada é apenas um desenho, documente os estados em aberto.
