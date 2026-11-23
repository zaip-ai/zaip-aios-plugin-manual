---
name: implementar-uploads
description: "Desenhe ou implemente upload, download e descarte de arquivos com limites, autorização por objeto e consistência dos metadados."
---

# Implementar uploads e acesso a arquivos

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`, `.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Governança de processos](./references/zaip/governanca.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Defina tipos e tamanhos aceitos, dono do objeto, visibilidade e prazo de retenção conforme o produto. Valide no servidor. Escolha uma chave de armazenamento independente do nome enviado pela pessoa e mantenha metadados vinculados à conta. Se usar links temporários, delimite operação, objeto e duração.

Exercite arquivo válido, rejeitado por limite, envio interrompido e leitura por um ator sem permissão usando arquivos fictícios. Trate o intervalo entre armazenar o conteúdo e salvar o registro. Identifique objetos órfãos e trate a limpeza dentro do escopo antes de remover qualquer dado. Relate o que persistiu após cada cenário.
