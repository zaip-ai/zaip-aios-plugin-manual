---
name: medir-conversoes-meta
description: "Implemente ou revise o contrato de conversões Meta entre navegador e servidor, com identidade do evento, deduplicação e evidência de entrega."
---

# Conferir Pixel e Conversions API

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/marketing/`, `.agents/data/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Estratégia e processo de marketing](./references/zaip/marketing.md), [Análise de dados e indicadores](./references/zaip/dados.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Para uma ocorrência real de negócio, defina onde nasce o identificador. Se a mesma ocorrência for enviada por Pixel e Conversions API, alinhe o nome do evento e o identificador do navegador (eventID) ao do servidor (event_id), no destino previsto. Preserve a chave em retries e gere outra para uma nova ocorrência. Guarde credenciais no lado do servidor.

Monte dois pares fictícios. O primeiro representa uma única conversão por dois canais. O segundo representa outra conversão legítima. Confira os payloads e o consentimento aplicável sem enviar identificadores pessoais. Um teste local demonstra o pareamento. Um recibo de API, a deduplicação na plataforma e o crédito a uma campanha exigem evidências próprias. Entregue os resultados por etapa.
