# Instalação do MCP do Google Ads

## Preparar o ChatGPT Site

1. **Identificar a publicação.** No projeto da organização, leia o `project_id` em `.openai/hosting.json` ou escolha o Site correspondente na lista de Sites. Consulte `get_site` com `include_mcp_connection: true`. Use `current_live_url` para abrir o Site, `mcp_connection.mcp_url` para identificar o endpoint das ferramentas e `mcp_connection.plugin_id` para encontrar o plugin. A ficha gerada pode ser instalada mesmo antes de a pessoa autorizar uma conta Google.
2. **Se faltar o MCP.** No projeto-fonte do Site, confira se `capabilities` inclui `mcp` e se o backend atende `POST /mcp` com descoberta, listagem e chamada das ferramentas do Google Ads. O Sites verifica quem pode acessar o projeto. Cada ferramenta deve usar o vínculo Google da pessoa autenticada e os recursos a que ela tem acesso. Se for necessário implementar e publicar em um projeto existente, preserve sua audiência. Após a publicação autorizada, consulte de novo a conexão MCP gerada e use o mesmo plugin.
3. **Identificar o callback do Google.** Leia onde o backend monta o endereço de autorização e onde recebe o retorno. Se usar a interface, inspecione apenas o valor decodificado de `redirect_uri`; evite copiar a URL completa com dados da sessão. Confira que a origem é a publicação pretendida e que o caminho tem um handler na versão publicada. Se houver apenas a URL MCP, reporte **“endpoint MCP confirmado; retorno Google ainda pendente”**. Não deduza o callback do nome do Site, da URL do plugin ou de uma convenção de outro servidor.
4. **Se faltar o fluxo Google.** Para completar o Site, implemente uma ação de início de login e uma rota de retorno no backend. Na primeira, associe um `state` imprevisível e de uso único à sessão da pessoa e envie os escopos necessários ao Google. No retorno, trate recusa, valide o `state` e troque o código no servidor, usando o mesmo `redirect_uri`. Quando o uso posterior exigir renovação da autorização, solicite acesso offline e guarde o token de renovação de forma protegida por usuário. O servidor usa esse vínculo para chamar a Google Ads API em nome da pessoa. A implementação e sua publicação são necessárias antes de anunciar essa funcionalidade. [OAuth do Google para servidores web](https://developers.google.com/identity/protocols/oauth2/web-server)
5. **Instalar e validar.** Se a ferramenta de Sites devolver a conexão, abra o plugin identificado. Se o acesso à ficha for restrito, confira o workspace e a permissão da pessoa antes de criar qualquer recurso novo. Conclua a configuração do cliente Web e faça os testes dos passos 2 e 3 da [skill](../SKILL.md). Testar o cadastro do plugin até **Conectar** dispensa consultar contas ou iniciar OAuth.

## Codex local, sem hospedar servidor

Use Python compatível com a versão escolhida, `pipx` e Google Cloud CLI. Reserve o JSON do cliente OAuth do tipo **Desktop app** fora do repositório. O login interativo cria as credenciais locais de usuário (ADC). Se houver ADC de outro projeto em uso, combine um perfil de configuração isolado antes de trocar a identidade. Execute no terminal autorizado, substituindo os exemplos de caminho e projeto.

```sh
gcloud auth application-default login --client-id-file="CAMINHO/cliente-desktop.json" --scopes="https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform"
codex mcp list
```

A pessoa conclui o login na janela do Google. Confirme o projeto selecionado e o caminho das ADC indicado pelo `gcloud`. Para um novo cadastro, o exemplo usa a versão oficial `0.0.6`. Se já houver uma entrada com esse nome, confira sua configuração antes de reutilizar ou atualizar.

```sh
codex mcp add google-ads --env GOOGLE_CLOUD_PROJECT=SEU_PROJETO -- pipx run --spec google-ads-mcp==0.0.6 google-ads-mcp
codex mcp get google-ads
```

Para acessar via gerente, passe o ID de dez dígitos em `login_customer_id` na chamada ou acrescente `--env GOOGLE_ADS_LOGIN_CUSTOMER_ID=ID_DO_GERENTE` antes de `--` no cadastro. Abra uma nova conversa do Codex e execute o teste de leitura da skill. Essa configuração inicia um processo local por `stdio`. Para o ChatGPT Work, use o plugin do Site descrito acima. [Distribuição oficial](https://github.com/googleads/google-ads-mcp/releases) · [Configuração local do Google](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server)

## Editar uma campanha pela API

Quando a edição pretendida exceder as ferramentas descobertas, o responsável pelo servidor pode acrescentar uma ação específica à integração própria. Para **renomear uma campanha**, por exemplo:

1. A ação recebe cliente, ID da campanha e novo nome. O servidor usa a identidade OAuth da pessoa, verifica acesso à conta cliente e lê o nome atual por GAQL.
2. Monte uma chamada `CampaignService.MutateCampaigns` com uma operação de atualização. O exemplo abaixo é o corpo REST de uma **simulação**. Substitua os identificadores. Use o método `POST /v<VERSÃO_SUPORTADA>/customers/<CLIENTE>/campaigns:mutate` da Google Ads API, com as credenciais gerenciadas pelo servidor.

   ```json
   {
     "validateOnly": true,
     "operations": [{
       "update": {
         "resourceName": "customers/1234567890/campaigns/456",
         "name": "Nome proposto"
       },
       "updateMask": "name"
     }]
   }
   ```

3. Retorne ao chat o nome atual, o proposto, a conta e a campanha. Vincule a proposta à pessoa, aos IDs e ao conteúdo validado. A resposta bem-sucedida a `validateOnly` confirma a validação da API. Ela não cria um rascunho no Google Ads.
4. Somente sob pedido de aplicação e confirmação dessa proposta, releia o valor atual, verifique divergências e execute a atualização com a mesma máscara. Releia pelo ID após a resposta. Em timeout, consulte o estado antes de repetir. Para pausar, a alteração e a máscara são de `status`, com valor `PAUSED`; o efeito sobre a veiculação deve estar explícito na confirmação.
5. Exponha a ação no servidor próprio, atualize a descoberta de ferramentas no workspace e teste o caminho de validação em conta de teste. Até essa implementação estar disponível e verificada, informe que a edição específica está pendente. [Exemplo oficial de atualização](https://developers.google.com/google-ads/api/samples/update-campaign)

## Se a configuração parar

| Sinal observado | Onde retomar |
| --- | --- |
| `redirect_uri_mismatch` | Confira a URI indicada pelo Google e corrija o retorno no cliente Web do projeto correto. |
| Consentimento bloqueado em teste | Confira o e-mail em **Audience → Test users** e o público escolhido. Entregue o login à pessoa. |
| Projeto sem acesso a contas reais | Confira o nível de acesso do projeto da credencial na página da Google Ads API. Enquanto aguarda aprovação, use uma conta de teste. |
| Cliente invisível ou permissão negada | Confira identidade Google, ID da conta cliente, vínculo ao MCC e ID do gerente usado na chamada. |
| Leitura funciona, edição ausente | Confira a lista de ferramentas do servidor, a política de ações do workspace e o papel da pessoa no Google Ads antes de propor uma mutação. |
