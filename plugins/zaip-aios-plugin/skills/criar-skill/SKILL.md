---
name: criar-skill
description: "Transforme uma rotina repetida em uma skill independente com descrição de descoberta, instruções úteis e recursos relativos à própria pasta."
---

# Criar uma skill portátil

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `skill` seguido do caminho do material. Use o [modelo de SKILL.md](./assets/modelo-skill.md) como exemplo de estrutura. Informe sempre o alcance do teste.

Ao gravar uma primeira versão, use criação exclusiva quando a ferramenta permitir. Se alguém criou o destino durante o trabalho, preserve-o e compare as versões. Para material existente, aplique só a diferença pedida. Se já atende ao pedido e não há mudança identificável, reutilize-o sem regravar. Se o cliente não conseguir acionar a entrada parceira, aplique a mesma decisão no chat atual.

No projeto indicado, confira o diretório da skill, seu nome de descoberta e os recursos que ela usa para identificar o material a que a pessoa se refere. Se o objeto já existir, aplique `atualizar-skill` à versão encontrada. Se a ausência estiver confirmada, crie a primeira versão. Uma variante explicitamente pedida é um objeto distinto. Diante de duas fontes plausíveis ou de falta de acesso, esclareça o destino. Faça a passagem no mesmo chat uma só vez, levando a evidência e o modo decidido. Reconfira o destino antes de escrever.

Aplique o método desta edição em [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique uma tarefa recorrente, um pedido que deve selecionar a skill e um pedido vizinho que deve selecionar outra. Escolha nome curto, pasta correspondente e descrição que diga qual resultado será entregue. Coloque o método em SKILL.md com frontmatter name e description. Inclua modelos ou exemplos somente quando usados em uma etapa concreta.

Resolva todos os caminhos a partir da skill e declare qualquer condição do ambiente antes de prometer um efeito. Use um caso de teste novo com material mínimo para verificar se a instrução produz o resultado desejado. Confira nome da pasta, YAML e referências locais. Entregue os arquivos e distinga validação estrutural de descoberta no cliente.
