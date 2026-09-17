/// <mls fileReference="_102047_/l4/ordenServicio/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const ordenServicioWorkflows = {
  "schemaVersion": "2026-09-12-ns5-workflows-v2",
  "moduleName": "ordenServicio",
  "processes": [
    {
      "processId": "gestionarOrdenServicio",
      "title": "Gestionar orden de servicio",
      "description": "Coordina la recepción, el diagnóstico, la decisión del cliente, la reparación o el retiro y la entrega final del aparato.",
      "trigger": {
        "kind": "manual",
        "actorRef": "recepcionista"
      },
      "tasks": [
        {
          "taskId": "abrirOrden",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "abrirOrdenServicio",
          "next": [
            "diagnosticarYPresupuestar"
          ],
          "description": "El recepcionista registra la recepción del aparato y crea la orden para su análisis técnico."
        },
        {
          "taskId": "diagnosticarYPresupuestar",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "diagnosticarYpresupuestar",
          "next": [
            "responderPresupuesto"
          ],
          "description": "El técnico analiza el aparato, registra el diagnóstico y emite el presupuesto para el cliente."
        },
        {
          "taskId": "responderPresupuesto",
          "kind": "human",
          "actorRef": "cliente",
          "journeyRef": "responderPresupuesto",
          "next": [
            "repararAparato"
          ],
          "description": "El cliente revisa el presupuesto disponible y registra su aprobación o rechazo desde el portal."
        },
        {
          "taskId": "repararAparato",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "repararAparato",
          "next": [
            "entregarAparatoReparado"
          ],
          "description": "Si el presupuesto fue aprobado, el técnico realiza la reparación y deja la orden lista para entrega."
        },
        {
          "taskId": "entregarAparatoReparado",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "entregarYfinalizarOrden",
          "next": [],
          "description": "Cuando la reparación está lista, el recepcionista entrega el aparato al cliente y finaliza la orden."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "abrirOrdenServicio",
      "inProcess": true,
      "processId": "gestionarOrdenServicio"
    },
    {
      "journeyId": "diagnosticarYpresupuestar",
      "inProcess": true,
      "processId": "gestionarOrdenServicio"
    },
    {
      "journeyId": "responderPresupuesto",
      "inProcess": true,
      "processId": "gestionarOrdenServicio"
    },
    {
      "journeyId": "repararAparato",
      "inProcess": true,
      "processId": "gestionarOrdenServicio"
    },
    {
      "journeyId": "entregarYfinalizarOrden",
      "inProcess": true,
      "processId": "gestionarOrdenServicio"
    },
    {
      "journeyId": "consultarMisOrdenes",
      "inProcess": false
    }
  ],
  "systemDecisions": [
    {
      "decisionId": "dropDuplicateTaskEntregarAparatoRechazado",
      "chosen": "drop",
      "alternatives": [
        "keep",
        "drop"
      ],
      "decidedBy": "system"
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type OrdenServicioWorkflowsType = typeof ordenServicioWorkflows;

export default ordenServicioWorkflows;
