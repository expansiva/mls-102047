/// <mls fileReference="_102047_/l1/inicio/layer_3_domain/entities/telefonePessoa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "TelefonePessoa",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "TelefonePessoa",
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
        "name": "details.identification.countryCode",
        "type": "string"
      },
      {
        "name": "details.identification.tags",
        "type": "string",
        "derived": true
      },
      {
        "name": "details.identification.createdAt",
        "type": "string",
        "derived": true
      },
      {
        "name": "details.identification.updatedAt",
        "type": "string",
        "derived": true
      },
      {
        "name": "details.base",
        "type": "object"
      },
      {
        "name": "details.contactChannel",
        "type": "object"
      },
      {
        "name": "details.contactChannel.contactType",
        "type": "enum"
      },
      {
        "name": "details.contactChannel.value",
        "type": "string"
      },
      {
        "name": "details.contactChannel.isVerified",
        "type": "boolean"
      },
      {
        "name": "details.contactChannel.verifiedAt",
        "type": "timestamp"
      },
      {
        "name": "details.general",
        "type": "object"
      },
      {
        "name": "details.inicio",
        "type": "object"
      }
    ],
    "lifecycle": {
      "states": [],
      "transitions": []
    },
    "invariants": [
      "telefoneOpcional",
      "telefoneSemDuplicarVinculo"
    ],
    "imports": []
  }
} as const;

export default definition;
