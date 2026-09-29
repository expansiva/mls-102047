/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/auth/authorityMap.test.ts" enhancement="_blank"/>

// Behaviour cases of this unit, as data. The monitor runs them from the module scenario catalog.
export const scenarioCases = {
  "scenarioId": "authorityMap",
  "handlerId": "structure.authorityMap",
  "source": "_102047_/l1/controleEstoque/layer_1_external/auth/authorityMap.defs.ts",
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
} as const;
