---
name: preparar-container
description: "Crie ou revise a definição de contêiner de uma aplicação, incluindo build, usuário, persistência e verificação de prontidão."
---

# Preparar a execução em contêiner

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/development/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Identifique entrada, runtime e arquivos necessários em execução. Separe dependências de build e runtime. Evite copiar configuração privada para camadas da imagem. Defina diretório e permissões que permitam iniciar sem privilégios desnecessários, e identifique quais dados precisam sobreviver à troca do contêiner.

Quando o ambiente permitir, construa a imagem e exercite inicialização, prontidão, encerramento e reinício com volume de teste. Verifique que uma imagem construída consegue de fato atender sua função principal. Quando só puder inspecionar, entregue a alteração e a verificação proposta sem declarar o serviço disponível.
