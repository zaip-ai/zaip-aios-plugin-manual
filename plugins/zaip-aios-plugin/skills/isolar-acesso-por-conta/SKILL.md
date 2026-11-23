---
name: isolar-acesso-por-conta
description: "Modele ou revise autenticação, autorização por recurso e separação de dados entre contas ou organizações da aplicação."
---

# Implementar autorização e isolamento por conta

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`, `.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Governança de processos](./references/zaip/governanca.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique o ator autenticado, a associação dele à conta e a ação permitida sobre o recurso. Derive a conta de contexto confiável no servidor e valide a associação antes do acesso. Propague o mesmo limite para consultas, alterações, cache, arquivos e tarefas assíncronas. Registre o motivo das exceções administrativas legítimas.

Monte uma matriz de papéis, recursos e operações com usuários sintéticos. Verifique em testes de autorização do próprio projeto a permissão esperada, uma permissão ausente e o acesso após mudança de papel. Entregue os pontos de aplicação, os resultados e os limites da revisão. Mantenha segredos fora dos registros.
