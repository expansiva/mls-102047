/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/alunos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "Permitir que a recepção e a gerência encontrem rapidamente um aluno pelo nome, confiram na entrada se ele está inadimplente ou bloqueado por mensalidades vencidas e, quando o aluno ainda não existe, o registrem e o matriculem em um plano.",
  "sections": [
    {
      "id": "buscaAlunos",
      "priority": "primary",
      "purpose": "Localizar o aluno pelo nome e ver de imediato se está inadimplente ou bloqueado.",
      "organisms": [
        "alunosLista"
      ]
    },
    {
      "id": "situacaoAluno",
      "priority": "main",
      "purpose": "Mostrar a situação do aluno escolhido na entrada: quantas mensalidades vencidas, se está inadimplente e se está bloqueado.",
      "organisms": [
        "situacaoEntrada"
      ]
    },
    {
      "id": "cadastroMatricula",
      "priority": "secondary",
      "purpose": "Registrar um aluno que ainda não existe e seguir para matriculá-lo em um plano a partir de uma data.",
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
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Lista de alunos com situação",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
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
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Resumo do aluno",
        "preferred": "groupviewcard--ml-profile-card"
      }
    ],
    "novoAlunoForm": [
      {
        "role": "Nome do aluno",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
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
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-table-single-select"
      },
      {
        "role": "Data de início",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "Etapas registrar e matricular",
        "preferred": "groupnavigatesteps--ml-horizontal-stepper",
        "alternative": "groupnavigatesteps--ml-compact-step-indicator"
      },
      {
        "role": "Confirmar matrícula",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
