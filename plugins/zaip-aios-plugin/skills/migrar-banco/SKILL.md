---
name: migrar-banco
description: "Escreva e valide migrações de esquema ou dados com compatibilidade de versões, verificações de integridade e estratégia de recuperação."
---

# Preparar uma migração de banco de dados

Entregue planos e respostas pontuais na conversa por padrão. Salve um arquivo Markdown somente quando o usuário pedir, quando necessário para reutilização em outras tarefas ou quando a tarefa exigir alterar um arquivo existente; não crie arquivos de memória ou índice apenas para uma resposta pontual. Para planos, não crie Word por padrão: só produza se solicitado ou se for necessário ao entregável para leitura ou edição pela equipe. Brandbooks, manuais e relatórios podem justificar Word. Respeite os formatos pedidos; se alterar um par vigente, reconcilie seus formatos conforme o [procedimento de pares](./references/PARES.md).

Consulte as fontes existentes nas áreas pertinentes (`.agents/development/`). Quando for necessário salvar material, use a pasta da área responsável em `.agents/<área>/`, salvo destino solicitado ou convenção existente. Preserve fontes existentes e siga a estrutura do projeto para código e configuração. Registre apenas informação importante e duradoura, necessária a outras tarefas ou expressamente solicitada. Prefira atualizar a fonte existente na área responsável; não crie ficha, índice ou catálogo só porque uma entrega foi salva. Se indispensável um registro novo, use a pasta da área e inclua somente contexto, fonte e vigência necessários. Atualize a informação vigente sem duplicar históricos; preserve registros existentes e decisões humanas. Em consulta, apenas leia.

Aplique o método desta edição em [Stack e convenções de desenvolvimento](./references/zaip/desenvolvimento.md). Consulte as decisões e fontes vigentes da equipe para este projeto.

Leia a última migração aplicada segundo a evidência disponível e os consumidores do esquema. Para mudança incompatível, separe expansão, preenchimento, troca de leitura e remoção posterior. Estime bloqueios e tamanho usando dados fornecidos. Defina como retomar um preenchimento interrompido sem processar linhas duas vezes.

Teste em uma base descartável representativa com linhas antigas, nulos e duplicatas. Compare contagens e invariantes antes e depois e confira a execução com versões de aplicação que coexistirão. Entregue a migração, a verificação e o plano de recuperação. Uma execução local só comprova o estado dessa base.
