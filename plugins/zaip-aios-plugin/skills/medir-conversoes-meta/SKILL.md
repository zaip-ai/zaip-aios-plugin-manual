---
name: medir-conversoes-meta
description: "Implemente ou revise o contrato de conversões Meta entre navegador e servidor, com identidade do evento, deduplicação e evidência de entrega."
---

# Conferir Pixel e Conversions API

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/marketing/memoria.md`, `.agents/data/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Estratégia e processo de marketing](./references/zaip/marketing.md), [Análise de dados e indicadores](./references/zaip/dados.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Para uma ocorrência real de negócio, defina onde nasce o identificador. Se a mesma ocorrência for enviada por Pixel e Conversions API, alinhe o nome do evento e o identificador do navegador (eventID) ao do servidor (event_id), no destino previsto. Preserve a chave em retries e gere outra para uma nova ocorrência. Guarde credenciais no lado do servidor.

Monte dois pares fictícios. O primeiro representa uma única conversão por dois canais. O segundo representa outra conversão legítima. Confira os payloads e o consentimento aplicável sem enviar identificadores pessoais. Um teste local demonstra o pareamento. Um recibo de API, a deduplicação na plataforma e o crédito a uma campanha exigem evidências próprias. Entregue os resultados por etapa.
