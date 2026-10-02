/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/getProduto.test.ts" enhancement="_blank"/>

// Behaviour cases of this unit, as data. The monitor runs them from the module scenario catalog.
export const scenarioCases = {
  "scenarioId": "getProduto",
  "handlerId": "structure.usecase",
  "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/getProduto.defs.ts",
  "cases": [
    {
      "caseId": "getProduto.compile",
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
      "caseId": "getProduto.reachesStub",
      "gate": "business",
      "source": "_102047_/l1/controleEstoque/layer_2_application/usecases/getProduto.defs.ts#operation",
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
        "caseId": "getProduto.reachesStub",
        "stage": "structure",
        "errorCode": "USECASE_NOT_IMPLEMENTED",
        "status": 501
      },
      "mandatory": true,
      "synthetic": []
    }
  ]
} as const;
