---
name: modelar-dados
description: "Transforme regras de negócio em um modelo de dados com chaves, relacionamentos, restrições e consultas representativas."
---

# Modelar entidades e relações

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`, `.agents/architecture/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Declare o que cada linha representa, quem é dono do registro e por quanto tempo sua identidade precisa persistir. Diferencie estado atual de evento histórico. Derive cardinalidade, obrigatoriedade e unicidade a partir de exemplos reais do domínio. Verifique o significado de ausência, exclusão e reativação.

Entregue o modelo com chaves e índices justificados pelas consultas. Percorra um exemplo de criação, alteração, duplicidade e consulta entre contas. Quando já existe esquema, indique o impacto sobre dados antigos e consumidores. Uma entidade proposta deve responder a uma regra ou consulta necessária.
