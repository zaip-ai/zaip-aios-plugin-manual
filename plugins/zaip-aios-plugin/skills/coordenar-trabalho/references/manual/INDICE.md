# Manual de trabalho ZAIP-AIOS Free

Localize a fonte vigente da área pelo [mapa por assunto](./MEMORIA.md).

Para configurar a empresa, escolher o primeiro squad e receber uma primeira entrega, abra [Comece aqui](./COMECE-AQUI.md). A configuração pode continuar em outro chat com acesso à mesma pasta.

O [catálogo por tarefa](./CATALOGO.md) reúne as 203 entradas do plugin, incluindo as skills dos especialistas.

Use a entrega pedida para escolher uma área. Leia o respectivo guia e as decisões locais relevantes antes de começar. Para uma tarefa de uma só especialidade, basta esse percurso. Se a entrega cruza áreas, consulte o squad correspondente e combine insumo, decisão e próximo responsável. Um mesmo chat pode aplicar várias perspectivas. Atribua execução, revisão e aprovação somente a quem de fato participou.

Consulte [Sincronizar os documentos](./PARES.md) quando houver um par existente ou necessário para a entrega.

## Guias e materiais do projeto

Consulte o contexto da organização nas fontes que a equipe já usa. A skill `coordenar-trabalho` escolhe um percurso quando o pedido envolve mais de uma especialidade. Para a primeira versão e as revisões de cada material, use as entradas de criação e atualização. Ambas conferem a existência e preservam a versão vigente.

| Área | Primeiro documento | Exemplos de pedidos |
| --- | --- | --- |
| Central de canais | [channels/central.md](./channels/central.md) | Conectar e-mail, CRM, Ads, Instagram, Messenger, YouTube e outras fontes disponíveis. |
| Arquitetura de software | [architecture/software-architecture.md](./architecture/software-architecture.md) | Desenhar os limites entre API, fila e banco. |
| Stack e convenções de desenvolvimento | [development/stack.md](./development/stack.md) | Escolher a stack de uma nova LP ou implementar na stack existente. |
| Brandbook e processo de marca | [branding/brandbook.md](./branding/brandbook.md) | Definir posicionamento, voz e uso da marca. |
| Design de produto e experiência | [design/product-design.md](./design/product-design.md) | Desenhar a jornada e os estados de uma tela. |
| Design system | [design/DESIGN.md](./design/DESIGN.md) | Definir tokens, foco e variantes de botão. |
| Estratégia e processo de marketing | [marketing/strategy.md](./marketing/strategy.md) | Planejar uma campanha e alinhar anúncio, página e conversão. |
| Playbook de vendas | [sales/playbook.md](./sales/playbook.md) | Definir qualificação e passagem de oportunidades no CRM. |
| Estratégia de growth e RevOps | [growth/strategy.md](./growth/strategy.md) | Encontrar o gargalo entre lead e receita. |
| Operações e passagem de trabalho | [operations/playbook.md](./operations/playbook.md) | Organizar um procedimento ou handoff. |
| Análise de dados e indicadores | [data/analysis.md](./data/analysis.md) | Reconstruir o denominador de um indicador. |
| Governança de processos | [governance/policies.md](./governance/policies.md) | Ligar um requisito a um controle verificável. |
| Definição de produto | [product/brief.md](./product/brief.md) | Delimitar o problema e escrever critérios de aceite. |

## Seis squads

- [Entrega crítica](./squads/squad-critical-delivery.md) — Mudança que cruza áreas e cujo erro compromete uma jornada importante.
- [Análise de produto](./squads/squad-product-analysis.md) — Pedido de funcionalidade com problema, público ou aceite em aberto.
- [Design e sites](./squads/squad-design-website.md) — Jornada digital, tela de produto, site ou landing page que envolve decisões visuais e implementação.
- [Marca e marketing](./squads/squad-brand-marketing.md) — Reposicionamento, campanha, conteúdo ou peça que precisa refletir a marca.
- [Growth e RevOps](./squads/squad-growth-revops.md) — Pergunta sobre crescimento, eficiência do funil ou escolha de experimento.
- [Vendas e governança](./squads/squad-sales-governance.md) — Definição de critérios comerciais, passagem entre equipes ou tratamento de dados no CRM.

## Perfis de trabalho

A primeira coluna traz o nome pelo qual a equipe chama cada especialista. No Codex local, o onboarding configura os perfis das equipes escolhidas a partir dos 23 modelos da edição.

