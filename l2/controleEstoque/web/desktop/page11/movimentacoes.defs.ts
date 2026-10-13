/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/inventoryControl/page21.md",
    "experience": "splitViewOperations"
  },
  "intent": "Permite ao estoquista registrar uma entrada ou saída de quantidade de um produto, conferindo antes o saldo atual, e acompanhar o histórico permanente de movimentações do estoque.",
  "sections": [
    {
      "id": "registro",
      "priority": "primary",
      "purpose": "Escolher o produto, conferir o saldo atual e o mínimo, informar se é entrada ou saída e a quantidade, e confirmar o registro.",
      "organisms": [
        "registroMovimentacao",
        "acoesRegistro"
      ]
    },
    {
      "id": "historico",
      "priority": "main",
      "purpose": "Mostrar as entradas e saídas já registradas, com número, produto, tipo, quantidade e data, para conferência e localização de um registro.",
      "organisms": [
        "historicoMovimentacoes"
      ]
    }
  ],
  "organisms": {
    "historicoMovimentacoes": {
      "kind": "list",
      "text": "Vejo as entradas e saídas de estoque, com número, produto, tipo, quantidade na unidade do produto e quando foram registradas; posso filtrar por tipo, período ou número.",
      "intents": []
    },
    "registroMovimentacao": {
      "kind": "form",
      "text": "Registro uma entrada ou saída de quantidade de um produto: escolho o produto, vejo o saldo atual e se está abaixo do mínimo, indico o tipo e a quantidade maior que zero.",
      "intents": []
    },
    "acoesRegistro": {
      "kind": "actions",
      "text": "Registro a movimentação no estoque; ela fica permanente, o saldo é atualizado e recebo aviso se o produto ficar abaixo do mínimo.",
      "intents": [
        {
          "id": "registrarMovimentacao",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "historicoMovimentacoes": [
      {
        "role": "tabela do histórico de movimentações",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "filtro por tipo entrada ou saída",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "filtro por período de registro",
        "preferred": "groupenterdateinterval--ml-date-interval-presets",
        "alternative": "groupenterdateinterval--ml-date-range-dual-calendar"
      },
      {
        "role": "busca pelo número da movimentação",
        "preferred": "groupsearchcontent--ml-search-bar"
      }
    ],
    "registroMovimentacao": [
      {
        "role": "escolha do produto pelo nome",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "tipo da movimentação",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "quantidade movimentada",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      }
    ],
    "acoesRegistro": [
      {
        "role": "confirmar o registro",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do registro",
        "preferred": "groupnotifyuser--ml-toast-notification"
      },
      {
        "role": "aviso de saldo abaixo do mínimo",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
