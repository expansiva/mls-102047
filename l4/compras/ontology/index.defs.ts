/// <mls fileReference="_102047_/l4/compras/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "businessDomain": "Compras: cadastro de fornecedores e preços combinados, pedidos de compra com aprovação acima de valor limite, recebimento total ou parcial com entrada no estoque e painel gerencial.",
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
      "entityId": "EntradaEstoque",
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
      "description": "Canais de contato (telefone, e-mail) do fornecedor.",
      "catalogType": "HasContact"
    },
    {
      "relationshipId": "fornecedorFornecePoduto",
      "from": "Fornecedor",
      "to": "Produto",
      "type": "manyToMany",
      "required": false,
      "mode": "mdmRelationship",
      "description": "O fornecedor fornece o produto, registrado no cadastro mestre.",
      "catalogType": "SuppliesProduct"
    },
    {
      "relationshipId": "produtoFornecidoFornecedor",
      "from": "ProdutoFornecido",
      "to": "Fornecedor",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Fornecedor que fornece o produto com o preço combinado.",
      "field": "ProdutoFornecido.fornecedorId"
    },
    {
      "relationshipId": "produtoFornecidoProduto",
      "from": "ProdutoFornecido",
      "to": "Produto",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Produto fornecido pelo fornecedor.",
      "field": "ProdutoFornecido.produtoId"
    },
    {
      "relationshipId": "produtoFornecidoComprador",
      "from": "ProdutoFornecido",
      "to": "Comprador",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Comprador que cadastrou e mantém o preço combinado.",
      "field": "ProdutoFornecido.compradorId"
    },
    {
      "relationshipId": "pedidoFornecedor",
      "from": "PedidoCompra",
      "to": "Fornecedor",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Fornecedor para o qual o pedido de compra é feito.",
      "field": "PedidoCompra.fornecedorId"
    },
    {
      "relationshipId": "pedidoComprador",
      "from": "PedidoCompra",
      "to": "Comprador",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Comprador que abriu o pedido.",
      "field": "PedidoCompra.compradorId"
    },
    {
      "relationshipId": "itemPedidoPedido",
      "from": "ItemPedido",
      "to": "PedidoCompra",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Pedido de compra ao qual o item pertence.",
      "field": "ItemPedido.pedidoCompraId"
    },
    {
      "relationshipId": "itemPedidoProduto",
      "from": "ItemPedido",
      "to": "Produto",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Produto comprado no item.",
      "field": "ItemPedido.produtoId"
    },
    {
      "relationshipId": "itemPedidoProdutoFornecido",
      "from": "ItemPedido",
      "to": "ProdutoFornecido",
      "type": "manyToOne",
      "required": false,
      "mode": "fk",
      "description": "Preço combinado que sugeriu o preço do item.",
      "field": "ItemPedido.produtoFornecidoId"
    },
    {
      "relationshipId": "recebimentoPedido",
      "from": "Recebimento",
      "to": "PedidoCompra",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Pedido de compra cuja chegada foi registrada.",
      "field": "Recebimento.pedidoCompraId"
    },
    {
      "relationshipId": "entradaRecebimento",
      "from": "EntradaEstoque",
      "to": "Recebimento",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Recebimento que gerou a entrada no estoque.",
      "field": "EntradaEstoque.recebimentoId"
    },
    {
      "relationshipId": "entradaItemPedido",
      "from": "EntradaEstoque",
      "to": "ItemPedido",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Item do pedido cuja quantidade foi recebida.",
      "field": "EntradaEstoque.itemPedidoId"
    },
    {
      "relationshipId": "entradaProduto",
      "from": "EntradaEstoque",
      "to": "Produto",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Produto que teve entrada no estoque.",
      "field": "EntradaEstoque.produtoId"
    },
    {
      "relationshipId": "fornecedorPedidosPainel",
      "from": "PainelCompras",
      "to": "Fornecedor",
      "type": "manyToMany",
      "required": false,
      "mode": "throughTable",
      "description": "Total comprado no mês agrupado por fornecedor, apurado pelos pedidos de compra.",
      "through": "PedidoCompra",
      "path": "PainelCompras -> PedidoCompra.fornecedorId -> Fornecedor",
      "derived": true
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type ComprasOntologyIndexType = typeof comprasOntologyIndex;

export default comprasOntologyIndex;
