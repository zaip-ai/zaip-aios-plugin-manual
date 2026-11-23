---
name: desenhar-arquitetura
description: "Compare alternativas de módulos, interfaces e dependências para uma mudança arquitetural ancorada no projeto existente."
---

# Desenhar a arquitetura de uma mudança

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/architecture/`, `.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Mapeie uma jornada de ponta a ponta e o código que hoje detém cada responsabilidade. Identifique a força que motiva a mudança, como necessidade de isolamento, latência ou autonomia de evolução. Desenhe a opção mínima viável e uma alternativa relevante. Para cada uma, registre custo de migração, dependência nova e modo de falha.

Entregue o desenho com limites, direção das chamadas, propriedade dos dados e primeiro incremento verificável. Registre decisões importantes com contexto, opção escolhida e condição que justificaria revê-la. Use restrições fornecidas pela equipe e marque volumes, custos e requisitos ainda desconhecidos.
