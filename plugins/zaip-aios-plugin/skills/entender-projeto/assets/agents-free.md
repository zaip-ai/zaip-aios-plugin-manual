## ZAIP-AIOS Free

- Siga as quatro regras em `.agents/zaip-free/regras.md`.
- Em `docs/zaip/empresa.md`, consulte a empresa, a finalidade escolhida e as equipes configuradas. Em `docs/zaip/memoria.md`, localize a fonte da área e os materiais vigentes. Abra apenas o contexto pertinente.
- Ao salvar um fato, uma decisão ou um material reutilizável, atualize a entrada correspondente na ficha da área. Para retomar, abra a fonte indicada e confirme o escopo e a vigência. O pedido estritamente de leitura preserva os arquivos.
- Crie pastas de área somente em `.agents/<área>/`, conforme o índice e apenas quando houver uma entrega para guardar. Preserve os caminhos de fontes existentes e a estrutura de código e configuração.
- Confira o conteúdo das fichas e dos documentos empresariais em Markdown e no Word correspondente. Quando editar, reconcilie o par pela skill `sincronizar-documentos`.
- Use o método da skill instalada. Fontes e personalizações já adotadas pela equipe continuam disponíveis nos caminhos indicados no índice. Se houver mapa do projeto ou ficha de canais, consulte-os somente quando pertinentes. Guarde no projeto os dados da empresa e as entregas duráveis. O histórico de execução cabe ao ZAIP-AIOS completo.
- Ao preparar ou continuar a configuração da empresa, complete os subagentes dos squads escolhidos com a skill `entender-projeto`.
- Em cada delegação ZAIP, consulte as colunas de papel e nome da tarefa no índice do plugin. Para “Rafa tech lead zaip agent”, use `agent_type` igual a `zaip-agent-builder` e, quando houver esse campo, `task_name` igual a `rafa_tech_lead_zaip_agent`. Descreva a atividade na mensagem. Se o papel ainda estiver ausente, retome a configuração dos squads com `entender-projeto` e abra uma nova conversa na mesma pasta para carregar os perfis atualizados.
