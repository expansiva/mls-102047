/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/createMesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createMesa",
  "moduleName": "comandaRestaurante",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.defs.ts",
    "_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.defs.ts",
    "_102047_/l4/comandaRestaurante/ontology/Mesa.defs.ts",
    "_102047_/l4/comandaRestaurante/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "createMesa",
    "entityId": "Mesa",
    "operation": "create",
    "ports": [
      "MesaRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "createMesa",
        "input": [
          {
            "name": "code",
            "type": "string",
            "fieldRef": "Mesa.code"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "Mesa.details"
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Mesa.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Mesa.version"
          },
          {
            "name": "code",
            "type": "string",
            "fieldRef": "Mesa.code"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "Mesa.details"
          },
          {
            "name": "details.disponivel",
            "type": "boolean",
            "fieldRef": "Mesa.details.disponivel"
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
        "port": "MesaRepository"
      }
    ],
    "uses": [],
    "rules": [],
    "rulePlan": [
      {
        "ruleId": "",
        "origin": "l4/comandaRestaurante/ontology/Mesa.defs.ts#uniqueKeys",
        "consumer": "operation:create",
        "enforcement": "local",
        "gap": ""
      },
      {
        "ruleId": "mesaDisponivelParaAbrirComanda",
        "origin": "l4/comandaRestaurante/rules.defs.ts#mesaDisponivelParaAbrirComanda",
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
