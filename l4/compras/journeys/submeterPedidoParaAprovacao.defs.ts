/// <mls fileReference="_102047_/l4/compras/journeys/submeterPedidoParaAprovacao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const submeterPedidoParaAprovacaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "submeterPedidoParaAprovacao",
  "business": {
    "actorRef": "comprador",
    "title": "Submeter pedido de compra acima do limite",
    "goal": "Abrir e encaminhar para aprovação um pedido de compra que excede o valor limite.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarFornecedorDoPedido",
        "kind": "locate",
        "entity": "Supplier",
        "title": "Localizar fornecedor do pedido",
        "description": "Localiza o fornecedor que receberá o pedido."
      },
      {
        "stepId": "inspecionarItensDoFornecedor",
        "kind": "inspect",
        "entity": "SupplierProduct",
        "title": "Consultar itens do fornecedor",
        "description": "Consulta produtos e preços combinados do fornecedor para compor o pedido."
      },
      {
        "stepId": "abrirPedidoAcimaDoLimite",
        "kind": "act",
        "entity": "PurchaseOrder",
        "effect": "create",
        "title": "Abrir pedido acima do limite",
        "description": "Abre o pedido com um ou mais produtos, quantidades e preços, totalizando valor acima do limite de aprovação."
      },
      {
        "stepId": "submeterPedido",
        "kind": "act",
        "entity": "PurchaseOrder",
        "effect": "transition",
        "transitionRef": "submitPurchaseOrder",
        "title": "Submeter pedido",
        "description": "Submete o pedido para análise gerencial antes do envio ao fornecedor."
      },
      {
        "stepId": "encaminharParaGerente",
        "kind": "handoff",
        "entity": "PurchaseOrder",
        "title": "Encaminhar para gerente",
        "description": "Encaminha o pedido submetido ao gerente de compras para decisão.",
        "handoffTo": "gerenteCompras"
      }
    ],
    "outcome": {
      "statement": "O pedido acima do limite fica submetido para decisão do gerente de compras.",
      "evidence": [
        "Pedido criado com valor acima do limite.",
        "Pedido encaminhado ao gerente de compras para aprovação ou rejeição."
      ]
    }
  },
  "businessHash": "sha256:b15bf1d3d480f31ff8239dcda9dcd7f5be238fb21279a9312dbebed2778942b9"
} as const satisfies Ns5JourneyArtifact;

export type SubmeterPedidoParaAprovacaoJourneyType = typeof submeterPedidoParaAprovacaoJourney;

export default submeterPedidoParaAprovacaoJourney;
