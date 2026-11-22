---
name: planejar-infraestrutura
description: "Prepare ou revise infraestrutura como código, incluindo Hostinger, DNS, recursos de nuvem e mudanças em Terraform com impacto delimitado."
---

# Planejar infraestrutura e hospedagem

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/architecture/memoria.md`, `.agents/operations/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Desenhe origem, domínio, ambiente, persistência, dependências e recurso realmente alterado. Em um plano fornecido, diferencie criação, mudança no lugar e substituição. Para Hostinger com DNS da Cloudflare, identifique quem hospeda a aplicação, quem responde pelo DNS e como a origem atende o domínio. Use valores fictícios em exemplos de configuração.

Entregue configuração ou plano local, janela de mudança, observação de sucesso e reversão. Preserve o estado de Terraform e separe ambientes por destino. Só descreva recursos remotos como provisionados quando houver evidência do provedor. Se o objetivo for orçamento, informe hipóteses de tráfego e unidade dos custos em vez de inventar preços.
