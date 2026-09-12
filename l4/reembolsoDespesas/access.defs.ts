/// <mls fileReference="_102047_/l4/reembolsoDespesas/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact } from '/_102035_/l2/solution/types.js';

export const reembolsoDespesasAccess = {
  "schemaVersion": "2026-09-10-ns5-access-v2",
  "moduleName": "reembolsoDespesas",
  "actors": [
    {
      "actorId": "colaborador",
      "kind": "internal",
      "origin": "named",
      "title": "Colaborador",
      "description": "Registra, envia, corrige e consulta as próprias despesas para reembolso."
    },
    {
      "actorId": "gestorEquipe",
      "kind": "internal",
      "origin": "named",
      "title": "Gestor da equipe",
      "description": "Avalia as despesas da sua equipe, aprovando-as ou rejeitando-as com um motivo."
    },
    {
      "actorId": "financeiro",
      "kind": "internal",
      "origin": "named",
      "title": "Financeiro",
      "description": "Consulta as despesas aprovadas e registra o respectivo pagamento."
    }
  ],
  "authorities": [
    {
      "authorityId": "gerirPropriasDespesas",
      "title": "Gerir próprias despesas",
      "description": "Registrar, enviar, corrigir, reenviar e consultar despesas de reembolso registradas pelo próprio colaborador."
    },
    {
      "authorityId": "avaliarDespesasDaEquipe",
      "title": "Avaliar despesas da equipe",
      "description": "Consultar e decidir pela aprovação ou rejeição das despesas enviadas pelos integrantes da equipe."
    },
    {
      "authorityId": "registrarPagamentosDeReembolso",
      "title": "Registrar pagamentos de reembolso",
      "description": "Consultar despesas aprovadas e registrar a data de pagamento do reembolso."
    }
  ],
  "grants": [
    {
      "grantId": "colaboradorGerirPropriasDespesas",
      "actorRef": "colaborador",
      "authorityRef": "gerirPropriasDespesas",
      "entityRefs": [
        "Despesa"
      ],
      "dataScope": {
        "mode": "custom",
        "description": "Somente despesas cujo colaborador responsável corresponde à pessoa da sessão."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "O colaborador pode consultar todos os dados de suas próprias despesas, inclusive situação, motivo de rejeição e pagamento."
      }
    },
    {
      "grantId": "gestorAvaliarDespesasDaEquipe",
      "actorRef": "gestorEquipe",
      "authorityRef": "avaliarDespesasDaEquipe",
      "entityRefs": [
        "Despesa"
      ],
      "dataScope": {
        "mode": "custom",
        "description": "Somente despesas de colaboradores que integram a equipe sob gestão do gestor da sessão e que estejam disponíveis para avaliação."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "O gestor consulta os dados necessários para avaliar a despesa e registra a decisão, sem acesso à data de pagamento.",
        "allowedFields": [
          "Despesa.id",
          "Despesa.collaboratorId",
          "Despesa.expenseDate",
          "Despesa.category",
          "Despesa.amount",
          "Despesa.description",
          "Despesa.receiptDocumentId",
          "Despesa.rejectionReason",
          "Despesa.resubmissionCount",
          "Despesa.status"
        ],
        "deniedFields": [
          "Despesa.paymentDate"
        ]
      }
    },
    {
      "grantId": "financeiroRegistrarPagamentos",
      "actorRef": "financeiro",
      "authorityRef": "registrarPagamentosDeReembolso",
      "entityRefs": [
        "Despesa"
      ],
      "dataScope": {
        "mode": "custom",
        "description": "Somente despesas aprovadas que aguardam o registro de pagamento, em toda a organização."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "O financeiro consulta os dados e o comprovante necessários ao pagamento e registra sua data, sem acesso ao motivo de rejeição nem à contagem de reenvios.",
        "allowedFields": [
          "Despesa.id",
          "Despesa.collaboratorId",
          "Despesa.expenseDate",
          "Despesa.category",
          "Despesa.amount",
          "Despesa.description",
          "Despesa.receiptDocumentId",
          "Despesa.paymentDate",
          "Despesa.status"
        ],
        "deniedFields": [
          "Despesa.rejectionReason",
          "Despesa.resubmissionCount"
        ]
      }
    }
  ]
} as const satisfies Ns5AccessArtifact;

export type ReembolsoDespesasAccessType = typeof reembolsoDespesasAccess;

export default reembolsoDespesasAccess;
