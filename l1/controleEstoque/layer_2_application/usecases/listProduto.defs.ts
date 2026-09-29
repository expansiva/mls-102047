/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/listProduto.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listProduto",
  "moduleName": "controleEstoque",
  "status": "generated",
  "dependencies": [
    "_102034_/l4/ontology/mdm.defs.ts",
    "_102047_/l1/controleEstoque/layer_3_domain/entities/produto.defs.ts",
    "_102047_/l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
    "_102047_/l2/controleEstoque/web/contracts/produtos.defs.ts",
    "_102047_/l4/controleEstoque/ontology/Produto.defs.ts"
  ],
  "data": {
    "usecaseId": "listProduto",
    "entityId": "Produto",
    "operation": "list",
    "ports": [],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listProduto",
        "input": [
          {
            "name": "id",
            "type": "string",
            "fieldRef": "Produto.id"
          },
          {
            "name": "details",
            "type": "{ \"identification\"?: { \"subtype\"?: \"Product\"; \"name\"?: string; \"status\"?: \"Active\" | \"Inactive\" | \"Merged\" | \"Blocked\"; }; }",
            "fieldRef": "Produto.details"
          },
          {
            "name": "page",
            "type": "number"
          }
        ],
        "output": [
          {
            "name": "id",
            "type": "string",
            "fieldRef": "Produto.id"
          },
          {
            "name": "version",
            "type": "number",
            "fieldRef": "Produto.version"
          },
          {
            "name": "details",
            "type": "{ \"identification\"?: { \"subtype\": \"Product\"; \"name\": string; \"status\": \"Active\" | \"Inactive\" | \"Merged\" | \"Blocked\"; }; \"base\"?: object; \"product\"?: { \"unitOfMeasure\": string; }; \"general\"?: object; \"controleEstoque\"?: { \"quantidadeMinima\": number; \"saldoAtual\"?: number; \"saldoAbaixoDoMinimo\"?: boolean; }; }",
            "fieldRef": "Produto.details"
          }
        ],
        "contractRefs": [
          {
            "route": "controleEstoque.movimentacoes.qryListProduto",
            "symbol": "ListProdutoOutput"
          },
          {
            "route": "controleEstoque.produtos.qryListProduto",
            "symbol": "ListProdutoOutput"
          }
        ]
      }
    ],
    "routeProjections": [
      {
        "route": "controleEstoque.movimentacoes.qryListProduto",
        "contractPath": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "projection": "declared",
        "outputFields": [
          "id",
          "version",
          "details"
        ]
      },
      {
        "route": "controleEstoque.produtos.qryListProduto",
        "contractPath": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "projection": "declared",
        "outputFields": [
          "id",
          "version",
          "details"
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
      },
      {
        "kind": "mdm",
        "namespace": "controleEstoque",
        "call": "listByType",
        "entity": "Produto",
        "capability": "locate.byName"
      }
    ],
    "uses": [
      {
        "path": "details.identification.status",
        "role": "filter",
        "source": "input"
      },
      {
        "path": "details.identification.subtype",
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
        "ruleId": "rule-document-shape-validated",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-document-shape-validated",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "DELEGATION_UNPROVEN"
      },
      {
        "ruleId": "rule-foreign-namespace-refused",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-foreign-namespace-refused",
        "consumer": "operation:list",
        "enforcement": "pending",
        "gap": "DELEGATION_UNPROVEN"
      },
      {
        "ruleId": "rule-identity-never-in-namespace",
        "origin": "/_102034_/l4/ontology/mdm.defs.ts#rule-identity-never-in-namespace",
        "consumer": "operation:list",
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
      "atomic": false,
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
          "when": [
            {
              "kind": "contract",
              "path": "id",
              "present": true
            }
          ],
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
        },
        {
          "id": "listByName",
          "method": "listByType",
          "target": "collection",
          "shape": "collection",
          "capabilities": [
            "locate.byName"
          ],
          "alternative": false,
          "when": [
            {
              "kind": "contract",
              "path": "details.identification.name",
              "present": true
            }
          ],
          "arguments": [
            {
              "name": "type",
              "role": "parameter",
              "origin": {
                "kind": "literal",
                "evidence": "role"
              },
              "value": "controleEstoque.Produto"
            },
            {
              "name": "name",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "details.identification.name"
              },
              "path": "details.identification.name"
            }
          ],
          "result": [
            "items",
            "page",
            "pageSize",
            "total"
          ]
        }
      ]
    }
  }
} as const;

export default definition;
