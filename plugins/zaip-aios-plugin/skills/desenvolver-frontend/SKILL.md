---
name: desenvolver-frontend
description: "Construa uma tela, componente ou fluxo de dados no frontend do projeto, incluindo estados de interação e acessibilidade."
---

# Implementar interfaces e fluxos de frontend

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`, `.agents/design/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Design system](./references/zaip/sistema.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Encontre a entrada usada pela aplicação, o componente responsável e a origem dos dados. Reaproveite as convenções do projeto para rotas, estado e estilo. Defina carregamento, vazio, sucesso, erro e nova tentativa. Separe estado de edição e dado persistido para preservar o que a pessoa digitou quando uma resposta chega atrasada.

Confira o fluxo em largura estreita, por teclado e com dados ausentes. Em operações concorrentes, teste se uma resposta antiga pode substituir a seleção atual. Entregue a mudança pedida e identifique os fluxos que efetivamente exercitou. Quando a entrada é apenas um desenho, documente os estados em aberto.
