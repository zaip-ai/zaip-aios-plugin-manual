---
name: auditar-seguranca-repositorio
description: "Revise defensivamente código, dependências e configuração de um repositório autorizado e priorize correções rastreáveis."
---

# Analisar a segurança de um repositório

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/operations/`, `.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Governança de processos](./references/zaip/governanca.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Inventarie superfícies expostas, autenticação, autorização por recurso, isolamento, logs, segredos referenciados, dependências e permissões de CI. Examine configurações e código do próprio projeto. Em achado de segredo, oculte o valor e cite só local e natureza do risco.

Entregue achados com arquivo, condição, impacto e correção mínima. Confirme correções com validação de configuração e testes defensivos de política em dados fictícios. Declare escopo e itens que dependem da infraestrutura. Não produza ataques ou exploração.
