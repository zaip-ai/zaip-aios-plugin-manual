---
name: configurar-google-ads-mcp-no-chatgpt
description: "Configure o Google Ads no ChatGPT Work usando um ChatGPT Site e seu plugin MCP privado. Oriente o OAuth do Google pelo navegador, teste leitura e identifique as edições disponíveis. Inclui a opção de MCP oficial no Codex local."
---

# Configurar o Google Ads com ChatGPT Sites

No **ChatGPT Work**, use o Site da organização que já expõe o Google Ads. O Sites fornece o endereço HTTPS, autentica o acesso ao Site e disponibiliza seu servidor MCP como plugin. A Google Ads API atende às consultas e alterações autorizadas pela pessoa no Google. Isso dispensa uma assinatura de intermediário e uma segunda hospedagem só para obter uma URI.

## 1. Localizar o Site e o plugin

Confirme o workspace e a organização. Para a ZAIP, procure **Google Ads MCP – Gestão ZAIP-AIOS**. A ficha anterior pode aparecer como **Google Ads MCP – Gestão**. Use os metadados do Site publicado para conferir sua origem, a URL MCP e o ID do plugin. Reutilize o plugin com esse ID mesmo que o nome exibido tenha mudado. Para outra organização, localize o Site dela. Se a pessoa pediu apenas instruções, explique os passos. Se pediu configuração, execute as etapas autorizadas com Computer Use na aba autenticada do navegador.

- **Já instalado e vinculado ao Google:** vá ao teste de leitura com a conta indicada. Preserve o vínculo.
- **Site publicado, plugin ausente no chat:** abra a ficha do plugin que o Sites gerou, instale se necessário e abra um novo chat no workspace. Se o pedido for parar em **Conectar**, deixe a ficha nessa tela. A criação de um servidor MCP personalizado duplicaria esse cadastro.
- **Site ou conexão MCP ainda ausente:** siga o [roteiro do Site](./references/instalacao.md#preparar-o-chatgpt-site) para identificar o componente que falta. Um site que só exibe uma página ainda precisa de um backend.
- **Uso apenas no computador:** se a pessoa escolher executar o servidor oficial do Google no Codex local, siga a [rota local por stdio](./references/instalacao.md#codex-local-sem-hospedar-servidor). Um plugin do Sites já disponível no Codex também pode ser reutilizado.

Ao criar, recriar ou atualizar o plugin próprio da ZAIP, use o nome de exibição exato **Google Ads MCP – Gestão ZAIP-AIOS** e o [ícone para o plugin Codex](./assets/google-ads-codex-icon.png), um PNG transparente de 256 × 256 pixels gerado a partir da [referência visual da ZAIP](./assets/google-ads-icon.png). Use esse PNG nos campos de logo e de ícone do compositor e no seletor de ícone do formulário. Confira o nome e o ícone na ficha salva. Resolva o caminho a partir deste SKILL.md instalado. Quando a ficha permitir edição, use **Escolher ícone**, salve e confira a prévia. Se o Sites controlar a apresentação, informe isso e preserve a ficha existente.

## 2. Configurar o OAuth com a URI certa

1. No Site, procure a ação de vincular o Google Ads e identifique o endereço de retorno implementado pelo backend. O caminho **/mcp** recebe as chamadas do ChatGPT. A **URI de redirecionamento** é a rota que o Site envia ao Google no parâmetro `redirect_uri` para receber a resposta do login. Use o valor exato observado na configuração ou no início do fluxo. Se a rota ainda não existir, siga o roteiro técnico antes de preencher o Console.
2. Com Computer Use, abra o Google Cloud Console da organização. Se faltar sessão, peça: **“Faça login no Google com a conta que tem acesso ao Google Ads e me avise quando estiver pronto.”** Aguarde e retome na mesma aba. A pessoa digita senha, segundo fator e segredos e concede o consentimento diretamente nas telas oficiais.
3. Selecione o projeto que é dono do cliente OAuth. Em **APIs e serviços → Biblioteca**, habilite **Google Ads API** se necessário. Na visão geral da API, confira o acesso do projeto. **Test** atende contas de teste. Para uma conta real, verifique a aprovação apropriada e o uso permitido. [Níveis de acesso da Google Ads API](https://developers.google.com/google-ads/api/docs/api-policy/access-levels)
4. Em **Google Auth Platform**, confira **Branding**, **Audience** e **Data Access**. Para um aplicativo externo em teste, inclua a pessoa em **Test users**. Configure o escopo `https://www.googleapis.com/auth/adwords`. Em **Clients**, reutilize ou crie um cliente do tipo **Web application**. Em **Authorized redirect URIs**, adicione a URI de retorno confirmada no passo 1, preservando as demais. O Google compara o endereço completo, inclusive caminho e barra final. [OAuth para aplicações web](https://developers.google.com/identity/protocols/oauth2/web-server)
5. Configure no backend do Site o ID e o segredo desse cliente pelos nomes esperados pelo código. Use o mecanismo de segredos do Site. Evite expor valores no chat, no repositório ou no navegador da aplicação. Quando o pedido incluir concluir o vínculo, abra a ação de conexão do **Site**, entregue o controle à pessoa para escolher a conta Google e consentir, e retome após o retorno ao Site. Confirme o resultado pelo estado da integração ou por uma leitura autorizada.

## 3. Conferir o que funciona

- **Leitura.** Selecione o plugin em um novo chat e confira as ferramentas disponíveis. Confirme o ID de dez dígitos do anunciante. Se o acesso for via gerente (MCC), use o ID do gerente conforme o contrato da ferramenta. Execute a menor leitura autorizada para o cliente escolhido. Se o plugin listar anúncios, teste anúncios. Se aceitar consultas GAQL, um exemplo para campanhas é `SELECT campaign.id, campaign.name, campaign.status FROM campaign LIMIT 5`. Um resultado vazio com sucesso é válido. Para desempenho, indique período, fuso e moeda.
- **Edição.** Confira o recurso e o efeito de cada ação. Uma prévia de texto de anúncio comprova apenas a simulação desse anúncio. Para renomear ou pausar uma campanha, procure uma ferramenta de campanha que implemente a operação pela API. Se faltar, use o [exemplo de extensão](./references/instalacao.md#editar-uma-campanha-pela-api). Teste primeiro com validação sem gravação. Antes de aplicar uma mudança real, mostre conta, campanha, valor atual, valor proposto e efeito na veiculação. Após aprovação explícita, aplique e releia pelo ID.
- **Resultado.** Relate separadamente a disponibilidade do plugin, o vínculo Google, a leitura realizada e a operação de edição efetivamente verificada. No fluxo local, confira as capacidades específicas da versão do MCP oficial. [Guia do servidor do Google](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server)
