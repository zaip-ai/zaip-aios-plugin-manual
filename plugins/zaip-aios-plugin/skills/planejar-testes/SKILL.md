---
name: planejar-testes
description: "Elabore uma estratégia de testes, fixtures fictícias e verificações de regressão para uma mudança ou jornada específica."
---

# Planejar testes e dados de teste

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Definição de produto](./references/zaip/produto.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Vincule cada risco de produto ao menor nível que consegue detectá-lo. Use teste de unidade para regras, integração para contratos e um caminho de ponta a ponta quando fronteiras forem parte do risco. Cubra sucesso, falha e, se pertinente, repetição, concorrência e dados antigos. Dê a cada fixture uma razão para existir.

Produza casos em termos de estado inicial, ação e resultado observável. Gere dados fictícios determinísticos com chaves e relações coerentes. Conte quais testes foram executados, quais só foram desenhados e quais dependências foram substituídas. Ao corrigir uma regressão, verifique se o teste falharia antes da correção e passa no comportamento solicitado.
