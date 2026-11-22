---
name: deploy-github
description: "Publique uma entrega no GitHub por commit e push. Use para subir arquivos, enviar commits já prontos ou fazer deploy para o repositório, com a identidade da pasta e conferência da branch remota."
---

# Publicar a entrega no GitHub

Em “faça deploy no GitHub”, conclua o commit e o push da entrega pedida. Use a identidade SSH da pasta quando configurada, o remoto `origin` e a branch `main` por padrão. Respeite o destino específico solicitado e as convenções existentes do projeto. Para uma solicitação apenas de revisão ou de instruções, trabalhe em leitura.

## Conferir a entrega

1. Dentro da raiz confirmada por `git rev-parse --show-toplevel`, leia `git status --short --branch` e `git branch --show-current`. Confira a autoria e o SSH efetivos com `git config --show-origin --get user.name`, `git config --show-origin --get user.email` e `git config --show-origin --get core.sshCommand`. Preserve as regras da pasta, inclusive `includeIf`, e o alias SSH adotado. Se faltar o vínculo, faça o setup com `configurar-github`.
2. Confira as URLs efetivas de leitura e escrita com `git remote get-url --all origin` e `git remote get-url --push --all origin`. O destino deve corresponder à organização e ao repositório da entrega. Se houver vários destinos de push, resolva qual está autorizado antes do envio. Mostre apenas URLs sem credenciais. Substitua o remoto e a branch nos comandos a seguir quando o projeto usar outros valores.
3. Atualize as referências com `git fetch origin`. Se `origin/main` existir, verifique o histórico de saída com `git log --oneline origin/main..HEAD` e a relação entre os dois lados com `git rev-list --left-right --count origin/main...HEAD`. Inclua apenas commits abrangidos pelo pedido. Em outra branch, HEAD destacado ou histórico divergente, integre a entrega sobre a base correta, preservando o trabalho local. Uma cópia de trabalho isolada permite fazê-lo quando a pasta está ocupada com outras mudanças.

## Fazer commit e push

1. Revise os arquivos rastreados, novos e já preparados no índice. A autorização de publicar a entrega inclui os arquivos novos que a compõem. Prepare caminhos específicos, por exemplo `git add -- README.md` quando o README fizer parte dela. Confira a lista com `git diff --cached --name-status`, leia o conteúdo preparado e execute `git diff --cached --check` e os testes pertinentes. Se houver mudanças já preparadas de outro trabalho ou trechos alheios no mesmo arquivo, separe a entrega preservando o índice da pessoa. Mantenha credenciais, arquivos pessoais e dados de clientes fora da publicação.
2. Havendo mudança preparada, execute `git commit -m "Resumo específico da entrega"` com uma mensagem adequada ao projeto. Confira o SHA com `git rev-parse HEAD`. Se os commits da entrega já estiverem prontos, reutilize-os. Se o destino já contiver a entrega e o conteúdo estiver igual, confirme a publicação existente.
3. Com a entrega na `main` local, execute `git push -u origin main` no primeiro envio e `git push origin main` nos seguintes. Se o servidor recusar porque alguém publicou antes, atualize as referências, reconcilie a entrega sobre a nova base, repita as verificações afetadas e envie pelo fluxo normal. Preserve o histórico remoto e as proteções da branch.
4. Se o projeto exigir pull request, envie a entrega para uma branch própria e abra ou reutilize o PR para `main` conforme o fluxo autorizado. Confira o SHA incorporado após o merge. Enquanto houver revisão ou verificação obrigatória, informe o link e o estado pendente.

Confira `git ls-remote origin refs/heads/main` depois do envio e compare com o SHA publicado. Se a ponta avançou logo em seguida, busque a branch e verifique se o commit está contido no novo histórico com `git merge-base --is-ancestor SHA_DA_ENTREGA FETCH_HEAD` após `git fetch origin refs/heads/main`. Informe repositório, branch, commit e resultado. Quando o pedido ou o processo documentado incluir uma GitHub Release, confira também tag, versão e arquivos anexados. A disponibilidade em hospedagem ou produção exige uma verificação própria do destino.
