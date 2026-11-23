---
name: integrar-apis-webhooks
description: "Implemente um adaptador de API ou receptor de webhook com contrato explícito, autenticação apropriada, repetição segura e conciliação."
---

# Integrar APIs e webhooks

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `fluxo` seguido do caminho do material. Use o [plano com evento repetido](./assets/exemplo-fluxo.json) para exercitar a deduplicação. Informe sempre o alcance do teste.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Defina produtor, consumidor, evento de negócio e momento de confirmação. Converta o contrato externo em tipos locais e preserve um identificador estável. Para webhooks assinados, mantenha os bytes exigidos para verificação antes de interpretar o corpo. Configure timeout e diferencie falhas transitórias, permanentes e aceite assíncrono.

Use exemplos fictícios para exercitar sucesso, repetição, resposta atrasada e evento desconhecido. Se a integração cria algo no destino, localize um recibo ou uma consulta de conciliação antes de marcar a entrega. Entregue a implementação ou contrato pedido e indique se o último salto foi exercitado com um simulador ou com o destino real.
