/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/getProduto.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "getProduto",
  "moduleName": "controleEstoque",
  "status": "generated",
  "dependencies": [
    "_102034_/l4/ontology/mdm.defs.ts",
    "_102047_/l1/controleEstoque/layer_3_domain/entities/produto.defs.ts",
    "_102047_/l4/controleEstoque/ontology/Produto.defs.ts"
  ],
  "data": {
    "usecaseId": "getProduto",
    "entityId": "Produto",
    "operation": "get",
    "ports": [],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "getProduto",
        "input": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Produto.id"
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "uuid",
            "fieldRef": "Produto.id"
          },
          {
            "name": "version",
            "type": "integer",
            "fieldRef": "Produto.version"
          },
          {
            "name": "details",
            "type": "object",
            "fieldRef": "Produto.details"
          },
          {
            "name": "details.identification",
            "type": "object",
            "fieldRef": "Produto.details.identification"
          },
          {
            "name": "details.identification.subtype",
            "type": "enum",
            "fieldRef": "Produto.details.identification.subtype"
          },
          {
            "name": "details.identification.name",
            "type": "string",
            "fieldRef": "Produto.details.identification.name"
          },
          {
            "name": "details.identification.status",
            "type": "enum",
            "fieldRef": "Produto.details.identification.status"
          },
          {
            "name": "details.base",
            "type": "object",
            "fieldRef": "Produto.details.base"
          },
          {
            "name": "details.product",
            "type": "object",
            "fieldRef": "Produto.details.product"
          },
          {
            "name": "details.product.unitOfMeasure",
            "type": "string",
            "fieldRef": "Produto.details.product.unitOfMeasure"
          },
          {
            "name": "details.general",
            "type": "object",
            "fieldRef": "Produto.details.general"
          },
          {
            "name": "details.controleEstoque",
            "type": "object",
            "fieldRef": "Produto.details.controleEstoque"
          },
          {
            "name": "details.controleEstoque.quantidadeMinima",
            "type": "number",
            "fieldRef": "Produto.details.controleEstoque.quantidadeMinima"
          },
          {
            "name": "details.controleEstoque.saldoAtual",
            "type": "number",
            "fieldRef": "Produto.details.controleEstoque.saldoAtual"
          },
          {
            "name": "details.controleEstoque.saldoAbaixoDoMinimo",
            "type": "boolean",
            "fieldRef": "Produto.details.controleEstoque.saldoAbaixoDoMinimo"
          }
        ]
      }
    ],
    "portCalls": [],
    "transactional": false,
    "effects": [],
    "sequence": [
      {
        "kind": "context",
        "source": "ctx"
      },
      {
        "kind": "mdm",
        "namespace": "controleEstoque",
        "call": "get",
        "entity": "Produto",
        "capability": "read.byId"
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
        "ruleId": "rule-document-shape-validated",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-document-shape-validated",
        "consumer": "operation:get",
        "enforcement": "pending",
        "gap": "DELEGATION_UNPROVEN"
      },
      {
        "ruleId": "rule-foreign-namespace-refused",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-foreign-namespace-refused",
        "consumer": "operation:get",
        "enforcement": "pending",
        "gap": "DELEGATION_UNPROVEN"
      },
      {
        "ruleId": "rule-identity-never-in-namespace",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-identity-never-in-namespace",
        "consumer": "operation:get",
        "enforcement": "pending",
        "gap": "DELEGATION_UNPROVEN"
      }
    ],
    "transaction": {
      "boundary": "none"
    },
    "mdm": {
      "namespace": "controleEstoque",
      "role": "controleEstoque.Produto",
      "atomic": true,
      "calls": [
        {
          "id": "get",
          "method": "get",
          "target": "entity",
          "shape": "point",
          "capabilities": [
            "read.byId"
          ],
          "alternative": false,
          "when": [],
          "arguments": [
            {
              "name": "mdmId",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "id"
              },
              "path": "id"
            }
          ],
          "result": [
            "mdmId",
            "version",
            "details"
          ]
        }
      ]
    }
  }
} as const;

export default definition;
