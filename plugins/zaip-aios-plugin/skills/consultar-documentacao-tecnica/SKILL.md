---
name: consultar-documentacao-tecnica
description: "Responda a uma dúvida de implementação com a especificação, manual ou documentação oficial compatível com a versão usada, inclusive para APIs da OpenAI."
---

# Consultar documentação técnica

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Formule a pergunta em termos de operação, versão do SDK, runtime e resultado esperado. Localize primeiro o manifesto, as definições instaladas e o trecho do manual fornecido. Se precisar de informação atual e houver acesso, consulte a documentação primária do produto, transmitindo apenas termos públicos da pesquisa.

Compare a assinatura e o comportamento do exemplo com o código do projeto. Quando houver divergência, identifique as versões de cada lado e a menor verificação local que as distingue. Entregue o trecho aplicável, a referência e quais afirmações foram verificadas na prática. Evite atribuir à conta uma capacidade que só aparece no manual.
