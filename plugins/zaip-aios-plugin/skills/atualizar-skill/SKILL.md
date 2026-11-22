---
name: atualizar-skill
description: Atualize skill portátil já existente no projeto. Preserve seus consumidores e use a criação quando a ausência do objeto tiver sido confirmada.
---

# Atualizar skill portátil

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `skill` seguido do caminho do material. Use o [modelo de SKILL.md](./assets/modelo-skill.md) como exemplo de estrutura. Informe sempre o alcance do teste.

Ao gravar uma primeira versão, use criação exclusiva quando a ferramenta permitir. Se alguém criou o destino durante o trabalho, preserve-o e compare as versões. Para material existente, aplique só a diferença pedida. Se já atende ao pedido e não há mudança identificável, reutilize-o sem regravar. Se o cliente não conseguir acionar a entrada parceira, aplique a mesma decisão no chat atual.

Aplique o método desta edição em [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

## Escolher o modo uma única vez

Identifique o objeto pedido por finalidade, projeto, empresa e, quando pertinente, período ou versão. Inspecione primeiro o caminho indicado, a memória da empresa e as fontes locais adotadas. O mesmo material pode ter outro nome. Preencha um modelo de trabalho da empresa no destino acordado. Preserve os guias de método distribuídos com o plugin. Compare com a referência empacotada e preserve qualquer decisão já registrada pela equipe. Na dúvida entre versões, organizações ou fontes inacessíveis, peça apenas a identificação necessária. Uma entrada ilegível não comprova ausência.

Resolva o modo no mesmo chat. Preserve o pedido original, o destino, a evidência da verificação e as restrições. Use a skill correspondente ao estado encontrado. A skill que recebe essa decisão vai diretamente ao trabalho, sem devolver o pedido. Antes de gravar, releia o destino. Se o estado mudou enquanto trabalhava, preserve o conteúdo novo e reconcilie a mudança antes de prosseguir. Uma solicitação apenas de orientação continua em leitura.

Confira o diretório da skill, seu nome de descoberta e os recursos que ela usa. Se a ausência estiver confirmada, aplique `criar-skill` diretamente em modo de criação no mesmo chat. Em presença do objeto, trabalhe na versão existente. Uma solicitação de versão paralela define outro destino.

Preserve os fluxos já atendidos e confirme que a descrição continua distinguindo a skill de suas vizinhas. Confira o YAML, as referências relativas e pelo menos um cenário representativo afetado pela revisão.

Entregue o artefato, os efeitos da mudança e a verificação que de fato realizou.
