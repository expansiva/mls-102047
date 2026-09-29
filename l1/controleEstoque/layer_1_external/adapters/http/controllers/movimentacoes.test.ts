/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.test.ts" enhancement="_blank"/>

// Behaviour cases of this unit, as data. The monitor runs them from the module scenario catalog.
export const scenarioCases = {
  "scenarioId": "movimentacoes",
  "handlerId": "structure.httpController",
  "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts",
  "cases": [
    {
      "caseId": "movimentacoes.auth.cmdCreateMovimentacaoEstoque",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.cmdCreateMovimentacaoEstoque",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.movimentacoes.cmdCreateMovimentacaoEstoque",
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
      "caseId": "movimentacoes.auth.qryListMovimentacaoEstoque",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.qryListMovimentacaoEstoque",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.movimentacoes.qryListMovimentacaoEstoque",
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
      "caseId": "movimentacoes.auth.qryListProduto",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.qryListProduto",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.movimentacoes.qryListProduto",
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
      "caseId": "movimentacoes.compile",
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
