---
name: avaliar-prontidao-aplicacao
description: "Avalie se uma aplicação suporta a entrega prevista considerando configuração, capacidade, filas, observabilidade e recuperação."
---

# Avaliar prontidão operacional

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/architecture/`, `.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Siga uma jornada crítica e as dependências que precisam estar prontas. Examine configuração por ambiente, saúde das dependências, capacidade conhecida, restauração, alertas acionáveis e responsável pelo atendimento. Associe cada requisito ao modo de falha que ele cobre. O tamanho do checklist deve acompanhar o risco da entrega.

Monte um quadro com verificado, pendente e impacto, sempre acompanhado de evidência ou teste reproduzível. Use carga sintética local apenas quando couber no pedido e no ambiente. Aponte a menor condição para iniciar ou adiar a entrega e como perceber regressões. Mantenha distinta a decisão da equipe de publicar.
