---
name: instrumentar-aplicacao
description: "Desenhe ou adicione logs, métricas, rastreamento e alertas para uma jornada real da aplicação com proteção de dados."
---

# Instrumentar uma aplicação

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/architecture/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Comece por uma pergunta operacional como “o pedido ficou na fila ou falhou na entrega?”. Marque fronteiras com um identificador de correlação não sensível. Use contadores, duração e estado final onde distinguirem as causas. Evite valores pessoais, segredos e rótulos de cardinalidade ilimitada nas métricas.

Associe cada alerta a um sintoma relevante, janela e ação que alguém pode tomar. Percorra uma requisição bem-sucedida e uma falha em ambiente local. Mostre a sequência efetivamente observada e as lacunas. Entregue o esquema e, se pedido, a implementação nos pontos da aplicação que produzem os sinais.
