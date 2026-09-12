/// <mls fileReference="_102047_/l4/compras/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const comprasOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "businessDomain": "Compras e recebimento de produtos de fornecedores.",
  "entities": [
    "Supplier",
    "Product",
    "SupplyCondition",
    "PurchaseOrder",
    "PurchaseOrderItem",
    "Receipt",
    "StockEntry"
  ],
  "relationships": [
    {
      "relationshipId": "supplierSuppliesProducts",
      "fromEntity": "Supplier",
      "toEntity": "Product",
      "type": "manyToMany",
      "required": false,
      "description": "Um fornecedor pode fornecer vários produtos, e um produto pode ser fornecido por vários fornecedores.",
      "persistence": {
        "mode": "mdmRelationship"
      },
      "realization": {
        "kind": "mdmRelationship",
        "ownerEntity": "Supplier",
        "from": {
          "entityId": "Supplier",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "Product",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "supplyConditionSupplier",
      "fromEntity": "SupplyCondition",
      "toEntity": "Supplier",
      "type": "manyToOne",
      "required": true,
      "description": "Cada condição de fornecimento é definida para um fornecedor.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "SupplyCondition",
        "from": {
          "entityId": "SupplyCondition",
          "fieldIds": [
            "supplierId"
          ]
        },
        "to": {
          "entityId": "Supplier",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "supplyConditionProduct",
      "fromEntity": "SupplyCondition",
      "toEntity": "Product",
      "type": "manyToOne",
      "required": true,
      "description": "Cada condição de fornecimento registra o preço combinado de um produto.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "SupplyCondition",
        "from": {
          "entityId": "SupplyCondition",
          "fieldIds": [
            "productId"
          ]
        },
        "to": {
          "entityId": "Product",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "purchaseOrderSupplier",
      "fromEntity": "PurchaseOrder",
      "toEntity": "Supplier",
      "type": "manyToOne",
      "required": true,
      "description": "Cada pedido de compra é emitido para um fornecedor.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "PurchaseOrder",
        "from": {
          "entityId": "PurchaseOrder",
          "fieldIds": [
            "supplierId"
          ]
        },
        "to": {
          "entityId": "Supplier",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "purchaseOrderItems",
      "fromEntity": "PurchaseOrder",
      "toEntity": "PurchaseOrderItem",
      "type": "oneToMany",
      "required": true,
      "description": "Um pedido de compra possui um ou mais itens.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "PurchaseOrderItem",
        "from": {
          "entityId": "PurchaseOrder",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "PurchaseOrderItem",
          "fieldIds": [
            "purchaseOrderId"
          ]
        }
      }
    },
    {
      "relationshipId": "purchaseOrderItemProduct",
      "fromEntity": "PurchaseOrderItem",
      "toEntity": "Product",
      "type": "manyToOne",
      "required": true,
      "description": "Cada item do pedido de compra corresponde a um produto.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "PurchaseOrderItem",
        "from": {
          "entityId": "PurchaseOrderItem",
          "fieldIds": [
            "productId"
          ]
        },
        "to": {
          "entityId": "Product",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "purchaseOrderReceipts",
      "fromEntity": "PurchaseOrder",
      "toEntity": "Receipt",
      "type": "oneToMany",
      "required": false,
      "description": "Um pedido de compra pode ter um ou mais recebimentos, inclusive parciais.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Receipt",
        "from": {
          "entityId": "PurchaseOrder",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "Receipt",
          "fieldIds": [
            "purchaseOrderId"
          ]
        }
      }
    },
    {
      "relationshipId": "receiptStockEntries",
      "fromEntity": "Receipt",
      "toEntity": "StockEntry",
      "type": "oneToMany",
      "required": true,
      "description": "Um recebimento gera as entradas de estoque das quantidades recebidas.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "StockEntry",
        "from": {
          "entityId": "Receipt",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "StockEntry",
          "fieldIds": [
            "receiptId"
          ]
        }
      }
    },
    {
      "relationshipId": "stockEntryPurchaseOrderItem",
      "fromEntity": "StockEntry",
      "toEntity": "PurchaseOrderItem",
      "type": "manyToOne",
      "required": true,
      "description": "Cada entrada de estoque registra o recebimento de um item do pedido de compra.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "StockEntry",
        "from": {
          "entityId": "StockEntry",
          "fieldIds": [
            "purchaseOrderItemId"
          ]
        },
        "to": {
          "entityId": "PurchaseOrderItem",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "stockEntryProduct",
      "fromEntity": "StockEntry",
      "toEntity": "Product",
      "type": "manyToOne",
      "required": true,
      "description": "Cada entrada de estoque é realizada para um produto.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "StockEntry",
        "from": {
          "entityId": "StockEntry",
          "fieldIds": [
            "productId"
          ]
        },
        "to": {
          "entityId": "Product",
          "fieldIds": [
            "id"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type ComprasOntologyIndexType = typeof comprasOntologyIndex;

export default comprasOntologyIndex;
