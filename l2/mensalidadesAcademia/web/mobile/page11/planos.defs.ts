/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/planos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, em uma coluna fluida de cerca de 390px que também funciona com 360px e 430px: primeiro os planos da academia com valor, dia de vencimento e matrículas ativas, depois a escolha do plano para a matrícula e, por fim, o cadastro de um novo plano pela gerência.",
  "sections": [
    {
      "id": "catalogoPlanos",
      "priority": "primary",
      "purpose": "Planos empilhados para leitura rápida de nome, periodicidade, valor, dia de vencimento e matrículas ativas.",
      "organisms": [
        "planosList"
      ]
    },
    {
      "id": "acoesPlano",
      "priority": "main",
      "purpose": "Escolher o plano pedido pelo aluno e seguir para a matrícula sem sair do fluxo do balcão.",
      "organisms": [
        "planoActions"
      ]
    },
    {
      "id": "cadastroPlano",
      "priority": "secondary",
      "purpose": "Cadastro de um novo plano pela gerência, com campos em sequência vertical.",
      "organisms": [
        "planoForm"
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
        "role": "Lista empilhada de planos com valor, dia de vencimento e matrículas ativas",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
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
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      }
    ],
    "planoActions": [
      {
        "role": "Escolha do plano em cartões com valor e dia de vencimento",
        "preferred": "groupselectone--ml-card-selector",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Seguir para a matrícula no plano escolhido",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
