---
name: corrigir-codificacao-texto
description: "Investigue acentos corrompidos, BOM ou mojibake em arquivos locais e faça uma conversão verificável preservando o conteúdo."
---

# Corrigir codificação de texto

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique em qual fronteira o texto se altera, comparando bytes de origem, leitura e exibição. Use uma palavra conhecida da própria fonte para diferenciar conteúdo corrompido de erro de renderização. Confira codificação, BOM e quebras de linha esperadas pelo consumidor. Se a origem for ambígua, preserve os bytes e registre alternativas.

Ao aplicar a correção, restrinja-a aos arquivos demonstrados. Reabra com o leitor real e confira acentos, quebras e caracteres que não faziam parte do sintoma. Em processamento em lote, teste amostra representativa e idempotência. Entregue o diagnóstico e os arquivos alterados, sem normalizar material alheio ao pedido.
