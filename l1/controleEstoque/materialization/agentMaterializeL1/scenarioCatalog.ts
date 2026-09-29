/// <mls fileReference="_102047_/l1/controleEstoque/materialization/agentMaterializeL1/scenarioCatalog.ts" enhancement="_blank"/>

// Declarative backend scenarios. A server loads this module as data.
export const scenarioCatalog = {
  "schemaVersion": "2026-09-26-m1-scenario-catalog-v1.1",
  "moduleName": "controleEstoque",
  "store": "memory",
  "scenarios": [
    {
      "scenarioId": "MovimentacaoEstoque",
      "source": "_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.defs.ts",
      "artifactType": "domainEntity",
      "artifactId": "MovimentacaoEstoque",
      "handlerId": "structure.domainEntity",
      "productionFile": "_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.test.ts",
      "cases": [
        {
          "caseId": "MovimentacaoEstoque.compile",
          "gate": "compile",
          "source": "domainEntity structure",
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
    },
    {
      "scenarioId": "MovimentacaoEstoqueRepository",
      "source": "_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.defs.ts",
      "artifactType": "repositoryPort",
      "artifactId": "MovimentacaoEstoqueRepository",
      "handlerId": "structure.repositoryPort",
      "productionFile": "_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.test.ts",
      "cases": [
        {
          "caseId": "MovimentacaoEstoqueRepository.compile",
          "gate": "compile",
          "source": "repositoryPort structure",
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
    },
    {
      "scenarioId": "Produto",
      "source": "_102047_/l1/controleEstoque/layer_3_domain/entities/produto.defs.ts",
      "artifactType": "domainEntity",
      "artifactId": "Produto",
      "handlerId": "structure.domainEntity",
      "productionFile": "_102047_/l1/controleEstoque/layer_3_domain/entities/produto.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_3_domain/entities/produto.test.ts",
      "cases": [
        {
          "caseId": "Produto.compile",
          "gate": "compile",
          "source": "domainEntity structure",
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
    },
    {
      "scenarioId": "accessScope",
      "source": "_102047_/l1/controleEstoque/layer_2_application/scope/accessScope.defs.ts",
      "artifactType": "accessScope",
      "artifactId": "accessScope",
      "handlerId": "structure.accessScope",
      "productionFile": "_102047_/l1/controleEstoque/layer_2_application/scope/accessScope.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_2_application/scope/accessScope.test.ts",
      "cases": [
        {
          "caseId": "accessScope.compile",
          "gate": "compile",
          "source": "accessScope structure",
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
    },
    {
      "scenarioId": "authorityMap",
      "source": "_102047_/l1/controleEstoque/layer_1_external/auth/authorityMap.defs.ts",
      "artifactType": "authorityMap",
      "artifactId": "authorityMap",
      "handlerId": "structure.authorityMap",
      "productionFile": "_102047_/l1/controleEstoque/layer_1_external/auth/authorityMap.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_1_external/auth/authorityMap.test.ts",
      "cases": [
        {
          "caseId": "authorityMap.compile",
          "gate": "compile",
          "source": "authorityMap structure",
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
    },
    {
      "scenarioId": "createMovimentacaoEstoque",
      "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.defs.ts",
      "artifactType": "usecase",
      "artifactId": "createMovimentacaoEstoque",
      "handlerId": "structure.usecase",
      "productionFile": "_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.test.ts",
      "cases": [
        {
          "caseId": "createMovimentacaoEstoque.compile",
          "gate": "compile",
          "source": "usecase structure",
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
          "caseId": "createMovimentacaoEstoque.reachesStub",
          "gate": "business",
          "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.defs.ts#operation",
          "expectation": "A valid call reaches the structure stub. Import, auth and database errors are not this red.",
          "preconditions": [
            "memory store",
            "no database"
          ],
          "actorId": "",
          "routine": "",
          "mutating": false,
          "expect": {
            "ok": true,
            "status": 200,
            "errorCode": null,
            "ruleId": null,
            "forbiddenFields": [],
            "isolatedActorField": null
          },
          "runner": "module",
          "expectedFailure": {
            "caseId": "createMovimentacaoEstoque.reachesStub",
            "stage": "structure",
            "errorCode": "USECASE_NOT_IMPLEMENTED",
            "status": 501
          },
          "mandatory": true,
          "synthetic": []
        }
      ]
    },
    {
      "scenarioId": "createProduto",
      "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/createProduto.defs.ts",
      "artifactType": "usecase",
      "artifactId": "createProduto",
      "handlerId": "structure.usecase",
      "productionFile": "_102047_/l1/controleEstoque/layer_2_application/usecases/createProduto.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_2_application/usecases/createProduto.test.ts",
      "cases": [
        {
          "caseId": "createProduto.compile",
          "gate": "compile",
          "source": "usecase structure",
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
          "caseId": "createProduto.reachesStub",
          "gate": "business",
          "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/createProduto.defs.ts#operation",
          "expectation": "A valid call reaches the structure stub. Import, auth and database errors are not this red.",
          "preconditions": [
            "memory store",
            "no database"
          ],
          "actorId": "",
          "routine": "",
          "mutating": false,
          "expect": {
            "ok": true,
            "status": 200,
            "errorCode": null,
            "ruleId": null,
            "forbiddenFields": [],
            "isolatedActorField": null
          },
          "runner": "module",
          "expectedFailure": {
            "caseId": "createProduto.reachesStub",
            "stage": "structure",
            "errorCode": "USECASE_NOT_IMPLEMENTED",
            "status": 501
          },
          "mandatory": true,
          "synthetic": []
        }
      ]
    },
    {
      "scenarioId": "listMovimentacaoEstoque",
      "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.defs.ts",
      "artifactType": "usecase",
      "artifactId": "listMovimentacaoEstoque",
      "handlerId": "structure.usecase",
      "productionFile": "_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.test.ts",
      "cases": [
        {
          "caseId": "listMovimentacaoEstoque.compile",
          "gate": "compile",
          "source": "usecase structure",
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
          "caseId": "listMovimentacaoEstoque.reachesStub",
          "gate": "business",
          "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.defs.ts#operation",
          "expectation": "A valid call reaches the structure stub. Import, auth and database errors are not this red.",
          "preconditions": [
            "memory store",
            "no database"
          ],
          "actorId": "",
          "routine": "",
          "mutating": false,
          "expect": {
            "ok": true,
            "status": 200,
            "errorCode": null,
            "ruleId": null,
            "forbiddenFields": [],
            "isolatedActorField": null
          },
          "runner": "module",
          "expectedFailure": {
            "caseId": "listMovimentacaoEstoque.reachesStub",
            "stage": "structure",
            "errorCode": "USECASE_NOT_IMPLEMENTED",
            "status": 501
          },
          "mandatory": true,
          "synthetic": []
        }
      ]
    },
    {
      "scenarioId": "listProduto",
      "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/listProduto.defs.ts",
      "artifactType": "usecase",
      "artifactId": "listProduto",
      "handlerId": "structure.usecase",
      "productionFile": "_102047_/l1/controleEstoque/layer_2_application/usecases/listProduto.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_2_application/usecases/listProduto.test.ts",
      "cases": [
        {
          "caseId": "listProduto.compile",
          "gate": "compile",
          "source": "usecase structure",
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
          "caseId": "listProduto.reachesStub",
          "gate": "business",
          "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/listProduto.defs.ts#operation",
          "expectation": "A valid call reaches the structure stub. Import, auth and database errors are not this red.",
          "preconditions": [
            "memory store",
            "no database"
          ],
          "actorId": "",
          "routine": "",
          "mutating": false,
          "expect": {
            "ok": true,
            "status": 200,
            "errorCode": null,
            "ruleId": null,
            "forbiddenFields": [],
            "isolatedActorField": null
          },
          "runner": "module",
          "expectedFailure": {
            "caseId": "listProduto.reachesStub",
            "stage": "structure",
            "errorCode": "USECASE_NOT_IMPLEMENTED",
            "status": 501
          },
          "mandatory": true,
          "synthetic": []
        }
      ]
    },
    {
      "scenarioId": "movimentacoes",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.defs.ts",
      "artifactType": "httpController",
      "artifactId": "movimentacoes",
      "handlerId": "structure.httpController",
      "productionFile": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/movimentacoes.test.ts",
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
    },
    {
      "scenarioId": "produtos",
      "source": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.defs.ts",
      "artifactType": "httpController",
      "artifactId": "produtos",
      "handlerId": "structure.httpController",
      "productionFile": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.ts",
      "testFile": "_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.test.ts",
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
    }
  ]
} as const;
