---
name: revisar-integracao-meta
description: "Diagnostique ou prepare integrações Graph API, webhooks, permissões e revisão de app usando configurações locais e evidências redigidas."
---

# Revisar uma integração da plataforma Meta

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Governança de processos](./references/zaip/governanca.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Mapeie operação, ativo, versão declarada da API, modo do app, papel e permissões necessárias. Para erro de acesso, separe falta de escopo, expiração, ativo incorreto e restrição de modo com os códigos ou metadados já fornecidos. Evite pedir que a pessoa cole tokens ou segredos.

Para webhook, diferencie verificação inicial, assinatura da entrega, inscrição no evento e processamento. Reproduza com payloads fictícios no adaptador local. Para revisão de app, relacione cada permissão a uma ação demonstrável, com pré-requisitos e evidência faltante. Entregue a correção local ou lista de ajustes por ativo. Aprovação, assinatura remota e entrega real dependem de evidência específica.
