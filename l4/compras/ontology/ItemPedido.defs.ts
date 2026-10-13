/// <mls fileReference="_102047_/l4/compras/ontology/ItemPedido.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasEntityItemPedido = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "ItemPedido",
  "title": "Item do pedido",
  "description": "Produto incluído no pedido de compra com quantidade e preço; a quantidade pendente de recebimento é derivada das entradas.",
  "displayField": "numeroItem",
  "relationships": {
    "pedidoCompra": {
      "relationshipId": "itemPedidoPedido",
      "to": "PedidoCompra",
      "via": "ItemPedido.pedidoCompraId",
      "cardinality": "N:1",
      "title": "Pedido de compra",
      "description": "Pedido ao qual o item pertence.",
      "mode": "fk",
      "required": true
    },
    "produto": {
      "relationshipId": "itemPedidoProduto",
      "to": "Produto",
      "via": "ItemPedido.produtoId",
      "cardinality": "N:1",
      "title": "Produto",
      "description": "Produto comprado no item.",
      "mode": "fk",
      "required": true
    },
    "produtoFornecido": {
      "relationshipId": "itemPedidoProdutoFornecido",
      "to": "ProdutoFornecido",
      "via": "ItemPedido.produtoFornecidoId",
      "cardinality": "N:1",
      "title": "Preço combinado",
      "description": "Preço combinado que sugeriu o preço do item.",
      "mode": "fk"
    },
    "entradasEstoque": {
      "relationshipId": "entradaItemPedido",
      "to": "EntradaEstoque",
      "via": "EntradaEstoque.itemPedidoId",
      "cardinality": "1:N",
      "title": "Entradas de estoque",
      "description": "Entradas de estoque que registram o recebimento deste item.",
      "mode": "fk",
      "direction": "to",
      "required": true
    }
  },
  "capabilities": {
    "read.byId": "Lê um item do pedido pelo id, usado ao conferir o item no recebimento e na revisão do pedido.",
    "locate.byColumn": "Lista itens filtrando por pedido, produto ou preço combinado de origem, ordenados pelo número do item; usado pelo comprador e pelo gerente.",
    "listByForeignKey": "Lista os itens de um pedido de compra (ou de vários pedidos de uma vez) na revisão, aprovação e recebimento.",
    "count": "Conta os itens de um pedido para exibir o total de linhas na lista e na aprovação.",
    "create": "Inclui um item no pedido em rascunho com produto, quantidade e preço, usado pelo comprador.",
    "update": "Altera quantidade, preço ou observação do item enquanto o pedido ainda está em rascunho, usado pelo comprador.",
    "delete": "Remove um item do pedido em rascunho, usado pelo comprador antes do envio.",
    "uniqueKey": "Impede dois itens com o mesmo número dentro do mesmo pedido, pela chave pedido de compra mais número do item.",
    "transaction": "Grava o pedido e seus itens de forma atômica ao abrir ou revisar o pedido de compra.",
    "read.mdmRecord": "Lê o registro mestre do produto e do fornecedor apontados pelo item para exibir nome, SKU e unidade de medida.",
    "comment": "Permite registrar uma nota sobre o item, como acordo de entrega, usada pelo comprador e pelo almoxarife.",
    "compras.sugerirPrecoCombinado": "Sugere o preço unitário do item a partir do preço combinado do produto fornecido pelo fornecedor do pedido, usado pelo comprador ao incluir o item."
  },
  "rules": [
    "itemPedidoQuantidadePositiva",
    "itemPedidoProdutoDoFornecedor",
    "itemPedidoSomenteEmRascunho",
    "precoCombinadoSugerePreco"
  ],
  "kind": "entity",
  "class": "supporting",
  "storage": {
    "target": "moduleDatabase",
    "table": "compras_itempedido",
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
      "pedidoCompraId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "PedidoCompra"
        ],
        "title": "Pedido de compra",
        "description": "Pedido de compra ao qual o item pertence."
      },
      "produtoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Produto"
        ],
        "title": "Produto",
        "description": "Produto comprado neste item."
      },
      "produtoFornecidoId": {
        "type": "record",
        "indexed": true,
        "to": [
          "ProdutoFornecido"
        ],
        "title": "Preço combinado de origem",
        "description": "Produto fornecido cujo preço combinado sugeriu o preço do item; vazio quando o preço foi digitado livremente."
      },
      "numeroItem": {
        "type": "integer",
        "required": true,
        "indexed": true,
        "title": "Número do item",
        "description": "Posição sequencial do item dentro do pedido, usada para identificá-lo na tela e no recebimento.",
        "min": 1
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes do item",
        "description": "Quantidade, preço e observações do item do pedido.",
        "fields": {
          "quantidade": {
            "type": "number",
            "required": true,
            "title": "Quantidade pedida",
            "description": "Quantidade do produto que o comprador está pedindo ao fornecedor; deve ser maior que zero.",
            "min": 0
          },
          "precoUnitario": {
            "type": "money",
            "required": true,
            "title": "Preço unitário",
            "description": "Preço unitário negociado para este item, sugerido pelo preço combinado do fornecedor e editável pelo comprador.",
            "min": 0
          },
          "observacao": {
            "type": "text",
            "title": "Observação",
            "description": "Observação livre do comprador sobre o item."
          },
          "valorTotalItem": {
            "type": "money",
            "derived": true,
            "title": "Valor total do item",
            "description": "Quantidade pedida multiplicada pelo preço unitário do item."
          },
          "quantidadeRecebida": {
            "type": "number",
            "derived": true,
            "title": "Quantidade recebida",
            "description": "Soma das quantidades das entradas de estoque registradas para este item do pedido."
          },
          "quantidadePendente": {
            "type": "number",
            "derived": true,
            "title": "Quantidade pendente",
            "description": "Quantidade pedida menos a quantidade recebida, nunca abaixo de zero."
          },
          "recebidoTotalmente": {
            "type": "boolean",
            "derived": true,
            "title": "Recebido totalmente",
            "description": "Verdadeiro quando a quantidade recebida alcança ou supera a quantidade pedida do item."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "pedidoCompraId",
      "numeroItem"
    ]
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type ComprasEntityItemPedidoType = typeof comprasEntityItemPedido;

export default comprasEntityItemPedido;
