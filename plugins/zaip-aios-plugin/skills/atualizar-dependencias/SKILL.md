---
name: atualizar-dependencias
description: "Planeje e faça atualização compatível de bibliotecas avaliando consumidores, arquivo de lock, alterações de API e caminho de reversão."
---

# Atualizar dependências de um projeto

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Confirme a versão usada em execução e a declarada. Identifique quem chama a API alterada e quais mudanças de comportamento atingem o projeto. Diferencie dependência direta e transitiva. Use o gerenciador e o arquivo de lock já adotados na aplicação. Com acesso somente aos arquivos, produza o plano e explicite versões que ainda precisam ser verificadas.

Isole a atualização das mudanças de funcionalidade. Execute compilação e um caso no caminho afetado quando disponíveis, além de conferir mudanças transitivas. Entregue versões anterior e final, incompatibilidades resolvidas, testes e passos para recuperar a combinação anterior sem perder alterações da pessoa.
