---
name: criar-mcp-local
description: "Transforme uma operação local ou uma API existente em ferramentas MCP por stdio e teste descoberta e chamada em um projeto de desenvolvimento."
---

# Criar um MCP local

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`, `.agents/architecture/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `mcp` seguido do caminho do material. Confira o formato com a [listagem de ferramentas fictícias](./assets/listagem-mcp.json). Informe sempre o alcance do teste.

Ao gravar uma primeira versão, use criação exclusiva quando a ferramenta permitir. Se alguém criou o destino durante o trabalho, preserve-o e compare as versões. Para material existente, aplique só a diferença pedida. Se já atende ao pedido e não há mudança identificável, reutilize-o sem regravar. Se o cliente não conseguir acionar a entrada parceira, aplique a mesma decisão no chat atual.

No projeto indicado, confira o projeto do servidor, a ferramenta e o protocolo negociado para identificar o material a que a pessoa se refere. Se o objeto já existir, aplique `atualizar-mcp-local` à versão encontrada. Se a ausência estiver confirmada, crie a primeira versão. Uma variante explicitamente pedida é um objeto distinto. Diante de duas fontes plausíveis ou de falta de acesso, esclareça o destino. Faça a passagem no mesmo chat uma só vez, levando a evidência e o modo decidido. Reconfira o destino antes de escrever.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Parta da ação que a pessoa quer realizar e de uma origem autorizada, como uma coleção local de exemplos ou um contrato OpenAPI. Selecione as operações necessárias e exponha uma ferramenta específica por ação. Declare nomes, tipos, campos obrigatórios, efeitos e erros. Evite uma ferramenta genérica capaz de executar comandos ou requisitar URLs arbitrárias.

Quando a pessoa pedir implementação, construa o servidor no projeto de destino com o SDK compatível já usado ali, se houver. O cliente inicia o processo. Reserve stdin e stdout para JSON-RPC e use stderr para diagnóstico. Limite leitura e escrita aos recursos autorizados. Para API externa, injete um adaptador local de teste e deixe credenciais fora do código e exemplos.

Exercite inicialização, notificação de pronto, listagem e chamada válida, argumento inválido e recurso ausente. Use o [diálogo ilustrativo](./assets/dialogo-stdio.md) como referência. Entregue a configuração do cliente com comando e argumentos próprios do projeto. Informe separadamente o que foi testado no transporte, no cliente e no serviço de destino. O plugin distribui essas instruções em Markdown.
