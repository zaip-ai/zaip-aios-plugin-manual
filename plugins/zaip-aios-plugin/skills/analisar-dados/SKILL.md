---
name: analisar-dados
description: Analise um CSV, tabela ou conjunto de dados fornecido. Defina a unidade de cada linha, confira nulos e duplicatas e calcule indicadores com denominadores explícitos.
---

# Analisar dados fornecidos

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/data/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Análise de dados e indicadores](./references/zaip/dados.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Comece pela pergunta que os dados precisam responder. Identifique o recorte, o período, o que uma linha representa e a unidade de cada medida. Em CSV, confira o separador, as casas decimais e as datas antes de somar. Um identificador repetido pode representar eventos distintos da mesma pessoa. Verifique a chave esperada antes de tratar duas linhas como duplicatas.

Conte nulos nos campos usados e explique como afetam a população elegível. Mostre quantas linhas ou entidades entram no cálculo após cada exclusão relevante. Não converta ausência em zero por conveniência. Ao juntar tabelas, confira se a junção multiplicou linhas. Calcule a taxa do conjunto pelas contagens quando os grupos tiverem tamanhos diferentes.

Para cada taxa, informe o numerador, o denominador e a fórmula, com unidades. Por exemplo, conversão por pessoa equivale a `100 × pessoas elegíveis que converteram / pessoas elegíveis`. Se o denominador for zero, o resultado é indefinido. Para comparar taxas já expressas em porcentagem, a diferença em pontos percentuais é `taxa final − taxa inicial`. A variação relativa é `100 × (taxa final − taxa inicial) / taxa inicial` e depende de uma base diferente de zero.

Responda no idioma e formato pedidos com o resultado, o cálculo e qualquer limitação que mude a interpretação. Use o mínimo de colunas necessário, apresente agregados quando bastarem e evite expor identificadores pessoais. Trabalhe com o material fornecido. Se ele não permitir calcular a métrica, identifique o dado ausente sem preencher lacunas com valores inventados.
