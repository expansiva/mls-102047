/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/matriculas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "No celular, em uma coluna fluida de cerca de 390px (usável de 360px a 430px), localizar a matrícula, ver logo a situação e os valores em aberto, matricular um aluno e registrar o cancelamento pedido por ele.",
  "sections": [
    {
      "id": "listaMatriculas",
      "priority": "primary",
      "purpose": "Lista empilhada de matrículas com aluno, plano, situação, vencidas e total em aberto, com filtro rápido para as ativas.",
      "organisms": [
        "matriculasList"
      ]
    },
    {
      "id": "situacaoSelecionada",
      "priority": "main",
      "purpose": "Situação da matrícula tocada logo abaixo: bloqueada, inadimplente, vencidas e total em aberto.",
      "organisms": [
        "situacaoMatricula"
      ]
    },
    {
      "id": "novaMatricula",
      "priority": "secondary",
      "purpose": "Formulário curto para escolher plano e data de início.",
      "organisms": [
        "novaMatriculaForm"
      ]
    },
    {
      "id": "acoesMatriculas",
      "priority": "secondary",
      "purpose": "Ações ao alcance do polegar: cancelar matrícula, cadastrar aluno e gerar mensalidades.",
      "organisms": [
        "acoesMatricula"
      ]
    }
  ],
  "organisms": {
    "matriculasList": {
      "kind": "list",
      "text": "Matrículas em itens empilhados com aluno, plano, situação, mensalidades vencidas e total em aberto; filtro para mostrar só as ativas e toque para abrir a situação.",
      "intents": []
    },
    "situacaoMatricula": {
      "kind": "detail",
      "text": "Situação da matrícula escolhida: bloqueada, inadimplente, mensalidades vencidas e total em aberto, em destaque para leitura rápida.",
      "intents": []
    },
    "novaMatriculaForm": {
      "kind": "form",
      "text": "Criar a matrícula escolhendo o aluno, o plano e a data de início.",
      "intents": [
        {
          "id": "criarMatricula",
          "kind": "submit"
        }
      ]
    },
    "acoesMatricula": {
      "kind": "actions",
      "text": "Cancelar a matrícula a pedido do aluno, encerrando as mensalidades futuras; cadastrar um aluno novo; ir à geração das mensalidades do mês.",
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
        "role": "lista de matrículas",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
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
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
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
        "preferred": "groupselectone--ml-card-selector",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "escolha do aluno",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "data de início",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      }
    ],
    "acoesMatricula": [
      {
        "role": "botões de ação",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "confirmação do cancelamento",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "resultado da ação",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
