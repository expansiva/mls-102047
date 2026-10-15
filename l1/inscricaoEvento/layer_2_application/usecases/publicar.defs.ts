/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/publicar.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "publicar",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/eventoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/evento.defs.ts",
    "_102047_/l4/inscricaoEvento/integration.defs.ts",
    "_102047_/l4/inscricaoEvento/ontology/Evento.defs.ts",
    "_102047_/l4/inscricaoEvento/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "publicar",
    "entityId": "Evento",
    "operation": "transition",
    "ports": [
      "EventoRepository"
    ],
    "rulesApplied": [
      "publicarExigeDadosCompletos"
    ],
    "functions": [
      {
        "functionName": "publicar",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Evento.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Evento.version"
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Evento.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Evento.version"
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
          }
        ]
      }
    ],
    "portCalls": [
      "transition"
    ],
    "transactional": false,
    "effects": [
      {
        "eventId": "eventoPublicado",
        "path": "l4/inscricaoEvento/integration.defs.ts",
        "symbol": "eventoPublicado"
      }
    ],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "rule",
        "ruleId": "publicarExigeDadosCompletos"
      },
      {
        "kind": "transition",
        "transitionId": "publicar",
        "payload": []
      },
      {
        "kind": "port",
        "call": "transition",
        "port": "EventoRepository"
      },
      {
        "kind": "effect",
        "eventId": "eventoPublicado"
      }
    ],
    "uses": [
      {
        "path": "id",
        "role": "selector",
        "source": "input"
      },
      {
        "path": "version",
        "role": "concurrency",
        "source": "input"
      }
    ],
    "rules": [
      {
        "ruleId": "publicarExigeDadosCompletos",
        "path": "l4/inscricaoEvento/rules.defs.ts",
        "symbol": "publicarExigeDadosCompletos"
      }
    ],
    "rulePlan": [
      {
        "ruleId": "publicarExigeDadosCompletos",
        "origin": "l4/inscricaoEvento/ontology/Evento.defs.ts#transitions.publicar.ruleRefs",
        "consumer": "usecase:publicar",
        "enforcement": "local",
        "gap": ""
      }
    ],
    "transaction": {
      "boundary": "none"
    },
    "transitionRef": "publicar",
    "lifecycle": {
      "transitionId": "publicar",
      "payload": [],
      "sourcePath": "l4/inscricaoEvento/ontology/Evento.defs.ts",
      "symbol": "publicar"
    }
  }
} as const;

export default definition;
