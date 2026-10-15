/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/getInscricao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getInscricao",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/inscricaoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/inscricao.defs.ts",
    "_102047_/l4/inscricaoEvento/ontology/Inscricao.defs.ts"
  ],
  "data": {
    "usecaseId": "getInscricao",
    "entityId": "Inscricao",
    "operation": "get",
    "ports": [
      "InscricaoRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "getInscricao",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Inscricao.id"
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
      "get"
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
        "call": "get",
        "port": "InscricaoRepository"
      }
    ],
    "uses": [
      {
        "path": "id",
        "role": "filter",
        "source": "input"
      }
    ],
    "rules": [],
    "rulePlan": [
      {
        "ruleId": "cancelamentoSomentePropriaInscricao",
        "origin": "l4/inscricaoEvento/ontology/Inscricao.defs.ts#rules",
        "consumer": "operation:get",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "ordemChegadaListaEspera",
        "origin": "l4/inscricaoEvento/ontology/Inscricao.defs.ts#rules",
        "consumer": "operation:get",
        "enforcement": "pending",
        "gap": "APPLICABILITY_UNDECLARED"
      },
      {
        "ruleId": "promoverPrimeiroListaEsperaAoCancelar",
        "origin": "l4/inscricaoEvento/ontology/Inscricao.defs.ts#rules",
        "consumer": "operation:get",
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
