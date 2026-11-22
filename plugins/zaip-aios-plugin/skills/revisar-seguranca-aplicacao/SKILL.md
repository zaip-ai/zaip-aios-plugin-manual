---
name: revisar-seguranca-aplicacao
description: "Faça uma revisão defensiva de código e configuração do próprio projeto com foco em autorização, dados sensíveis e limites de confiança."
---

# Revisar controles da aplicação

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Governança de processos](./references/zaip/governanca.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique ativos, atores, entradas e limites entre componentes. Leia o caminho que valida o ator, o recurso e a operação, os lugares que registram dados e a política de acesso do armazenamento. Priorize problemas demonstráveis em configuração ou código fornecidos e descreva arquivo, condição e impacto.

Entregue correções defensivas, como reduzir privilégios, validar no servidor ou minimizar informações em logs. Valide por testes locais de política e asserções sobre saídas esperadas usando dados fictícios. Uma revisão documental não certifica conformidade. Para uma exigência de governança informada, relacione-a a um controle, um responsável conhecido e sua evidência.
