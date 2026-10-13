/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/despesas_aprovadas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
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
        "role": "lista de despesas aprovadas",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "busca na lista",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "paginação",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "despesaAprovadaDetalhe": [
      {
        "role": "resumo da despesa",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "registroPagamentoForm": [
      {
        "role": "data de pagamento",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-compact-calendar"
      },
      {
        "role": "confirmar pagamento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do registro",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
