/// <mls fileReference="_102047_/l4/compras/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifact } from '/_102035_/l2/solution/types.js';

export const comprasRules = {
  "schemaVersion": "2026-09-10-ns5-rules-v1",
  "moduleName": "compras",
  "rules": [
    {
      "ruleId": "purchaseOrderRequiresOneOrMoreItems",
      "description": "Um pedido de compra deve conter um ou mais itens de produto."
    },
    {
      "ruleId": "purchaseOrderTotalAmount",
      "description": "O valor total do pedido de compra é a soma dos valores totais de seus itens."
    },
    {
      "ruleId": "purchaseOrderItemLineTotal",
      "description": "O valor total de cada item do pedido de compra é a quantidade solicitada multiplicada pelo preço unitário."
    },
    {
      "ruleId": "ordersAboveApprovalLimitRequireDecision",
      "description": "Um pedido de compra cujo valor total excede o valor limite deve ser encaminhado para decisão de aprovação ou rejeição antes de prosseguir."
    },
    {
      "ruleId": "receiptQuantityCannotExceedOutstanding",
      "description": "A quantidade recebida de cada item não pode exceder a quantidade ainda pendente de recebimento no pedido de compra."
    },
    {
      "ruleId": "stockEntryReflectsReceivedQuantity",
      "description": "Cada quantidade efetivamente recebida deve gerar a entrada correspondente no estoque para o respectivo produto."
    },
    {
      "ruleId": "outstandingAmount",
      "description": "O valor pendente de recebimento do pedido de compra é a diferença entre seu valor total e o valor já recebido."
    },
    {
      "ruleId": "overduePurchaseOrder",
      "description": "Um pedido de compra está atrasado quando permanece em aberto após sua data prevista de entrega."
    },
    {
      "ruleId": "monthlyPurchasedTotalBySupplier",
      "description": "O total comprado de um fornecedor no mês é a soma dos valores dos pedidos de compra desse fornecedor no período mensal."
    }
  ]
} as const satisfies Ns5RulesArtifact;

export type ComprasRulesType = typeof comprasRules;

export default comprasRules;