| Perfil | Especialidade | Quando consultar |
| --- | --- | --- |
| [Dave](./agentes/agent-orchestrator.md) | Coordenação de produto | O pedido cruza especialidades ou há uma dependência que impede uma entrega. |
| [Rafa](./agentes/agent-builder.md) | Liderança técnica | O pedido exige escolher limites técnicos ou transformar a SPEC em uma sequência implementável. |
| [Leo](./agentes/agent-task-executor.md) | Engenharia de software | Há uma alteração técnica delimitada, com entrada, saída e aceite compreensíveis. |
| [Bia](./agentes/agent-analyst.md) | Gestão de produto | O problema, o público ou o aceite ainda precisam de definição. |
| [Gui](./agentes/agent-finalizer.md) | Qualidade da entrega | É preciso concluir o relato de uma entrega e dizer o que ficou comprovado. |
| [Nanda](./agentes/agent-reviewer.md) | Revisão de engenharia | A equipe precisa de revisão de uma mudança, de uma proposta ou de uma passagem entre etapas. |
| [Dani](./agentes/agent-integrator.md) | Integração de engenharia | Mudanças funcionam isoladamente e precisam ser conferidas juntas. |
| [Ana](./agentes/agent-auditor.md) | Auditoria de qualidade | Uma decisão requer reproduzir uma alegação de qualidade ou confirmar a origem de um resultado. |
| [Lia](./agentes/agent-text-summarizer.md) | Redação técnica | É preciso transformar notas, transcrições ou evidências em documentação para um público definido. |
| [Gabi](./agentes/agent-data-analyst.md) | Análise de dados | Uma decisão depende de calcular, comparar ou explicar indicadores. |
| [Tati](./agentes/agent-refactoring-specialist.md) | Refatoração e migração | O projeto precisa trocar organização ou implementação preservando o comportamento. |
| [Doug](./agentes/agent-frontend.md) | Interface de produto | A mudança afeta componentes, navegação ou estados de uma aplicação. |
| [Will](./agentes/agent-backend.md) | Serviços e persistência | Há uma API, uma regra de negócio ou um limite de dados a implementar. |
| [Jonny](./agentes/agent-website-developer.md) | Sites e landing pages | A entrega é um site público ou uma página de conversão. |
| [Manu](./agentes/agent-designer.md) | Design de produto e design system | É preciso definir a experiência, padronizar componentes ou alterar o contrato visual. |
| [Dan](./agentes/agent-cloud-engineer.md) | Infraestrutura em nuvem | A disponibilidade depende de hospedagem, rede, capacidade ou recuperação. |
| [Luiz](./agentes/agent-security-auditor.md) | Revisão defensiva de segurança | Uma mudança altera quem pode acessar um recurso ou quais informações são expostas. |
| [Lucia](./agentes/agent-marketing-analyst.md) | Estratégia e criação de marketing | Há público e oferta para traduzir em uma campanha ou peça. |
| [Sarah](./agentes/agent-brand-strategist.md) | Estratégia de marca | A equipe precisa decidir posicionamento, identidade, mensagem ou uso dos ativos. |
| [Robert](./agentes/agent-growth-strategist.md) | Growth e RevOps | Há dúvida sobre qual gargalo atacar ou qual experimento merece investimento. |
| [Aaron](./agentes/agent-sales-specialist.md) | Metodologia comercial | É preciso qualificar oportunidades, organizar um roteiro ou definir passagem comercial. |
| [Clara](./agentes/agent-general-operations.md) | Operações gerais | A equipe precisa tornar um processo repetível ou preparar um documento de operação. |
| [Renata](./agentes/agent-governance-compliance.md) | Governança e controles | Um processo precisa ligar requisitos, riscos, responsáveis e provas de cumprimento. |

## Nomes completos das delegações

Selecione o papel da coluna `agent_type` e envie o `task_name` da mesma linha quando a ferramenta aceitar esse campo. Em cada TOML, `name` contém o papel e `nickname_candidates` contém apenas o nome da tarefa. A primeira coluna mostra a grafia para a pessoa. Descreva a atividade na mensagem de delegação.

