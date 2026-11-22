---
name: atualizar-automacao
description: "Revise automação de um processo existente, considerando o pedido e os efeitos sobre o material já aprovado."
---

# Atualizar automação de um processo

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`, `.agents/data/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `fluxo` seguido do caminho do material. Use o [plano com evento repetido](./assets/exemplo-fluxo.json) para exercitar a deduplicação. Informe sempre o alcance do teste.

Aplique o método desta edição em [Operações e passagem de trabalho](./references/zaip/operacoes.md), [Análise de dados e indicadores](./references/zaip/dados.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

## Escolher o modo uma única vez

Identifique o objeto pedido por finalidade, projeto, empresa e, quando pertinente, período ou versão. Inspecione primeiro o caminho indicado, a memória da empresa e as fontes locais adotadas. O mesmo material pode ter outro nome. Preencha um modelo de trabalho da empresa no destino acordado. Preserve os guias de método distribuídos com o plugin. Compare com a referência empacotada e preserve qualquer decisão já registrada pela equipe. Na dúvida entre versões, organizações ou fontes inacessíveis, peça apenas a identificação necessária. Uma entrada ilegível não comprova ausência.

Resolva o modo no mesmo chat. Preserve o pedido original, o destino, a evidência da verificação e as restrições. Use a skill correspondente ao estado encontrado. A skill que recebe essa decisão vai diretamente ao trabalho, sem devolver o pedido. Antes de gravar, releia o destino. Se o estado mudou enquanto trabalhava, preserve o conteúdo novo e reconcilie a mudança antes de prosseguir. Uma solicitação apenas de orientação continua em leitura.

Se confirmar que o material ainda não existe, aplique `criar-automacao` no mesmo chat. Ao gravar, use criação exclusiva para um destino novo. Se o estado mudar, preserve a mudança concorrente. Compare com a fonte vigente e preserve partes fora do escopo. Quando o material já atende ao pedido, reutilize-o sem regravar.

## Método e entrega

Defina gatilho ou frequência com fuso, entrada, filtro, chave idempotente, ação, destino e regra de parada. Faça uma simulação com um evento novo, um repetido e um destino indisponível. Num disparo agendado, use o recurso nativo disponível e confira o identificador e o próximo horário. Para processamento por API ou webhook, separe recepção, execução, confirmação e recuperação.

Entregue o fluxo e seu estado real. Configurado não equivale a já executado. Em uma execução parcial, preserve a última posição confirmada e reconcilie efeitos antes de repetir. Ao atualizar, localize a automação vigente ou o seu ID antes de criar outra e preserve o histórico do agendador. Se o host não puder agendar, entregue a configuração preparada sem declarar monitoramento ativo.
