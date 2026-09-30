/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "inventoryControl",
    "experience": "splitViewOperations"
  },
  "intent": "Em conteúdo estreito e fluido em torno de 390px, ainda usável em 360px e 430px, o estoquista informa a movimentação, confirma o registro e em seguida consulta o histórico de entradas e saídas para atualizar o saldo.",
  "sections": [
    {
      "id": "registrarMovimentacao",
      "priority": "primary",
      "purpose": "Concentra o formulário em coluna única para localizar o produto, ver o saldo e informar tipo e quantidade da movimentação.",
      "organisms": [
        "formularioMovimentacao"
      ]
    },
    {
      "id": "confirmarRegistro",
      "priority": "main",
      "purpose": "Mantém a confirmação do registro imediatamente abaixo dos dados informados, para gravar a entrada ou saída e atualizar o saldo.",
      "organisms": [
        "acoesRegistro"
      ]
    },
    {
      "id": "historicoMovimentacoes",
      "priority": "secondary",
      "purpose": "Empilha o histórico já gravado depois da ação, para o estoquista conferir as movimentações em leitura contínua na largura estreita.",
      "organisms": [
        "listaMovimentacoes"
      ]
    }
  ],
  "organisms": {
    "listaMovimentacoes": {
      "kind": "list",
      "text": "Lista as entradas e saídas já gravadas em registros empilhados, com produto, tipo, quantidade e momento, para consulta do histórico imutável na tela estreita.",
      "intents": []
    },
    "formularioMovimentacao": {
      "kind": "form",
      "text": "Apresenta em sequência o produto localizado, o saldo atual e os campos de tipo e quantidade para o estoquista informar a movimentação antes de gravá-la.",
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
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "formularioMovimentacao": [
      {
        "role": "select",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "enter",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      }
    ],
    "acoesRegistro": [
      {
        "role": "trigger",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      },
      {
        "role": "notify",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
