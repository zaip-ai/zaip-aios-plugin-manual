---
name: refatorar-projeto
description: "Reorganize uma pasta, módulo ou landing page para a stack escolhida preservando entradas, jornadas e contratos em uso."
---

# Refatorar ou migrar código existente

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/architecture/`, `.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Inventarie os pontos de entrada e consumidores, arquivos estáticos, rotas, formulários, parâmetros de campanha e eventos relevantes. Capture um comportamento observável antes de alterar. Marque o que será preservado, adaptado ou retirado com base no pedido. No caso de uma LP, anote também redirecionamentos, metadados e destino após o envio.

Migre por fatias que possam ser exercitadas pelo caminho normal. Reavalie a jornada nas duas versões, inclusive em erro, e compare o resultado com a linha de base. Evite apagar a origem enquanto ela ainda tiver consumidores. Entregue a diferença encontrada e uma forma de reverter a migração se a evidência de equivalência for insuficiente.
