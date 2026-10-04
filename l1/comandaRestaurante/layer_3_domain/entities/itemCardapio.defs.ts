/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemCardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "ItemCardapio",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "ItemCardapio",
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
        "name": "name",
        "type": "string"
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.precoVigente",
        "type": "money"
      }
    ],
    "lifecycle": {
      "states": [],
      "transitions": []
    },
    "invariants": [],
    "imports": []
  }
} as const;

export default definition;
