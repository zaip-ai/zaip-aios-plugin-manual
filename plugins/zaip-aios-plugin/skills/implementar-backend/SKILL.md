---
name: implementar-backend
description: "Implemente uma regra de negócio no serviço da aplicação, preservando transações, contratos e comportamento em concorrência."
---

# Implementar lógica de backend

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`, `.agents/architecture/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Siga um caso desde a entrada até o estado persistido. Identifique o ponto que hoje valida permissão e a regra que deve permanecer verdadeira antes e depois da operação. Reutilize o serviço e o padrão de acesso existentes. Coloque na mesma transação as mudanças que precisam ter sucesso juntas e trate efeitos externos separadamente.

Teste o caso normal, erro parcial, repetição e disputa pelo mesmo recurso quando cabíveis. Observe o estado final e o que o próximo consumidor consegue ler. Informe quais dependências foram simuladas e se algum efeito ficou pendente. Para uma pergunta de desenho, entregue o fluxo e as invariantes sem criar arquivos por iniciativa própria.
