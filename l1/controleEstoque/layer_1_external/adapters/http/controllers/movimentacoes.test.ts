/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.test.ts" enhancement="_blank"/>

// Behaviour cases of this unit, as data. The monitor runs them from the module scenario catalog.
export const scenarioCases = {
  "scenarioId": "movimentacoes",
  "handlerId": "structure.httpController",
  "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts",
  "cases": [
    {
      "caseId": "movimentacoes.auth.load",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.load",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.movimentacoes.load",
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
      "caseId": "movimentacoes.auth.loadMovimentacoes",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.loadMovimentacoes",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.movimentacoes.loadMovimentacoes",
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
      "caseId": "movimentacoes.auth.registrarMovimentacao",
      "gate": "auth",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.registrarMovimentacao",
      "expectation": "An http caller with no authority is refused before the usecase.",
      "preconditions": [
        "verifiedAuthorities is empty",
        "source is http"
      ],
      "actorId": "",
      "routine": "controleEstoque.movimentacoes.registrarMovimentacao",
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
    },
    {
      "caseId": "movimentacoes.contract.registrarMovimentacao.produtoId",
      "gate": "contract",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.registrarMovimentacao",
      "expectation": "Runs as estoquista.",
      "preconditions": [
        "produtoId omitted"
      ],
      "actorId": "estoquista",
      "routine": "controleEstoque.movimentacoes.registrarMovimentacao",
      "mutating": false,
      "expect": {
        "ok": false,
        "status": 400,
        "errorCode": "VALIDATION_ERROR",
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": null,
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": [
          "controleEstoque:estoquista"
        ]
      },
      "mandatory": true,
      "synthetic": []
    },
    {
      "caseId": "movimentacoes.minimal.load",
      "gate": "business",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.load",
      "expectation": "Runs as estoquista.",
      "preconditions": [],
      "actorId": "estoquista",
      "routine": "controleEstoque.movimentacoes.load",
      "mutating": false,
      "expect": {
        "ok": true,
        "status": 200,
        "errorCode": null,
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": {
        "caseId": "movimentacoes.minimal.load",
        "stage": "structure",
        "errorCode": "USECASE_NOT_IMPLEMENTED",
        "status": 501
      },
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": [
          "controleEstoque:estoquista"
        ]
      },
      "mandatory": true,
      "synthetic": []
    },
    {
      "caseId": "movimentacoes.minimal.loadMovimentacoes",
      "gate": "business",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.loadMovimentacoes",
      "expectation": "Runs as estoquista.",
      "preconditions": [],
      "actorId": "estoquista",
      "routine": "controleEstoque.movimentacoes.loadMovimentacoes",
      "mutating": false,
      "expect": {
        "ok": true,
        "status": 200,
        "errorCode": null,
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": {
        "caseId": "movimentacoes.minimal.loadMovimentacoes",
        "stage": "structure",
        "errorCode": "USECASE_NOT_IMPLEMENTED",
        "status": 501
      },
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": [
          "controleEstoque:estoquista"
        ]
      },
      "mandatory": true,
      "synthetic": []
    },
    {
      "caseId": "movimentacoes.shape.load",
      "gate": "business",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.load",
      "expectation": "Runs as estoquista.",
      "preconditions": [],
      "actorId": "estoquista",
      "routine": "controleEstoque.movimentacoes.load",
      "mutating": false,
      "expect": {
        "ok": true,
        "status": 200,
        "errorCode": null,
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": {
        "caseId": "movimentacoes.shape.load",
        "stage": "structure",
        "errorCode": "USECASE_NOT_IMPLEMENTED",
        "status": 501
      },
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": [
          "controleEstoque:estoquista"
        ]
      },
      "mandatory": true,
      "synthetic": []
    },
    {
      "caseId": "movimentacoes.shape.loadMovimentacoes",
      "gate": "business",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.loadMovimentacoes",
      "expectation": "Runs as estoquista.",
      "preconditions": [],
      "actorId": "estoquista",
      "routine": "controleEstoque.movimentacoes.loadMovimentacoes",
      "mutating": false,
      "expect": {
        "ok": true,
        "status": 200,
        "errorCode": null,
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": {
        "caseId": "movimentacoes.shape.loadMovimentacoes",
        "stage": "structure",
        "errorCode": "USECASE_NOT_IMPLEMENTED",
        "status": 501
      },
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": [
          "controleEstoque:estoquista"
        ]
      },
      "mandatory": true,
      "synthetic": []
    },
    {
      "caseId": "movimentacoes.success.registrarMovimentacao",
      "gate": "business",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts#controleEstoque.movimentacoes.registrarMovimentacao",
      "expectation": "Runs as estoquista.",
      "preconditions": [],
      "actorId": "estoquista",
      "routine": "controleEstoque.movimentacoes.registrarMovimentacao",
      "mutating": true,
      "expect": {
        "ok": true,
        "status": 200,
        "errorCode": null,
        "ruleId": null,
        "forbiddenFields": [],
        "isolatedActorField": null
      },
      "expectedFailure": {
        "caseId": "movimentacoes.success.registrarMovimentacao",
        "stage": "structure",
        "errorCode": "USECASE_NOT_IMPLEMENTED",
        "status": 501
      },
      "runner": "route",
      "caller": {
        "source": "http",
        "authorities": [
          "controleEstoque:estoquista"
        ]
      },
      "mandatory": true,
      "synthetic": []
    }
  ]
} as const;
