/// <mls fileReference="_102047_/l4/compras/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const comprasWorkflows = {
  "schemaVersion": "2026-09-12-ns5-workflows-v2",
  "moduleName": "compras",
  "processes": [
    {
      "processId": "decidirPedidosAcimaDoLimite",
      "title": "Decidir pedidos acima do limite",
      "description": "Encaminha ao gerente de compras os pedidos enviados que exigem aprovação por ultrapassarem o valor limite.",
      "trigger": {
        "kind": "event",
        "event": "PedidoCompra.enviarPedidoCompra"
      },
      "tasks": [
        {
          "taskId": "decidirPedido",
          "kind": "human",
          "actorRef": "gerenteCompras",
          "journeyRef": "decidirPedidoAcimaDoLimite",
          "next": [],
          "description": "O gerente de compras analisa e registra a aprovação ou rejeição dos pedidos encaminhados por ultrapassarem o limite."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "cadastrarFornecedor",
      "inProcess": false
    },
    {
      "journeyId": "abrirEenviarPedidoCompra",
      "inProcess": false
    },
    {
      "journeyId": "decidirPedidoAcimaDoLimite",
      "inProcess": true,
      "processId": "decidirPedidosAcimaDoLimite"
    },
    {
      "journeyId": "registrarRecebimentoPedido",
      "inProcess": false
    },
    {
      "journeyId": "acompanharIndicadoresDeCompras",
      "inProcess": false
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type ComprasWorkflowsType = typeof comprasWorkflows;

export default comprasWorkflows;
