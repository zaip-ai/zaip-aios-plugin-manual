---
name: checar-deploy-producao
description: "Confira se a versão esperada está servindo no destino de produção e se a jornada afetada funciona."
---

# Conferir um deploy em produção

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/operations/`, `.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Operações e passagem de trabalho](./references/zaip/operacoes.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique aplicação, URL, ambiente, release ou digest esperado. Confira evidência do build, artefato, implantação e versão servida. Em sites distribuídos, considere cache, região, redirecionamentos e diferença entre preview e domínio oficial.

Faça verificação de leitura no alvo autorizado usando um sinal observável da mudança e compare com a versão esperada. Uma resposta 200 prova alcance daquela rota. Entregue versão observada, teste funcional, horário e lacunas. O pedido de checagem não inicia outro deploy.
