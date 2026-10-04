/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "Mesa",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "Mesa",
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
        "name": "code",
        "type": "string"
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.disponivel",
        "type": "boolean",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [],
      "transitions": []
    },
    "invariants": [
      "mesaDisponivelParaAbrirComanda"
    ],
    "imports": []
  }
} as const;

export default definition;
