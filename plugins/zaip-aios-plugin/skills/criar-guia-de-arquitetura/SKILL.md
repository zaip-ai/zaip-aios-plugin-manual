---
name: criar-guia-de-arquitetura
description: "Crie guia de arquitetura a partir de briefing e fontes locais quando a pessoa pedir uma primeira versão. Reaproveite a versão vigente se ela já existir."
---

# Criar guia de arquitetura

Para um documento empresarial ou ficha de memória, confira o [par Markdown e Word](./references/PARES.md) antes de usar a fonte. Ao salvar uma edição em qualquer lado, reconcilie o companheiro na mesma tarefa.

Consulte `docs/zaip/memoria.md` e, conforme o assunto, `.agents/architecture/memoria.md`. Salve novos materiais na pasta da área responsável em `.agents/<área>/`. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Ao salvar um material empresarial reutilizável, confira o original e atualize sua entrada em **Materiais vigentes** na ficha da área responsável, mesmo sem nova decisão. Inclua nome e escopo, caminho do original ou do par, estado e uso permitido com fonte. Crie a ficha apenas quando houver conteúdo. Registre fatos e decisões com a evidência pertinente. Em consulta, apenas leia.

Ao gravar uma primeira versão, use criação exclusiva quando a ferramenta permitir. Se alguém criou o destino durante o trabalho, preserve-o e compare as versões. Para material existente, aplique só a diferença pedida. Se já atende ao pedido e não há mudança identificável, reutilize-o sem regravar. Se o cliente não conseguir acionar a entrada parceira, aplique a mesma decisão no chat atual.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

## Escolher o modo uma única vez

Identifique o objeto pedido por finalidade, projeto, empresa e, quando pertinente, período ou versão. Inspecione primeiro o caminho indicado, a memória da empresa e as fontes locais adotadas. O mesmo material pode ter outro nome. Preencha um modelo de trabalho da empresa no destino acordado. Preserve os guias de método distribuídos com o plugin. Compare com a referência empacotada e preserve qualquer decisão já registrada pela equipe. Na dúvida entre versões, organizações ou fontes inacessíveis, peça apenas a identificação necessária. Uma entrada ilegível não comprova ausência.

Resolva o modo no mesmo chat. Preserve o pedido original, o destino, a evidência da verificação e as restrições. Use a skill correspondente ao estado encontrado. A skill que recebe essa decisão vai diretamente ao trabalho, sem devolver o pedido. Antes de gravar, releia o destino. Se o estado mudou enquanto trabalhava, preserve o conteúdo novo e reconcilie a mudança antes de prosseguir. Uma solicitação apenas de orientação continua em leitura.

Ao encontrar material existente para o mesmo objeto, aplique `atualizar-guia-de-arquitetura` a esse material. Com ausência confirmada, siga a criação abaixo. Procure `.agents/architecture/software-architecture.md` ou a fonte principal já adotada pela equipe. Um guia de método distribuído com o plugin não é um entregável da empresa. Um pedido explícito de variante independente define outro objeto e preserva o original.

## Criar a primeira versão

Organize os insumos necessários. Considere jornada crítica, limites de módulo, contratos e escolhas técnicas. Escreva um primeiro documento utilizável com as decisões conhecidas e suas fontes. Separe o método pré-configurado das escolhas da empresa. Inclua um exemplo aplicado ao pedido quando os fatos permitirem.

Entregue o material no idioma e formato pedidos, identifique a fonte e diga o que foi criado, atualizado ou reutilizado.

Registre Clean Architecture, CQRS, direção apps → modules → packages, propriedade de armazenamento e raiz de composição. Aplique os critérios de verificação ao escopo e preserve as decisões locais.
