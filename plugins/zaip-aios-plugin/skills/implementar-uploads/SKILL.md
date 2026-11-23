---
name: implementar-uploads
description: "Desenhe ou implemente upload, download e descarte de arquivos com limites, autorização por objeto e consistência dos metadados."
---

# Implementar uploads e acesso a arquivos

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`, `.agents/operations/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Governança de processos](./references/zaip/governanca.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Defina tipos e tamanhos aceitos, dono do objeto, visibilidade e prazo de retenção conforme o produto. Valide no servidor. Escolha uma chave de armazenamento independente do nome enviado pela pessoa e mantenha metadados vinculados à conta. Se usar links temporários, delimite operação, objeto e duração.

Exercite arquivo válido, rejeitado por limite, envio interrompido e leitura por um ator sem permissão usando arquivos fictícios. Trate o intervalo entre armazenar o conteúdo e salvar o registro. Identifique objetos órfãos e trate a limpeza dentro do escopo antes de remover qualquer dado. Relate o que persistiu após cada cenário.
