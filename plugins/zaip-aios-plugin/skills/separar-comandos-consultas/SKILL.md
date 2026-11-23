---
name: separar-comandos-consultas
description: "Aplique o contrato CQRS do ZAIP entre comandos e consultas e defina a consistência esperada."
---

# Separar comandos e consultas com CQRS

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/architecture/`, `.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Selecione o fluxo real que recebe um comando ou uma consulta. Nomeie o comando, a regra que ele protege, a decisão de persistência e a consulta que o consumidor precisa fazer. Se uma separação lógica no mesmo processo resolve, documente-a antes de introduzir filas ou bancos distintos.

Para projeções assíncronas, defina identificador e ordem de eventos por entidade, repetição, reconstrução e leitura logo após escrever. Teste projeção atrasada, evento duplicado e versão que chega fora de ordem. Entregue o contrato entre escrita e leitura e como identificar atraso aceitável ou perda.

No perfil ZAIP, a fronteira lógica é invariante, inclusive com armazenamento compartilhado. Consultas não modificam dados, não publicam eventos e não importam portas de escrita. Separe infraestrutura física somente quando o caso justificar.
