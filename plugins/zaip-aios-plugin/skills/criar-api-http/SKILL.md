---
name: criar-api-http
description: "Projete e implemente um endpoint ou API REST na stack do projeto, com contrato, validação, autorização, erros e testes de compatibilidade."
---

# Criar uma API HTTP

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`, `.agents/architecture/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `api` seguido do caminho do material. Informe sempre o alcance do teste.

Ao gravar uma primeira versão, use criação exclusiva quando a ferramenta permitir. Se alguém criou o destino durante o trabalho, preserve-o e compare as versões. Para material existente, aplique só a diferença pedida. Se já atende ao pedido e não há mudança identificável, reutilize-o sem regravar. Se o cliente não conseguir acionar a entrada parceira, aplique a mesma decisão no chat atual.

No projeto indicado, confira o contrato, a rota, os consumidores e a versão em uso para identificar o material a que a pessoa se refere. Se o objeto já existir, aplique `atualizar-api-http` à versão encontrada. Se a ausência estiver confirmada, crie a primeira versão. Uma variante explicitamente pedida é um objeto distinto. Diante de duas fontes plausíveis ou de falta de acesso, esclareça o destino. Faça a passagem no mesmo chat uma só vez, levando a evidência e o modo decidido. Reconfira o destino antes de escrever.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Leia um endpoint vizinho, seu consumidor e as convenções de persistência. Defina recurso, método, entrada, resposta, códigos e significado dos campos ausentes. Para uma criação, decida quando o recurso existe e se um retry com a mesma chave pode duplicá-lo. Documente autenticação e autorização por recurso quando aplicáveis. O [exemplo OpenAPI](./assets/exemplo-openapi.json) mostra um contrato mínimo e dados fictícios.

Se o pedido for criar a API, implemente rota, validação e operação real no projeto. Preserve consumidores existentes e mantenha segredos fora de exemplos. Exercite sucesso, entrada inválida, recurso inexistente e tentativas repetidas ou entre contas quando pertinentes. Compare corpo, status e efeito na persistência com o contrato. Entregue o que foi executado e como um cliente invoca a nova operação.
