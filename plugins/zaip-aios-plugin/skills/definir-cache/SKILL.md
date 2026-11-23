---
name: definir-cache
description: "Projete chaves, validade e invalidação de cache a partir do custo de leitura, atualização dos dados e isolamento entre usuários."
---

# Definir uma estratégia de cache

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/architecture/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique a fonte de verdade, os consumidores e a idade máxima aceitável. Defina chave com todos os elementos que mudam a resposta, incluindo conta, versão e filtros pertinentes. Escolha expiração e invalidação associadas a uma operação concreta de escrita. Evite guardar conteúdo privado em cache compartilhado sem isolamento.

Exercite leitura fria, leitura repetida, atualização e cache indisponível. Verifique o custo de reconstruir um item concorrido quando expira. Compare taxa de acerto, latência e frescor com a linha de base. Entregue a política e as condições em que retornar dado antigo é aceitável.
