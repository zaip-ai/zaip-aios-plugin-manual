---
name: criar-plugin
description: "Crie ou revise o pacote de plugin do Codex com manifesto, escopo de execução e componentes adequados."
---

# Criar plugin portátil

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`, `.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Para uma base mínima, use o [manifesto portátil de exemplo](./assets/modelo-plugin.json) na raiz como `plugin.json` e o [exemplo de skill](./assets/modelo-skill.md) em `skills/preparar-briefing/SKILL.md`. Isso produz um exemplo local coerente. Para envio ao diretório, complete os campos e ícones do publicador real e confira as exigências da modalidade escolhida.

Siga o [padrão de autoria ZAIP](./references/padrao-autoria.md). Se houver Python, a [ferramenta de conferência local](./scripts/verificar_entrega.py) aceita o modo `plugin` seguido do caminho do material. Informe sempre o alcance do teste.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md), [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

## Escolher o modo uma única vez

Identifique o objeto pedido por finalidade, projeto, empresa e, quando pertinente, período ou versão. Inspecione primeiro o caminho indicado, a memória da empresa e as fontes locais adotadas. O mesmo material pode ter outro nome. Use um modelo de trabalho da empresa quando útil; só grave no destino acordado quando a entrega exigir arquivo. Preserve os guias de método distribuídos com o plugin. Compare com a referência empacotada e preserve qualquer decisão já registrada pela equipe. Na dúvida entre versões, organizações ou fontes inacessíveis, peça apenas a identificação necessária. Uma entrada ilegível não comprova ausência.

Resolva o modo no mesmo chat. Preserve o pedido original, o destino, a evidência da verificação e as restrições. Use a skill correspondente ao estado encontrado. A skill que recebe essa decisão vai diretamente ao trabalho, sem devolver o pedido. Antes de gravar, releia o destino. Se o estado mudou enquanto trabalhava, preserve o conteúdo novo e reconcilie a mudança antes de prosseguir. Uma solicitação apenas de orientação continua em leitura.

Se localizar o mesmo material, aplique `atualizar-plugin` no mesmo chat. Ao gravar, use criação exclusiva para um destino novo. Se o estado mudar, preserve a mudança concorrente. Uma nova variante pedida pode ter um destino próprio. Quando o material já atende ao pedido, reutilize-o sem regravar.

## Método e entrega

Escolha o formato do host, o nome estável, versão e componentes. Para um plugin portátil de skills, mantenha plugin.json na raiz, skills em pastas próprias e recursos necessários no pacote. Use extensões de apresentação do cliente quando pertinentes. Empacote somente arquivos distribuíveis. Confirme se o plugin realmente precisa de execução local ou de um MCP; mantenha credenciais e estado pessoal fora do ZIP.

Valide manifesto e caminhos, extraia o ZIP em uma pasta limpa, confirme descoberta em perfil isolado quando suportado e percorra pelo menos um pedido real e um limítrofe. Em atualização, preserve o ID do pacote, verifique compatibilidade das entradas e gere nova versão segundo a decisão do mantenedor. Não confunda pacote local, upload e publicação.
