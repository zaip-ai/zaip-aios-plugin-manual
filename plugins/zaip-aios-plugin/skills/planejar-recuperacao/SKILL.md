---
name: planejar-recuperacao
description: "Crie ou revise um plano de recuperação de aplicação, banco e arquivos com objetivo de perda de dados e prazo de retorno."
---

# Planejar backup e recuperação

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`, `.agents/architecture/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Operações e passagem de trabalho](./references/zaip/operacoes.md), [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique o serviço crítico, dependências e quem pode restaurar. Registre a perda de dados aceitável e o tempo de retorno se a equipe os tiver definido. Relacione cada componente à sua cópia, versão, credencial de recuperação e ordem de restauração, sem registrar segredos. A existência de arquivo de backup só comprova que ele existe.

Descreva uma restauração em destino isolado e os critérios que atestam integridade e funcionalidade. Verifique uma jornada de negócio além da contagem de arquivos. Inclua o ponto de decisão antes de trocar tráfego ou promover a cópia. Entregue último teste conhecido, resultado e lacunas que impedem afirmar recuperação.
