/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_3_domain/entities/evento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "Evento",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "Evento",
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
        "name": "title",
        "type": "string"
      },
      {
        "name": "eventDate",
        "type": "timestamp"
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
        "name": "details.description",
        "type": "text"
      },
      {
        "name": "details.venue",
        "type": "object"
      },
      {
        "name": "details.venue.name",
        "type": "string"
      },
      {
        "name": "details.venue.address",
        "type": "object"
      },
      {
        "name": "details.venue.address.line1",
        "type": "string"
      },
      {
        "name": "details.venue.address.line2",
        "type": "string"
      },
      {
        "name": "details.venue.address.city",
        "type": "string"
      },
      {
        "name": "details.venue.address.stateOrProvince",
        "type": "string"
      },
      {
        "name": "details.venue.address.postalCode",
        "type": "string"
      },
      {
        "name": "details.venue.address.countryCode",
        "type": "string"
      },
      {
        "name": "details.capacity",
        "type": "integer"
      },
      {
        "name": "details.publishedAt",
        "type": "timestamp",
        "derived": true
      },
      {
        "name": "details.occupiedSeats",
        "type": "integer",
        "derived": true
      },
      {
        "name": "details.remainingSeats",
        "type": "integer",
        "derived": true
      },
      {
        "name": "details.waitlistSize",
        "type": "integer",
        "derived": true
      },
      {
        "name": "details.isFull",
        "type": "boolean",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [
        {
          "state": "draft",
          "reachedBy": "actor"
        },
        {
          "state": "published",
          "reachedBy": "actor"
        }
      ],
      "transitions": [
        {
          "transitionId": "publicar",
          "from": [
            "draft"
          ],
          "to": "published",
          "by": [
            "organizador"
          ],
          "ruleRefs": [
            "publicarExigeDadosCompletos"
          ]
        }
      ]
    },
    "invariants": [
      "publicarExigeDadosCompletos",
      "inscricaoSomenteEventoPublicado",
      "vagasNaoMenorQueOcupadas",
      "inscricaoExcedenteVaiParaListaEspera"
    ],
    "imports": []
  }
} as const;

export default definition;
