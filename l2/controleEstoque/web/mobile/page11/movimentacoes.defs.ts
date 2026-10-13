/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/inventoryControl/page21.md",
    "experience": "splitViewOperations"
  },
  "intent": "No celular, o estoquista registra rapidamente uma entrada ou saída de um produto, vendo o saldo atual antes de confirmar, e consulta abaixo o histórico de movimentações em conteúdo fluido de coluna única, por volta de 390px e utilizável entre 360px e 430px.",
  "sections": [
    {
      "id": "registro",
      "priority": "primary",
      "purpose": "Registrar a movimentação em poucos toques: produto, saldo atual, tipo, quantidade e confirmação ao final do formulário.",
      "organisms": [
        "registroMovimentacao",
        "acoesRegistro"
      ]
    },
    {
      "id": "historico",
      "priority": "main",
      "purpose": "Listar as movimentações recentes em itens empilhados e legíveis em tela estreita, com filtro por tipo.",
      "organisms": [
        "historicoMovimentacoes"
      ]
    }
  ],
  "organisms": {
    "historicoMovimentacoes": {
      "kind": "list",
      "text": "Vejo as entradas e saídas de estoque em itens empilhados com produto, tipo, quantidade e data; posso filtrar por tipo ou período.",
      "intents": []
    },
    "registroMovimentacao": {
      "kind": "form",
      "text": "Registro uma entrada ou saída de quantidade de um produto, vendo o saldo atual e se ele está abaixo do mínimo antes de informar a quantidade.",
      "intents": []
    },
    "acoesRegistro": {
      "kind": "actions",
      "text": "Registro a movimentação no estoque com um botão de largura total; recebo a confirmação e o aviso de abaixo do mínimo quando ocorrer.",
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
        "role": "lista do histórico de movimentações",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "filtro por tipo entrada ou saída",
        "preferred": "groupselectone--ml-segmented-control"
      },
      {
        "role": "filtro por período de registro",
        "preferred": "groupenterdateinterval--ml-date-interval-presets"
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
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
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
