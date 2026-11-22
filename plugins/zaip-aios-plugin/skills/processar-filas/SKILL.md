---
name: processar-filas
description: "Implemente ou diagnostique trabalhos em segundo plano com idempotência, tentativas, limite de concorrência e recuperação de falha."
---

# Projetar filas e tarefas assíncronas

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/architecture/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Defina o que a confirmação de enfileiramento garante e em qual etapa o efeito de negócio se completa. Dê a cada trabalho uma identidade estável. Para falhas transitórias, estabeleça tentativas limitadas e espera compatível com o serviço. Preserve falhas permanentes com causa e forma de inspeção.

Exercite entrega repetida, falha depois do efeito e reinício antes da confirmação. Verifique se o consumidor consegue repetir sem duplicar um pagamento, cadastro ou mensagem. Se o efeito externo não puder ser conciliado automaticamente, registre o estado ambíguo. Entregue o fluxo, sinais de atraso e uma forma de retomar apenas o trabalho pendente.
