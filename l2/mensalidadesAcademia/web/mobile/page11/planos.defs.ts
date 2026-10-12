/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/planos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Em tela estreita (cerca de 390px, usável de 360px a 430px), mostrar os planos da academia em lista vertical com valor, dia de vencimento e matrículas ativas. Tocar num plano abre o formulário para ajuste; a gerência também cadastra novos planos e a recepção segue para a matrícula.",
  "sections": [
    {
      "id": "listaPlanos",
      "priority": "primary",
      "purpose": "Percorrer os planos em lista fluida, lendo valor, vencimento e matrículas ativas de cada um.",
      "organisms": [
        "planosLista"
      ]
    },
    {
      "id": "edicaoPlano",
      "priority": "main",
      "purpose": "Preencher ou corrigir os dados do plano em campos empilhados, um por linha.",
      "organisms": [
        "planoForm"
      ]
    },
    {
      "id": "acoesPlano",
      "priority": "secondary",
      "purpose": "Confirmar o cadastro ou o ajuste e seguir para matrícula ou registro de aluno, com botões de largura total.",
      "organisms": [
        "planoAcoes"
      ]
    }
  ],
  "organisms": {
    "planosLista": {
      "kind": "list",
      "text": "Planos mensal, trimestral e anual com valor, dia de vencimento e matrículas ativas; tocar num plano abre seus dados para ajuste.",
      "intents": []
    },
    "planoForm": {
      "kind": "form",
      "text": "Cadastrar ou ajustar o plano com nome, periodicidade, valor e dia de vencimento; a alteração vale para as mensalidades geradas depois.",
      "intents": []
    },
    "planoAcoes": {
      "kind": "actions",
      "text": "Cadastrar plano e ajustar plano; também levar à matrícula de um aluno ou ao registro de novo aluno.",
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
        "role": "lista vertical de planos para tela estreita",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
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
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      },
      {
        "role": "periodicidade mensal, trimestral ou anual",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "planoAcoes": [
      {
        "role": "confirmar cadastro ou ajuste do plano",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
