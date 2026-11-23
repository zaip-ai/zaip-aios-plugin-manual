---
name: revisar-entrega
description: Revise uma entrega comparando o pedido com um diff, duas versões ou um artefato fornecido. Localize riscos concretos e identifique a cobertura realmente verificada.
---

# Revisar uma entrega

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Definição de produto](./references/zaip/produto.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Recupere o pedido e os critérios de aceite. Leia o diff com o contexto ao redor das mudanças ou compare a versão anterior e a entregue. Se só houver uma versão, avalie o material disponível contra o pedido e indique a limitação ao atribuir regressões. A revisão é de leitura por padrão. Uma correção exige que a pessoa também a peça.

Siga o caminho de uso afetado, incluindo uma entrada válida, uma falha provável e o efeito nos consumidores da mudança. Para cada achado, informe o arquivo e a linha, seção ou célula, a condição em que aparece, o efeito para a pessoa e o trecho ou teste que sustenta a conclusão. Priorize por impacto e possibilidade de ocorrência. Só mencione preferências de estilo quando forem um requisito da entrega.

Informe separadamente os testes **lidos**, os **executados** com seu resultado e os cenários **sem cobertura observada**. Se o escopo permitir executar uma verificação local, registre o cenário e o que de fato ocorreu. A presença de uma asserção ou o relato de outra pessoa não comprova a execução nesta revisão.

Apresente primeiro os achados que precisam de decisão. Se a revisão não revelar problema concreto, informe o alcance da inspeção e a lacuna relevante que restar. Use o idioma e o formato solicitados.
