/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/matriculas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Matrículas no celular, em coluna fluida estreita (referência de 390px, usável de 360px a 430px): buscar a matrícula do aluno, ver de imediato se a entrada está liberada, cancelar a pedido do aluno e matricular um novo aluno.",
  "sections": [
    {
      "id": "listaMatriculas",
      "priority": "primary",
      "purpose": "Encontrar a matrícula pelo número, aluno ou plano em uma lista compacta com a situação visível em cada item.",
      "organisms": [
        "matriculasList"
      ]
    },
    {
      "id": "situacaoSelecionada",
      "priority": "main",
      "purpose": "Mostrar primeiro se a entrada está liberada ou bloqueada e, logo abaixo, as mensalidades vencidas e as ações sobre a matrícula.",
      "organisms": [
        "situacaoMatricula",
        "acoesMatricula"
      ]
    },
    {
      "id": "novaMatricula",
      "priority": "secondary",
      "purpose": "Matricular um aluno em poucos passos empilhados: aluno, plano e data de início.",
      "organisms": [
        "novaMatriculaForm"
      ]
    }
  ],
  "organisms": {
    "matriculasList": {
      "kind": "list",
      "text": "Matrículas por número, aluno e plano, cada uma indicando se está ativa, cancelada, bloqueada ou inadimplente.",
      "intents": []
    },
    "situacaoMatricula": {
      "kind": "detail",
      "text": "Entrada liberada ou bloqueada em destaque, quantidade de mensalidades vencidas, quais são com vencimento e saldo devedor, e se o aluno está inadimplente.",
      "intents": []
    },
    "novaMatriculaForm": {
      "kind": "form",
      "text": "Matricular um aluno escolhendo o plano, conferindo valor e dia de vencimento, e informando a data de início.",
      "intents": [
        {
          "id": "registrarMatricula",
          "kind": "submit"
        }
      ]
    },
    "acoesMatricula": {
      "kind": "actions",
      "text": "Cancelar a matrícula a pedido do aluno com data e motivo, ver a situação do aluno e ir para a geração das mensalidades do mês.",
      "intents": [
        {
          "id": "cancelarMatricula",
          "kind": "submit"
        },
        {
          "id": "verSituacaoAluno",
          "kind": "navigate",
          "to": "alunos"
        },
        {
          "id": "gerarMensalidadesMes",
          "kind": "navigate",
          "to": "mensalidades"
        }
      ]
    }
  },
  "molecules": {
    "matriculasList": [
      {
        "role": "lista compacta de matrículas",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "situacaoMatricula": [
      {
        "role": "aviso de entrada liberada ou bloqueada",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      },
      {
        "role": "quantidade de mensalidades vencidas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "mensalidades vencidas em tela estreita",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "novaMatriculaForm": [
      {
        "role": "busca do aluno",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "escolha do plano",
        "preferred": "groupselectone--ml-card-selector",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "data de início",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "confirmar matrícula",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "acoesMatricula": [
      {
        "role": "ações da matrícula",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "confirmação do cancelamento",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "retorno da ação",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
