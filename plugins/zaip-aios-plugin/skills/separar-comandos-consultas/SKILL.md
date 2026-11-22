---
name: separar-comandos-consultas
description: "Aplique o contrato CQRS do ZAIP entre comandos e consultas e defina a consistência esperada."
---

# Separar comandos e consultas com CQRS

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/architecture/memoria.md`, `.agents/development/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Selecione o fluxo real que recebe um comando ou uma consulta. Nomeie o comando, a regra que ele protege, a decisão de persistência e a consulta que o consumidor precisa fazer. Se uma separação lógica no mesmo processo resolve, documente-a antes de introduzir filas ou bancos distintos.

Para projeções assíncronas, defina identificador e ordem de eventos por entidade, repetição, reconstrução e leitura logo após escrever. Teste projeção atrasada, evento duplicado e versão que chega fora de ordem. Entregue o contrato entre escrita e leitura e como identificar atraso aceitável ou perda.

No perfil ZAIP, a fronteira lógica é invariante, inclusive com armazenamento compartilhado. Consultas não modificam dados, não publicam eventos e não importam portas de escrita. Separe infraestrutura física somente quando o caso justificar.
