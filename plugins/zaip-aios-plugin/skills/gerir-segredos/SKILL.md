---
name: gerir-segredos
description: "Faça um inventário por nome e escopo de segredos, variáveis e identidades de máquina, inclusive em projetos que usam Infisical."
---

# Organizar segredos e configuração de ambiente

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Governança de processos](./references/zaip/governanca.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Mapeie cada nome a produtor, consumidor, ambiente e operação necessária. Diferencie variável pública de build, segredo de servidor e credencial pessoal. Trabalhe com configuração de exemplo e metadados. Evite ler ou registrar conteúdos de cofres e arquivos privados para produzir o inventário.

Para Infisical ou outro cofre, defina identidade, caminho, permissões de leitura ou escrita, rotação e comportamento quando um valor falta. Planeje a transição com versões sobrepostas ou troca coordenada conforme o consumidor. Teste o contrato com valores fictícios e confirme que logs e exemplos não exibem o valor. Relate separadamente configuração local e integração atestada pelo destino.
