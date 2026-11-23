---
name: checar-deploy-producao
description: "Confira se a versão esperada está servindo no destino de produção e se a jornada afetada funciona."
---

# Conferir um deploy em produção

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Operações e passagem de trabalho](./references/zaip/operacoes.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique aplicação, URL, ambiente, release ou digest esperado. Confira evidência do build, artefato, implantação e versão servida. Em sites distribuídos, considere cache, região, redirecionamentos e diferença entre preview e domínio oficial.

Faça verificação de leitura no alvo autorizado usando um sinal observável da mudança e compare com a versão esperada. Uma resposta 200 prova alcance daquela rota. Entregue versão observada, teste funcional, horário e lacunas. O pedido de checagem não inicia outro deploy.
