/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/minhas_despesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "O colaborador acompanha as solicitações de reembolso que registrou, consulta dados, comprovante e motivo de rejeição, preenche uma despesa nova ou corrige uma recusada e envia ou reenvia para o gestor analisar.",
  "sections": [
    {
      "id": "acompanhamento",
      "priority": "primary",
      "purpose": "Apresenta as despesas do próprio colaborador para ele localizar cada solicitação e ver a situação atual.",
      "organisms": [
        "listaMinhasDespesas"
      ]
    },
    {
      "id": "consultaERegistro",
      "priority": "main",
      "purpose": "Mostra o detalhe da despesa aberta e o preenchimento dos dados e do comprovante para registrar ou corrigir.",
      "organisms": [
        "detalheDespesa",
        "formularioDespesa"
      ]
    },
    {
      "id": "envio",
      "priority": "secondary",
      "purpose": "Reúne o envio da despesa em rascunho e o reenvio único da despesa já corrigida.",
      "organisms": [
        "acoesDespesa"
      ]
    }
  ],
  "organisms": {
    "listaMinhasDespesas": {
      "kind": "list",
      "text": "Lista as despesas que o colaborador registrou, com data, categoria, valor e situação, para ele acompanhar o andamento de cada solicitação.",
      "intents": []
    },
    "detalheDespesa": {
      "kind": "detail",
      "text": "Exibe dados, comprovante, situação e o motivo da rejeição da despesa aberta, para o colaborador entender o pedido e o que precisa corrigir.",
      "intents": []
    },
    "formularioDespesa": {
      "kind": "form",
      "text": "Reúne data, categoria, valor, descrição e comprovante para o colaborador registrar uma despesa nova ou corrigir uma rejeitada antes do reenvio.",
      "intents": [
        {
          "id": "registrarDespesa",
          "kind": "submit"
        },
        {
          "id": "corrigirDespesa",
          "kind": "submit"
        }
      ]
    },
    "acoesDespesa": {
      "kind": "actions",
      "text": "Dispara o envio da despesa registrada e o reenvio da despesa corrigida, para o gestor da equipe analisar.",
      "intents": [
        {
          "id": "enviarParaAprovacao",
          "kind": "submit"
        },
        {
          "id": "reenviarParaAprovacao",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "listaMinhasDespesas": [
      {
        "role": "collection",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "detalheDespesa": [
      {
        "role": "record",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "formularioDespesa": [
      {
        "role": "expenseDate",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-compact-calendar"
      },
      {
        "role": "expenseAmount",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "expenseCategory",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "expenseDescription",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "expenseProof",
        "preferred": "groupselectfileforupload--ml-file-upload-dropzone",
        "alternative": "groupselectfileforupload--ml-file-upload-preview"
      }
    ],
    "acoesDespesa": [
      {
        "role": "primaryActions",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "actionFeedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "actionProgress",
        "preferred": "groupshowprogress--ml-indeterminate-spinner",
        "alternative": "groupshowprogress--ml-linear-progress"
      }
    ]
  }
} as const;
