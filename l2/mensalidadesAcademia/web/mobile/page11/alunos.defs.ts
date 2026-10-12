/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/alunos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "No celular da recepção, em tela estreita fluida por volta de 390px (usável de 360px a 430px), buscar o aluno pelo nome, ver logo se está inadimplente ou bloqueado e, se ele não existir, registrá-lo e matriculá-lo em um plano.",
  "sections": [
    {
      "id": "buscaAlunos",
      "priority": "primary",
      "purpose": "Buscar o aluno pelo nome em uma lista empilhada com o indicador de bloqueio visível em cada item.",
      "organisms": [
        "alunosLista"
      ]
    },
    {
      "id": "situacaoAluno",
      "priority": "main",
      "purpose": "Ao tocar no aluno, mostrar a situação na entrada com o alerta de bloqueio em primeiro lugar.",
      "organisms": [
        "situacaoEntrada"
      ]
    },
    {
      "id": "cadastroMatricula",
      "priority": "secondary",
      "purpose": "Registrar o aluno novo e matriculá-lo em etapas curtas, uma abaixo da outra.",
      "organisms": [
        "novoAlunoForm",
        "matricularAcoes"
      ]
    }
  ],
  "organisms": {
    "alunosLista": {
      "kind": "list",
      "text": "Lista de alunos com busca pelo nome, mostrando a situação do cadastro e os indicadores de inadimplência e bloqueio, para a recepção decidir rapidamente se o aluno pode entrar.",
      "intents": []
    },
    "situacaoEntrada": {
      "kind": "detail",
      "text": "Situação do aluno selecionado na entrada: quantidade de mensalidades vencidas, se está inadimplente e se está bloqueado (duas ou mais vencidas), com destaque quando não pode entrar.",
      "intents": [
        {
          "id": "verMatriculas",
          "kind": "navigate",
          "to": "matriculas"
        }
      ]
    },
    "novoAlunoForm": {
      "kind": "form",
      "text": "Registrar um novo aluno pelo nome quando a busca não o encontrou, evitando cadastro duplicado.",
      "intents": [
        {
          "id": "registrarAluno",
          "kind": "submit"
        }
      ]
    },
    "matricularAcoes": {
      "kind": "actions",
      "text": "Registrar o aluno e matriculá-lo em um plano escolhido (mensal, trimestral ou anual) com a data de início, deixando a matrícula ativa.",
      "intents": [
        {
          "id": "criarMatricula",
          "kind": "submit"
        },
        {
          "id": "abrirMatriculas",
          "kind": "navigate",
          "to": "matriculas"
        }
      ]
    }
  },
  "molecules": {
    "alunosLista": [
      {
        "role": "Busca do aluno pelo nome",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-history"
      },
      {
        "role": "Lista de alunos com situação",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "situacaoEntrada": [
      {
        "role": "Alerta de aluno bloqueado",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "Mensalidades vencidas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "novoAlunoForm": [
      {
        "role": "Nome do aluno",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Registrar aluno",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação do cadastro",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "matricularAcoes": [
      {
        "role": "Escolha do plano",
        "preferred": "groupselectone--ml-card-selector",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Data de início",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "Etapas registrar e matricular",
        "preferred": "groupnavigatesteps--ml-compact-step-indicator",
        "alternative": "groupnavigatesteps--ml-vertical-stepper"
      },
      {
        "role": "Confirmar matrícula",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
