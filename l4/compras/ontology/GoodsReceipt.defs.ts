/// <mls fileReference="_102047_/l4/compras/ontology/GoodsReceipt.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntityGoodsReceipt = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "GoodsReceipt",
  "title": "Recebimento de mercadorias",
  "description": "Registro de entrega total ou parcial de um pedido de compra, com itens incorporados e quantidades recebidas que dão entrada no estoque.",
  "displayField": "receiptNumber",
  "relationships": {
    "purchaseOrder": {
      "relationshipId": "goodsReceiptPurchaseOrder",
      "to": "PurchaseOrder",
      "via": "GoodsReceipt.purchaseOrderId",
      "cardinality": "N:1",
      "title": "Pedido de compra",
      "description": "Cada recebimento registra uma entrega vinculada a um único pedido de compra enviado.",
      "mode": "fk",
      "required": "sempre"
    }
  },
  "capabilities": {
    "read.byId": "Consulta um recebimento pelo identificador da linha para o almoxarife ou o gerente visualizar seus dados e itens.",
    "locate.byColumn": "Lista recebimentos por pedido de compra, número ou data de recebimento, com ordenação e paginação, para o almoxarife e o gerente.",
    "count": "Conta os recebimentos que atendem aos filtros da lista para o almoxarife e o gerente.",
    "listByForeignKey": "Lista os recebimentos vinculados a um pedido de compra pelo campo purchaseOrderId para consultar entregas totais e parciais.",
    "create": "Cria o registro de uma entrega com os produtos e quantidades efetivamente recebidos, usado pelo almoxarife.",
    "transaction": "Grava o recebimento e efetiva a entrada no estoque dos produtos recebidos na mesma transação, usada pelo almoxarife.",
    "read.mdmRecord": "Lê os registros mestres dos produtos informados nos itens para exibir sua identificação ao almoxarife e ao gerente.",
    "sequence.next": "Emite o próximo número sequencial de recebimento ao registrar uma entrega, usado pelo módulo compras.",
    "uniqueKey": "Recusa outro recebimento com o mesmo número sequencial, garantindo sua identificação única.",
    "compras.registerReceipt": "Registra um recebimento total ou parcial de um pedido enviado, atualiza os saldos recebidos e dá entrada no estoque, usado pelo almoxarife."
  },
  "rules": [
    "receiptHasAtLeastOneItem",
    "receivedQuantityMustBePositive",
    "receivedProductMustBelongToPurchaseOrder",
    "receivedQuantityCannotExceedOutstanding",
    "goodsReceiptStockEntryIsAtomic"
  ],
  "kind": "entity",
  "class": "event",
  "storage": {
    "target": "moduleDatabase",
    "table": "compras_goodsreceipt",
    "kind": "relational"
  },
  "record": {
    "fields": {
      "id": {
        "type": "uuid",
        "required": true,
        "derived": true,
        "indexed": true,
        "title": "Id"
      },
      "version": {
        "type": "integer",
        "required": true,
        "derived": true
      },
      "receiptNumber": {
        "type": "string",
        "required": true,
        "indexed": true,
        "of": "Address",
        "title": "Número do recebimento",
        "description": "Número sequencial que identifica o registro de recebimento de mercadorias.",
        "maxLength": 40,
        "min": 0,
        "max": 0
      },
      "purchaseOrderId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "PurchaseOrder"
        ],
        "title": "Pedido de compra",
        "description": "Pedido de compra enviado ao qual esta entrega recebida pertence.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "receivedAt": {
        "type": "date",
        "required": true,
        "indexed": true,
        "of": "Address",
        "title": "Data do recebimento",
        "description": "Data em que as mercadorias desta entrega foram efetivamente recebidas.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "Address",
        "title": "Detalhes do recebimento",
        "description": "Itens efetivamente entregues e observações do recebimento.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "items": {
            "type": "object",
            "required": true,
            "collection": true,
            "of": "Address",
            "title": "Itens recebidos",
            "description": "Produtos e quantidades efetivamente entregues neste recebimento.",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "fields": {
              "productId": {
                "type": "record",
                "required": true,
                "of": "Address",
                "to": [
                  "Product"
                ],
                "title": "Produto",
                "description": "Produto do pedido que foi recebido.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "receivedQuantity": {
                "type": "number",
                "required": true,
                "of": "Address",
                "title": "Quantidade recebida",
                "description": "Quantidade efetivamente entregue do produto neste recebimento.",
                "maxLength": 0,
                "min": 0.000001,
                "max": 0
              }
            }
          },
          "notes": {
            "type": "text",
            "of": "Address",
            "title": "Observações",
            "description": "Observações registradas pelo almoxarife sobre a entrega ou divergências percebidas.",
            "maxLength": 2000,
            "min": 0,
            "max": 0
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "receiptNumber"
    ]
  ]
} as const satisfies Ns5OntologyEntityV3;

export type ComprasEntityGoodsReceiptType = typeof comprasEntityGoodsReceipt;

export default comprasEntityGoodsReceipt;
