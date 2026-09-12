/// <mls fileReference="_102047_/l4/financeiro/ontology/Recebimento.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroEntityRecebimento = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "financeiro",
  "entityId": "Recebimento",
  "title": "Recebimento",
  "description": "Registro de uma solicitação ou confirmação de valor recebido para um título, por dinheiro, Pix ou cartão.",
  "kind": "event",
  "party": "none",
  "displayField": "numeroRecebimento",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do recebimento."
    },
    {
      "fieldId": "numeroRecebimento",
      "title": "Número do recebimento",
      "type": "string",
      "required": true,
      "unique": true,
      "description": "Número sequencial que identifica o recebimento."
    },
    {
      "fieldId": "tituloReceberId",
      "title": "Título a receber",
      "type": "uuid",
      "required": true,
      "description": "Título a receber ao qual a solicitação, confirmação ou estorno está vinculado."
    },
    {
      "fieldId": "valor",
      "title": "Valor recebido",
      "type": "money",
      "required": true,
      "description": "Valor da baixa ou da cobrança solicitada para o título."
    },
    {
      "fieldId": "meioPagamento",
      "title": "Meio de pagamento",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "dinheiro",
          "title": "Dinheiro"
        },
        {
          "value": "pix",
          "title": "Pix"
        },
        {
          "value": "cartao",
          "title": "Cartão"
        }
      ],
      "description": "Meio utilizado ou solicitado para o recebimento."
    },
    {
      "fieldId": "status",
      "title": "Situação",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "solicitado",
          "title": "Solicitado"
        },
        {
          "value": "confirmado",
          "title": "Confirmado"
        },
        {
          "value": "estornado",
          "title": "Estornado"
        }
      ],
      "description": "Situação atual da solicitação ou confirmação de recebimento."
    },
    {
      "fieldId": "recebidoEm",
      "title": "Recebido em",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o recebimento foi confirmado."
    },
    {
      "fieldId": "stripePaymentId",
      "title": "Identificador do pagamento Stripe",
      "type": "string",
      "required": false,
      "description": "Identificador da cobrança processada pela Stripe quando o meio de pagamento for cartão."
    },
    {
      "fieldId": "estornadoEm",
      "title": "Estornado em",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o recebimento foi estornado."
    }
  ],
  "lifecycleStates": [
    {
      "state": "solicitado",
      "reachedBy": "actor"
    },
    {
      "state": "confirmado",
      "reachedBy": "actor"
    },
    {
      "state": "estornado",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "confirmarPagamentoComCartao",
      "from": [
        "solicitado"
      ],
      "to": "confirmado",
      "by": [
        "stripe"
      ],
      "description": "Confirma o recebimento por cartão após o processamento da cobrança pela Stripe."
    },
    {
      "transitionId": "estornarRecebimento",
      "from": [
        "confirmado"
      ],
      "to": "estornado",
      "by": [
        "caixa"
      ],
      "description": "Estorna um recebimento confirmado e permite a recomposição do saldo do título."
    }
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type FinanceiroEntityRecebimentoType = typeof financeiroEntityRecebimento;

export default financeiroEntityRecebimento;
