# Stack de desenvolvimento ZAIP

Leia `.agents/development/memoria.md`, o perfil escolhido em `.agents/development/stack.md` e a configuração existente da equipe. Abra o manifesto e o lockfile para distinguir referência, tecnologia adotada, versão instalada e serviço comprovadamente implantado.

## Perfil para projetos novos

A tabela reproduz o perfil técnico declarado pelo ZAIP-AIOS 7.10.0 na revisão que originou esta edição. As versões são referências do mantenedor. Escolha apenas as superfícies pertinentes. Pergunte pelas restrições que mudam a escolha, ambientes, hospedagem, dados, capacidade e responsáveis. Um projeto existente conserva sua stack e documenta diferenças. A edição Free apenas orienta as decisões e dispensa instalar esses componentes para usar as skills.


| Responsabilidade | Tecnologia | Versão atual / referência | Pacote / imagem / serviço |
| --- | --- | --- | --- |
| Linguagem principal | TypeScript | 7.0.2 | npm:typescript |
| Runtime backend | Node.js | 24.19.0 | runtime:node |
| Framework backend / API | Hono | 4.13.11 | npm:hono |
| Query builder | Kysely | 0.29.6 | npm:kysely |
| Banco de dados | PostgreSQL via Supabase | Serviço em nuvem | service:supabase-postgresql |
| Autenticação e Storage | Supabase Auth + Storage | Serviço em nuvem | service:supabase |
| Gestão de credenciais | Infisical self-hosted | Self-hosted; fixar imagem por digest na implantação | docker:infisical/infisical |
| Cache e mensageria | Redis | 6.2.1 | npm:redis |
| Filas e processamento assíncrono | BullMQ | 6.2.0 | npm:bullmq |
| Infraestrutura backend | Terraform | 1.16.1 | tool:terraform |
| Hospedagem do backend | Hostinger VPS | Serviço em nuvem | provider:hostinger-vps |
| Framework do Web App | React | 19.2.7 | npm:react |
| Linguagem do Web App | TypeScript | 7.0.2 | npm:typescript |
| Build do Web App | Vite | 8.1.6 | npm:vite |
| Hospedagem do frontend | Cloudflare Pages | Serviço em nuvem | provider:cloudflare-pages |
| Framework do site | Astro | 7.2.8 | npm:astro |
| Linguagem do site | TypeScript | 7.0.2 | npm:typescript |
| Componentes interativos | React Islands | 19.2.7 | npm:react |
| Build do site | Vite | 8.1.6 | npm:vite |
| Hospedagem do site | Cloudflare Pages | Serviço em nuvem | provider:cloudflare-pages |
| Coleta de métricas | Prometheus | 3.14.0 | docker:prom/prometheus |
| Dashboards | Grafana | 13.2.1 | docker:grafana/grafana |
| Monitoramento de disponibilidade | Uptime Kuma | 2.5.5 | docker:louislam/uptime-kuma |
| Métricas de containers | cAdvisor | 0.60.5 | docker:ghcr.io/google/cadvisor |
| Métricas de host | node-exporter | 1.12.1 | docker:prom/node-exporter |
| Métricas do Redis | Redis Exporter | 1.89.0 | docker:oliver006/redis_exporter |
| Teste de carga | k6 | 2.2.0 | docker:grafana/k6 |
| Teste HTTP de carga | autocannon | 8.0.0 | npm:autocannon |

## Superfícies

### Web App — Frontend

- React
- TypeScript
- Vite
- Cloudflare Pages

### Backend

- Node.js
- TypeScript
- Hono
- Kysely
- PostgreSQL
- Supabase
- Redis
- BullMQ
- Infisical self-hosted
- Terraform
- Hostinger VPS

### Site e Landing Pages

- Astro
- TypeScript
- React Islands
- Vite
- Cloudflare Pages

## Decisões de arquitetura

### Dados e serviços gerenciados

- Supabase: PostgreSQL, Auth, Storage and RPC/PostgreSQL Functions

### APIs e regras de negócio

- Node.js runtime with TypeScript, Hono APIs/routes/middleware and Kysely typed PostgreSQL access

### Filas e processamento assíncrono

- Redis for cache, locks and temporary state; BullMQ for queues, jobs, workers and retries

### Gestão de credenciais do backend

- Infisical self-hosted for backend credentials; isolated project per application and environment, machine identities and explicit secret delivery

### Infraestrutura backend

- Terraform 1.16.1 provisions the declared backend infrastructure

### Hospedagem do backend

- Hostinger VPS runs APIs, workers and persistent backend services

## Organização e entrega

Separe `apps/frontend`, `apps/backend`, `apps/site`, `modules`, `packages` e `tests/e2e` conforme as superfícies existentes. A direção é `apps → modules → packages`. Preserve Clean Architecture, CQRS e armazenamento privado por módulo mesmo em uma stack adaptada. Registre exceções fundamentadas, extensões, contratos e testes positivos e negativos. A SPEC técnica identifica perfil, adaptações, componentes, versões e fontes locais. O PRD descreve resultados e restrições de negócio. Consulte os comandos de teste e typecheck do projeto e registre o que foi efetivamente verificado. Rafa delimita o contrato, o especialista da superfície implementa e Nanda revisa a mudança.
