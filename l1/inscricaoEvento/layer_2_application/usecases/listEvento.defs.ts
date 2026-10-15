/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/listEvento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listEvento",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/eventoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/evento.defs.ts",
    "_102047_/l4/inscricaoEvento/ontology/Evento.defs.ts"
  ],
  "data": {
    "usecaseId": "listEvento",
    "entityId": "Evento",
    "operation": "list",
    "ports": [
      "EventoRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listEvento",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Evento.id"
          },
          {
            "name": "title",
            "type": "string",
            "fieldRef": "Evento.title"
          },
          {
            "name": "eventDate",
            "type": "timestamp",
            "fieldRef": "Evento.eventDate"
          },
          {
            "name": "status",
            "type": "enum",
            "fieldRef": "Evento.status"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "Evento.details"
          },
          {
            "name": "details.description",
            "type": "text",
            "fieldRef": "Evento.details.description"
          },
          {
            "name": "details.venue",
            "type": "object",
            "fieldRef": "Evento.details.venue"
          },
          {
            "name": "details.venue.name",
            "type": "string",
            "fieldRef": "Evento.details.venue.name"
          },
          {
            "name": "details.venue.address",
            "type": "object",
            "fieldRef": "Evento.details.venue.address"
          },
          {
            "name": "details.venue.address.line1",
            "type": "string",
            "fieldRef": "Evento.details.venue.address.line1"
          },
          {
            "name": "details.venue.address.line2",
            "type": "string",
            "fieldRef": "Evento.details.venue.address.line2"
          },
          {
            "name": "details.venue.address.city",
            "type": "string",
            "fieldRef": "Evento.details.venue.address.city"
          },
          {
            "name": "details.venue.address.stateOrProvince",
            "type": "string",
            "fieldRef": "Evento.details.venue.address.stateOrProvince"
          },
          {
            "name": "details.venue.address.postalCode",
            "type": "string",
            "fieldRef": "Evento.details.venue.address.postalCode"
          },
          {
            "name": "details.venue.address.countryCode",
            "type": "string",
            "fieldRef": "Evento.details.venue.address.countryCode"
          },
          {
            "name": "details.capacity",
            "type": "integer",
            "fieldRef": "Evento.details.capacity"
          },
          {
            "name": "details.publishedAt",
            "type": "timestamp",
            "fieldRef": "Evento.details.publishedAt"
          },
          {
            "name": "details.occupiedSeats",
            "type": "integer",
            "fieldRef": "Evento.details.occupiedSeats"
          },
          {
            "name": "details.remainingSeats",
            "type": "integer",
            "fieldRef": "Evento.details.remainingSeats"
          },
          {
            "name": "details.waitlistSize",
            "type": "integer",
            "fieldRef": "Evento.details.waitlistSize"
          },
          {
            "name": "details.isFull",
            "type": "boolean",
            "fieldRef": "Evento.details.isFull"
          },
          {
            "name": "page",
            "type": "number"
          },
          {
            "name": "pageSize",
            "type": "number"
          }
        ],
        "output": [
          {
            "name": "items",
            "type": "Evento"
          },
          {
            "name": "hasMore",
            "type": "boolean"
          }
        ]
      }
    ],
    "portCalls": [
      "list"
    ],
    "transactional": false,
    "effects": [],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "port",
        "call": "list",
        "port": "EventoRepository"
      }
    ],
    "uses": [
      {
        "path": "details.isFull",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "details.occupiedSeats",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "details.publishedAt",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "details.remainingSeats",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "details.waitlistSize",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "id",
        "role": "filter",
        "source": "input"
      }
    ],
    "rules": [],
    "rulePlan": [
      {
        "ruleId": "publicarExigeDadosCompletos",
        "origin": "l4/inscricaoEvento/ontology/Evento.defs.ts#rules",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      }
    ],
    "transaction": {
      "boundary": "none"
    }
  }
} as const;

export default definition;
