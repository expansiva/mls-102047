/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/mensalidades.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/financialTransactions/page21.md",
    "experience": "ledgerTable"
  },
  "intent": "No celular, em uma coluna estreita e fluida em torno de 390px (também usável em 360px e 430px), a recepção encontra rapidamente a mensalidade do aluno, confere o saldo e lança o pagamento. A gerência gera as mensalidades do mês e revisa a lista.",
  "sections": [
    {
      "id": "razaoMensalidades",
      "priority": "primary",
      "purpose": "Lista empilhada das mensalidades por competência e aluno, com vencimento, saldo devedor e destaque das vencidas. É lida rolando a tela, com um toque para abrir a conferência.",
      "organisms": [
        "listaMensalidades"
      ]
    },
    {
      "id": "conferenciaERecebimento",
      "priority": "main",
      "purpose": "Depois de escolher uma mensalidade, mostrar valor, vencimento, pagamentos e saldo, e logo abaixo o lançamento do pagamento, em sequência vertical.",
      "organisms": [
        "detalheMensalidade",
        "formPagamento"
      ]
    },
    {
      "id": "acoesDoMes",
      "priority": "secondary",
      "purpose": "Ações do mês ao alcance do polegar: gerar as mensalidades do mês de referência (gerência) e conferir as matrículas ativas.",
      "organisms": [
        "acoesMensalidades"
      ]
    }
  ],
  "organisms": {
    "listaMensalidades": {
      "kind": "list",
      "text": "Mensalidades por competência e aluno, com vencimento, total pago e saldo devedor. As vencidas aparecem em destaque. Ao tocar em uma mensalidade, a conferência é aberta.",
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
        "role": "lista empilhada de mensalidades",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "busca por aluno",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "filtro de situação (em aberto, vencida, paga)",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "detalheMensalidade": [
      {
        "role": "destaque do saldo devedor",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "pagamentos registrados da mensalidade",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-data-table-minimal"
      }
    ],
    "formPagamento": [
      {
        "role": "data do pagamento com atalho para hoje",
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
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-radio-group"
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
        "role": "gerar mensalidades e conferir matrículas",
        "preferred": "grouptriggeraction--ml-split-button",
        "alternative": "grouptriggeraction--ml-button-standard"
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
    ]
  }
} as const;
