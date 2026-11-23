---
name: diagnosticar-performance-aplicacao
description: "Investigue lentidão de backend ou processamento em lote usando perfil, medições e consultas do projeto para localizar o gargalo."
---

# Diagnosticar desempenho de serviços

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Fixe operação, distribuição de entradas, concorrência e volume. Registre a linha de base em termos relevantes, como p95 de latência, vazão ou memória máxima. Localize o tempo entre fila, CPU, banco e chamadas externas. Compare o custo de uma operação isolada com o custo acumulado por repetição. Se houver apenas código, liste os pontos que precisam de medição.

Mude uma causa por vez e repita sob as mesmas condições. Confira erros, consumo de recursos e consistência dos resultados após o ajuste. Entregue medição antes e depois e o intervalo em que a comparação vale. Um teste de laboratório não comprova a mesma melhoria sob tráfego de produção.
