/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/mensalidades.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Em tela estreita (cerca de 390px, usável de 360px a 430px), permitir que a recepção encontre a mensalidade do aluno e lance o pagamento, e que a gerência gere as mensalidades do mês, com o conteúdo empilhado e fluido.",
  "sections": [
    {
      "id": "cobrancas",
      "priority": "primary",
      "purpose": "Lista empilhada das mensalidades da competência com situação e total pago, para tocar e abrir a cobrança.",
      "organisms": [
        "mensalidadesLista"
      ]
    },
    {
      "id": "mensalidadeEscolhida",
      "priority": "main",
      "purpose": "Abaixo da lista, a mensalidade escolhida e logo em seguida o formulário curto de pagamento.",
      "organisms": [
        "mensalidadeDetalhe",
        "pagamentoForm"
      ]
    },
    {
      "id": "operacoesDoMes",
      "priority": "secondary",
      "purpose": "Ações do mês em largura total: gerar mensalidades e registrar pagamento.",
      "organisms": [
        "mensalidadeAcoes"
      ]
    },
    {
      "id": "historico",
      "priority": "secondary",
      "purpose": "Histórico compacto da geração e dos pagamentos, aberto sob demanda.",
      "organisms": [
        "mensalidadeHistorico"
      ]
    }
  ],
  "organisms": {
    "mensalidadesLista": {
      "kind": "list",
      "text": "Mensalidades por competência em cartões empilhados, com aluno, vencimento, valor, situação, vencida, paga e total pago.",
      "intents": []
    },
    "mensalidadeDetalhe": {
      "kind": "detail",
      "text": "Mensalidade escolhida com competência, valor, vencimento, situação, total pago, pagamentos lançados e bloqueio do aluno.",
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
      "text": "Lançar o pagamento com data, valor e forma, em campos de largura total.",
      "intents": [
        {
          "id": "registrarPagamento",
          "kind": "submit"
        }
      ]
    },
    "mensalidadeAcoes": {
      "kind": "actions",
      "text": "Gerar as mensalidades do mês informando a competência (gerência) e registrar pagamento (recepção).",
      "intents": [
        {
          "id": "gerarMensalidades",
          "kind": "submit"
        }
      ]
    },
    "mensalidadeHistorico": {
      "kind": "timeline",
      "text": "Geração do mês e pagamentos registrados em cada mensalidade.",
      "intents": []
    }
  },
  "molecules": {
    "mensalidadesLista": [
      {
        "role": "lista de mensalidades",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
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
        "preferred": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "pagamentos lançados",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "pagamentoForm": [
      {
        "role": "data do pagamento",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
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
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "andamento da geração",
        "preferred": "groupshowprogress--ml-indeterminate-spinner"
      },
      {
        "role": "resultado da geração",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "mensalidadeHistorico": [
      {
        "role": "histórico recolhível",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupexpandcontent--ml-accordion"
      }
    ]
  }
} as const;
