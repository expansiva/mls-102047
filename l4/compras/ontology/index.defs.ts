/// <mls fileReference="_102047_/l4/compras/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3 } from '/_102035_/l2/solution/types.js';

export const comprasOntologyIndex = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "compras",
  "businessDomain": "Compras",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "compras",
    "description": "Branch details.compras of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Fornecedor",
      "kind": "role",
      "subtype": "Company"
    },
    {
      "entityId": "Produto",
      "kind": "role",
      "subtype": "Product"
    },
    {
      "entityId": "ContatoFornecedor",
      "kind": "role",
      "subtype": "ContactChannel"
    },
    {
      "entityId": "ProdutoFornecedor",
      "kind": "entity",
      "class": "supporting"
    },
    {
      "entityId": "PedidoCompra",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "RecebimentoPedido",
      "kind": "entity",
      "class": "event"
    }
  ],
  "relationships": [
    {
      "relationshipId": "fornecedorHasContact",
      "from": "Fornecedor",
      "to": "ContatoFornecedor",
      "type": "oneToMany",
      "required": false,
      "mode": "mdmRelationship",
      "description": "Um fornecedor pode ter vários canais de contato vinculados para a comunicação de compras.",
      "catalogType": "HasContact"
    },
    {
      "relationshipId": "fornecedorSuppliesProduct",
      "from": "Fornecedor",
      "to": "Produto",
      "type": "manyToMany",
      "required": false,
      "mode": "mdmRelationship",
      "description": "Um fornecedor pode fornecer diversos produtos, e um produto pode ser fornecido por diversos fornecedores.",
      "catalogType": "SuppliesProduct"
    },
    {
      "relationshipId": "produtoFornecedorFornecedor",
      "from": "ProdutoFornecedor",
      "to": "Fornecedor",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada condição comercial de produto fornecido pertence a um fornecedor.",
      "field": "ProdutoFornecedor.fornecedorId"
    },
    {
      "relationshipId": "produtoFornecedorProduto",
      "from": "ProdutoFornecedor",
      "to": "Produto",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada condição comercial registra o produto disponibilizado pelo fornecedor.",
      "field": "ProdutoFornecedor.produtoId"
    },
    {
      "relationshipId": "pedidoCompraFornecedor",
      "from": "PedidoCompra",
      "to": "Fornecedor",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada pedido de compra é aberto para um único fornecedor.",
      "field": "PedidoCompra.fornecedorId"
    },
    {
      "relationshipId": "recebimentoPedidoPedidoCompra",
      "from": "RecebimentoPedido",
      "to": "PedidoCompra",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada recebimento registra uma entrega total ou parcial de um pedido de compra.",
      "field": "RecebimentoPedido.pedidoCompraId"
    }
  ]
} as const satisfies Ns5OntologyIndexV3;

export type ComprasOntologyIndexType = typeof comprasOntologyIndex;

export default comprasOntologyIndex;
