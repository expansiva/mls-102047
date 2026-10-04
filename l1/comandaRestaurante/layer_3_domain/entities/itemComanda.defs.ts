/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "ItemComanda",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/comanda.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.defs.ts"
  ],
  "data": {
    "entityId": "ItemComanda",
    "storageTarget": "moduleDatabase",
    "fields": [
      {
        "name": "id",
        "type": "uuid",
        "derived": true
      },
      {
        "name": "version",
        "type": "integer",
        "derived": true
      },
      {
        "name": "comandaId",
        "type": "record",
        "ref": "Comanda"
      },
      {
        "name": "itemCardapioId",
        "type": "record",
        "ref": "ItemCardapio"
      },
      {
        "name": "status",
        "type": "enum"
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.quantidade",
        "type": "integer"
      },
      {
        "name": "details.observacao",
        "type": "text"
      },
      {
        "name": "details.precoUnitario",
        "type": "money"
      },
      {
        "name": "details.valorTotal",
        "type": "money",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [
        {
          "state": "launched",
          "reachedBy": "actor"
        },
        {
          "state": "canceled",
          "reachedBy": "actor"
        }
      ],
      "transitions": [
        {
          "transitionId": "cancelarItemComanda",
          "from": [
            "launched"
          ],
          "to": "canceled",
          "by": [
            "garcom"
          ],
          "ruleRefs": [
            "itemComandaOperacaoSomenteComandaAberta"
          ]
        }
      ]
    },
    "invariants": [
      "itemComandaOperacaoSomenteComandaAberta"
    ],
    "imports": []
  }
} as const;

export default definition;
