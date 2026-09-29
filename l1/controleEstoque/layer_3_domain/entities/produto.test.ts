/// <mls fileReference="_102047_/l1/controleEstoque/layer_3_domain/entities/produto.test.ts" enhancement="_blank"/>

// Behaviour cases of this unit, as data. The monitor runs them from the module scenario catalog.
export const scenarioCases = {
  "scenarioId": "Produto",
  "handlerId": "structure.domainEntity",
  "source": "_102047_/l1/controleEstoque/layer_3_domain/entities/produto.defs.ts",
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
} as const;
