/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/scope/accessScope.test.ts" enhancement="_blank"/>

// Behaviour cases of this unit, as data. The monitor runs them from the module scenario catalog.
export const scenarioCases = {
  "scenarioId": "accessScope",
  "handlerId": "structure.accessScope",
  "source": "_102047_/l1/controleEstoque/layer_2_application/scope/accessScope.defs.ts",
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
} as const;
