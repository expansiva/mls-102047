/// <mls fileReference="_102047_/l4/financeiro/ontology/Recebimento.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const financeiroEntityRecebimento = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "financeiro",
  "entityId": "Recebimento",
  "title": "Recebimento",
  "description": "Registro de recebimento integral ou parcial de um título, inclusive pagamento por cartão processado pela Stripe e eventual estorno no mesmo dia.",
  "displayField": "id",
  "relationships": {
    "titulo": {
      "relationshipId": "recebimentoTitulo",
      "to": "TituloReceber",
      "via": "Recebimento.tituloId",
      "cardinality": "N:1",
      "title": "Título do recebimento",
      "description": "Cada recebimento registra a baixa total ou parcial de um único título a receber.",
      "mode": "fk",
      "required": "Sempre",
      "role": "Título baixado pelo recebimento."
    },
    "pagador": {
      "relationshipId": "recebimentoPagador",
      "to": "Pagador",
      "via": "TituloReceber",
      "cardinality": "N:1",
      "title": "Pagador do recebimento",
      "description": "O pagador é obtido indiretamente pelo título a receber vinculado ao recebimento.",
      "mode": "throughTable",
      "path": "Recebimento.tituloId -> TituloReceber.pagadorId",
      "derived": true,
      "required": "Sempre, por meio do título vinculado",
      "role": "Pagador responsável pelo título vinculado."
    }
  },
  "capabilities": {
    "read.byId": "Lê um recebimento pelo identificador da linha, via consulta por id, para caixa, gerente financeiro e pagador quando o acesso estiver no escopo permitido.",
    "locate.byColumn": "Lista recebimentos por título, situação ou data e hora indexadas, com ordenação e paginação, para caixa, gerente financeiro e portal do pagador dentro do respectivo escopo.",
    "count": "Conta os recebimentos que atendem aos filtros indexados, usando a mesma consulta da lista, para o gerente financeiro compor consultas e extratos.",
    "listByForeignKey": "Lista os recebimentos vinculados a um título pelo campo tituloId, via consulta por chave estrangeira, para caixa, gerente financeiro e pagador visualizarem as baixas do título.",
    "create": "Registra uma baixa total ou parcial em um título por inserção de recebimento, para caixa e pagador no pagamento por cartão confirmado.",
    "transition": "Move um recebimento registrado para estornado pela atualização da situação, para o caixa estornar exclusivamente no mesmo dia.",
    "transaction": "Executa de forma atômica o registro ou estorno do recebimento e a atualização do saldo do título, para caixa e pagamento por cartão do pagador.",
    "financeiro.processarCartaoStripe": "Envia e confirma o pagamento por cartão na Stripe, guarda somente o identificador da transação retornada e então registra o recebimento, para o pagador no portal."
  },
  "rules": [
    "receiptAmountPositive",
    "receiptCannotExceedOpenBalance",
    "cardPaymentRequiresStripeConfirmation",
    "sameDayReversal"
  ],
  "kind": "entity",
  "class": "event",
  "storage": {
    "target": "moduleDatabase",
    "table": "financeiro_recebimento",
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
      "tituloId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "TituloReceber"
        ],
        "title": "Título a receber",
        "description": "Título a receber ao qual esta baixa integral ou parcial se refere.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "of": "Address",
        "values": [
          {
            "value": "registered",
            "title": "Registrado",
            "description": "Recebimento efetivado e considerado no saldo do título."
          },
          {
            "value": "reversed",
            "title": "Estornado",
            "description": "Recebimento revertido no mesmo dia e desconsiderado do saldo do título."
          }
        ],
        "title": "Situação",
        "description": "Situação do recebimento, que permite distinguir um recebimento registrado de um estorno.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "recebidoEm": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "of": "Address",
        "title": "Data e hora do recebimento",
        "description": "Momento em que o valor foi recebido; é usado para localizar recebimentos do dia e validar estornos no mesmo dia.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "Address",
        "title": "Dados do recebimento",
        "description": "Dados financeiros e da forma de pagamento que não são usados como critério de busca.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "valor": {
            "type": "money",
            "required": true,
            "of": "Address",
            "title": "Valor recebido",
            "description": "Valor efetivamente recebido nesta baixa, que pode quitar o título total ou parcialmente.",
            "maxLength": 0,
            "min": 0.01,
            "max": 0
          },
          "formaPagamento": {
            "type": "enum",
            "required": true,
            "of": "Address",
            "values": [
              {
                "value": "cash",
                "title": "Dinheiro",
                "description": "Valor recebido em dinheiro."
              },
              {
                "value": "pix",
                "title": "Pix",
                "description": "Valor recebido por Pix."
              },
              {
                "value": "card",
                "title": "Cartão",
                "description": "Valor recebido por cartão e processado pela Stripe."
              }
            ],
            "title": "Forma de pagamento",
            "description": "Meio pelo qual o recebimento foi realizado.",
            "maxLength": 0,
            "min": 0,
            "max": 0
          },
          "stripe": {
            "type": "object",
            "of": "Address",
            "title": "Processamento Stripe",
            "description": "Identificador do processamento da Stripe, informado somente para pagamento com cartão; não armazena dados do cartão.",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "fields": {
              "transacaoId": {
                "type": "string",
                "required": true,
                "of": "Address",
                "title": "Identificador da transação Stripe",
                "description": "Identificador retornado pela Stripe para confirmar o pagamento por cartão.",
                "pattern": "^[A-Za-z0-9_-]+$",
                "maxLength": 255,
                "min": 0,
                "max": 0
              }
            }
          }
        }
      }
    }
  },
  "lifecycleStates": [
    {
      "state": "registered",
      "reachedBy": "actor"
    },
    {
      "state": "reversed",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "estornarRecebimento",
      "from": [
        "registered"
      ],
      "to": "reversed",
      "by": [
        "caixa"
      ],
      "description": "Estorna um recebimento registrado no mesmo dia, recompondo o saldo do título correspondente.",
      "ruleRefs": [
        "sameDayReversal"
      ]
    }
  ]
} as const satisfies Ns5OntologyEntityV3;

export type FinanceiroEntityRecebimentoType = typeof financeiroEntityRecebimento;

export default financeiroEntityRecebimento;
