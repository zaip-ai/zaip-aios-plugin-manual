---
name: atualizar-dependencias
description: "Planeje e faça atualização compatível de bibliotecas avaliando consumidores, arquivo de lock, alterações de API e caminho de reversão."
---

# Atualizar dependências de um projeto

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Confirme a versão usada em execução e a declarada. Identifique quem chama a API alterada e quais mudanças de comportamento atingem o projeto. Diferencie dependência direta e transitiva. Use o gerenciador e o arquivo de lock já adotados na aplicação. Com acesso somente aos arquivos, produza o plano e explicite versões que ainda precisam ser verificadas.

Isole a atualização das mudanças de funcionalidade. Execute compilação e um caso no caminho afetado quando disponíveis, além de conferir mudanças transitivas. Entregue versões anterior e final, incompatibilidades resolvidas, testes e passos para recuperar a combinação anterior sem perder alterações da pessoa.
