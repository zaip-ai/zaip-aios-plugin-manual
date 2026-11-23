---
name: criar-automacao
description: "Desenhe e, a pedido, configure uma automação ou rotina agendada usando o recurso suportado pelo cliente."
---

# Criar automação de um processo

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/operations/`, `.agents/data/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `fluxo` seguido do caminho do material. Use o [plano com evento repetido](./assets/exemplo-fluxo.json) para exercitar a deduplicação. Informe sempre o alcance do teste.

Aplique o método desta edição em [Operações e passagem de trabalho](./references/zaip/operacoes.md), [Análise de dados e indicadores](./references/zaip/dados.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

## Escolher o modo uma única vez

Identifique o objeto pedido por finalidade, projeto, empresa e, quando pertinente, período ou versão. Inspecione primeiro o caminho indicado, a memória da empresa e as fontes locais adotadas. O mesmo material pode ter outro nome. Use um modelo de trabalho da empresa quando útil; só grave no destino acordado quando a entrega exigir arquivo. Preserve os guias de método distribuídos com o plugin. Compare com a referência empacotada e preserve qualquer decisão já registrada pela equipe. Na dúvida entre versões, organizações ou fontes inacessíveis, peça apenas a identificação necessária. Uma entrada ilegível não comprova ausência.

Resolva o modo no mesmo chat. Preserve o pedido original, o destino, a evidência da verificação e as restrições. Use a skill correspondente ao estado encontrado. A skill que recebe essa decisão vai diretamente ao trabalho, sem devolver o pedido. Antes de gravar, releia o destino. Se o estado mudou enquanto trabalhava, preserve o conteúdo novo e reconcilie a mudança antes de prosseguir. Uma solicitação apenas de orientação continua em leitura.

Se localizar o mesmo material, aplique `atualizar-automacao` no mesmo chat. Ao gravar, use criação exclusiva para um destino novo. Se o estado mudar, preserve a mudança concorrente. Uma nova variante pedida pode ter um destino próprio. Quando o material já atende ao pedido, reutilize-o sem regravar.

## Método e entrega

Defina gatilho ou frequência com fuso, entrada, filtro, chave idempotente, ação, destino e regra de parada. Faça uma simulação com um evento novo, um repetido e um destino indisponível. Num disparo agendado, use o recurso nativo disponível e confira o identificador e o próximo horário. Para processamento por API ou webhook, separe recepção, execução, confirmação e recuperação.

Entregue o fluxo e seu estado real. Configurado não equivale a já executado. Em uma execução parcial, preserve a última posição confirmada e reconcilie efeitos antes de repetir. Ao atualizar, localize a automação vigente ou o seu ID antes de criar outra e preserve o histórico do agendador. Se o host não puder agendar, entregue a configuração preparada sem declarar monitoramento ativo.
