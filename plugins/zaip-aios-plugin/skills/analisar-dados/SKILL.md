---
name: analisar-dados
description: Analise um CSV, tabela ou conjunto de dados fornecido. Defina a unidade de cada linha, confira nulos e duplicatas e calcule indicadores com denominadores explícitos.
---

# Analisar dados fornecidos

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/data/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Análise de dados e indicadores](./references/zaip/dados.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Comece pela pergunta que os dados precisam responder. Identifique o recorte, o período, o que uma linha representa e a unidade de cada medida. Em CSV, confira o separador, as casas decimais e as datas antes de somar. Um identificador repetido pode representar eventos distintos da mesma pessoa. Verifique a chave esperada antes de tratar duas linhas como duplicatas.

Conte nulos nos campos usados e explique como afetam a população elegível. Mostre quantas linhas ou entidades entram no cálculo após cada exclusão relevante. Não converta ausência em zero por conveniência. Ao juntar tabelas, confira se a junção multiplicou linhas. Calcule a taxa do conjunto pelas contagens quando os grupos tiverem tamanhos diferentes.

Para cada taxa, informe o numerador, o denominador e a fórmula, com unidades. Por exemplo, conversão por pessoa equivale a `100 × pessoas elegíveis que converteram / pessoas elegíveis`. Se o denominador for zero, o resultado é indefinido. Para comparar taxas já expressas em porcentagem, a diferença em pontos percentuais é `taxa final − taxa inicial`. A variação relativa é `100 × (taxa final − taxa inicial) / taxa inicial` e depende de uma base diferente de zero.

Responda no idioma e formato pedidos com o resultado, o cálculo e qualquer limitação que mude a interpretação. Use o mínimo de colunas necessário, apresente agregados quando bastarem e evite expor identificadores pessoais. Trabalhe com o material fornecido. Se ele não permitir calcular a métrica, identifique o dado ausente sem preencher lacunas com valores inventados.
