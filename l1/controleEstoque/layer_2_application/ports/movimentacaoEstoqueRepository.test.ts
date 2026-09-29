/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.test.ts" enhancement="_blank"/>

// Behaviour cases of this unit, as data. The monitor runs them from the module scenario catalog.
export const scenarioCases = {
  "scenarioId": "MovimentacaoEstoqueRepository",
  "handlerId": "structure.repositoryPort",
  "source": "_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.defs.ts",
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
} as const;
