---
name: preparar-cloudflare
description: "Desenhe ou revise Workers, Pages, rotas, DNS e políticas de acesso usando arquivos e topologia fornecidos pelo projeto."
---

# Preparar configuração Cloudflare

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/architecture/`, `.agents/operations/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Arquitetura de software](./references/zaip/arquitetura.md), [Operações e passagem de trabalho](./references/zaip/operacoes.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Localize a entrada da aplicação, comando de build, ambiente, bindings e domínio pretendidos. Confira quais recursos servem conteúdo público e quais exigem identidade. Para proteção de acesso, defina quem pode alcançar a origem e como validar decisões permitidas e negadas em uma configuração de teste. Não inclua valores de credenciais na entrega.

Com os arquivos locais, produza a alteração mínima ou um mapa de configuração por ambiente. Para integração com GitHub, confira origem do artefato e diferenças entre preview e produção. Indique que prova confirmaria resolução de DNS, roteamento correto e acesso no destino. Um plano ou build local não estabelece que o domínio já serve a nova versão.
