/// <mls fileReference="_102047_/l4/financeiro/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const financeiroAccess = {
  "schemaVersion": "2026-09-12-ns5-access-v3",
  "moduleName": "financeiro",
  "actors": [
    {
      "actorId": "caixa",
      "kind": "internal",
      "origin": "named",
      "title": "Caixa",
      "description": "Recebe títulos em dinheiro, pix ou cartão, registra baixas parciais e estorna recebimentos no mesmo dia.",
      "personEntity": ""
    },
    {
      "actorId": "gerenteFinanceiro",
      "kind": "internal",
      "origin": "named",
      "title": "Gerente financeiro",
      "description": "Acompanha o painel de recebíveis por período e por origem, os títulos vencidos, e emite extrato por pagador.",
      "personEntity": ""
    },
    {
      "actorId": "pagador",
      "kind": "external",
      "origin": "named",
      "title": "Pagador",
      "description": "Acessa o portal para ver só os próprios títulos e recebimentos e pode pagar com cartão um título em aberto.",
      "personEntity": "Pagador"
    }
  ],
  "grants": [
    {
      "grantId": "caixaTitulosRecebimentos",
      "actorRef": "caixa",
      "title": "Caixa: títulos e recebimentos",
      "description": "O caixa localiza e confere os títulos a receber da organização, registra recebimentos totais ou parciais e estorna recebimentos do mesmo dia.",
      "entityRefs": [
        "TituloReceber",
        "Recebimento"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todos os títulos e recebimentos da organização, pois o caixa atende qualquer pagador."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "O caixa vê o registro completo do título e do recebimento para conferir valores, saldo, forma de pagamento e estorno."
      }
    },
    {
      "grantId": "caixaPagador",
      "actorRef": "caixa",
      "title": "Caixa: identificação do pagador",
      "description": "O caixa consulta os dados do pagador necessários para localizar e conferir o título no atendimento.",
      "entityRefs": [
        "Pagador"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Qualquer pagador da organização que se apresente no caixa."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "Apenas nome, documento, contatos e saldo em aberto; endereço, consentimento e demais dados ficam ocultos.",
        "allowedFields": [
          "Pagador.details.identification.name",
          "Pagador.details.identification.docType",
          "Pagador.details.identification.docId",
          "Pagador.details.base.contacts",
          "Pagador.details.financeiro.saldoEmAberto"
        ]
      }
    },
    {
      "grantId": "gerenteRecebiveis",
      "actorRef": "gerenteFinanceiro",
      "title": "Gerente: títulos, recebimentos e pagadores",
      "description": "O gerente financeiro analisa os títulos vencidos, detalha recebimentos e estornos e emite o extrato por pagador.",
      "entityRefs": [
        "TituloReceber",
        "Recebimento",
        "Pagador"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todos os títulos, recebimentos e pagadores da organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "O gerente vê os registros completos, necessários para o extrato com documento e endereço do pagador."
      }
    },
    {
      "grantId": "gerentePainel",
      "actorRef": "gerenteFinanceiro",
      "title": "Gerente: painel de recebíveis",
      "description": "O gerente financeiro acompanha os totais a receber, recebidos, estornados e vencidos por período e por origem.",
      "entityRefs": [
        "PainelRecebiveis"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Totais de toda a organização, por período e origem."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "O registro do painel já é composto de totais; o gerente vê todos eles."
      }
    },
    {
      "grantId": "pagadorMeusTitulos",
      "actorRef": "pagador",
      "title": "Pagador: meus títulos e recebimentos",
      "description": "No portal, o pagador vê apenas os títulos em que é o pagador e os recebimentos desses títulos, e paga com cartão um título em aberto.",
      "entityRefs": [
        "TituloReceber",
        "Recebimento"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Somente títulos cujo pagador é a pessoa logada e os recebimentos desses títulos.",
        "anchorEntity": "Pagador"
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "O pagador vê valores, saldo, vencimento, origem e recebimentos; identificadores internos e anotações internas ficam ocultos.",
        "deniedFields": [
          "TituloReceber.origemReferenciaId",
          "TituloReceber.details.observacoes",
          "Recebimento.stripePaymentIntentId",
          "Recebimento.details.observacao"
        ]
      }
    },
    {
      "grantId": "pagadorMeuCadastro",
      "actorRef": "pagador",
      "title": "Pagador: meu cadastro",
      "description": "O pagador vê no portal seus próprios dados de cadastro e o resumo do seu saldo em aberto.",
      "entityRefs": [
        "Pagador"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Apenas o cadastro da própria pessoa logada.",
        "anchorEntity": "Pagador"
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "Nome, documento, dados base, consentimento e resumo financeiro próprios; tags e campos gerais da organização ficam ocultos.",
        "allowedFields": [
          "Pagador.details.identification.name",
          "Pagador.details.identification.docType",
          "Pagador.details.identification.docId",
          "Pagador.details.base",
          "Pagador.details.person",
          "Pagador.details.financeiro"
        ]
      }
    }
  ]
} as const satisfies Ns5Readonly<Ns5AccessArtifact>;

export type FinanceiroAccessType = typeof financeiroAccess;

export default financeiroAccess;
