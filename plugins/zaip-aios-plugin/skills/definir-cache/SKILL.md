---
name: definir-cache
description: "Projete chaves, validade e invalidação de cache a partir do custo de leitura, atualização dos dados e isolamento entre usuários."
---

# Definir uma estratégia de cache

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/architecture/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique a fonte de verdade, os consumidores e a idade máxima aceitável. Defina chave com todos os elementos que mudam a resposta, incluindo conta, versão e filtros pertinentes. Escolha expiração e invalidação associadas a uma operação concreta de escrita. Evite guardar conteúdo privado em cache compartilhado sem isolamento.

Exercite leitura fria, leitura repetida, atualização e cache indisponível. Verifique o custo de reconstruir um item concorrido quando expira. Compare taxa de acerto, latência e frescor com a linha de base. Entregue a política e as condições em que retornar dado antigo é aceitável.
