/// <mls fileReference="_102047_/l4/compras/ontology/ProdutoFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntityProdutoFornecedor = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "compras",
  "entityId": "ProdutoFornecedor",
  "title": "Produto fornecido",
  "description": "Condição comercial vigente de um produto fornecido por uma empresa, incluindo o preço combinado.",
  "displayField": "id",
  "relationships": {
    "fornecedor": {
      "relationshipId": "produtoFornecedorFornecedor",
      "to": "Fornecedor",
      "via": "ProdutoFornecedor.fornecedorId",
      "cardinality": "N:1",
      "title": "Fornecedor da condição comercial",
      "description": "Cada condição comercial de produto fornecido pertence a um fornecedor.",
      "mode": "fk",
      "required": "Sempre, para identificar a empresa que fornece o produto."
    },
    "produto": {
      "relationshipId": "produtoFornecedorProduto",
      "to": "Produto",
      "via": "ProdutoFornecedor.produtoId",
      "cardinality": "N:1",
      "title": "Produto fornecido",
      "description": "Cada condição comercial registra o produto disponibilizado pelo fornecedor.",
      "mode": "fk",
      "required": "Sempre, para identificar o produto disponibilizado."
    }
  },
  "capabilities": {
    "read.byId": "Consulta uma condição comercial pelo identificador da linha · usa findOne por id na tabela de produtos fornecidos · comprador ao abrir ou revisar um pedido de compra.",
    "locate.byColumn": "Lista condições comerciais por fornecedor ou produto, com paginação · filtra os índices fornecedorId e produtoId na tabela · comprador ao consultar produtos e preços de um fornecedor.",
    "count": "Conta as condições comerciais que atendem aos filtros indexados · executa count pelos campos fornecedorId e produtoId · comprador ao acompanhar a quantidade de produtos cadastrados para um fornecedor.",
    "listByForeignKey": "Lista os produtos e condições comerciais vinculados a um fornecedor ou produto · consulta pela chave estrangeira em lote quando necessário · comprador ao cadastrar e consultar o catálogo de cada fornecedor.",
    "create": "Registra uma condição comercial de produto fornecido com o preço combinado · insere a linha com fornecedorId, produtoId e detalhes · comprador ao cadastrar os produtos fornecidos.",
    "update": "Atualiza o preço combinado de uma condição comercial existente · aplica patch aos detalhes da linha identificada · comprador ao renegociar o preço com o fornecedor.",
    "delete": "Remove uma condição comercial cadastrada indevidamente ou que não deve mais ser usada · exclui a linha pelo identificador · comprador na manutenção do catálogo do fornecedor.",
    "uniqueKey": "Impede dois cadastros da mesma combinação de fornecedor e produto · aplica índice único em fornecedorId e produtoId · motor ao gravar condições comerciais do comprador.",
    "read.mdmRecord": "Lê os dados mestres do fornecedor e do produto referenciados pela condição comercial · hidrata os registros MDM pelos identificadores das chaves estrangeiras · comprador nas listas e no pedido de compra."
  },
  "rules": [
    "precoCombinadoPositivo"
  ],
  "kind": "entity",
  "class": "supporting",
  "storage": {
    "target": "moduleDatabase",
    "table": "compras_produtofornecedor",
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
      "fornecedorId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "Fornecedor"
        ],
        "title": "Fornecedor",
        "description": "Fornecedor ao qual pertence esta condição comercial de fornecimento.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "produtoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "Produto"
        ],
        "title": "Produto",
        "description": "Produto disponibilizado pelo fornecedor nesta condição comercial.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "Address",
        "title": "Condição comercial",
        "description": "Dados próprios da condição comercial acordada entre o fornecedor e a organização.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "precoCombinado": {
            "type": "money",
            "required": true,
            "of": "Address",
            "title": "Preço combinado",
            "description": "Preço unitário atualmente combinado com o fornecedor para a compra deste produto.",
            "maxLength": 0,
            "min": 0.01,
            "max": 0
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "fornecedorId",
      "produtoId"
    ]
  ]
} as const satisfies Ns5OntologyEntityV3;

export type ComprasEntityProdutoFornecedorType = typeof comprasEntityProdutoFornecedor;

export default comprasEntityProdutoFornecedor;
