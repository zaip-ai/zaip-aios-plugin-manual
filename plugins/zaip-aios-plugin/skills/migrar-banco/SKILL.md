---
name: migrar-banco
description: "Escreva e valide migrações de esquema ou dados com compatibilidade de versões, verificações de integridade e estratégia de recuperação."
---

# Preparar uma migração de banco de dados

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Leia a última migração aplicada segundo a evidência disponível e os consumidores do esquema. Para mudança incompatível, separe expansão, preenchimento, troca de leitura e remoção posterior. Estime bloqueios e tamanho usando dados fornecidos. Defina como retomar um preenchimento interrompido sem processar linhas duas vezes.

Teste em uma base descartável representativa com linhas antigas, nulos e duplicatas. Compare contagens e invariantes antes e depois e confira a execução com versões de aplicação que coexistirão. Entregue a migração, a verificação e o plano de recuperação. Uma execução local só comprova o estado dessa base.
