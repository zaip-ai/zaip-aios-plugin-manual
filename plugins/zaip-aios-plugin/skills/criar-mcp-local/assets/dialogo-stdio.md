# Exemplo de diálogo MCP por stdio

Cada bloco representa uma linha JSON completa na direção indicada. Este exemplo usa a revisão 2025-11-25. Na implementação, negocie uma versão suportada pelo cliente e pelo servidor. A notificação de inicialização não recebe resposta. O catálogo do exemplo contém apenas o item `item-1`.

## Cliente inicia a sessão

```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"cliente-de-teste","version":"1.0.0"}}}
```

## Servidor responde com a versão compatível

```json
{"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25","capabilities":{"tools":{}},"serverInfo":{"name":"catalogo-de-teste","version":"1.0.0"}}}
```

## Cliente confirma a inicialização

```json
{"jsonrpc":"2.0","method":"notifications/initialized"}
```

## Cliente pede a lista de ferramentas

```json
{"jsonrpc":"2.0","id":2,"method":"tools/list"}
```

## Servidor descreve a única ferramenta

```json
{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"consultar_item","description":"Consulta um item fictício pelo identificador.","inputSchema":{"type":"object","required":["id"],"properties":{"id":{"type":"string","pattern":"^item-[0-9]+$"}},"additionalProperties":false}}]}}
```

## Cliente consulta um exemplo conhecido

```json
{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"consultar_item","arguments":{"id":"item-1"}}}
```

## Servidor devolve o item fictício

```json
{"jsonrpc":"2.0","id":3,"result":{"content":[{"type":"text","text":"Caderno"}]}}
```

## Cliente consulta um item ausente

```json
{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"consultar_item","arguments":{"id":"item-2"}}}
```

## Servidor indica erro da operação

```json
{"jsonrpc":"2.0","id":4,"result":{"isError":true,"content":[{"type":"text","text":"Item ausente no catálogo de exemplo."}]}}
```

Para testar validação de entrada, repita a chamada com um argumento que não atende ao esquema, como um número no campo `id`. Confira que o adaptador de dados não foi chamado e inspecione o erro retornado pela implementação usada.
