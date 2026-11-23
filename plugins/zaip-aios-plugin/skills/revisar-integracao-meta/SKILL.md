---
name: revisar-integracao-meta
description: "Diagnostique ou prepare integrações Graph API, webhooks, permissões e revisão de app usando configurações locais e evidências redigidas."
---

# Revisar uma integração da plataforma Meta

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/operations/`, `.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Governança de processos](./references/zaip/governanca.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Mapeie operação, ativo, versão declarada da API, modo do app, papel e permissões necessárias. Para erro de acesso, separe falta de escopo, expiração, ativo incorreto e restrição de modo com os códigos ou metadados já fornecidos. Evite pedir que a pessoa cole tokens ou segredos.

Para webhook, diferencie verificação inicial, assinatura da entrega, inscrição no evento e processamento. Reproduza com payloads fictícios no adaptador local. Para revisão de app, relacione cada permissão a uma ação demonstrável, com pré-requisitos e evidência faltante. Entregue a correção local ou lista de ajustes por ativo. Aprovação, assinatura remota e entrega real dependem de evidência específica.
