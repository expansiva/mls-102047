/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.test.ts" enhancement="_blank"/>

// Behaviour cases of this unit, as data. The monitor runs them from the module scenario catalog.
export const scenarioCases = {
  "scenarioId": "produtos",
  "handlerId": "structure.httpController",
  "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.defs.ts",
  "cases": [
    {
      "caseId": "produtos.auth.cmdCreateMovimentacaoEstoque",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.defs.ts#controleEstoque.produtos.cmdCreateMovimentacaoEstoque",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.produtos.cmdCreateMovimentacaoEstoque",
      "mutating": false,
      "expect": {
        "ok": false,
        "status": 403,
        "errorCode": "FORBIDDEN_ACTOR",
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": null,
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": []
      },
      "mandatory": true,
      "synthetic": []
    },
    {
      "caseId": "produtos.auth.cmdCreateProduto",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.defs.ts#controleEstoque.produtos.cmdCreateProduto",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.produtos.cmdCreateProduto",
      "mutating": false,
      "expect": {
        "ok": false,
        "status": 403,
        "errorCode": "FORBIDDEN_ACTOR",
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": null,
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": []
      },
      "mandatory": true,
      "synthetic": []
    },
    {
      "caseId": "produtos.auth.qryListMovimentacaoEstoque",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.defs.ts#controleEstoque.produtos.qryListMovimentacaoEstoque",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.produtos.qryListMovimentacaoEstoque",
      "mutating": false,
      "expect": {
        "ok": false,
        "status": 403,
        "errorCode": "FORBIDDEN_ACTOR",
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": null,
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": []
      },
      "mandatory": true,
      "synthetic": []
    },
    {
      "caseId": "produtos.auth.qryListProduto",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.defs.ts#controleEstoque.produtos.qryListProduto",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.produtos.qryListProduto",
      "mutating": false,
      "expect": {
        "ok": false,
        "status": 403,
        "errorCode": "FORBIDDEN_ACTOR",
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": null,
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": []
      },
      "mandatory": true,
      "synthetic": []
    },
    {
      "caseId": "produtos.compile",
      "gate": "compile",
      "source": "httpController structure",
      "expectation": "The emitted file imports. A broken import is a failure, not an expected red.",
      "preconditions": [],
      "actorId": "",
      "routine": "",
      "mutating": false,
      "expect": {
        "ok": true,
        "status": 0,
        "errorCode": null,
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": null,
      "runner": "module",
      "mandatory": true,
      "synthetic": []
    }
  ]
} as const;
