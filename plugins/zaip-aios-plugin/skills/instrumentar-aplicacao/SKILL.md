---
name: instrumentar-aplicacao
description: "Desenhe ou adicione logs, métricas, rastreamento e alertas para uma jornada real da aplicação com proteção de dados."
---

# Instrumentar uma aplicação

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/architecture/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Comece por uma pergunta operacional como “o pedido ficou na fila ou falhou na entrega?”. Marque fronteiras com um identificador de correlação não sensível. Use contadores, duração e estado final onde distinguirem as causas. Evite valores pessoais, segredos e rótulos de cardinalidade ilimitada nas métricas.

Associe cada alerta a um sintoma relevante, janela e ação que alguém pode tomar. Percorra uma requisição bem-sucedida e uma falha em ambiente local. Mostre a sequência efetivamente observada e as lacunas. Entregue o esquema e, se pedido, a implementação nos pontos da aplicação que produzem os sinais.
