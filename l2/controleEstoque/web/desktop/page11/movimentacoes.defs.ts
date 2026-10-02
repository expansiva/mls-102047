/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/inventoryControl/page21.md",
    "experience": "splitViewOperations"
  },
  "intent": "O estoquista registra uma entrada ou saída de unidades de um produto para atualizar o saldo e acompanha as movimentações já gravadas, que permanecem inalteráveis depois do registro.",
  "sections": [
    {
      "id": "registroMovimentacao",
      "priority": "primary",
      "purpose": "Reúne a captura da movimentação e a confirmação do registro para o estoquista localizar o produto, conferir o saldo e gravar a entrada ou a saída.",
      "organisms": [
        "formularioMovimentacao",
        "confirmarMovimentacao"
      ]
    },
    {
      "id": "historicoRegistrado",
      "priority": "main",
      "purpose": "Apresenta as entradas e saídas já registradas para o estoquista acompanhar o histórico imutável do estoque.",
      "organisms": [
        "historicoMovimentacoes"
      ]
    }
  ],
  "organisms": {
    "historicoMovimentacoes": {
      "kind": "list",
      "text": "Mostra as entradas e saídas já registradas, com produto, tipo, quantidade e data e hora, para o estoquista acompanhar o histórico que não pode ser alterado depois da gravação.",
      "intents": []
    },
    "formularioMovimentacao": {
      "kind": "form",
      "text": "Permite localizar o produto, conferir o saldo atual e a quantidade mínima e informar se a movimentação é entrada ou saída e quantas unidades serão movimentadas.",
      "intents": []
    },
    "confirmarMovimentacao": {
      "kind": "actions",
      "text": "Grava a movimentação de estoque e atualiza o saldo atual do produto; depois do registro a movimentação permanece inalterável e o novo saldo fica visível.",
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
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
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
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "feedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "updatedBalance",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ]
  }
} as const;
