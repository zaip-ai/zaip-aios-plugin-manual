---
name: corrigir-codificacao-texto
description: "Investigue acentos corrompidos, BOM ou mojibake em arquivos locais e faça uma conversão verificável preservando o conteúdo."
---

# Corrigir codificação de texto

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique em qual fronteira o texto se altera, comparando bytes de origem, leitura e exibição. Use uma palavra conhecida da própria fonte para diferenciar conteúdo corrompido de erro de renderização. Confira codificação, BOM e quebras de linha esperadas pelo consumidor. Se a origem for ambígua, preserve os bytes e registre alternativas.

Ao aplicar a correção, restrinja-a aos arquivos demonstrados. Reabra com o leitor real e confira acentos, quebras e caracteres que não faziam parte do sintoma. Em processamento em lote, teste amostra representativa e idempotência. Entregue o diagnóstico e os arquivos alterados, sem normalizar material alheio ao pedido.
