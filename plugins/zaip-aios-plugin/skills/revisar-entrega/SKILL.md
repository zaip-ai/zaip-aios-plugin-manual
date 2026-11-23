---
name: revisar-entrega
description: Revise uma entrega comparando o pedido com um diff, duas versões ou um artefato fornecido. Localize riscos concretos e identifique a cobertura realmente verificada.
---

# Revisar uma entrega

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Definição de produto](./references/zaip/produto.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Recupere o pedido e os critérios de aceite. Leia o diff com o contexto ao redor das mudanças ou compare a versão anterior e a entregue. Se só houver uma versão, avalie o material disponível contra o pedido e indique a limitação ao atribuir regressões. A revisão é de leitura por padrão. Uma correção exige que a pessoa também a peça.

Siga o caminho de uso afetado, incluindo uma entrada válida, uma falha provável e o efeito nos consumidores da mudança. Para cada achado, informe o arquivo e a linha, seção ou célula, a condição em que aparece, o efeito para a pessoa e o trecho ou teste que sustenta a conclusão. Priorize por impacto e possibilidade de ocorrência. Só mencione preferências de estilo quando forem um requisito da entrega.

Informe separadamente os testes **lidos**, os **executados** com seu resultado e os cenários **sem cobertura observada**. Se o escopo permitir executar uma verificação local, registre o cenário e o que de fato ocorreu. A presença de uma asserção ou o relato de outra pessoa não comprova a execução nesta revisão.

Apresente primeiro os achados que precisam de decisão. Se a revisão não revelar problema concreto, informe o alcance da inspeção e a lacuna relevante que restar. Use o idioma e o formato solicitados.
