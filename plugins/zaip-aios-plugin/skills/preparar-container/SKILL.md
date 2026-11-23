---
name: preparar-container
description: "Crie ou revise a definição de contêiner de uma aplicação, incluindo build, usuário, persistência e verificação de prontidão."
---

# Preparar a execução em contêiner

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique entrada, runtime e arquivos necessários em execução. Separe dependências de build e runtime. Evite copiar configuração privada para camadas da imagem. Defina diretório e permissões que permitam iniciar sem privilégios desnecessários, e identifique quais dados precisam sobreviver à troca do contêiner.

Quando o ambiente permitir, construa a imagem e exercite inicialização, prontidão, encerramento e reinício com volume de teste. Verifique que uma imagem construída consegue de fato atender sua função principal. Quando só puder inspecionar, entregue a alteração e a verificação proposta sem declarar o serviço disponível.
