/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/createInscricao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createInscricao",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/inscricaoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/inscricao.defs.ts",
    "_102047_/l4/inscricaoEvento/ontology/Inscricao.defs.ts",
    "_102047_/l4/inscricaoEvento/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "createInscricao",
    "entityId": "Inscricao",
    "operation": "create",
    "ports": [
      "InscricaoRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "createInscricao",
        "input": [
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
        "port": "InscricaoRepository"
      }
    ],
    "uses": [],
    "rules": [],
    "rulePlan": [
      {
        "ruleId": "inscricaoSomenteEventoPublicado",
        "origin": "l4/inscricaoEvento/rules.defs.ts#inscricaoSomenteEventoPublicado",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      },
      {
        "ruleId": "inscricaoUnicaPorEmailEvento",
        "origin": "l4/inscricaoEvento/rules.defs.ts#inscricaoUnicaPorEmailEvento",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      },
      {
        "ruleId": "",
        "origin": "l4/inscricaoEvento/ontology/Inscricao.defs.ts#uniqueKeys",
        "consumer": "operation:create",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "listaEsperaQuandoVagasEsgotadas",
        "origin": "l4/inscricaoEvento/rules.defs.ts#listaEsperaQuandoVagasEsgotadas",
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
