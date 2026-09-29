/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listMovimentacaoEstoque",
  "moduleName": "controleEstoque",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.defs.ts",
    "_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.defs.ts",
    "_102047_/l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
    "_102047_/l2/controleEstoque/web/contracts/produtos.defs.ts",
    "_102047_/l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts"
  ],
  "data": {
    "usecaseId": "listMovimentacaoEstoque",
    "entityId": "MovimentacaoEstoque",
    "operation": "list",
    "ports": [
      "MovimentacaoEstoqueRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listMovimentacaoEstoque",
        "input": [
          {
            "name": "id",
            "type": "string",
            "fieldRef": "MovimentacaoEstoque.id"
          },
          {
            "name": "produtoId",
            "type": "string",
            "fieldRef": "MovimentacaoEstoque.produtoId"
          },
          {
            "name": "movimentadoEm",
            "type": "string",
            "fieldRef": "MovimentacaoEstoque.movimentadoEm"
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
            "fieldRef": "MovimentacaoEstoque.id"
          },
          {
            "name": "version",
            "type": "number",
            "fieldRef": "MovimentacaoEstoque.version"
          },
          {
            "name": "produtoId",
            "type": "string",
            "fieldRef": "MovimentacaoEstoque.produtoId"
          },
          {
            "name": "movimentadoEm",
            "type": "string",
            "fieldRef": "MovimentacaoEstoque.movimentadoEm"
          },
          {
            "name": "details",
            "type": "{ \"tipo\": \"entrada\" | \"saida\"; \"quantidade\": number; }",
            "fieldRef": "MovimentacaoEstoque.details"
          },
          {
            "name": "movimentacaoEstoqueProduto",
            "type": "{ \"id\": string; \"details\"?: { \"identification\"?: { \"name\": string; }; }; }"
          }
        ],
        "contractRefs": [
          {
            "route": "controleEstoque.movimentacoes.qryListMovimentacaoEstoque",
            "symbol": "ListMovimentacaoEstoqueOutput"
          },
          {
            "route": "controleEstoque.produtos.qryListMovimentacaoEstoque",
            "symbol": "ListMovimentacaoEstoqueOutput"
          }
        ]
      }
    ],
    "routeProjections": [
      {
        "route": "controleEstoque.movimentacoes.qryListMovimentacaoEstoque",
        "contractPath": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
        "projection": "declared",
        "outputFields": [
          "id",
          "version",
          "produtoId",
          "movimentadoEm",
          "details",
          "movimentacaoEstoqueProduto"
        ]
      },
      {
        "route": "controleEstoque.produtos.qryListMovimentacaoEstoque",
        "contractPath": "l2/controleEstoque/web/contracts/produtos.defs.ts",
        "projection": "declared",
        "outputFields": [
          "id",
          "version",
          "produtoId",
          "movimentadoEm",
          "details",
          "movimentacaoEstoqueProduto"
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
        "port": "MovimentacaoEstoqueRepository"
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
    "rulePlan": [],
    "transaction": {
      "boundary": "none"
    }
  }
} as const;

export default definition;
