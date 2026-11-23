---
name: auditar-seguranca-repositorio
description: "Revise defensivamente código, dependências e configuração de um repositório autorizado e priorize correções rastreáveis."
---

# Analisar a segurança de um repositório

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Governança de processos](./references/zaip/governanca.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Inventarie superfícies expostas, autenticação, autorização por recurso, isolamento, logs, segredos referenciados, dependências e permissões de CI. Examine configurações e código do próprio projeto. Em achado de segredo, oculte o valor e cite só local e natureza do risco.

Entregue achados com arquivo, condição, impacto e correção mínima. Confirme correções com validação de configuração e testes defensivos de política em dados fictícios. Declare escopo e itens que dependem da infraestrutura. Não produza ataques ou exploração.
