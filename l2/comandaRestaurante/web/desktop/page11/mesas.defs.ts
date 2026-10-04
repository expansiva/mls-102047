/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/mesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "O caixa consulta as mesas da casa, confere se cada uma está disponível e cadastra ou atualiza as mesas usadas na operação.",
  "sections": [
    {
      "id": "houseOverview",
      "priority": "primary",
      "purpose": "Apresenta as mesas da casa para o caixa reconhecer o salão e ver quais estão disponíveis.",
      "organisms": [
        "mesasList"
      ]
    },
    {
      "id": "tableMaintenance",
      "priority": "main",
      "purpose": "Reúne o cadastro da mesa para o caixa criar uma mesa nova ou atualizar uma mesa já usada na operação.",
      "organisms": [
        "mesaForm"
      ]
    }
  ],
  "organisms": {
    "mesasList": {
      "kind": "list",
      "text": "Lista as mesas da casa com o código e a disponibilidade, para o caixa localizar cada mesa e saber se ela pode receber atendimento.",
      "intents": []
    },
    "mesaForm": {
      "kind": "form",
      "text": "Formulário para informar o código da mesa, cadastrar uma mesa nova ou atualizar uma mesa já usada na operação.",
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
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
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
