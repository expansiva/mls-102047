/// <mls fileReference="_102047_/l4/compras/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact } from '/_102035_/l2/solution/types.js';

export const comprasAccess = {
  "schemaVersion": "2026-09-10-ns5-access-v2",
  "moduleName": "compras",
  "actors": [
    {
      "actorId": "comprador",
      "kind": "internal",
      "origin": "named",
      "title": "Comprador",
      "description": "Profissional responsável por cadastrar fornecedores e suas condições de fornecimento, abrir pedidos de compra e enviá-los."
    },
    {
      "actorId": "gerenteCompras",
      "kind": "internal",
      "origin": "named",
      "title": "Gerente de compras",
      "description": "Responsável por aprovar ou rejeitar pedidos acima do valor limite e acompanhar os indicadores de compras."
    },
    {
      "actorId": "almoxarife",
      "kind": "internal",
      "origin": "named",
      "title": "Almoxarife",
      "description": "Profissional responsável por registrar o recebimento total ou parcial dos pedidos e a entrada dos produtos no estoque."
    }
  ],
  "authorities": [
    {
      "authorityId": "gerirFornecedoresEcondicoes",
      "title": "Gerir fornecedores e condições de fornecimento",
      "description": "Cadastrar ou vincular fornecedores e registrar as condições comerciais de produtos e preços combinados."
    },
    {
      "authorityId": "gerirPedidosCompra",
      "title": "Gerir pedidos de compra",
      "description": "Abrir, compor e enviar pedidos de compra para fornecedores."
    },
    {
      "authorityId": "decidirPedidosAcimaLimite",
      "title": "Decidir pedidos acima do limite",
      "description": "Analisar e aprovar ou rejeitar pedidos de compra sujeitos à decisão gerencial."
    },
    {
      "authorityId": "acompanharIndicadoresCompras",
      "title": "Acompanhar indicadores de compras",
      "description": "Consultar pedidos em aberto ou atrasados e os totais mensais comprados por fornecedor."
    },
    {
      "authorityId": "registrarRecebimentos",
      "title": "Registrar recebimentos",
      "description": "Registrar recebimentos totais ou parciais e as entradas de estoque correspondentes."
    }
  ],
  "grants": [
    {
      "grantId": "compradorGerirFornecedoresEcondicoes",
      "actorRef": "comprador",
      "authorityRef": "gerirFornecedoresEcondicoes",
      "entityRefs": [
        "Supplier",
        "Product",
        "SupplyCondition"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Fornecedores, produtos e condições de fornecimento de toda a organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Acesso completo aos registros necessários para cadastrar fornecedores e manter condições de fornecimento."
      }
    },
    {
      "grantId": "compradorGerirPedidosCompra",
      "actorRef": "comprador",
      "authorityRef": "gerirPedidosCompra",
      "entityRefs": [
        "Supplier",
        "Product",
        "PurchaseOrder",
        "PurchaseOrderItem"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Pedidos de compra, seus itens, fornecedores e produtos de toda a organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Acesso completo aos dados necessários para abrir e enviar pedidos de compra."
      }
    },
    {
      "grantId": "gerenteDecidirPedidosAcimaLimite",
      "actorRef": "gerenteCompras",
      "authorityRef": "decidirPedidosAcimaLimite",
      "entityRefs": [
        "Supplier",
        "Product",
        "PurchaseOrder",
        "PurchaseOrderItem"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Pedidos de compra de toda a organização sujeitos à análise e decisão gerencial."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Acesso completo aos pedidos, itens, fornecedores e produtos necessários para decidir pedidos acima do limite."
      }
    },
    {
      "grantId": "gerenteAcompanharIndicadoresCompras",
      "actorRef": "gerenteCompras",
      "authorityRef": "acompanharIndicadoresCompras",
      "entityRefs": [
        "Supplier",
        "PurchaseOrder"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Indicadores e pedidos de compra de toda a organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Acesso aos campos necessários para acompanhar pedidos em aberto, atrasados e totais mensais por fornecedor."
      }
    },
    {
      "grantId": "almoxarifeRegistrarRecebimentos",
      "actorRef": "almoxarife",
      "authorityRef": "registrarRecebimentos",
      "entityRefs": [
        "Supplier",
        "Product",
        "PurchaseOrder",
        "PurchaseOrderItem",
        "Receipt",
        "StockEntry"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Pedidos enviados, seus itens, produtos, recebimentos e entradas de estoque de toda a organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Acesso completo aos dados necessários para conferir pedidos, registrar recebimentos e registrar entradas de estoque."
      }
    }
  ]
} as const satisfies Ns5AccessArtifact;

export type ComprasAccessType = typeof comprasAccess;

export default comprasAccess;
