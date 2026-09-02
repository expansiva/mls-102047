/// <mls fileReference="_102047_/l4/controleChamados/workflows/ticketLifecycle.defs.ts" enhancement="_blank"/>

import type { Ns4WorkflowArtifactV2 } from '/_102020_/l2/agentNewSolution/types.js';

export const ticketLifecycleWorkflow = {
  "schemaVersion": "2026-08-11-ns4-workflow-v4",
  "moduleName": "controleChamados",
  "workflowId": "ticketLifecycle",
  "entityRef": "Ticket",
  "initialState": "open",
  "terminalStates": [
    "closed"
  ],
  "states": [
    "open",
    "closed"
  ],
  "transitions": [
    {
      "transitionId": "closeTicket",
      "entityRef": "Ticket",
      "fromStates": [
        "open"
      ],
      "toState": "closed",
      "useRules": [
        "onlyOpenTicketCanBeClosed"
      ],
      "useCaseId": "decideClosure"
    }
  ],
  "workflowHash": "sha256:9ba7fe670b4f9613f58d4fce53ec2293f9ffb0c1f9ba71606d4fc3501f3a4eb6"
} as const satisfies Ns4WorkflowArtifactV2;

export type TicketLifecycleWorkflowType = typeof ticketLifecycleWorkflow;

export default ticketLifecycleWorkflow;
