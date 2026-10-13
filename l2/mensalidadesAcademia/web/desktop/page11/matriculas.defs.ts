/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/matriculas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Balcão de matrículas da academia: a recepção encontra a matrícula do aluno, vê na hora se a entrada está liberada ou bloqueada por mensalidades vencidas, matricula novos alunos e registra cancelamentos; a gerência confere as matrículas ativas antes de gerar as mensalidades do mês.",
  "sections": [
    {
      "id": "listaMatriculas",
      "priority": "primary",
      "purpose": "Localizar rapidamente a matrícula pelo número, aluno ou plano e enxergar quais estão ativas, bloqueadas ou inadimplentes.",
      "organisms": [
        "matriculasList"
      ]
    },
    {
      "id": "situacaoSelecionada",
      "priority": "main",
      "purpose": "Mostrar a situação da matrícula escolhida para decidir se o aluno entra e entender quais mensalidades vencidas causam o bloqueio.",
      "organisms": [
        "situacaoMatricula",
        "acoesMatricula"
      ]
    },
    {
      "id": "novaMatricula",
      "priority": "secondary",
      "purpose": "Registrar a matrícula de um aluno em um plano a partir de uma data de início.",
      "organisms": [
        "novaMatriculaForm"
      ]
    }
  ],
  "organisms": {
    "matriculasList": {
      "kind": "list",
      "text": "Matrículas por número, aluno e plano, com data de início e a indicação de ativa, cancelada, bloqueada ou inadimplente, para achar o aluno que chegou ao balcão ou conferir as ativas do mês.",
      "intents": []
    },
    "situacaoMatricula": {
      "kind": "detail",
      "text": "Situação da matrícula selecionada: se a entrada está liberada ou bloqueada, quantas mensalidades estão vencidas, quais são (mês de referência, vencimento e saldo devedor) e se o aluno está inadimplente.",
      "intents": []
    },
    "novaMatriculaForm": {
      "kind": "form",
      "text": "Matricular um aluno: buscar o aluno, escolher o plano conferindo valor e dia de vencimento, e informar a data de início; a matrícula já nasce ativa.",
      "intents": [
        {
          "id": "registrarMatricula",
          "kind": "submit"
        }
      ]
    },
    "acoesMatricula": {
      "kind": "actions",
      "text": "Cancelar a matrícula a pedido do aluno, informando data e motivo, o que encerra as mensalidades futuras; consultar a situação do aluno; e ir para a geração das mensalidades do mês.",
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
        "role": "tabela de matrículas com ordenação e situação",
        "preferred": "groupviewtable--ml-advanced-data-table",
        "alternative": "groupviewtable--ml-data-table"
      }
    ],
    "situacaoMatricula": [
      {
        "role": "aviso de entrada liberada ou bloqueada",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "quantidade de mensalidades vencidas",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "lista das mensalidades vencidas",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "novaMatriculaForm": [
      {
        "role": "busca do aluno",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "escolha do plano comparando valor e vencimento",
        "preferred": "groupselectone--ml-table-single-select",
        "alternative": "groupselectone--ml-card-selector"
      },
      {
        "role": "data de início",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "confirmar matrícula",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "acoesMatricula": [
      {
        "role": "ações da matrícula",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
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
