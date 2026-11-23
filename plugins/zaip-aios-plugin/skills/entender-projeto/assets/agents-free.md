## ZAIP-AIOS Free

- Siga as quatro regras em `.agents/zaip-free/regras.md`.
- Consulte apenas as fontes existentes pertinentes à área e à tarefa. Arquivos genéricos antigos são opcionais e devem ser preservados.
- Registre somente informação importante e duradoura, necessária a outras tarefas ou solicitada. Atualize a fonte existente na área responsável; crie arquivo específico só se necessário. Não crie ficha ou catálogo para cada entrega. Em leitura, preserve os arquivos.
- Crie pastas de área somente em `.agents/<área>/`, conforme o índice e apenas quando houver uma entrega para guardar. Preserve os caminhos de fontes existentes e a estrutura de código e configuração.
- Entregue respostas e planos pontuais na conversa. Salve Markdown quando solicitado, necessário para reutilização em outras tarefas ou para alterar um arquivo existente. Não crie Word para planos por padrão; use-o quando solicitado ou necessário ao entregável. Para pares existentes ou necessários, confira e reconcilie os formatos pela skill `sincronizar-documentos`.
- Use o método da skill instalada. Fontes e personalizações já adotadas pela equipe continuam disponíveis nos caminhos existentes. Se houver mapa do projeto ou ficha de canais, consulte-os somente quando pertinentes. Guarde no projeto os dados da empresa e as entregas duráveis. O histórico de execução cabe ao ZAIP-AIOS completo.
- Ao preparar ou continuar a configuração da empresa, complete os subagentes dos squads escolhidos com a skill `entender-projeto`.
- Em cada delegação ZAIP, consulte as colunas de papel e nome da tarefa no índice do plugin. Para “Rafa tech lead zaip agent”, use `agent_type` igual a `zaip-agent-builder` e, quando houver esse campo, `task_name` igual a `rafa_tech_lead_zaip_agent`. Descreva a atividade na mensagem. Se o papel ainda estiver ausente, retome a configuração dos squads com `entender-projeto` e abra uma nova conversa na mesma pasta para carregar os perfis atualizados.
