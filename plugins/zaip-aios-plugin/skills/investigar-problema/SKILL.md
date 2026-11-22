---
name: investigar-problema
description: Investigue um comportamento inesperado a partir do sintoma, formule hipóteses e escolha o menor experimento que distingue as causas com evidência observável.
---

# Investigar um problema

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Descreva o sintoma com o resultado esperado, o observado e as condições em que ocorreu. Identifique a última etapa comprovada e a primeira sem evidência. Para cada hipótese plausível, diga qual observação a favorece e qual a enfraquece. Priorize o experimento de menor impacto que separe duas hipóteses, usando dados fictícios quando bastarem. Não repita uma operação real se a repetição puder duplicar registros ou enviar mensagens.

**Exemplo de formulário.** Uma pessoa viu “Recebemos seu pedido”, mas a equipe não encontrou a solicitação. A mensagem comprova o que a tela exibiu. Verifique onde o código decide exibi-la. Depois procure o registro persistido com o identificador da tentativa. Se o registro existir, examine o recibo ou a consulta no destino que comprovaria a entrega. Uma resposta HTTP de aceite pode apenas confirmar o recebimento na fila. Sem acesso ao destino, deixe a entrega em aberto. Registre horários e identificadores mínimos, preservando os dados pessoais.

Relate sintoma, hipótese, experimento e resultado observado. Se só pôde ler o código, indique a explicação provável e como testá-la. Se a pessoa pediu correção, faça a mudança no escopo e repita a verificação pelo caminho afetado. Só declare reparado o comportamento exercitado com resultado observado. Respeite o idioma e o formato pedidos.
