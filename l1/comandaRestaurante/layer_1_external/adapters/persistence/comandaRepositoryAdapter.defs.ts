/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/comandaRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "ComandaRepository",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/comanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.defs.ts"
  ],
  "data": {
    "entityId": "Comanda",
    "portId": "ComandaRepository",
    "tableId": "comanda",
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
        "field": "number",
        "column": "number"
      },
      {
        "field": "mesaId",
        "column": "mesaId"
      },
      {
        "field": "status",
        "column": "status"
      },
      {
        "field": "details.discountAmount",
        "column": "json:details.discountAmount"
      },
      {
        "field": "details.paymentMethod",
        "column": "json:details.paymentMethod"
      },
      {
        "field": "details.subtotal",
        "column": "json:details.subtotal"
      },
      {
        "field": "details.totalComanda",
        "column": "json:details.totalComanda"
      }
    ]
  }
} as const;

export default definition;
