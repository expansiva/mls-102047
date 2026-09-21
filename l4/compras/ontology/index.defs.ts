/// <mls fileReference="_102047_/l4/compras/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3 } from '/_102035_/l2/solution/types.js';

export const comprasOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "businessDomain": "Compras e recebimento de mercadorias",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "compras",
    "description": "Branch details.compras of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Supplier",
      "kind": "role",
      "subtype": "Company"
    },
    {
      "entityId": "SupplierContact",
      "kind": "role",
      "subtype": "ContactChannel"
    },
    {
      "entityId": "Buyer",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "Product",
      "kind": "role",
      "subtype": "Product"
    },
    {
      "entityId": "SupplierProduct",
      "kind": "entity",
      "class": "supporting"
    },
    {
      "entityId": "PurchaseOrder",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "GoodsReceipt",
      "kind": "entity",
      "class": "event"
    },
    {
      "entityId": "PurchaseIndicators",
      "kind": "entity",
      "class": "supporting"
    }
  ],
  "relationships": [
    {
      "relationshipId": "supplierHasContact",
      "from": "Supplier",
      "to": "SupplierContact",
      "type": "oneToMany",
      "required": true,
      "mode": "mdmRelationship",
      "description": "Um fornecedor possui um ou mais canais de contato mestre para a comunicação comercial.",
      "catalogType": "HasContact"
    },
    {
      "relationshipId": "supplierProductSupplier",
      "from": "SupplierProduct",
      "to": "Supplier",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada registro de produto do fornecedor pertence a um único fornecedor.",
      "field": "SupplierProduct.supplierId"
    },
    {
      "relationshipId": "supplierProductProduct",
      "from": "SupplierProduct",
      "to": "Product",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada registro de produto do fornecedor referencia um único produto mestre.",
      "field": "SupplierProduct.productId"
    },
    {
      "relationshipId": "supplierCatalogProducts",
      "from": "Supplier",
      "to": "Product",
      "type": "manyToMany",
      "required": false,
      "mode": "throughTable",
      "description": "O catálogo comercial do fornecedor relaciona fornecedores e produtos pelos registros de preço combinado.",
      "through": "SupplierProduct",
      "path": "SupplierProduct.supplierId -> SupplierProduct.productId",
      "derived": true
    },
    {
      "relationshipId": "purchaseOrderSupplier",
      "from": "PurchaseOrder",
      "to": "Supplier",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada pedido de compra é destinado a um único fornecedor.",
      "field": "PurchaseOrder.supplierId"
    },
    {
      "relationshipId": "purchaseOrderBuyer",
      "from": "PurchaseOrder",
      "to": "Buyer",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada pedido de compra é aberto por um comprador responsável.",
      "field": "PurchaseOrder.buyerId"
    },
    {
      "relationshipId": "goodsReceiptPurchaseOrder",
      "from": "GoodsReceipt",
      "to": "PurchaseOrder",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada recebimento registra uma entrega vinculada a um único pedido de compra enviado.",
      "field": "GoodsReceipt.purchaseOrderId"
    }
  ]
} as const satisfies Ns5OntologyIndexV3;

export type ComprasOntologyIndexType = typeof comprasOntologyIndex;

export default comprasOntologyIndex;
