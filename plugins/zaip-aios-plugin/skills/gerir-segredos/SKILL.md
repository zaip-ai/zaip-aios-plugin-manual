---
name: gerir-segredos
description: "Faça um inventário por nome e escopo de segredos, variáveis e identidades de máquina, inclusive em projetos que usam Infisical."
---

# Organizar segredos e configuração de ambiente

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/operations/memoria.md`. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Governança de processos](./references/zaip/governanca.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Mapeie cada nome a produtor, consumidor, ambiente e operação necessária. Diferencie variável pública de build, segredo de servidor e credencial pessoal. Trabalhe com configuração de exemplo e metadados. Evite ler ou registrar conteúdos de cofres e arquivos privados para produzir o inventário.

Para Infisical ou outro cofre, defina identidade, caminho, permissões de leitura ou escrita, rotação e comportamento quando um valor falta. Planeje a transição com versões sobrepostas ou troca coordenada conforme o consumidor. Teste o contrato com valores fictícios e confirme que logs e exemplos não exibem o valor. Relate separadamente configuração local e integração atestada pelo destino.
