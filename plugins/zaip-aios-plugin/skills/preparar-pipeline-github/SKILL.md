---
name: preparar-pipeline-github
description: "Revise ou escreva a configuração local de uma entrega por GitHub e GitHub Actions incluindo testes, artefato, ambiente e recuperação."
---

# Preparar entrega com GitHub Actions

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique origem, repositório pretendido, branch e gatilho a partir da configuração fornecida. Confira a identidade esperada por projeto sem copiar credenciais ou chaves. Distinga a identidade de leitura da credencial necessária à publicação. Projete permissões mínimas por trabalho e isole credenciais de publicação de contribuições não confiáveis.

Entregue o fluxo local com build, testes, artefato imutável e destino identificado. Mostre como a etapa de entrega consome os mesmos bytes que passaram pela validação. Considere execuções simultâneas e como recuperar a versão anterior. Diferencie arquivo revisado, teste local, execução remota e publicação. Uma solicitação de preparo deixa o fluxo em rascunho no projeto.
