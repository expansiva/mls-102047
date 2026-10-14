/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page31/despesas_aprovadas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templatesTest/paymentWizard/page21.md",
    "experience": "paymentWizard"
  },
  "intent": "No celular, o financeiro percorre as despesas aprovadas em uma coluna estreita e fluida (cerca de 390px, usável de 360px a 430px). Ao escolher uma despesa, ele confere os dados e registra a data de pagamento.",
  "sections": [
    {
      "id": "filaPagamento",
      "priority": "primary",
      "purpose": "Mostra as despesas aprovadas que ainda aguardam pagamento em itens empilhados, fáceis de tocar.",
      "organisms": [
        "despesasAprovadasLista"
      ]
    },
    {
      "id": "analisePagamento",
      "priority": "main",
      "purpose": "Mostra os dados da despesa escolhida e, logo abaixo, o registro da data de pagamento.",
      "organisms": [
        "despesaAprovadaDetalhe",
        "registroPagamentoForm"
      ]
    }
  ],
  "organisms": {
    "despesasAprovadasLista": {
      "kind": "list",
      "text": "Lista as despesas aprovadas que aguardam pagamento, destacando o valor, o colaborador e a data. O financeiro escolhe a despesa que vai pagar.",
      "intents": []
    },
    "despesaAprovadaDetalhe": {
      "kind": "detail",
      "text": "Mostra os dados da despesa aprovada: colaborador, data, categoria, valor, descrição e situação. O financeiro confere essas informações antes de pagar.",
      "intents": []
    },
    "registroPagamentoForm": {
      "kind": "form",
      "text": "Recebe a data em que a despesa aprovada foi paga e registra o pagamento. Com isso, a despesa passa para a situação de paga.",
      "intents": [
        {
          "id": "registrarPagamento",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "despesasAprovadasLista": [
      {
        "role": "Lista vertical de cartões das despesas aprovadas",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      },
      {
        "role": "Filtro de categoria em pílulas, uma por opção mais \"todas\"",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupnavigatesection--ml-navigate-pills"
      },
      {
        "role": "paginação",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "despesaAprovadaDetalhe": [
      {
        "role": "Passo 1, Conferir: a despesa somente leitura",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "registroPagamentoForm": [
      {
        "role": "Indicador de passos \"Passo 1 de 2\" / \"Passo 2 de 2\"",
        "preferred": "groupnavigatesteps--ml-wizard-steps",
        "alternative": "groupnavigatesteps--ml-compact-step-indicator"
      },
      {
        "role": "Passo 2: data do pagamento",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "Confirmar pagamento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Cena de sucesso com o que foi pago",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
