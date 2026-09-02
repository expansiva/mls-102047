/// <mls fileReference="_102047_/l4/controleChamados/workflows/index.defs.ts" enhancement="_blank"/>

import type { Ns4WorkflowIndexArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosWorkflowIndex = {
  "schemaVersion": "2026-08-12-ns4-workflow-index-v5",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "workflows": [
    {
      "workflowId": "ticketLifecycle",
      "entityRef": "Ticket",
      "workflowHash": "sha256:9ba7fe670b4f9613f58d4fce53ec2293f9ffb0c1f9ba71606d4fc3501f3a4eb6",
      "artifactPath": "l4/controleChamados/workflows/ticketLifecycle.defs.ts"
    }
  ],
  "sourceHashes": {
    "journeys": [
      {
        "journeyId": "commentOpenTicket",
        "businessHash": "sha256:496a92da9d280e9db4975401bd6575e57c703078ff53ed3fe4a1383c62164363"
      },
      {
        "journeyId": "closeOpenTicket",
        "businessHash": "sha256:59a221f329e03b3d9664759d9ade26252066313814e79d983a82e7fb299aba3e"
      },
      {
        "journeyId": "registerTicket",
        "businessHash": "sha256:fec1c17f3843924c7160eaf9b48ec99cecc163ce2a415c7f4c18385d34c79120"
      },
      {
        "journeyId": "consultTicket",
        "businessHash": "sha256:28f65c7aea1dbed9d07c2e278d447809cbf29f4800e00f70af45cd0dcfcca8ce"
      }
    ],
    "ontologyHash": "sha256:563cf2c2d6bfb3cca7f9abda33d56065755c6df6b2e5dba2880f51bb37e1787a",
    "rulesHash": "sha256:b6356c46bee687ee1f1aa2d750e415392b3de005047b3fe236224feab6242529"
  },
  "realizationHash": "sha256:15edd3b7d4642515eb1e23fa854af6ade476167ef6ea73fc13b0f552830d084e",
  "generatedAt": "2026-09-02T12:55:53.516Z",
  "systemDecisions": []
} as const satisfies Ns4WorkflowIndexArtifactV3;

export type ControleChamadosWorkflowIndexType = typeof controleChamadosWorkflowIndex;

export default controleChamadosWorkflowIndex;
