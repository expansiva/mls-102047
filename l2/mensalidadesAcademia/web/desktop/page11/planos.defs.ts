/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/planos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Mostrar à gerência e à recepção todos os planos da academia, com periodicidade, valor, dia de vencimento e matrículas ativas. A gerência confere os planos existentes para evitar duplicidade e cadastra um novo plano. A recepção escolhe o plano pedido pelo aluno e segue para registrar a matrícula.",
  "sections": [
    {
      "id": "catalogoPlanos",
      "priority": "primary",
      "purpose": "Lista dos planos cadastrados para conferir nome, periodicidade, valor, dia de vencimento e quantas matrículas ativas cada um tem antes de cadastrar ou escolher.",
      "organisms": [
        "planosList"
      ]
    },
    {
      "id": "cadastroPlano",
      "priority": "main",
      "purpose": "Cadastro de um novo plano pela gerência, com nome, periodicidade, valor, dia de vencimento e descrição.",
      "organisms": [
        "planoForm"
      ]
    },
    {
      "id": "acoesPlano",
      "priority": "secondary",
      "purpose": "Conferir o plano escolhido e seguir para a matrícula do aluno nesse plano.",
      "organisms": [
        "planoActions"
      ]
    }
  ],
  "organisms": {
    "planosList": {
      "kind": "list",
      "text": "Planos mensal, trimestral e anual com valor, dia de vencimento e matrículas ativas, para a gerência evitar duplicidade e a recepção achar o plano pedido pelo aluno.",
      "intents": []
    },
    "planoForm": {
      "kind": "form",
      "text": "Cadastrar um plano com nome, periodicidade, valor e dia de vencimento; o plano passa a aparecer na lista e fica disponível para novas matrículas.",
      "intents": [
        {
          "id": "registrarPlano",
          "kind": "submit"
        }
      ]
    },
    "planoActions": {
      "kind": "actions",
      "text": "Escolher o plano para a matrícula, conferindo valor e dia de vencimento, e seguir para registrar a matrícula do aluno.",
      "intents": [
        {
          "id": "matricularNoPlano",
          "kind": "navigate",
          "to": "matriculas"
        }
      ]
    }
  },
  "molecules": {
    "planosList": [
      {
        "role": "Tabela de planos com periodicidade, valor, dia de vencimento e matrículas ativas",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "planoForm": [
      {
        "role": "Periodicidade do plano (mensal, trimestral ou anual)",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "Valor do plano",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "Dia de vencimento das mensalidades",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      }
    ],
    "planoActions": [
      {
        "role": "Escolha do plano comparando valor e dia de vencimento",
        "preferred": "groupselectone--ml-table-single-select",
        "alternative": "groupselectone--ml-card-selector"
      },
      {
        "role": "Seguir para a matrícula no plano escolhido",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
