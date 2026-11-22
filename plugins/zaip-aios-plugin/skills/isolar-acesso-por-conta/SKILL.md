---
name: isolar-acesso-por-conta
description: "Modele ou revise autenticação, autorização por recurso e separação de dados entre contas ou organizações da aplicação."
---

# Implementar autorização e isolamento por conta

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`, `.agents/operations/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Governança de processos](./references/zaip/governanca.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique o ator autenticado, a associação dele à conta e a ação permitida sobre o recurso. Derive a conta de contexto confiável no servidor e valide a associação antes do acesso. Propague o mesmo limite para consultas, alterações, cache, arquivos e tarefas assíncronas. Registre o motivo das exceções administrativas legítimas.

Monte uma matriz de papéis, recursos e operações com usuários sintéticos. Verifique em testes de autorização do próprio projeto a permissão esperada, uma permissão ausente e o acesso após mudança de papel. Entregue os pontos de aplicação, os resultados e os limites da revisão. Mantenha segredos fora dos registros.
