/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/mensalidades.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Concentrar as mensalidades da academia por competência, para que a recepção encontre a cobrança do aluno, confira os dados e lance o pagamento, e para que a gerência gere e confira as mensalidades do mês.",
  "sections": [
    {
      "id": "cobrancas",
      "priority": "primary",
      "purpose": "Mostrar as mensalidades da competência com situação, vencida, paga e total pago, para localizar rapidamente a cobrança a tratar.",
      "organisms": [
        "mensalidadesLista"
      ]
    },
    {
      "id": "mensalidadeEscolhida",
      "priority": "main",
      "purpose": "Ao lado da lista, mostrar a mensalidade escolhida com os pagamentos já lançados e o formulário para registrar um novo pagamento.",
      "organisms": [
        "mensalidadeDetalhe",
        "pagamentoForm"
      ]
    },
    {
      "id": "operacoesDoMes",
      "priority": "secondary",
      "purpose": "Reunir as ações do mês: gerar as mensalidades da competência e registrar o pagamento.",
      "organisms": [
        "mensalidadeAcoes"
      ]
    },
    {
      "id": "historico",
      "priority": "secondary",
      "purpose": "Registrar a geração do mês e os pagamentos de cada mensalidade, para conferência.",
      "organisms": [
        "mensalidadeHistorico"
      ]
    }
  ],
  "organisms": {
    "mensalidadesLista": {
      "kind": "list",
      "text": "Mensalidades por competência, com aluno, vencimento, valor, situação, se está vencida ou paga e o total pago, para encontrar a cobrança em aberto ou vencida.",
      "intents": []
    },
    "mensalidadeDetalhe": {
      "kind": "detail",
      "text": "Mensalidade escolhida com competência, valor, vencimento, situação, total pago e os pagamentos já lançados, além da indicação de bloqueio do aluno.",
      "intents": [
        {
          "id": "verMatriculas",
          "kind": "navigate",
          "to": "matriculas"
        }
      ]
    },
    "pagamentoForm": {
      "kind": "form",
      "text": "Lançar o pagamento da mensalidade escolhida com data, valor e forma; a mensalidade passa a paga quando quitada.",
      "intents": [
        {
          "id": "registrarPagamento",
          "kind": "submit"
        }
      ]
    },
    "mensalidadeAcoes": {
      "kind": "actions",
      "text": "Gerar as mensalidades do mês informando a competência (gerência), uma por matrícula ativa sem duplicar, e registrar pagamento (recepção).",
      "intents": [
        {
          "id": "gerarMensalidades",
          "kind": "submit"
        }
      ]
    },
    "mensalidadeHistorico": {
      "kind": "timeline",
      "text": "Geração do mês e pagamentos registrados em cada mensalidade, em ordem de data.",
      "intents": []
    }
  },
  "molecules": {
    "mensalidadesLista": [
      {
        "role": "tabela de mensalidades",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "filtro de competência",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-combobox"
      }
    ],
    "mensalidadeDetalhe": [
      {
        "role": "resumo da mensalidade",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "pagamentos lançados",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "pagamentoForm": [
      {
        "role": "data do pagamento",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "valor pago",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "forma de pagamento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "confirmar pagamento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do lançamento",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "mensalidadeAcoes": [
      {
        "role": "gerar mensalidades do mês",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "andamento da geração",
        "preferred": "groupshowprogress--ml-indeterminate-spinner",
        "alternative": "groupshowprogress--ml-linear-progress"
      },
      {
        "role": "resultado da geração",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "mensalidadeHistorico": [
      {
        "role": "linha do tempo de eventos",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupexpandcontent--ml-accordion"
      }
    ]
  }
} as const;
