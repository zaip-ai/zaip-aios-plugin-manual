---
name: coordenar-trabalho
description: "Escolha a pasta de memória da empresa pelo assunto e coordene demandas de marca, design, marketing, vendas, growth, operações, desenvolvimento e dados no mesmo chat."
---

# Coordenar um pedido com as perspectivas do ZAIP

Ao salvar novos materiais, use a pasta da área responsável em `.agents/<área>/`, conforme o mapa abaixo. Crie a pasta quando houver uma entrega para guardar. Reutilize fontes existentes e siga a estrutura do projeto para código e configuração.

Comece pelo resultado solicitado e pelo [mapa de memória por assunto](./references/manual/MEMORIA.md). No projeto preparado, abra `docs/zaip/memoria.md`, a ficha da área quando ela já existir e o original apontado em “Materiais vigentes”. A memória geral fica em `docs/zaip/empresa.md`. O índice cobre branding, design, marketing, vendas, growth, operações, desenvolvimento, arquitetura e dados. Os 23 perfis e seis squads estão no [manual da edição](./references/manual/INDICE.md).

Para trabalhar no mesmo chat, siga as perguntas, a ordem e o entregável do guia da área desta versão. Ao salvar uma entrega reutilizável, registre o material na ficha da área mesmo que a estratégia continue igual. Confira o original, a vigência e as condições de uso. Guarde a decisão quando houver. Uma pergunta de leitura termina com a resposta e sua fonte. Se o projeto ainda não foi preparado, use as fontes existentes e o mapa incluído. Para configurar uma ou mais equipes ou retomar a escolha do próximo squad, aplique o roteiro de `entender-projeto` e use a seleção vigente da ficha da empresa.


Antes de usar um documento empresarial, confira o arquivo Word de mesmo nome-base. Mudanças feitas por uma pessoa no Word devem chegar ao Markdown e vice-versa. Ao salvar um documento de negócio pareado, reabra os dois formatos, compare seu conteúdo e só depois registre a base comum. Mantenha fotos, planilhas e outros originais no formato próprio. Em consulta estritamente de leitura, sinalize divergências e use a fonte cuja vigência estiver comprovada. Para reconciliar, aplique o [procedimento de pares](./references/manual/PARES.md).

## Escolher um percurso

Nos pedidos de ação por canal, comece por `configurar-central-omnichannel` se a conexão ainda for desconhecida. Use `triar-caixa-omnichannel` para atendimento, `operar-com-dot` para conferir o que o cliente pode executar e `organizar-dia-de-trabalho` para reunir agenda e pendências. Consulte [Comece aqui](./references/manual/COMECE-AQUI.md) para exemplos.

| Pedido | Perspectivas e passagem no mesmo chat | Saída para a pessoa |
| --- | --- | --- |
| Desenvolvimento | Rafa delimita o contrato. Use Will para API e persistência, Doug para interface, Jonny para site ou Leo para implementação geral. Aplique a perspectiva de Nanda ao verificar a entrega. | Código ou plano técnico conforme solicitado, com critério verificado. |
| Planejamento e decisão | Use Bia para definir o problema, Gabi para testar os dados e a perspectiva pertinente à decisão. Aplique `apoiar-decisao` se houver alternativas. | Brief, comparação ou recomendação com condições e próximos passos. |
| Marca e campanha | Consulte o squad Marca e marketing. Use Sarah para identificar a promessa comprovável e Lucia para adaptá-la ao canal. | Brandbook, briefing, copy ou peça alinhada à empresa. |
| Growth e vendas | Use Growth e RevOps para localizar o gargalo ou Vendas e governança para qualificação, CRM e passagem. | Experimento, recomendação de receita ou roteiro comercial. |
| Operações, documentos e relatórios | Clara delimita a entrega, Gabi confere cálculos se existirem e Lia revisa o texto para o leitor. | Procedimento, documento ou relatório no formato solicitado. |
| Imagem, foto ou design | Sarah orienta a marca. Use Manu para decisões visuais e a skill de imagem com o recurso disponível. | Imagem gerada ou editada. Indique se só foi possível entregar o briefing. |

Em marketing com Brandbook aprovado, Lúcia conduz e consulta a marca em leitura. Sarah entra para decisão de marca aberta, contraditória ou nova. Para consolidação de Brandbook, siga o par Markdown e Word do guia de Branding.

Quando a pessoa mencionar um squad específico, abra sua ficha no índice e aplique somente os papéis necessários à entrega. Para trabalhos de várias áreas, leve adiante a conclusão, o artefato e a decisão pendente de cada passagem. Para uma pergunta simples, a perspectiva de um especialista basta. Execute as etapas úteis até produzir o pedido. Relate evidência real, sem atribuir a uma persona revisão independente, aprovação ou ação externa. As perspectivas funcionam no chat atual sem criar subagentes ou chats.

