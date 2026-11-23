---
name: executar-qa-entrega
description: "Exerça QA funcional e de regressão pelo caminho de uso alterado e registre resultados com evidência."
---

# Executar testes de qualidade da entrega

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Definição de produto](./references/zaip/produto.md), [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Derive casos diretamente dos critérios e identifique ambiente, versão e entradas sintéticas. Inclua sucesso, falha provável, recuperação e regressão nos consumidores relevantes. Defina o que é esperado antes de executar e isole efeitos externos quando cabível.

Entregue uma matriz de caso, esperado, observado, status e evidência. Para defeitos, descreva passos mínimos e impacto. Diferencie bloqueado, não exercitado e aprovado naquele cenário. Uma revisão pelo mesmo chat não atesta independência de QA.
