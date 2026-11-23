---
name: diagnosticar-performance-aplicacao
description: "Investigue lentidão de backend ou processamento em lote usando perfil, medições e consultas do projeto para localizar o gargalo."
---

# Diagnosticar desempenho de serviços

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Fixe operação, distribuição de entradas, concorrência e volume. Registre a linha de base em termos relevantes, como p95 de latência, vazão ou memória máxima. Localize o tempo entre fila, CPU, banco e chamadas externas. Compare o custo de uma operação isolada com o custo acumulado por repetição. Se houver apenas código, liste os pontos que precisam de medição.

Mude uma causa por vez e repita sob as mesmas condições. Confira erros, consumo de recursos e consistência dos resultados após o ajuste. Entregue medição antes e depois e o intervalo em que a comparação vale. Um teste de laboratório não comprova a mesma melhoria sob tráfego de produção.
