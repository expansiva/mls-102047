/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "inventoryControl",
    "experience": "splitViewOperations"
  },
  "intent": "Permitir ao estoquista registrar uma entrada ou saída de unidades de um produto e acompanhar o histórico já gravado, para que o saldo atual seja atualizado.",
  "sections": [
    {
      "id": "registrarMovimentacao",
      "priority": "primary",
      "purpose": "Reúne o formulário da movimentação e a confirmação do registro para o estoquista informar o produto, o tipo e a quantidade e gravar a operação que atualiza o saldo.",
      "organisms": [
        "formularioMovimentacao",
        "acoesRegistro"
      ]
    },
    {
      "id": "historicoMovimentacoes",
      "priority": "main",
      "purpose": "Apresenta as entradas e saídas já registradas para conferência do histórico que permanece inalterável após a gravação.",
      "organisms": [
        "listaMovimentacoes"
      ]
    }
  ],
  "organisms": {
    "listaMovimentacoes": {
      "kind": "list",
      "text": "Mostra as entradas e saídas já gravadas, com produto, tipo, quantidade e momento do registro, para o estoquista conferir o histórico imutável do estoque.",
      "intents": []
    },
    "formularioMovimentacao": {
      "kind": "form",
      "text": "Mostra o produto localizado, o saldo atual e os campos de tipo e quantidade para o estoquista informar uma entrada ou saída antes de gravá-la.",
      "intents": []
    },
    "acoesRegistro": {
      "kind": "actions",
      "text": "Confirma o registro da movimentação e aplica o efeito no saldo atual do produto, deixando o lançamento inalterável.",
      "intents": [
        {
          "id": "registrarMovimentacao",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "listaMovimentacoes": [
      {
        "role": "view",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "formularioMovimentacao": [
      {
        "role": "select",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "enter",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      }
    ],
    "acoesRegistro": [
      {
        "role": "trigger",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "notify",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
