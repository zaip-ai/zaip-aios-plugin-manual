---
name: processar-filas
description: "Implemente ou diagnostique trabalhos em segundo plano com idempotência, tentativas, limite de concorrência e recuperação de falha."
---

# Projetar filas e tarefas assíncronas

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/architecture/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Defina o que a confirmação de enfileiramento garante e em qual etapa o efeito de negócio se completa. Dê a cada trabalho uma identidade estável. Para falhas transitórias, estabeleça tentativas limitadas e espera compatível com o serviço. Preserve falhas permanentes com causa e forma de inspeção.

Exercite entrega repetida, falha depois do efeito e reinício antes da confirmação. Verifique se o consumidor consegue repetir sem duplicar um pagamento, cadastro ou mensagem. Se o efeito externo não puder ser conciliado automaticamente, registre o estado ambíguo. Entregue o fluxo, sinais de atraso e uma forma de retomar apenas o trabalho pendente.
