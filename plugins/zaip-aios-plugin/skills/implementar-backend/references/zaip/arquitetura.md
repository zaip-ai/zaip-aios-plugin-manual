# Arquitetura de software ZAIP

Consulte o documento principal `.agents/architecture/software-architecture.md` ou a fonte vigente identificada pela equipe. Preserve decisões, diferenças locais, histórico e a autoridade de arquivos gerenciados. Consulte o perfil de stack antes de escolher uma tecnologia.

## Descoberta e desenho

Qual jornada deve funcionar, quem pode acioná-la, que comandos e consultas existem e quem detém cada dado? Quais são as entradas, contratos públicos, restrições, integrações e modos de falha? Que parte está proposta, escolhida, implementada ou comprovadamente implantada? Leia os requisitos, módulos, testes e configuração em uso. Uma consulta de arquitetura fica em leitura.

## Invariantes para implementar e revisar

- Use `apps → modules → packages`. Aplicações compõem módulos, módulos expõem contratos públicos e packages reúnem bibliotecas reutilizáveis. Registre a raiz de composição de cada módulo. Proíba dependências no sentido inverso e o acesso ao armazenamento ou adaptador privado de outro módulo.
- Em Clean Architecture, domínio desconhece HTTP, banco, sistema de arquivos e fornecedor. Casos de uso orquestram ports. Adaptadores apontam para dentro. Injete relógio, IDs e I/O para testar.
- Em CQRS, comandos modificam estado e consultas só retornam dados. Queries não publicam, não escrevem e não importam ports de escrita. Um comando crítico define autorização, idempotência, concorrência, auditoria e recuperação. A separação lógica vale mesmo com um único banco e processo.
- Separe a UI de produto em `apps/frontend`, APIs e workers em `apps/backend` e o site independente em `apps/site`. O site não importa o dashboard nem detalhes privados do backend. Mantenha testes unitários junto do código e fluxos entre apps em `tests/e2e`.
- No perfil de referência, 401 a 800 linhas físicas geram aviso; 801 ou mais, erro. Exclua artefatos gerados, dependências e lockfiles. Uma exceção temporária de legado registra arquivo, teto sem crescimento, responsável, motivo e vencimento.

## Entrega

Produza mapa de limites e fluxos com atores, dono dos dados, dependências, falha, autorização, isolamento e reversão. Registre opção, alternativas, consequência e evidência. Para mudança de topologia, confira diagrama, papéis, rede, persistência, filas, capacidade, backup, observabilidade e recuperação. Preserve histórico relevante e releia a revisão antes de editar. Confira fronteiras, CQRS, perfil e testes com os recursos locais disponíveis. Uma diferença descoberta em infraestrutura gera pendência de adaptação; a revisão documental não concede deploy.
