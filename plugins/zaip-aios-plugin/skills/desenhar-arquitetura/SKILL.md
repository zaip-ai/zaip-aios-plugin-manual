---
name: desenhar-arquitetura
description: "Compare alternativas de módulos, interfaces e dependências para uma mudança arquitetural ancorada no projeto existente."
---

# Desenhar a arquitetura de uma mudança

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/architecture/memoria.md`, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Mapeie uma jornada de ponta a ponta e o código que hoje detém cada responsabilidade. Identifique a força que motiva a mudança, como necessidade de isolamento, latência ou autonomia de evolução. Desenhe a opção mínima viável e uma alternativa relevante. Para cada uma, registre custo de migração, dependência nova e modo de falha.

Entregue o desenho com limites, direção das chamadas, propriedade dos dados e primeiro incremento verificável. Registre decisões importantes com contexto, opção escolhida e condição que justificaria revê-la. Use restrições fornecidas pela equipe e marque volumes, custos e requisitos ainda desconhecidos.
