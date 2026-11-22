---
name: preparar-cloudflare
description: "Desenhe ou revise Workers, Pages, rotas, DNS e políticas de acesso usando arquivos e topologia fornecidos pelo projeto."
---

# Preparar configuração Cloudflare

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/architecture/memoria.md`, `.agents/operations/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Localize a entrada da aplicação, comando de build, ambiente, bindings e domínio pretendidos. Confira quais recursos servem conteúdo público e quais exigem identidade. Para proteção de acesso, defina quem pode alcançar a origem e como validar decisões permitidas e negadas em uma configuração de teste. Não inclua valores de credenciais na entrega.

Com os arquivos locais, produza a alteração mínima ou um mapa de configuração por ambiente. Para integração com GitHub, confira origem do artefato e diferenças entre preview e produção. Indique que prova confirmaria resolução de DNS, roteamento correto e acesso no destino. Um plano ou build local não estabelece que o domínio já serve a nova versão.
