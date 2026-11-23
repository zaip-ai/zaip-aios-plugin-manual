---
name: sincronizar-documentos
description: Concilie um documento Markdown e seu Word editável no mesmo projeto. Use após edição humana no DOCX, revisão no Markdown, par incompleto ou divergência entre as versões.
---

# Sincronizar Markdown e Word

Consulte as fontes existentes da área para localizar o documento vigente. Quando houver um par existente ou um pedido de sincronização, identifique o companheiro de mesmo nome-base e confira seu público e finalidade. Um Markdown isolado não exige Word. Aplique o [procedimento de conciliação](./references/PARES.md).

Mantenha os pares existentes na mesma pasta. Ao preparar um par novo de área sem destino adotado, guarde os dois arquivos juntos em `.agents/<área>/`.

Execute a atualização no próprio chat usando os recursos locais de documentos e arquivos. Descubra primeiro qual lado mudou; quando não houver base comum e as versões divergirem, procure evidência antes de escolher. Em caso de conflito material, mostre os dois trechos e preserve os originais. Confirme no resultado o par de arquivos e a edição aplicada. Em modo de consulta, relate o estado sem gravar.

## Conferir conteúdo e mudanças

Se a sessão tiver Python, use a [ferramenta local](./scripts/estado_par.py) com a raiz do projeto como pasta de trabalho. Passe ao script `conferir CAMINHO`, onde CAMINHO é o caminho relativo do Markdown ou do Word. A leitura informa duas coisas separadamente.

- **Mudança de arquivo.** `estado` indica o lado alterado ou ausente. `sem-alteracao-desde-revisao` significa que os dois arquivos conservam os bytes da última revisão. `base-legada-sem-alteracao` identifica recibos antigos que registravam apenas caminhos e hashes.
- **Conferência do conteúdo.** Leia `conteudo` mesmo se nenhum arquivo mudou. `corresponde` indica que os blocos comparados coincidem em ordem, tipo e conteúdo. O verificador compara a hierarquia dos títulos, os parágrafos, os marcadores de listas simples, o rótulo e destino de links simples, e as tabelas linha a linha e célula a célula. Preserva números, sinais, unidades, condições e destinos. Tolera espaçamento comum e ênfase Markdown compatível.
- **Pendências.** `divergente` localiza a primeira diferença estrutural ou textual. Reabra o trecho em ambos os arquivos. Se a diferença for de representação, verifique a equivalência pelo método editorial. `incompleto` indica ausência de um formato; recupere-o quando o par for necessário ou solicitado. `revisao-editorial` lista os elementos que a comparação simples não cobre, como imagens, notas, campos, revisão controlada, estilos ou tabelas complexas. Compare-os nas duas versões, incluindo legendas, fontes, datas e restrições de uso. Um arquivo ilegível exige recuperar uma fonte legível.

## Registrar um par conferido

Para registrar, use `registrar CAMINHO --md HASH_MD --word HASH_WORD --base REVISAO` com os três valores retornados pela leitura. A primeira revisão da base é `ausente`. Se o conteúdo requer revisão editorial, acrescente `--revisao-editorial` somente depois de reabrir e conferir todos os elementos indicados e o trecho de negócio com os recursos da sessão. Um indicador de divergência sempre impede a gravação pelo verificador, inclusive com esse sinalizador. Preserve o par quando o recurso disponível não permitir demonstrar a equivalência. Para conteúdo complexo já revisado e inalterado, informe o alcance da última revisão editorial. Uma base legada só migra depois da conferência atual.

A ferramenta verifica novamente os arquivos e o recibo antes de gravar. O recibo vigente em `.agents/zaip-free/pares/` contém `schema` igual a 2, `md`, `word`, `sha256_md`, `sha256_word` e `conferencia` preenchida com `estrutural` ou `editorial`. O nome é o SHA-256 do caminho relativo POSIX do Markdown em UTF-8 acrescido de `.json`. Preserve a grafia original. A revisão da base é o SHA-256 dos bytes do recibo. Repetir a conferência de um par inalterado conserva o recibo e as datas.

Sem Python, use os recursos locais para comparar os documentos abertos por seção e célula. Havendo equivalência editorial demonstrada e cálculo local de hashes, aplique o mesmo esquema com `conferencia` igual a `editorial`, confira os bytes novamente e substitua somente a base vigente. Respeite qualquer diferença material encontrada. Se outra edição estiver em andamento, releia antes de continuar. Quando faltar acesso, escrita ou cálculo de hashes, informe o que conferiu e deixe o registro pendente. Com uma trava residual, confira a ausência de outra escrita, os dois originais e a base antes da recuperação. O recibo guarda apenas o estado atual do par.
