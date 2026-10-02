/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/inventoryControl/page21.md",
    "experience": "splitViewOperations"
  },
  "intent": "Em uma faixa estreita e fluida em torno de 390px, também usável em 360px e 430px, o estoquista informa a entrada ou saída, confirma o registro que atualiza o saldo e, em seguida, consulta o histórico de movimentações já gravadas.",
  "sections": [
    {
      "id": "capturaMovimentacao",
      "priority": "primary",
      "purpose": "Na faixa estreita, concentra primeiro a localização do produto, a conferência do saldo e o preenchimento do tipo e da quantidade da movimentação.",
      "organisms": [
        "formularioMovimentacao"
      ]
    },
    {
      "id": "confirmacaoRegistro",
      "priority": "main",
      "purpose": "Mantém o registro ao alcance imediato após o preenchimento, para gravar a movimentação e mostrar o saldo atualizado sem exigir deslocamento lateral.",
      "organisms": [
        "confirmarMovimentacao"
      ]
    },
    {
      "id": "historicoRegistrado",
      "priority": "secondary",
      "purpose": "Empilha abaixo o histórico de entradas e saídas já registradas, para consulta depois do registro na mesma faixa fluida.",
      "organisms": [
        "historicoMovimentacoes"
      ]
    }
  ],
  "organisms": {
    "historicoMovimentacoes": {
      "kind": "list",
      "text": "Lista em sequência as entradas e saídas já registradas, com produto, tipo, quantidade e data e hora, para o estoquista revisar o histórico imutável na faixa estreita.",
      "intents": []
    },
    "formularioMovimentacao": {
      "kind": "form",
      "text": "Permite localizar o produto, conferir o saldo atual e a quantidade mínima e informar o tipo de entrada ou saída e a quantidade de unidades a movimentar.",
      "intents": []
    },
    "confirmarMovimentacao": {
      "kind": "actions",
      "text": "Grava a movimentação e atualiza o saldo do produto; o estoquista vê a confirmação e o novo saldo logo após o preenchimento, e a movimentação não pode mais ser alterada.",
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
        "role": "collection",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-timeline-view"
      }
    ],
    "formularioMovimentacao": [
      {
        "role": "productLookup",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "movementType",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "quantity",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      }
    ],
    "confirmarMovimentacao": [
      {
        "role": "submit",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      },
      {
        "role": "feedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "updatedBalance",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
      }
    ]
  }
} as const;
