---
name: criar-skill
description: "Transforme uma rotina repetida em uma skill independente com descrição de descoberta, instruções úteis e recursos relativos à própria pasta."
---

# Criar uma skill portátil

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `skill` seguido do caminho do material. Use o [modelo de SKILL.md](./assets/modelo-skill.md) como exemplo de estrutura. Informe sempre o alcance do teste.

Ao gravar uma primeira versão, use criação exclusiva quando a ferramenta permitir. Se alguém criou o destino durante o trabalho, preserve-o e compare as versões. Para material existente, aplique só a diferença pedida. Se já atende ao pedido e não há mudança identificável, reutilize-o sem regravar. Se o cliente não conseguir acionar a entrada parceira, aplique a mesma decisão no chat atual.

No projeto indicado, confira o diretório da skill, seu nome de descoberta e os recursos que ela usa para identificar o material a que a pessoa se refere. Se o objeto já existir, aplique `atualizar-skill` à versão encontrada. Se a ausência estiver confirmada, crie a primeira versão. Uma variante explicitamente pedida é um objeto distinto. Diante de duas fontes plausíveis ou de falta de acesso, esclareça o destino. Faça a passagem no mesmo chat uma só vez, levando a evidência e o modo decidido. Reconfira o destino antes de escrever.

Aplique o método desta edição em [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique uma tarefa recorrente, um pedido que deve selecionar a skill e um pedido vizinho que deve selecionar outra. Escolha nome curto, pasta correspondente e descrição que diga qual resultado será entregue. Coloque o método em SKILL.md com frontmatter name e description. Inclua modelos ou exemplos somente quando usados em uma etapa concreta.

Resolva todos os caminhos a partir da skill e declare qualquer condição do ambiente antes de prometer um efeito. Use um caso de teste novo com material mínimo para verificar se a instrução produz o resultado desejado. Confira nome da pasta, YAML e referências locais. Entregue os arquivos e distinga validação estrutural de descoberta no cliente.
