---
name: criar-api-http
description: "Projete e implemente um endpoint ou API REST na stack do projeto, com contrato, validação, autorização, erros e testes de compatibilidade."
---

# Criar uma API HTTP

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`, `.agents/architecture/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `api` seguido do caminho do material. Informe sempre o alcance do teste.

Ao gravar uma primeira versão, use criação exclusiva quando a ferramenta permitir. Se alguém criou o destino durante o trabalho, preserve-o e compare as versões. Para material existente, aplique só a diferença pedida. Se já atende ao pedido e não há mudança identificável, reutilize-o sem regravar. Se o cliente não conseguir acionar a entrada parceira, aplique a mesma decisão no chat atual.

No projeto indicado, confira o contrato, a rota, os consumidores e a versão em uso para identificar o material a que a pessoa se refere. Se o objeto já existir, aplique `atualizar-api-http` à versão encontrada. Se a ausência estiver confirmada, crie a primeira versão. Uma variante explicitamente pedida é um objeto distinto. Diante de duas fontes plausíveis ou de falta de acesso, esclareça o destino. Faça a passagem no mesmo chat uma só vez, levando a evidência e o modo decidido. Reconfira o destino antes de escrever.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Leia um endpoint vizinho, seu consumidor e as convenções de persistência. Defina recurso, método, entrada, resposta, códigos e significado dos campos ausentes. Para uma criação, decida quando o recurso existe e se um retry com a mesma chave pode duplicá-lo. Documente autenticação e autorização por recurso quando aplicáveis. O [exemplo OpenAPI](./assets/exemplo-openapi.json) mostra um contrato mínimo e dados fictícios.

Se o pedido for criar a API, implemente rota, validação e operação real no projeto. Preserve consumidores existentes e mantenha segredos fora de exemplos. Exercite sucesso, entrada inválida, recurso inexistente e tentativas repetidas ou entre contas quando pertinentes. Compare corpo, status e efeito na persistência com o contrato. Entregue o que foi executado e como um cliente invoca a nova operação.