| Nome completo | Papel no Codex (`agent_type`) | Nome da tarefa (`task_name`) |
| --- | --- | --- |
| Dave product owner zaip agent | `zaip-agent-orchestrator` | `dave_product_owner_zaip_agent` |
| Rafa tech lead zaip agent | `zaip-agent-builder` | `rafa_tech_lead_zaip_agent` |
| Leo software engineer zaip agent | `zaip-agent-task-executor` | `leo_software_engineer_zaip_agent` |
| Bia product manager zaip agent | `zaip-agent-analyst` | `bia_product_manager_zaip_agent` |
| Gui quality assurance lead zaip agent | `zaip-agent-finalizer` | `gui_quality_assurance_lead_zaip_agent` |
| Nanda principal engineer zaip agent | `zaip-agent-reviewer` | `nanda_principal_engineer_zaip_agent` |
| Dani integration engineer zaip agent | `zaip-agent-integrator` | `dani_integration_engineer_zaip_agent` |
| Ana quality auditor zaip agent | `zaip-agent-auditor` | `ana_quality_auditor_zaip_agent` |
| Lia technical writer zaip agent | `zaip-agent-writer` | `lia_technical_writer_zaip_agent` |
| Gabi data analyst zaip agent | `zaip-agent-data-analyst` | `gabi_data_analyst_zaip_agent` |
| Tati refactoring specialist zaip agent | `zaip-agent-refactoring-specialist` | `tati_refactoring_specialist_zaip_agent` |
| Doug frontend specialist zaip agent | `zaip-agent-frontend` | `doug_frontend_specialist_zaip_agent` |
| Will backend specialist zaip agent | `zaip-agent-backend` | `will_backend_specialist_zaip_agent` |
| Jonny website developer zaip agent | `zaip-agent-website-developer` | `jonny_website_developer_zaip_agent` |
| Manu product designer zaip agent | `zaip-agent-designer` | `manu_product_designer_zaip_agent` |
| Dan cloud engineer zaip agent | `zaip-agent-cloud-engineer` | `dan_cloud_engineer_zaip_agent` |
| Luiz security auditor zaip agent | `zaip-agent-security-auditor` | `luiz_security_auditor_zaip_agent` |
| Lucia marketing analyst zaip agent | `zaip-agent-marketing-analyst` | `lucia_marketing_analyst_zaip_agent` |
| Sarah branding specialist zaip agent | `zaip-agent-brand-strategist` | `sarah_branding_specialist_zaip_agent` |
| Robert growth strategist zaip agent | `zaip-agent-growth-strategist` | `robert_growth_strategist_zaip_agent` |
| Aaron sales specialist zaip agent | `zaip-agent-sales-specialist` | `aaron_sales_specialist_zaip_agent` |
| Clara operations generalist zaip agent | `zaip-agent-general-operations` | `clara_operations_generalist_zaip_agent` |
| Renata governance compliance specialist zaip agent | `zaip-agent-governance-compliance` | `renata_governance_compliance_specialist_zaip_agent` |

## Trabalhos entre áreas

Cada perfil também pode ser acionado como uma skill pelo nome da pessoa e função.

| Nome | Função | Skill |
| --- | --- | --- |
| Dave | Coordenação de produto | `especialista-dave-coordenacao` |
| Rafa | Liderança técnica | `especialista-rafa-lideranca-tecnica` |
| Leo | Engenharia de software | `especialista-leo-engenharia` |
| Bia | Gestão de produto | `especialista-bia-produto` |
| Gui | Qualidade da entrega | `especialista-gui-qualidade` |
| Nanda | Revisão de engenharia | `especialista-nanda-revisao` |
| Dani | Integração de engenharia | `especialista-dani-integracao` |
| Ana | Auditoria de qualidade | `especialista-ana-auditoria` |
| Lia | Redação técnica | `especialista-lia-redacao` |
| Gabi | Análise de dados | `especialista-gabi-dados` |
| Tati | Refatoração e migração | `especialista-tati-refatoracao` |
| Doug | Interface de produto | `especialista-doug-frontend` |
| Will | Serviços e persistência | `especialista-will-backend` |
| Jonny | Sites e landing pages | `especialista-jonny-sites` |
| Manu | Design de produto e design system | `especialista-manu-design` |
| Dan | Infraestrutura em nuvem | `especialista-dan-infraestrutura` |
| Luiz | Revisão defensiva de segurança | `especialista-luiz-seguranca` |
| Lucia | Estratégia e criação de marketing | `especialista-lucia-marketing` |
| Sarah | Estratégia de marca | `especialista-sarah-branding` |
| Robert | Growth e RevOps | `especialista-robert-growth` |
| Aaron | Metodologia comercial | `especialista-aaron-vendas` |
| Clara | Operações gerais | `especialista-clara-operacoes` |
| Renata | Governança e controles | `especialista-renata-governanca` |

- **Campanha com nova identidade.** Comece pelo brandbook, entregue mensagem e prova a marketing e confira o destino da campanha com design. Registre com vendas a definição de lead qualificado e use o guia de dados para determinar o denominador.
- **Produto com nova interface.** Comece pelo brief e pelo contrato de arquitetura. Use design para definir os estados, design system para os componentes e desenvolvimento para conferir o caminho implementado na stack do projeto.
- **Operação com meta de crescimento.** Comece pelo playbook de operações, descreva quem recebe a passagem e use growth e dados para definir um experimento e sua regra de decisão.

Quando houver um brandbook, DESIGN.md, playbook ou padrão técnico já adotado pelo projeto, siga a fonte identificada pela equipe. Os métodos distribuídos ficam no plugin. As decisões e os materiais vigentes pertencem à empresa. Preserve as personalizações das instalações anteriores. Quando outra tarefa precisar de uma referência, aponte diretamente para o original. Mantenha propostas e decisões confirmadas identificáveis.