Na delegação, consulte os [nomes completos e os papéis do catálogo](./references/manual/INDICE.md#nomes-completos-das-delegações). Para chamar **Nanda principal engineer zaip agent**, selecione `zaip-agent-reviewer` como `agent_type` e envie `nanda_principal_engineer_zaip_agent` como `task_name` quando a ferramenta oferecer esse campo. Para **Gui quality assurance lead zaip agent**, os valores são `zaip-agent-finalizer` e `gui_quality_assurance_lead_zaip_agent`. Descreva a atividade na mensagem e reutilize o agente nas continuações. Em campos de exibição literal, use a grafia da coluna “Nome completo”. Se faltar um papel, retome a configuração dos squads com `entender-projeto`. Uma nova conversa na mesma pasta pode ser necessária para carregar os perfis. Quando a atividade puder seguir no chat atual ou com um tipo genérico compatível, use as instruções da ficha e identifique a participação efetiva. Em uma delegação genérica, conserve o `task_name` do catálogo se o campo estiver disponível.

## Criar ou atualizar

| Criar | Atualizar |
| --- | --- |
| `criar-guia-de-arquitetura` | `atualizar-guia-de-arquitetura` |
| `criar-guia-de-stack` | `atualizar-guia-de-stack` |
| `criar-brandbook` | `atualizar-brandbook` |
| `criar-guia-de-design` | `atualizar-guia-de-design` |
| `criar-guia-de-design-system` | `atualizar-guia-de-design-system` |
| `criar-plano-de-marketing` | `atualizar-plano-de-marketing` |
| `criar-playbook-de-vendas` | `atualizar-playbook-de-vendas` |
| `criar-estrategia-de-growth` | `atualizar-estrategia-de-growth` |
| `criar-manual-de-operacoes` | `atualizar-manual-de-operacoes` |
| `criar-plano-de-analise` | `atualizar-plano-de-analise` |
| `criar-matriz-de-governanca` | `atualizar-matriz-de-governanca` |
| `criar-brief-de-produto` | `atualizar-brief-de-produto` |
| `criar-memoria-empresa` | `atualizar-memoria-empresa` |
| `criar-documento` | `atualizar-documento` |
| `criar-relatorio` | `atualizar-relatorio` |
| `criar-imagem` | `atualizar-imagem` |
| `criar-api-http` | `atualizar-api-http` |
| `criar-mcp-local` | `atualizar-mcp-local` |
| `criar-landing-page` | `atualizar-landing-page` |
| `criar-skill` | `atualizar-skill` |
| `criar-plataforma-de-marca` | `atualizar-plataforma-de-marca` |
| `criar-copy-site` | `atualizar-copy-site` |
| `criar-plano-anual-growth` | `atualizar-plano-anual-growth` |
| `criar-plano-de-vendas` | `atualizar-plano-de-vendas` |
| `criar-roteiro-comercial` | `atualizar-roteiro-comercial` |
| `criar-processo-receita-previsivel` | `atualizar-processo-receita-previsivel` |
| `criar-roteiro-spin-selling` | `atualizar-roteiro-spin-selling` |
| `criar-copy-anuncio-meta` | `atualizar-copy-anuncio-meta` |
| `criar-criativo-anuncio-instagram` | `atualizar-criativo-anuncio-instagram` |
| `criar-conteudo-linkedin` | `atualizar-conteudo-linkedin` |
| `criar-conteudo-instagram` | `atualizar-conteudo-instagram` |
| `criar-ensaio-fotografico` | `atualizar-ensaio-fotografico` |
| `criar-copy-conteudo` | `atualizar-copy-conteudo` |
| `criar-plano-testes-ab` | `atualizar-plano-testes-ab` |
| `criar-plano-cro` | `atualizar-plano-cro` |
| `criar-previsao-receita` | `atualizar-previsao-receita` |
| `criar-calendario-editorial` | `atualizar-calendario-editorial` |
| `criar-apresentacao-executiva` | `atualizar-apresentacao-executiva` |
| `criar-plugin` | `atualizar-plugin` |
| `criar-automacao` | `atualizar-automacao` |

Identifique o material por finalidade, empresa, canal, período ou versão. Verifique se existe e use o modo correspondente. Quando houver um par de skills, as duas entradas chegam ao mesmo modo a partir dessa verificação. Se o destino estiver inacessível ou ambíguo, resolva esse ponto antes de escrever. Preserve o original quando a pessoa pedir uma variante separada.
