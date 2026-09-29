/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createMovimentacaoEstoque",
  "moduleName": "controleEstoque",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.defs.ts",
    "_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.defs.ts",
    "_102047_/l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
    "_102047_/l2/controleEstoque/web/contracts/produtos.defs.ts",
    "_102047_/l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts",
    "_102047_/l4/controleEstoque/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "createMovimentacaoEstoque",
    "entityId": "MovimentacaoEstoque",
    "operation": "create",
    "ports": [
      "MovimentacaoEstoqueRepository"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "createMovimentacaoEstoque",
        "input": [
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
            "route": "controleEstoque.movimentacoes.cmdCreateMovimentacaoEstoque",
            "symbol": "CreateMovimentacaoEstoqueOutput"
          },
          {
            "route": "controleEstoque.produtos.cmdCreateMovimentacaoEstoque",
            "symbol": "CreateMovimentacaoEstoqueOutput"
          }
        ]
      }
    ],
    "routeProjections": [
      {
        "route": "controleEstoque.movimentacoes.cmdCreateMovimentacaoEstoque",
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
        "route": "controleEstoque.produtos.cmdCreateMovimentacaoEstoque",
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
        "port": "MovimentacaoEstoqueRepository"
      }
    ],
    "uses": [],
    "rules": [],
    "rulePlan": [
      {
        "ruleId": "movimentacaoEstoqueImutavel",
        "origin": "l4/controleEstoque/rules.defs.ts#movimentacaoEstoqueImutavel",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      },
      {
        "ruleId": "quantidadeMovimentadaPositiva",
        "origin": "l4/controleEstoque/rules.defs.ts#quantidadeMovimentadaPositiva",
        "consumer": "operation:create",
        "enforcement": "pending",
        "gap": "RULE_UNBOUND"
      },
      {
        "ruleId": "registroMovimentacaoAtualizaSaldo",
        "origin": "l4/controleEstoque/rules.defs.ts#registroMovimentacaoAtualizaSaldo",
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
