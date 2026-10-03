/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_3_domain/entities/gestorEquipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "GestorEquipe",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "GestorEquipe",
    "storageTarget": "mdm",
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
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.identification",
        "type": "object"
      },
      {
        "name": "details.identification.subtype",
        "type": "enum",
        "derived": true
      },
      {
        "name": "details.identification.name",
        "type": "string"
      },
      {
        "name": "details.identification.status",
        "type": "enum",
        "derived": true
      },
      {
        "name": "details.identification.docType",
        "type": "enum"
      },
      {
        "name": "details.identification.docId",
        "type": "string"
      },
      {
        "name": "details.identification.countryCode",
        "type": "string"
      },
      {
        "name": "details.base",
        "type": "object"
      },
      {
        "name": "details.person",
        "type": "object"
      },
      {
        "name": "details.general",
        "type": "object"
      },
      {
        "name": "details.reembolsoDespesas",
        "type": "object"
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
