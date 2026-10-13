/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/alunos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "No celular, em largura estreita e fluida (por volta de 390px, também usável em 360px e 430px), permitir localizar um aluno e ver logo se ele está bloqueado ou inadimplente e quantas mensalidades estão vencidas, abrindo a situação financeira completa ao tocar no aluno.",
  "sections": [
    {
      "id": "diretorioAlunos",
      "priority": "primary",
      "purpose": "Lista empilhada de alunos com busca pelo nome, mostrando em cada item os sinais de bloqueado, inadimplente e quantidade de mensalidades vencidas.",
      "organisms": [
        "listaAlunos"
      ]
    },
    {
      "id": "situacaoAluno",
      "priority": "main",
      "purpose": "Ao tocar em um aluno, a situação financeira ocupa a largura da tela: aviso de bloqueio primeiro, depois mensalidades vencidas, matrículas e saldos.",
      "organisms": [
        "situacaoFinanceiraAluno"
      ]
    }
  ],
  "organisms": {
    "listaAlunos": {
      "kind": "list",
      "text": "Alunos da academia com nome e indicação de inadimplente, bloqueado e quantidade de mensalidades vencidas, em itens compactos para leitura rápida no balcão.",
      "intents": [
        {
          "id": "irParaMatricularAluno",
          "kind": "navigate",
          "to": "matriculas"
        }
      ]
    },
    "situacaoFinanceiraAluno": {
      "kind": "detail",
      "text": "Situação financeira do aluno: aviso se está bloqueado ou inadimplente, quantidade de mensalidades vencidas, matrículas com entrada liberada ou bloqueada e mensalidades com saldo devedor.",
      "intents": [
        {
          "id": "abrirMatriculasDoAluno",
          "kind": "navigate",
          "to": "matriculas"
        },
        {
          "id": "abrirMensalidadesDoAluno",
          "kind": "navigate",
          "to": "mensalidades"
        }
      ]
    }
  },
  "molecules": {
    "listaAlunos": [
      {
        "role": "lista de alunos com indicadores",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "busca de aluno pelo nome",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-history"
      },
      {
        "role": "ir para matricular aluno",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ],
    "situacaoFinanceiraAluno": [
      {
        "role": "aviso de aluno bloqueado ou inadimplente",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      },
      {
        "role": "quantidade de mensalidades vencidas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "identificação do aluno",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "mensalidades com total pago e saldo devedor",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "abrir matrícula ou mensalidades",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      }
    ]
  }
} as const;
