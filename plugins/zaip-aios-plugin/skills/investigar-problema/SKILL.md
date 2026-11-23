---
name: investigar-problema
description: Investigue um comportamento inesperado a partir do sintoma, formule hipóteses e escolha o menor experimento que distingue as causas com evidência observável.
---

# Investigar um problema

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Descreva o sintoma com o resultado esperado, o observado e as condições em que ocorreu. Identifique a última etapa comprovada e a primeira sem evidência. Para cada hipótese plausível, diga qual observação a favorece e qual a enfraquece. Priorize o experimento de menor impacto que separe duas hipóteses, usando dados fictícios quando bastarem. Não repita uma operação real se a repetição puder duplicar registros ou enviar mensagens.

**Exemplo de formulário.** Uma pessoa viu “Recebemos seu pedido”, mas a equipe não encontrou a solicitação. A mensagem comprova o que a tela exibiu. Verifique onde o código decide exibi-la. Depois procure o registro persistido com o identificador da tentativa. Se o registro existir, examine o recibo ou a consulta no destino que comprovaria a entrega. Uma resposta HTTP de aceite pode apenas confirmar o recebimento na fila. Sem acesso ao destino, deixe a entrega em aberto. Registre horários e identificadores mínimos, preservando os dados pessoais.

Relate sintoma, hipótese, experimento e resultado observado. Se só pôde ler o código, indique a explicação provável e como testá-la. Se a pessoa pediu correção, faça a mudança no escopo e repita a verificação pelo caminho afetado. Só declare reparado o comportamento exercitado com resultado observado. Respeite o idioma e o formato pedidos.
