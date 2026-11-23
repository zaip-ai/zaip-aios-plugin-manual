---
name: atualizar-brandbook
description: "Revise um Brandbook existente e sincronize Markdown e Word preservando decisões, evidências, versões e identidade. Recupere o formato ausente quando houver base."
---

# Atualizar brandbook

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/branding/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Ao gravar uma primeira versão, use criação exclusiva quando a ferramenta permitir. Se alguém criou o destino durante o trabalho, preserve-o e compare as versões. Para material existente, aplique só a diferença pedida. Se já atende ao pedido e não há mudança identificável, reutilize-o sem regravar. Se o cliente não conseguir acionar a entrada parceira, aplique a mesma decisão no chat atual.

Aplique o método desta edição em [Brandbook e processo de marca](./references/zaip/branding.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

## Escolher o modo uma única vez

Identifique o objeto pedido por finalidade, projeto, empresa e, quando pertinente, período ou versão. Inspecione primeiro o caminho indicado, a memória da empresa e as fontes locais adotadas. O mesmo material pode ter outro nome. Use um modelo de trabalho da empresa quando útil; só grave no destino acordado quando a entrega exigir arquivo. Preserve os guias de método distribuídos com o plugin. Compare com a referência empacotada e preserve qualquer decisão já registrada pela equipe. Na dúvida entre versões, organizações ou fontes inacessíveis, peça apenas a identificação necessária. Uma entrada ilegível não comprova ausência.

Resolva o modo no mesmo chat. Preserve o pedido original, o destino, a evidência da verificação e as restrições. Use a skill correspondente ao estado encontrado. A skill que recebe essa decisão vai diretamente ao trabalho, sem devolver o pedido. Antes de gravar, releia o destino. Se o estado mudou enquanto trabalhava, preserve o conteúdo novo e reconcilie a mudança antes de prosseguir. Uma solicitação apenas de orientação continua em leitura.

Com ausência confirmada, aplique `criar-brandbook` para criar o material com o contexto já coletado. Havendo material existente, siga a atualização abaixo. Procure `.agents/branding/brandbook.md` ou a fonte principal já adotada pela equipe. Um guia de método distribuído com o plugin não é um entregável da empresa. Um pedido explícito de variante independente define outro objeto e preserva o original.

## Brandbook interno consolidado

Comece pelas fontes e pelo briefing já disponíveis. Aplique as perguntas de descoberta do [método de Branding](./references/zaip/branding.md), até cinco por turno e até três turnos somente para lacunas materiais. Se a plataforma ainda estiver em construção, trabalhe em `.agents/branding/brand-platform.md` e identifique a lacuna que impede a consolidação. Com pedido explícito e base suficiente, siga direto à entrega. Ao revisar, confira os dois formatos existentes e preserve a plataforma e as escolhas vigentes fora do escopo.

Use o [modelo Word comentado](./assets/modelo-brandbook.docx) e a [fonte do modelo em Markdown](./assets/modelo-brandbook.md). Cada item descreve o conteúdo a desenvolver. Personalize a apresentação à identidade autorizada e ao modelo aprovado da empresa. Consolide os treze domínios e seus instrumentos, incluindo arquétipos e escala semântica, com fontes e classificação. A edição oficial começa em v1.0. Entregue `.agents/branding/brandbook.md` e `.agents/branding/brandbook.docx` equivalentes, ou o par de mesmo nome-base na fonte vigente indicada. Versão externa só usa conteúdo autorizado.

Abra o Word gerado e compare títulos, decisões, versão, instrumentos, anexos e limites de divulgação com o Markdown. Confira a apresentação de todas as páginas quando possível. Se for necessário registrar o par para outras tarefas, use a fonte existente da área após verificar as duas gravações; em caso de falha preserve o par vigente e explicite a pendência. Se apenas um formato existir, recupere o outro do conteúdo existente. Um pedido específico de um formato isolado pode ser entregue como extrato, com seu vínculo ao par mestre.
