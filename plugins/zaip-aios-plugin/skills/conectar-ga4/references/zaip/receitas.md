# Guia prático de conexão e execução

## Primeira conexão

1. Escreva o resultado pretendido em uma frase com conta e efeito, por exemplo “ler comentários do post da nossa empresa”. Em Codex ou Dot, inspecione a lista de apps, plugins ou ferramentas que a sessão efetivamente expõe. Faça correspondência pela operação concreta. Um conector genérico de anúncios não é uma caixa de mensagens.
2. Use o conector existente da conta certa quando ele cobrir o pedido. Se faltar, confirme a procedência no diretório do cliente ou na documentação do fornecedor. Abra seu fluxo nativo de conexão e permita que o usuário conclua login e escolha de conta. Em configuração por API ou MCP, use o método de autenticação previsto e mantenha os valores em um mecanismo seguro.
3. Faça uma leitura limitada e compare o identificador do ativo com o esperado. Para escrita solicitada, identifique conta, destinatário ou objeto, conteúdo e efeito. Guarde ID de rascunho, de publicação, de resposta ou de atualização conforme o que aconteceu. Em caso de erro após envio, procure o efeito pelo ID estável antes de repetir.

## Receitas por serviço

| Serviço | Caminho inicial | Primeiro teste e resultado |
| --- | --- | --- |
| Gmail ou outro e-mail | Conector oficial disponível; alternativamente API do provedor. Separar pesquisa, rascunho, envio e aliases. | Consultar uma thread indicada. Para envio autorizado, confirmar endereço, conta remetente e ID da mensagem aceita. |
| CRM | Conector oficial disponível ou API da organização. Confirmar ambiente, pipeline e objetos da conta. | Buscar por chave autorizada e conferir dono e oportunidade aberta. Reenvio da mesma ocorrência deve reaproveitar o efeito. |
| Google Ads | MCP do Google quando compatível ou Google Ads API. Distinguir conta gerenciadora e cliente. | Consultar uma campanha por período com métricas, fuso e moeda. Descobrir os recursos de escrita efetivamente oferecidos pela versão e modo. |
| Meta Ads | Inspecionar a oferta de MCP da Meta para anúncios ou usar Marketing API com autorização apropriada. O catálogo ZAIP consultado usa o endpoint `https://mcp.facebook.com/ads`. Confirmar procedência e suporte atual antes de configurar. | Listar a conta de anúncios e uma campanha conhecida. Página, Instagram profissional e inbox são ativos distintos. |
| Google Analytics | Conector da sessão ou Google Analytics Data API para a propriedade. | Consultar uma dimensão e uma métrica compatíveis num período fechado. Comparar propriedade, fuso e unidade com o relatório. |
| Publicação Instagram | Conector com escrita de mídia ou API da conta profissional elegível. | Conferir a mídia, o contêiner e seu processamento quando aplicáveis. Só o ID da publicação final ou do agendamento confirma a operação correspondente. |
| Comentários e Direct do Instagram | Procurar ferramentas explícitas para comentários e mensagens do ativo profissional. Na API, respeitar o fluxo de login e as capacidades concedidas. | Ler um comentário ou conversa autorizada. Não pressupor que um conector de publicação também possui acesso à caixa. |
| Messenger | Conector/API de mensagens associado à Página, com identidade e condições de resposta vigentes. | Consultar a thread da Página e conferir a mensagem mais recente antes de produzir ou enviar a resposta. |
| YouTube | Conector ou YouTube Data API. Para listagem de threads, identificar vídeo e token da próxima página. | Consultar respostas do comentário pai se a thread incluir apenas uma amostra. Registrar a última página concluída e distinguir desativado, indisponível e vazio. |
| Outro serviço | Descobrir pelo catálogo atual da sessão, pelo publicador e pelo contrato oficial da operação. | Registrar conta, operação, resultado e lacuna no mesmo inventário. |

## Dot e Codex

O acesso do Dot aos arquivos e às skills locais depende do computador conectado a ele. Uma sessão de navegador do Dot pode ter login diferente do navegador pessoal. Em Codex, a visibilidade também depende do projeto e dos apps ligados à sessão. Descubra recursos em cada ambiente e peça apenas a interação de login necessária. Uma exportação ou documento anexado permite análise pontual quando o recurso local estiver indisponível.

## Recuperação e automação

Para uma rotina recorrente, declare fuso, janela, periodicidade, IDs de origem, limite de tentativas e destino. Se uma única conexão falhar, conclua os demais canais e marque o intervalo pendente. Distinga consulta avulsa, tarefa agendada e execução comprovada. No primeiro disparo acompanhado, confira o recibo e o avanço do cursor. Não grave tokens, cookies, mensagens privadas ou chaves de API em arquivos de memória.
