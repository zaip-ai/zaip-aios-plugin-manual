---
name: modelar-dados
description: "Transforme regras de negócio em um modelo de dados com chaves, relacionamentos, restrições e consultas representativas."
---

# Modelar entidades e relações

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`, `.agents/architecture/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Declare o que cada linha representa, quem é dono do registro e por quanto tempo sua identidade precisa persistir. Diferencie estado atual de evento histórico. Derive cardinalidade, obrigatoriedade e unicidade a partir de exemplos reais do domínio. Verifique o significado de ausência, exclusão e reativação.

Entregue o modelo com chaves e índices justificados pelas consultas. Percorra um exemplo de criação, alteração, duplicidade e consulta entre contas. Quando já existe esquema, indique o impacto sobre dados antigos e consumidores. Uma entidade proposta deve responder a uma regra ou consulta necessária.
