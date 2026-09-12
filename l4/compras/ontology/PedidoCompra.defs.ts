/// <mls fileReference="_102047_/l4/compras/ontology/PedidoCompra.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntityPedidoCompra = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "PedidoCompra",
  "title": "Pedido de compra",
  "description": "Solicitação de compra enviada a um fornecedor, com produtos, quantidades, preços e decisão de aprovação quando necessária.",
  "kind": "core",
  "party": "none",
  "displayField": "numeroPedido",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do pedido de compra."
    },
    {
      "fieldId": "numeroPedido",
      "title": "Número do pedido",
      "type": "string",
      "required": true,
      "unique": true,
      "description": "Número sequencial que identifica o pedido de compra."
    },
    {
      "fieldId": "fornecedorId",
      "title": "Fornecedor",
      "type": "uuid",
      "required": true,
      "description": "Referência ao fornecedor para o qual o pedido de compra foi emitido."
    },
    {
      "fieldId": "compradorId",
      "title": "Comprador responsável",
      "type": "uuid",
      "required": true,
      "description": "Referência ao comprador responsável pela abertura e acompanhamento do pedido."
    },
    {
      "fieldId": "itens",
      "title": "Itens do pedido",
      "type": "json",
      "required": true,
      "description": "Lista dos produtos solicitados, com referência ao produto, quantidade e preço unitário acordado."
    },
    {
      "fieldId": "dataEmissao",
      "title": "Data de emissão",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que o pedido de compra foi aberto."
    },
    {
      "fieldId": "dataPrevistaEntrega",
      "title": "Data prevista de entrega",
      "type": "date",
      "required": false,
      "description": "Data prevista para a entrega dos produtos solicitados."
    },
    {
      "fieldId": "status",
      "title": "Status",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "aberto",
          "title": "Aberto"
        },
        {
          "value": "enviado",
          "title": "Enviado"
        },
        {
          "value": "aprovado",
          "title": "Aprovado"
        },
        {
          "value": "rejeitado",
          "title": "Rejeitado"
        }
      ],
      "description": "Situação atual do pedido de compra no seu processamento."
    }
  ],
  "details": {
    "valorTotal": {
      "type": "money",
      "description": "Valor total calculado pela soma das quantidades e preços dos itens do pedido."
    },
    "quantidadeTotalItens": {
      "type": "integer",
      "description": "Quantidade total de unidades solicitadas nos itens do pedido."
    },
    "percentualRecebido": {
      "type": "number",
      "description": "Percentual calculado das quantidades do pedido já recebidas."
    },
    "estaAtrasado": {
      "type": "boolean",
      "description": "Indica se o pedido permanece com recebimento pendente após a data prevista de entrega."
    }
  },
  "lifecycleStates": [
    {
      "state": "aberto",
      "reachedBy": "actor"
    },
    {
      "state": "enviado",
      "reachedBy": "actor"
    },
    {
      "state": "aprovado",
      "reachedBy": "actor"
    },
    {
      "state": "rejeitado",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "enviarPedido",
      "from": [
        "aberto"
      ],
      "to": "enviado",
      "by": [
        "comprador"
      ],
      "description": "Envia o pedido aberto para processamento e, quando aplicável, para avaliação de aprovação."
    },
    {
      "transitionId": "aprovarPedido",
      "from": [
        "enviado"
      ],
      "to": "aprovado",
      "by": [
        "gerenteCompras"
      ],
      "description": "Aprova o pedido enviado que exige autorização do gerente de compras."
    },
    {
      "transitionId": "rejeitarPedido",
      "from": [
        "enviado"
      ],
      "to": "rejeitado",
      "by": [
        "gerenteCompras"
      ],
      "description": "Rejeita o pedido enviado que não deve prosseguir para recebimento."
    }
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type ComprasEntityPedidoCompraType = typeof comprasEntityPedidoCompra;

export default comprasEntityPedidoCompra;
