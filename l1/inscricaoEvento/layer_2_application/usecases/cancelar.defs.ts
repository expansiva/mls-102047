/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/cancelar.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "cancelar",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/inscricaoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/inscricao.defs.ts",
    "_102047_/l4/inscricaoEvento/integration.defs.ts",
    "_102047_/l4/inscricaoEvento/ontology/Inscricao.defs.ts",
    "_102047_/l4/inscricaoEvento/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "cancelar",
    "entityId": "Inscricao",
    "operation": "transition",
    "ports": [
      "InscricaoRepository"
    ],
    "rulesApplied": [
      "cancelamentoSomentePropriaInscricao",
      "promoverPrimeiroListaEsperaAoCancelar"
    ],
    "functions": [
      {
        "functionName": "cancelar",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Inscricao.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Inscricao.version"
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Inscricao.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Inscricao.version"
          },
          {
            "name": "registrationCode",
            "type": "string",
            "fieldRef": "Inscricao.registrationCode"
          },
          {
            "name": "eventoId",
            "type": "record",
            "fieldRef": "Inscricao.eventoId"
          },
          {
            "name": "participanteId",
            "type": "record",
            "fieldRef": "Inscricao.participanteId"
          },
          {
            "name": "status",
            "type": "enum",
            "fieldRef": "Inscricao.status"
          },
          {
            "name": "receivedAt",
            "type": "timestamp",
            "fieldRef": "Inscricao.receivedAt"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "Inscricao.details"
          },
          {
            "name": "details.promotedAt",
            "type": "timestamp",
            "fieldRef": "Inscricao.details.promotedAt"
          },
          {
            "name": "details.cancelledAt",
            "type": "timestamp",
            "fieldRef": "Inscricao.details.cancelledAt"
          },
          {
            "name": "details.posicaoListaEspera",
            "type": "integer",
            "fieldRef": "Inscricao.details.posicaoListaEspera"
          },
          {
            "name": "details.ocupaVaga",
            "type": "boolean",
            "fieldRef": "Inscricao.details.ocupaVaga"
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
        "eventId": "inscricaoCancelada",
        "path": "l4/inscricaoEvento/integration.defs.ts",
        "symbol": "inscricaoCancelada"
      }
    ],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "rule",
        "ruleId": "cancelamentoSomentePropriaInscricao"
      },
      {
        "kind": "rule",
        "ruleId": "promoverPrimeiroListaEsperaAoCancelar"
      },
      {
        "kind": "transition",
        "transitionId": "cancelar",
        "payload": []
      },
      {
        "kind": "port",
        "call": "transition",
        "port": "InscricaoRepository"
      },
      {
        "kind": "effect",
        "eventId": "inscricaoCancelada"
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
        "ruleId": "cancelamentoSomentePropriaInscricao",
        "path": "l4/inscricaoEvento/rules.defs.ts",
        "symbol": "cancelamentoSomentePropriaInscricao"
      },
      {
        "ruleId": "promoverPrimeiroListaEsperaAoCancelar",
        "path": "l4/inscricaoEvento/rules.defs.ts",
        "symbol": "promoverPrimeiroListaEsperaAoCancelar"
      }
    ],
    "rulePlan": [
      {
        "ruleId": "cancelamentoSomentePropriaInscricao",
        "origin": "l4/inscricaoEvento/ontology/Inscricao.defs.ts#transitions.cancelar.ruleRefs",
        "consumer": "usecase:cancelar",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "promoverPrimeiroListaEsperaAoCancelar",
        "origin": "l4/inscricaoEvento/ontology/Inscricao.defs.ts#transitions.cancelar.ruleRefs",
        "consumer": "usecase:cancelar",
        "enforcement": "local",
        "gap": ""
      }
    ],
    "transaction": {
      "boundary": "none"
    },
    "transitionRef": "cancelar",
    "lifecycle": {
      "transitionId": "cancelar",
      "payload": [],
      "sourcePath": "l4/inscricaoEvento/ontology/Inscricao.defs.ts",
      "symbol": "cancelar"
    }
  }
} as const;

export default definition;
