/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/mesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Em conteúdo estreito e fluido em torno de 390px, também usável em 360px e 430px, o caixa percorre as mesas da casa, confere a disponibilidade e cadastra ou atualiza as mesas da operação.",
  "sections": [
    {
      "id": "houseOverview",
      "priority": "primary",
      "purpose": "Empilha as mesas da casa em faixa estreita para o caixa varrer códigos e disponibilidade sem grade fixa.",
      "organisms": [
        "mesasList"
      ]
    },
    {
      "id": "tableMaintenance",
      "priority": "main",
      "purpose": "Mostra o formulário de cadastro em sequência fluida para o caixa informar o código e gravar a mesa na operação.",
      "organisms": [
        "mesaForm"
      ]
    }
  ],
  "organisms": {
    "mesasList": {
      "kind": "list",
      "text": "Mostra cada mesa da casa com código e disponibilidade em leitura contínua, para o caixa localizar o salão no telefone ou no terminal estreito.",
      "intents": []
    },
    "mesaForm": {
      "kind": "form",
      "text": "Formulário em faixa fluida para informar o código da mesa, cadastrar uma mesa nova ou atualizar uma mesa já usada na operação.",
      "intents": [
        {
          "id": "createMesa",
          "kind": "submit"
        },
        {
          "id": "updateMesa",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "mesasList": [
      {
        "role": "records",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "mesaForm": [
      {
        "role": "identification",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "actions",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ]
  }
} as const;
