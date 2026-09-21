/// <mls fileReference="_102047_/l4/compras/journeys/enviarPedidoDentroDoLimite.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const enviarPedidoDentroDoLimiteJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "enviarPedidoDentroDoLimite",
  "business": {
    "actorRef": "comprador",
    "title": "Criar e enviar pedido de compra dentro do limite",
    "goal": "Abrir e enviar um pedido de compra cujo valor não exige aprovação gerencial.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarFornecedorParaPedido",
        "kind": "locate",
        "entity": "Supplier",
        "title": "Localizar fornecedor para o pedido",
        "description": "Localiza o fornecedor que receberá o pedido."
      },
      {
        "stepId": "inspecionarCatalogoDoFornecedor",
        "kind": "inspect",
        "entity": "SupplierProduct",
        "title": "Consultar catálogo do fornecedor",
        "description": "Consulta os produtos fornecidos e os preços combinados para compor o pedido."
      },
      {
        "stepId": "abrirPedidoDeCompra",
        "kind": "act",
        "entity": "PurchaseOrder",
        "effect": "create",
        "title": "Abrir pedido de compra",
        "description": "Abre o pedido para o fornecedor e inclui um ou mais produtos com suas quantidades e preços."
      },
      {
        "stepId": "enviarPedidoDeCompra",
        "kind": "act",
        "entity": "PurchaseOrder",
        "effect": "transition",
        "transitionRef": "sendPurchaseOrder",
        "title": "Enviar pedido de compra",
        "description": "Envia o pedido de compra cujo valor está dentro do limite de aprovação."
      }
    ],
    "outcome": {
      "statement": "O pedido de compra é enviado ao fornecedor sem necessidade de aprovação gerencial.",
      "evidence": [
        "Pedido criado com fornecedor, produtos, quantidades e preços.",
        "Pedido marcado como enviado."
      ]
    }
  },
  "businessHash": "sha256:0fb41cc329f9d54bff6c1f6d2ea5f7748ba5257ff93f8acd9fdd058dc07c154b"
} as const satisfies Ns5JourneyArtifact;

export type EnviarPedidoDentroDoLimiteJourneyType = typeof enviarPedidoDentroDoLimiteJourney;

export default enviarPedidoDentroDoLimiteJourney;
