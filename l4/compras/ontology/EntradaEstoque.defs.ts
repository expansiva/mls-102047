/// <mls fileReference="_102047_/l4/compras/ontology/EntradaEstoque.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasEntityEntradaEstoque = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "EntradaEstoque",
  "title": "Entrada no estoque",
  "description": "Entrada de estoque de um produto recebido, gerada pelo recebimento para cada item, com a quantidade recebida; publicada ao controle de estoque.",
  "displayField": "numero",
  "relationships": {
    "recebimento": {
      "relationshipId": "entradaRecebimento",
      "to": "Recebimento",
      "via": "EntradaEstoque.recebimentoId",
      "cardinality": "N:1",
      "title": "Recebimento que gerou a entrada",
      "description": "Cada entrada no estoque nasce de um recebimento; um recebimento gera uma entrada por item recebido.",
      "mode": "fk",
      "required": true
    },
    "itemPedido": {
      "relationshipId": "entradaItemPedido",
      "to": "ItemPedido",
      "via": "EntradaEstoque.itemPedidoId",
      "cardinality": "N:1",
      "title": "Item do pedido recebido",
      "description": "Item do pedido cuja quantidade foi recebida; recebimentos parciais geram várias entradas para o mesmo item.",
      "mode": "fk",
      "required": true
    },
    "produto": {
      "relationshipId": "entradaProduto",
      "to": "Produto",
      "via": "EntradaEstoque.produtoId",
      "cardinality": "N:1",
      "title": "Produto que entrou no estoque",
      "description": "Produto do cadastro mestre que teve a entrada no estoque.",
      "mode": "fk",
      "required": true
    }
  },
  "capabilities": {
    "read.byId": "Lê uma entrada no estoque pelo id, na tela do recebimento ou do item do pedido, para o almoxarife e o gerente de compras.",
    "locate.byColumn": "Lista as entradas filtradas por produto, recebimento ou período da data de entrada, ordenadas e paginadas, para o almoxarife conferir o que entrou no estoque.",
    "count": "Conta as entradas de um filtro (por exemplo, do dia ou de um produto) para o cabeçalho da lista do almoxarife.",
    "listByForeignKey": "Lista as entradas de um recebimento, de um item do pedido ou de um produto, preenchendo a lista de uma vez por findManyByValues, na tela do recebimento e do pedido.",
    "create": "Grava a entrada no estoque para cada item recebido; quem escreve é o processo cicloPedidoCompra na etapa darEntradaEstoque, ao registrar o recebimento.",
    "uniqueKey": "Recusa uma segunda entrada para o mesmo item no mesmo recebimento, pelo índice único de recebimento e item do pedido.",
    "transaction": "Grava o recebimento e todas as suas entradas no estoque juntos, tudo ou nada, para que nenhum item recebido fique sem entrada.",
    "read.mdmRecord": "Lê no cadastro mestre o nome, o SKU e a unidade do produto de cada entrada, hidratando a lista inteira de uma vez.",
    "sequence.next": "Emite o número da entrada no estoque na criação, pela sequência compras.EntradaEstoque do módulo.",
    "compras.publicarEntradaEstoque": "Publica cada entrada gerada ao controle de estoque, com produto e quantidade recebida, e registra o momento e o identificador devolvido; executado pelo processo do pedido de compra."
  },
  "rules": [
    "entradaGeradaPeloRecebimento",
    "quantidadeEntradaPositiva",
    "entradaUnicaPorItemRecebimento",
    "entradaProdutoDoItemPedido",
    "quantidadeRecebidaNaoExcedePedido",
    "entradaPublicadaAoEstoque"
  ],
  "kind": "entity",
  "class": "event",
  "storage": {
    "target": "moduleDatabase",
    "table": "compras_entradaestoque",
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
      "numero": {
        "type": "string",
        "required": true,
        "unique": true,
        "indexed": true,
        "derived": true,
        "title": "Número da entrada",
        "description": "Número da entrada no estoque, emitido pelo sistema na criação a partir da sequência do módulo; é o número citado ao conferir o estoque."
      },
      "recebimentoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Recebimento"
        ],
        "title": "Recebimento",
        "description": "Recebimento registrado pelo almoxarife que gerou esta entrada no estoque."
      },
      "itemPedidoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "ItemPedido"
        ],
        "title": "Item do pedido",
        "description": "Item do pedido de compra cuja quantidade recebida deu entrada no estoque."
      },
      "produtoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Produto"
        ],
        "title": "Produto",
        "description": "Produto que teve entrada no estoque; o nome, o SKU e a unidade vêm do cadastro mestre do produto."
      },
      "dataEntrada": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "derived": true,
        "title": "Data da entrada",
        "description": "Momento em que a entrada foi gerada pelo processo de recebimento; usado para ordenar e filtrar as entradas por período."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Dados da entrada no estoque que só são exibidos.",
        "fields": {
          "quantidade": {
            "type": "number",
            "required": true,
            "title": "Quantidade recebida",
            "description": "Quantidade do produto recebida neste recebimento para o item, que entra no estoque (na unidade de medida do produto).",
            "min": 0
          },
          "valorUnitario": {
            "type": "money",
            "title": "Preço unitário",
            "description": "Preço unitário do item no pedido de compra no momento da entrada, guardado para valorizar a entrada no estoque.",
            "min": 0
          },
          "recebimentoParcial": {
            "type": "boolean",
            "title": "Recebimento parcial",
            "description": "Indica que a quantidade recebida deste item foi menor que a quantidade pedida."
          },
          "publicacao": {
            "type": "object",
            "title": "Publicação ao estoque",
            "description": "Registro do envio desta entrada ao controle de estoque.",
            "fields": {
              "publicadaEm": {
                "type": "timestamp",
                "title": "Publicada em",
                "description": "Momento em que a entrada foi publicada ao controle de estoque."
              },
              "identificadorExterno": {
                "type": "string",
                "title": "Identificador no estoque",
                "description": "Identificador devolvido pelo controle de estoque ao aceitar a entrada.",
                "maxLength": 120
              }
            }
          },
          "observacao": {
            "type": "text",
            "title": "Observação",
            "description": "Observação sobre a entrada, como avarias ou diferenças notadas na conferência.",
            "maxLength": 1000
          },
          "valorTotal": {
            "type": "money",
            "derived": true,
            "title": "Valor da entrada",
            "description": "Quantidade recebida desta entrada multiplicada pelo preço unitário do item no pedido."
          },
          "publicada": {
            "type": "boolean",
            "derived": true,
            "title": "Publicada ao estoque",
            "description": "Verdadeiro quando a entrada já tem o momento de publicação ao controle de estoque registrado."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "recebimentoId",
      "itemPedidoId"
    ]
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type ComprasEntityEntradaEstoqueType = typeof comprasEntityEntradaEstoque;

export default comprasEntityEntradaEstoque;
