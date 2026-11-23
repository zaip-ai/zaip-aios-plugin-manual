---
name: revisar-seguranca-aplicacao
description: "Faça uma revisão defensiva de código e configuração do próprio projeto com foco em autorização, dados sensíveis e limites de confiança."
---

# Revisar controles da aplicação

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Governança de processos](./references/zaip/governanca.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique ativos, atores, entradas e limites entre componentes. Leia o caminho que valida o ator, o recurso e a operação, os lugares que registram dados e a política de acesso do armazenamento. Priorize problemas demonstráveis em configuração ou código fornecidos e descreva arquivo, condição e impacto.

Entregue correções defensivas, como reduzir privilégios, validar no servidor ou minimizar informações em logs. Valide por testes locais de política e asserções sobre saídas esperadas usando dados fictícios. Uma revisão documental não certifica conformidade. Para uma exigência de governança informada, relacione-a a um controle, um responsável conhecido e sua evidência.
