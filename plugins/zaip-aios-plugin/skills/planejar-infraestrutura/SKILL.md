---
name: planejar-infraestrutura
description: "Prepare ou revise infraestrutura como código, incluindo Hostinger, DNS, recursos de nuvem e mudanças em Terraform com impacto delimitado."
---

# Planejar infraestrutura e hospedagem

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/architecture/`, `.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Desenhe origem, domínio, ambiente, persistência, dependências e recurso realmente alterado. Em um plano fornecido, diferencie criação, mudança no lugar e substituição. Para Hostinger com DNS da Cloudflare, identifique quem hospeda a aplicação, quem responde pelo DNS e como a origem atende o domínio. Use valores fictícios em exemplos de configuração.

Entregue configuração ou plano local, janela de mudança, observação de sucesso e reversão. Preserve o estado de Terraform e separe ambientes por destino. Só descreva recursos remotos como provisionados quando houver evidência do provedor. Se o objetivo for orçamento, informe hipóteses de tráfego e unidade dos custos em vez de inventar preços.
