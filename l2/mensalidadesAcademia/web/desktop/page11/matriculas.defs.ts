/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/matriculas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Acompanhar as matrículas da academia com aluno, plano, situação e valores em aberto, conferir a situação de uma matrícula, criar novas matrículas e registrar o cancelamento pedido pelo aluno.",
  "sections": [
    {
      "id": "listaMatriculas",
      "priority": "primary",
      "purpose": "Encontrar a matrícula certa entre todas, vendo aluno, plano, situação, mensalidades vencidas e total em aberto, com filtro para as ativas.",
      "organisms": [
        "matriculasList"
      ]
    },
    {
      "id": "situacaoSelecionada",
      "priority": "main",
      "purpose": "Mostrar se a matrícula escolhida está bloqueada ou inadimplente, quantas mensalidades estão vencidas e quanto falta pagar.",
      "organisms": [
        "situacaoMatricula"
      ]
    },
    {
      "id": "novaMatricula",
      "priority": "secondary",
      "purpose": "Matricular um aluno escolhendo o plano e a data de início.",
      "organisms": [
        "novaMatriculaForm"
      ]
    },
    {
      "id": "acoesMatriculas",
      "priority": "secondary",
      "purpose": "Registrar o cancelamento a pedido do aluno e chegar ao cadastro de alunos e à geração de mensalidades.",
      "organisms": [
        "acoesMatricula"
      ]
    }
  ],
  "organisms": {
    "matriculasList": {
      "kind": "list",
      "text": "Matrículas com código, aluno, plano, situação, data de início, mensalidades vencidas e total em aberto; permite filtrar só as ativas e escolher uma para ver a situação.",
      "intents": []
    },
    "situacaoMatricula": {
      "kind": "detail",
      "text": "Situação da matrícula escolhida: se está bloqueada (duas ou mais vencidas), se está inadimplente, quantas mensalidades estão vencidas e o total em aberto.",
      "intents": []
    },
    "novaMatriculaForm": {
      "kind": "form",
      "text": "Criar a matrícula do aluno escolhendo o plano (mensal, trimestral ou anual, com valor e dia de vencimento) e a data de início; ela começa ativa.",
      "intents": [
        {
          "id": "criarMatricula",
          "kind": "submit"
        }
      ]
    },
    "acoesMatricula": {
      "kind": "actions",
      "text": "Registrar o cancelamento da matrícula ativa a pedido do aluno, com data e motivo, encerrando as mensalidades futuras; cadastrar um aluno novo antes de matricular; ir à geração das mensalidades do mês.",
      "intents": [
        {
          "id": "cancelarMatricula",
          "kind": "submit"
        },
        {
          "id": "registrarAluno",
          "kind": "navigate",
          "to": "alunos"
        },
        {
          "id": "gerarMensalidades",
          "kind": "navigate",
          "to": "mensalidades"
        }
      ]
    }
  },
  "molecules": {
    "matriculasList": [
      {
        "role": "tabela de matrículas",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "filtro somente ativas",
        "preferred": "groupenterboolean--ml-toggle-switch",
        "alternative": "groupenterboolean--ml-boolean-segmented"
      }
    ],
    "situacaoMatricula": [
      {
        "role": "mensalidades vencidas e total em aberto",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "aviso de bloqueio ou inadimplência",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "novaMatriculaForm": [
      {
        "role": "escolha do plano",
        "preferred": "groupselectone--ml-table-single-select",
        "alternative": "groupselectone--ml-card-selector"
      },
      {
        "role": "escolha do aluno",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "data de início",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      }
    ],
    "acoesMatricula": [
      {
        "role": "botões de ação",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "confirmação do cancelamento",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "resultado da ação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
