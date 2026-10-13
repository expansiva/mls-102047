/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/mensalidades.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "Concentrar as mensalidades da academia em um só lugar. A gerência gera as cobranças do mês e revisa as que foram geradas. A recepção localiza a mensalidade do aluno, confere valor, vencimento e saldo, e lança o pagamento recebido no balcão.",
  "sections": [
    {
      "id": "acoesDoMes",
      "priority": "secondary",
      "purpose": "Deixar à mão as ações do mês: a gerência gera as mensalidades do mês de referência e confere as matrículas ativas. A recepção começa por aqui o registro de um pagamento.",
      "organisms": [
        "acoesMensalidades"
      ]
    },
    {
      "id": "razaoMensalidades",
      "priority": "primary",
      "purpose": "Mostrar as mensalidades por competência e aluno, com o que está vencido e quanto falta pagar. É o ponto de partida para revisar a geração e para achar a cobrança que será recebida.",
      "organisms": [
        "listaMensalidades"
      ]
    },
    {
      "id": "conferenciaERecebimento",
      "priority": "main",
      "purpose": "Mostrar a mensalidade escolhida, com valor, vencimento, pagamentos e saldo, ao lado do lançamento do pagamento. Assim o valor é conferido antes de ser recebido.",
      "organisms": [
        "detalheMensalidade",
        "formPagamento"
      ]
    }
  ],
  "organisms": {
    "listaMensalidades": {
      "kind": "list",
      "text": "Mensalidades por competência e aluno, com vencimento, total pago e saldo devedor. As vencidas aparecem em destaque. Ao escolher uma linha, a conferência é aberta.",
      "intents": []
    },
    "detalheMensalidade": {
      "kind": "detail",
      "text": "Dados da mensalidade escolhida: valor, vencimento, data em que foi gerada, situação, pagamentos já registrados e saldo devedor que ainda falta receber.",
      "intents": []
    },
    "formPagamento": {
      "kind": "form",
      "text": "Lançamento do pagamento da mensalidade conferida, com data, valor recebido, forma de pagamento e observação. Quando o valor é quitado, a mensalidade passa a paga e a situação do aluno é atualizada.",
      "intents": [
        {
          "id": "lancarPagamento",
          "kind": "submit"
        }
      ]
    },
    "acoesMensalidades": {
      "kind": "actions",
      "text": "A gerência informa o mês de referência e gera uma mensalidade por matrícula ativa, sem duplicar as já geradas, e pode conferir as matrículas ativas antes. A recepção registra o pagamento da mensalidade escolhida.",
      "intents": [
        {
          "id": "gerarMensalidades",
          "kind": "submit"
        },
        {
          "id": "conferirMatriculasAtivas",
          "kind": "navigate",
          "to": "matriculas"
        }
      ]
    }
  },
  "molecules": {
    "listaMensalidades": [
      {
        "role": "tabela de mensalidades com ordenação por vencimento e saldo",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "busca por aluno e filtro por competência",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "filtro de situação (em aberto, vencida, paga)",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "detalheMensalidade": [
      {
        "role": "destaque do saldo devedor e do total pago",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "pagamentos registrados da mensalidade",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "formPagamento": [
      {
        "role": "data do pagamento",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "valor recebido em reais",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "forma de pagamento",
        "preferred": "groupselectone--ml-radio-group",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "confirmar o lançamento",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do pagamento registrado",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "acoesMensalidades": [
      {
        "role": "gerar mensalidades do mês e conferir matrículas ativas",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "andamento da geração",
        "preferred": "groupshowprogress--ml-indeterminate-spinner",
        "alternative": "groupshowprogress--ml-linear-progress"
      },
      {
        "role": "resultado da geração",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
