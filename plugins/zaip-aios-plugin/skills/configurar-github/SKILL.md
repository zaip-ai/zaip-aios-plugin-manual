---
name: configurar-github
description: "Conecte uma pasta a um repositório GitHub para trabalhar com Git. Use no primeiro setup, na clonagem ou na conferência do vínculo entre pasta, identidade SSH, origin e branch principal."
---

# Configurar o GitHub do projeto

Para um pedido como “conecte esta pasta ao repositório da empresa”, use o proprietário e o nome informados pela pessoa ou comprovados pelo remoto existente. Em caso de nomes iguais entre contas, peça apenas o endereço que falta. Para “confira a configuração”, faça a inspeção em leitura.

## Reconhecer a pasta e a identidade

1. Confira a raiz com `git rev-parse --show-toplevel` e a situação com `git status --short --branch`. Um diretório de trabalho pode ter um **arquivo** `.git`. Se a raiz encontrada for de um projeto pai e a pasta indicada for independente, preserve o pai e opere apenas na pasta indicada.
2. No repositório da própria pasta, consulte `git config --show-origin --get user.name`, `git config --show-origin --get user.email` e `git config --show-origin --get core.sshCommand`. O Git já aplica as condições `includeIf` pertinentes. A autoria do commit e a conta autenticada no GitHub são verificações distintas.
3. Se houver `origin`, leia as URLs efetivas com `git remote get-url --all origin` e `git remote get-url --push --all origin`. Identifique o proprietário, repositório, host e eventual alias SSH nos dois sentidos. Mostre URLs sanitizadas, sem credenciais. Preserve o alias e a chave resolvidos pela pasta. Um projeto com HTTPS ou um remoto de outro nome mantém seu vínculo adotado. Se o destino divergir do pedido ou houver mais de um destino de push, esclareça o destino antes de alterá-lo.

## Preparar o vínculo

- **Projeto já vinculado.** Reutilize o remoto que aponta para o destino confirmado. Se já está correto, basta verificá-lo. Se faltar o remoto desse destino e a pessoa pediu o vínculo, use `origin` como nome padrão e prefira a URL SSH do repositório com a identidade configurada para a pasta. Um exemplo é `git remote add origin git@github.com:organizacao/projeto.git`. Substitua o host pelo alias já adotado quando aplicável.
- **Repositório remoto com histórico.** Clone a URL confirmada na pasta vazia destinada ao projeto. Se já houver arquivos locais a preservar, use uma cópia de trabalho separada sob o mesmo escopo de identidade e integre apenas os arquivos pertinentes. Confira a identidade efetiva dentro da nova cópia. Respeite branch principal e histórico existentes.
- **Primeira publicação em remoto vazio.** Se a pasta ainda não for um repositório, inicialize-a com `git init -b main`. Confira novamente os valores efetivos da identidade dentro dela e configure `origin`. Uma falha de autenticação ou um repositório inacessível exige resolver o acesso. Somente uma consulta bem-sucedida sem referências confirma um remoto vazio.

Confira o acesso de leitura com `git ls-remote --symref origin HEAD` e `git ls-remote origin`. Use o nome real do remoto se houver uma convenção diferente. Preserve as configurações pessoais, chaves e regras globais. Quando a identidade estiver ausente ou ambígua, identifique o dado necessário para completar esse projeto.

Entregue a raiz conferida, o destino, o transporte e a branch prevista. Para um pedido que também inclui publicação, siga diretamente para o commit e o push da entrega com a skill `deploy-github`.
