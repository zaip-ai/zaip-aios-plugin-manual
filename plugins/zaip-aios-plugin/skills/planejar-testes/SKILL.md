---
name: planejar-testes
description: "Elabore uma estratégia de testes, fixtures fictícias e verificações de regressão para uma mudança ou jornada específica."
---

# Planejar testes e dados de teste

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Definição de produto](./references/zaip/produto.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Vincule cada risco de produto ao menor nível que consegue detectá-lo. Use teste de unidade para regras, integração para contratos e um caminho de ponta a ponta quando fronteiras forem parte do risco. Cubra sucesso, falha e, se pertinente, repetição, concorrência e dados antigos. Dê a cada fixture uma razão para existir.

Produza casos em termos de estado inicial, ação e resultado observável. Gere dados fictícios determinísticos com chaves e relações coerentes. Conte quais testes foram executados, quais só foram desenhados e quais dependências foram substituídas. Ao corrigir uma regressão, verifique se o teste falharia antes da correção e passa no comportamento solicitado.
