---
name: otimizar-performance-web
description: "Investigue carregamento lento, atraso em interações ou instabilidade visual em páginas a partir de código, traces ou relatórios locais."
---

# Otimizar desempenho da web

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`, `.agents/design/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Design de produto e experiência](./references/zaip/design.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Fixe rota, viewport, conexão, estado do cache e sequência de interação que reproduzem a queixa. Separe dados reais de campo de uma medição de laboratório. Localize o elemento de LCP, uma interação lenta ligada ao INP ou a origem de mudanças de layout relacionadas ao CLS. Relacione o sintoma a bytes, latência, bloqueios de CPU ou geometria da página.

Aplique a menor alteração que trata a causa observada. Repita o cenário nas mesmas condições e examine variação entre execuções, aparência e funcionalidade. Um teste sem interações não mede a experiência de interação dos visitantes. Entregue antes e depois com contexto, ou a hipótese verificável se houver apenas código.
