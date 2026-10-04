/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemComandaRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "ItemComandaRepository",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/itemComanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.defs.ts"
  ],
  "data": {
    "entityId": "ItemComanda",
    "portId": "ItemComandaRepository",
    "tableId": "itemComanda",
    "columns": [
      {
        "field": "id",
        "column": "id"
      },
      {
        "field": "version",
        "column": "json:version"
      },
      {
        "field": "comandaId",
        "column": "comandaId"
      },
      {
        "field": "itemCardapioId",
        "column": "itemCardapioId"
      },
      {
        "field": "status",
        "column": "status"
      },
      {
        "field": "details.quantidade",
        "column": "json:details.quantidade"
      },
      {
        "field": "details.observacao",
        "column": "json:details.observacao"
      },
      {
        "field": "details.precoUnitario",
        "column": "json:details.precoUnitario"
      },
      {
        "field": "details.valorTotal",
        "column": "json:details.valorTotal"
      }
    ]
  }
} as const;

export default definition;
