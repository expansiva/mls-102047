/// <mls fileReference="_102047_/l4/compras/ontology/SupplierProduct.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntitySupplierProduct = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "SupplierProduct",
  "title": "Produto do fornecedor",
  "description": "Item do catálogo comercial de um fornecedor, com o preço combinado para um produto mestre.",
  "displayField": "details.description",
  "relationships": {
    "supplier": {
      "relationshipId": "supplierProductSupplier",
      "to": "Supplier",
      "via": "SupplierProduct.supplierId",
      "cardinality": "N:1",
      "title": "Fornecedor do catálogo",
      "description": "Cada item de catálogo pertence a um único fornecedor.",
      "mode": "fk",
      "required": "Sempre"
    },
    "product": {
      "relationshipId": "supplierProductProduct",
      "to": "Product",
      "via": "SupplierProduct.productId",
      "cardinality": "N:1",
      "title": "Produto fornecido",
      "description": "Cada item de catálogo referencia um único produto mestre.",
      "mode": "fk",
      "required": "Sempre"
    }
  },
  "capabilities": {
    "read.byId": "Lê um produto do fornecedor pelo identificador da linha no repositório da tabela, para telas que já possuem esse identificador.",
    "locate.byColumn": "Lista produtos de fornecedores por fornecedor ou produto, usando as colunas indexadas supplierId e productId, para o comprador localizar o catálogo.",
    "count": "Conta produtos do catálogo que atendem aos filtros de fornecedor ou produto, para informar o total nas listas do comprador.",
    "listByForeignKey": "Lista os produtos vinculados a um fornecedor ou as ofertas de um produto por chave estrangeira, para compor e consultar catálogos.",
    "create": "Cria um item de catálogo com fornecedor, produto, descrição e preço combinado, para o comprador registrar um produto fornecido.",
    "update": "Atualiza a descrição comercial ou o preço combinado do item, para o comprador manter o catálogo do fornecedor vigente.",
    "uniqueKey": "Recusa outro item com o mesmo fornecedor e produto pela chave única composta, para impedir duplicidade no catálogo.",
    "read.mdmRecord": "Lê os registros mestres do fornecedor e do produto apontados pelas chaves estrangeiras, para exibir seus dados nas telas de compras."
  },
  "rules": [
    "supplierProductUnique"
  ],
  "kind": "entity",
  "class": "supporting",
  "storage": {
    "target": "moduleDatabase",
    "table": "compras_supplierproduct",
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
      "supplierId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "Supplier"
        ],
        "title": "Fornecedor",
        "description": "Fornecedor ao qual este item de catálogo comercial pertence.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "productId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "Product"
        ],
        "title": "Produto",
        "description": "Produto mestre fornecido por este fornecedor.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "Address",
        "title": "Dados do produto do fornecedor",
        "description": "Dados comerciais específicos do produto no catálogo deste fornecedor.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "description": {
            "type": "string",
            "required": true,
            "of": "Address",
            "title": "Descrição",
            "description": "Descrição comercial usada para identificar o item no catálogo do fornecedor.",
            "maxLength": 500,
            "min": 0,
            "max": 0
          },
          "agreedPrice": {
            "type": "money",
            "required": true,
            "of": "Address",
            "title": "Preço combinado",
            "description": "Preço unitário atualmente combinado com o fornecedor para este produto.",
            "maxLength": 0,
            "min": 0,
            "max": 0
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "supplierId",
      "productId"
    ]
  ]
} as const satisfies Ns5OntologyEntityV3;

export type ComprasEntitySupplierProductType = typeof comprasEntitySupplierProduct;

export default comprasEntitySupplierProduct;
