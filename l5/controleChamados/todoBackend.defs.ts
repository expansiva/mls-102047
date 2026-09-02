/// <mls fileReference="_102047_/l5/controleChamados/todoBackend.defs.ts" enhancement="_blank"/>

import type { Ns4L5TodoBackendArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosTodoBackend = {
  "schemaVersion": "2026-08-13-ns4-todo-backend-v1",
  "layer": "backend",
  "moduleName": "controleChamados",
  "owners": [
    {
      "ownerType": "useCase",
      "ownerId": "createTicket",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "createTicketComment",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "decideClosure",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "deleteTicket",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "deleteTicketComment",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "getTicket",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "getTicketComment",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "listTicket",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "listTicketComment",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "locateTicket",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "recordComment",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "updateTicket",
      "statusBackend": "done"
    },
    {
      "ownerType": "useCase",
      "ownerId": "updateTicketComment",
      "statusBackend": "done"
    }
  ]
} as const satisfies Ns4L5TodoBackendArtifact;

export type ControleChamadosTodoBackendType = typeof controleChamadosTodoBackend;

export default controleChamadosTodoBackend;
