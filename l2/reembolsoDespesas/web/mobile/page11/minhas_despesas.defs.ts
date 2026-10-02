/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/minhas_despesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Em coluna fluida em torno de 390px, ainda usável em 360px e 430px, o colaborador percorre as próprias despesas, consulta o detalhe, preenche o registro ou a correção e envia ou reenvia para aprovação.",
  "sections": [
    {
      "id": "acompanhamento",
      "priority": "primary",
      "purpose": "Empilha as despesas do colaborador em faixa estreita para ele varrer valor e situação sem grade fixa.",
      "organisms": [
        "listaMinhasDespesas"
      ]
    },
    {
      "id": "registro",
      "priority": "main",
      "purpose": "Concentra o preenchimento de data, categoria, valor, descrição e comprovante em fluxo vertical estreito para registrar ou corrigir.",
      "organisms": [
        "formularioDespesa"
      ]
    },
    {
      "id": "consultaEEnvio",
      "priority": "secondary",
      "purpose": "Mostra o detalhe da despesa aberta, inclusive o motivo da rejeição, e as ações de envio ou reenvio na sequência da coluna.",
      "organisms": [
        "detalheDespesa",
        "acoesDespesa"
      ]
    }
  ],
  "organisms": {
    "listaMinhasDespesas": {
      "kind": "list",
      "text": "Mostra em lista vertical as despesas do colaborador, com data, valor e situação, para ele achar o registro certo no telefone.",
      "intents": []
    },
    "detalheDespesa": {
      "kind": "detail",
      "text": "Apresenta dados, comprovante, situação e motivo da rejeição da despesa aberta, para o colaborador conferir o que foi pedido e o que o gestor recusou.",
      "intents": []
    },
    "formularioDespesa": {
      "kind": "form",
      "text": "Oferece os campos de data, categoria, valor, descrição e comprovante em conteúdo estreito para registrar uma despesa ou corrigir uma rejeitada.",
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
      "text": "Coloca o envio da despesa nova e o reenvio da despesa corrigida ao alcance do polegar, para seguir o fluxo de aprovação.",
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
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
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
        "preferred": "groupenterdate--ml-compact-calendar",
        "alternative": "groupenterdate--ml-date-picker"
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
        "preferred": "groupselectfileforupload--ml-file-upload-preview",
        "alternative": "groupselectfileforupload--ml-file-upload-dropzone"
      }
    ],
    "acoesDespesa": [
      {
        "role": "primaryActions",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
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
