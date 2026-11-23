---
name: planejar-mudanca
description: Transforme um pedido de mudança em uma SPEC curta com problema, público, limites e critérios de aceite observáveis para o caminho normal e uma falha relevante.
---

# Planejar uma mudança

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`, `.agents/architecture/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Definição de produto](./references/zaip/produto.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique quem enfrenta o problema, o que tenta fazer e o que acontece hoje. Se o pedido já trouxer essas respostas, aproveite-as. Se faltar uma decisão, explicite a hipótese que permite avançar ou pergunte pela escolha que realmente muda o resultado.

Delimite o que entra e o que fica de fora com base no pedido. Para cada comportamento importante, indique a condição inicial, a ação e o resultado que alguém consegue verificar. Inclua o caminho normal e uma falha representativa. Por exemplo, ao salvar uma preferência, o aceite pode exigir que o valor reapareça após reabrir a tela. Se a gravação falhar, a mensagem deixa a falha visível e o valor anterior continua disponível.

Use o [modelo de SPEC curta](./assets/spec-curta.md) no idioma e nível de detalhe solicitados. Só nomeie componentes depois de inspecioná-los e registre o caminho que sustenta a relação com a mudança. Com apenas um relato, descreva o comportamento e omita a seção técnica. Entregue a SPEC na conversa. Grave um arquivo somente se a pessoa pedir e respeite o destino ou a convenção documental do projeto.
