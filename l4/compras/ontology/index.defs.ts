/// <mls fileReference="_102047_/l4/compras/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const comprasOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "businessDomain": "Gestão de compras, fornecedores, pedidos de compra e recebimentos.",
  "entities": [
    "Fornecedor",
    "Comprador",
    "Produto",
    "OfertaFornecedor",
    "PedidoCompra",
    "RecebimentoCompra",
    "Estoque"
  ],
  "relationships": [
    {
      "relationshipId": "compradorGerenciaFornecedor",
      "fromEntity": "Comprador",
      "toEntity": "Fornecedor",
      "type": "manyToMany",
      "required": false,
      "description": "O comprador responsável gerencia os fornecedores que cadastra para compras.",
      "persistence": {
        "mode": "mdmRelationship"
      },
      "realization": {
        "kind": "mdmRelationship",
        "ownerEntity": "Comprador",
        "from": {
          "entityId": "Comprador",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "Fornecedor",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "ofertaDoFornecedor",
      "fromEntity": "Fornecedor",
      "toEntity": "OfertaFornecedor",
      "type": "oneToMany",
      "required": true,
      "description": "O fornecedor possui ofertas comerciais de produtos para a organização.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "OfertaFornecedor",
        "from": {
          "entityId": "Fornecedor",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "OfertaFornecedor",
          "fieldIds": [
            "fornecedorId"
          ]
        }
      }
    },
    {
      "relationshipId": "ofertaParaProduto",
      "fromEntity": "OfertaFornecedor",
      "toEntity": "Produto",
      "type": "manyToOne",
      "required": true,
      "description": "A oferta de fornecedor estabelece o preço combinado de um produto.",
      "persistence": {
        "mode": "externalReference"
      },
      "realization": {
        "kind": "externalReference",
        "ownerEntity": "OfertaFornecedor",
        "from": {
          "entityId": "OfertaFornecedor",
          "fieldIds": [
            "produtoId"
          ]
        },
        "to": {
          "entityId": "Produto",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "pedidoDoFornecedor",
      "fromEntity": "Fornecedor",
      "toEntity": "PedidoCompra",
      "type": "oneToMany",
      "required": true,
      "description": "O fornecedor é o destinatário dos pedidos de compra emitidos para ele.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "PedidoCompra",
        "from": {
          "entityId": "Fornecedor",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "PedidoCompra",
          "fieldIds": [
            "fornecedorId"
          ]
        }
      }
    },
    {
      "relationshipId": "pedidoAbertoPorComprador",
      "fromEntity": "Comprador",
      "toEntity": "PedidoCompra",
      "type": "oneToMany",
      "required": true,
      "description": "O comprador responsável abre os pedidos de compra sob seu acompanhamento.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "PedidoCompra",
        "from": {
          "entityId": "Comprador",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "PedidoCompra",
          "fieldIds": [
            "compradorId"
          ]
        }
      }
    },
    {
      "relationshipId": "pedidoContemProdutos",
      "fromEntity": "PedidoCompra",
      "toEntity": "Produto",
      "type": "manyToMany",
      "required": true,
      "description": "O pedido de compra contém um ou mais produtos com quantidades e preços solicitados.",
      "persistence": {
        "mode": "externalReference"
      },
      "realization": {
        "kind": "externalReference",
        "ownerEntity": "PedidoCompra",
        "from": {
          "entityId": "PedidoCompra",
          "fieldIds": [
            "itens"
          ]
        },
        "to": {
          "entityId": "Produto",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "recebimentoDoPedido",
      "fromEntity": "PedidoCompra",
      "toEntity": "RecebimentoCompra",
      "type": "oneToMany",
      "required": true,
      "description": "O pedido de compra pode ter um ou mais recebimentos totais ou parciais.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "RecebimentoCompra",
        "from": {
          "entityId": "PedidoCompra",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "RecebimentoCompra",
          "fieldIds": [
            "pedidoCompraId"
          ]
        }
      }
    },
    {
      "relationshipId": "recebimentoIncluiProdutos",
      "fromEntity": "RecebimentoCompra",
      "toEntity": "Produto",
      "type": "manyToMany",
      "required": true,
      "description": "O recebimento registra as quantidades efetivamente recebidas de cada produto.",
      "persistence": {
        "mode": "externalReference"
      },
      "realization": {
        "kind": "externalReference",
        "ownerEntity": "RecebimentoCompra",
        "from": {
          "entityId": "RecebimentoCompra",
          "fieldIds": [
            "itensRecebidos"
          ]
        },
        "to": {
          "entityId": "Produto",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "recebimentoLancaEntradaNoEstoque",
      "fromEntity": "RecebimentoCompra",
      "toEntity": "Estoque",
      "type": "manyToOne",
      "required": true,
      "description": "O recebimento de compra lança a entrada dos produtos no estoque controlado externamente.",
      "persistence": {
        "mode": "externalReference"
      },
      "realization": {
        "kind": "externalReference",
        "ownerEntity": "RecebimentoCompra",
        "from": {
          "entityId": "RecebimentoCompra",
          "fieldIds": [
            "estoqueId"
          ]
        },
        "to": {
          "entityId": "Estoque",
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
