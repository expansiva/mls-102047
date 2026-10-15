/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/createEvento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createEvento",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/eventoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/evento.defs.ts",
    "_102047_/l4/inscricaoEvento/ontology/Evento.defs.ts",
    "_102047_/l4/inscricaoEvento/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "createEvento",
    "entityId": "Evento",
    "operation": "create",
    "ports": [
      "EventoRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "createEvento",
        "input": [
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
      "create"
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
        "call": "create",
        "port": "EventoRepository"
      }
    ],
    "uses": [],
    "rules": [],
    "rulePlan": [
      {
        "ruleId": "inscricaoExcedenteVaiParaListaEspera",
        "origin": "l4/inscricaoEvento/rules.defs.ts#inscricaoExcedenteVaiParaListaEspera",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      },
      {
        "ruleId": "inscricaoSomenteEventoPublicado",
        "origin": "l4/inscricaoEvento/rules.defs.ts#inscricaoSomenteEventoPublicado",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      },
      {
        "ruleId": "vagasNaoMenorQueOcupadas",
        "origin": "l4/inscricaoEvento/rules.defs.ts#vagasNaoMenorQueOcupadas",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      }
    ],
    "transaction": {
      "boundary": "none"
    }
  }
} as const;

export default definition;
