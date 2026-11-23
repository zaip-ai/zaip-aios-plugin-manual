---
name: preparar-pipeline-github
description: "Revise ou escreva a configuração local de uma entrega por GitHub e GitHub Actions incluindo testes, artefato, ambiente e recuperação."
---

# Preparar entrega com GitHub Actions

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique origem, repositório pretendido, branch e gatilho a partir da configuração fornecida. Confira a identidade esperada por projeto sem copiar credenciais ou chaves. Distinga a identidade de leitura da credencial necessária à publicação. Projete permissões mínimas por trabalho e isole credenciais de publicação de contribuições não confiáveis.

Entregue o fluxo local com build, testes, artefato imutável e destino identificado. Mostre como a etapa de entrega consome os mesmos bytes que passaram pela validação. Considere execuções simultâneas e como recuperar a versão anterior. Diferencie arquivo revisado, teste local, execução remota e publicação. Uma solicitação de preparo deixa o fluxo em rascunho no projeto.
