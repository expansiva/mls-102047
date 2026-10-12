/// <mls fileReference="_102047_/l4/compras/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "businessDomain": "Compras: cadastro de fornecedores e produtos fornecidos com preço combinado, pedidos de compra com aprovação acima de valor limite, recebimento total ou parcial com entrada no estoque e painel de acompanhamento.",
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
      "entityId": "ContatoFornecedor",
      "kind": "role",
      "subtype": "ContactChannel"
    },
    {
      "entityId": "Produto",
      "kind": "role",
      "subtype": "Product"
    },
    {
      "entityId": "Comprador",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "ProdutoFornecido",
      "kind": "entity",
      "class": "supporting"
    },
    {
      "entityId": "PedidoCompra",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "ItemPedido",
      "kind": "entity",
      "class": "supporting"
    },
    {
      "entityId": "Recebimento",
      "kind": "entity",
      "class": "event"
    },
    {
      "entityId": "PainelCompras",
      "kind": "entity",
      "class": "supporting"
    }
  ],
  "relationships": [
    {
      "relationshipId": "fornecedorContato",
      "from": "Fornecedor",
      "to": "ContatoFornecedor",
      "type": "oneToMany",
      "required": false,
      "mode": "mdmRelationship",
      "description": "O fornecedor possui canais de contato (telefone, e-mail) vinculados.",
      "catalogType": "HasContact"
    },
    {
      "relationshipId": "produtoFornecidoFornecedor",
      "from": "ProdutoFornecido",
      "to": "Fornecedor",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada produto fornecido pertence a um fornecedor.",
      "field": "ProdutoFornecido.fornecedorId"
    },
    {
      "relationshipId": "produtoFornecidoProduto",
      "from": "ProdutoFornecido",
      "to": "Produto",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada produto fornecido aponta para o produto do catálogo.",
      "field": "ProdutoFornecido.produtoId"
    },
    {
      "relationshipId": "produtoFornecidoComprador",
      "from": "ProdutoFornecido",
      "to": "Comprador",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Comprador responsável pelo cadastro e pela negociação do preço combinado.",
      "field": "ProdutoFornecido.compradorId"
    },
    {
      "relationshipId": "fornecedorProdutos",
      "from": "Fornecedor",
      "to": "Produto",
      "type": "manyToMany",
      "required": false,
      "mode": "throughTable",
      "description": "Produtos que o fornecedor fornece, obtidos pelos produtos fornecidos cadastrados.",
      "through": "ProdutoFornecido",
      "path": "Fornecedor <- ProdutoFornecido.fornecedorId -> ProdutoFornecido.produtoId -> Produto",
      "derived": true
    },
    {
      "relationshipId": "pedidoFornecedor",
      "from": "PedidoCompra",
      "to": "Fornecedor",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada pedido de compra é feito para um fornecedor.",
      "field": "PedidoCompra.fornecedorId"
    },
    {
      "relationshipId": "pedidoComprador",
      "from": "PedidoCompra",
      "to": "Comprador",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Comprador que abriu e enviou o pedido.",
      "field": "PedidoCompra.compradorId"
    },
    {
      "relationshipId": "itemPedidoPedido",
      "from": "ItemPedido",
      "to": "PedidoCompra",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada item pertence a um pedido de compra, que tem um ou mais itens.",
      "field": "ItemPedido.pedidoCompraId"
    },
    {
      "relationshipId": "itemPedidoProduto",
      "from": "ItemPedido",
      "to": "Produto",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada item do pedido é de um produto.",
      "field": "ItemPedido.produtoId"
    },
    {
      "relationshipId": "recebimentoPedido",
      "from": "Recebimento",
      "to": "PedidoCompra",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada recebimento registra a chegada, total ou parcial, de um pedido de compra.",
      "field": "Recebimento.pedidoCompraId"
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type ComprasOntologyIndexType = typeof comprasOntologyIndex;

export default comprasOntologyIndex;
