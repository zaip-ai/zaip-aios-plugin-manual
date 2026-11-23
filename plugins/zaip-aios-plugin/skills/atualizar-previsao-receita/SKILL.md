---
name: atualizar-previsao-receita
description: "Revise previsão de receita comercial existente, considerando o pedido e os efeitos sobre o material já aprovado."
---

# Atualizar previsão de receita comercial

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/sales/`, `.agents/data/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Playbook de vendas](./references/zaip/vendas.md), [Análise de dados e indicadores](./references/zaip/dados.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

## Escolher o modo uma única vez

Identifique o objeto pedido por finalidade, projeto, empresa e, quando pertinente, período ou versão. Inspecione primeiro o caminho indicado, a memória da empresa e as fontes locais adotadas. O mesmo material pode ter outro nome. Use um modelo de trabalho da empresa quando útil; só grave no destino acordado quando a entrega exigir arquivo. Preserve os guias de método distribuídos com o plugin. Compare com a referência empacotada e preserve qualquer decisão já registrada pela equipe. Na dúvida entre versões, organizações ou fontes inacessíveis, peça apenas a identificação necessária. Uma entrada ilegível não comprova ausência.

Resolva o modo no mesmo chat. Preserve o pedido original, o destino, a evidência da verificação e as restrições. Use a skill correspondente ao estado encontrado. A skill que recebe essa decisão vai diretamente ao trabalho, sem devolver o pedido. Antes de gravar, releia o destino. Se o estado mudou enquanto trabalhava, preserve o conteúdo novo e reconcilie a mudança antes de prosseguir. Uma solicitação apenas de orientação continua em leitura.

Se confirmar que o material ainda não existe, aplique `criar-previsao-receita` no mesmo chat. Ao gravar, use criação exclusiva para um destino novo. Se o estado mudar, preserve a mudança concorrente. Compare com a fonte vigente e preserve partes fora do escopo. Quando o material já atende ao pedido, reutilize-o sem regravar.

## Método e entrega

Separe vendas fechadas do pipeline em aberto e identifique período esperado, valor, moeda, probabilidade e fonte por etapa. Use histórico comparável para estimar probabilidades. Se faltarem dados, formule cenários explícitos. Trate atraso, cancelamentos e concentração em poucas contas.

Entregue cenários base, conservador e favorável, principais sensibilidades e diferenças contra a meta. Uma previsão ponderada não assegura a venda. Na revisão, congele os valores realizados e explique a ponte entre previsões.
