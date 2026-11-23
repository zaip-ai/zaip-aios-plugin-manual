---
name: otimizar-performance-web
description: "Investigue carregamento lento, atraso em interações ou instabilidade visual em páginas a partir de código, traces ou relatórios locais."
---

# Otimizar desempenho da web

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`, `.agents/design/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Design de produto e experiência](./references/zaip/design.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Fixe rota, viewport, conexão, estado do cache e sequência de interação que reproduzem a queixa. Separe dados reais de campo de uma medição de laboratório. Localize o elemento de LCP, uma interação lenta ligada ao INP ou a origem de mudanças de layout relacionadas ao CLS. Relacione o sintoma a bytes, latência, bloqueios de CPU ou geometria da página.

Aplique a menor alteração que trata a causa observada. Repita o cenário nas mesmas condições e examine variação entre execuções, aparência e funcionalidade. Um teste sem interações não mede a experiência de interação dos visitantes. Entregue antes e depois com contexto, ou a hipótese verificável se houver apenas código.
