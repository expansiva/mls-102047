/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/planos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Mostrar à gerência e à recepção os planos da academia com periodicidade, valor, dia de vencimento e quantidade de matrículas ativas. A gerência pode cadastrar um novo plano ou ajustar o valor e o vencimento de um plano existente. A recepção consulta os planos e segue para a matrícula do aluno.",
  "sections": [
    {
      "id": "listaPlanos",
      "priority": "primary",
      "purpose": "Ver de uma vez todos os planos com valor, dia de vencimento e matrículas ativas, para comparar e escolher qual ajustar.",
      "organisms": [
        "planosLista"
      ]
    },
    {
      "id": "edicaoPlano",
      "priority": "main",
      "purpose": "Preencher ou corrigir nome, periodicidade, valor, dia de vencimento e descrição do plano escolhido ou do novo plano.",
      "organisms": [
        "planoForm"
      ]
    },
    {
      "id": "acoesPlano",
      "priority": "secondary",
      "purpose": "Confirmar o cadastro ou o ajuste do plano e seguir para a matrícula ou o registro de aluno.",
      "organisms": [
        "planoAcoes"
      ]
    }
  ],
  "organisms": {
    "planosLista": {
      "kind": "list",
      "text": "Planos mensal, trimestral e anual com valor, dia de vencimento e matrículas ativas; escolher um plano abre seus dados para ajuste.",
      "intents": []
    },
    "planoForm": {
      "kind": "form",
      "text": "Cadastrar ou ajustar o plano com nome, periodicidade, valor e dia de vencimento; a alteração vale para as mensalidades geradas depois.",
      "intents": []
    },
    "planoAcoes": {
      "kind": "actions",
      "text": "Cadastrar plano e ajustar plano; a partir daqui também é possível ir matricular um aluno ou registrar um novo aluno.",
      "intents": [
        {
          "id": "cadastrarPlano",
          "kind": "submit"
        },
        {
          "id": "ajustarPlano",
          "kind": "submit"
        },
        {
          "id": "irMatricular",
          "kind": "navigate",
          "to": "matriculas"
        },
        {
          "id": "irRegistrarAluno",
          "kind": "navigate",
          "to": "alunos"
        }
      ]
    }
  },
  "molecules": {
    "planosLista": [
      {
        "role": "tabela de planos com valor, vencimento e matrículas ativas",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "planoForm": [
      {
        "role": "valor do plano em reais",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "dia de vencimento das mensalidades",
        "preferred": "groupenternumber--ml-number-input",
        "alternative": "groupenternumber--ml-number-stepper"
      },
      {
        "role": "periodicidade mensal, trimestral ou anual",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      }
    ],
    "planoAcoes": [
      {
        "role": "confirmar cadastro ou ajuste do plano",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ]
  }
} as const;
