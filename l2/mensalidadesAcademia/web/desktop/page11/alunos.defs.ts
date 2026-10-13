/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/alunos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "Permitir que a recepção e a gerência encontrem rapidamente um aluno e entendam sua situação financeira na academia: se está inadimplente, se está bloqueado na entrada e quantas mensalidades estão vencidas, com acesso direto à matrícula e às mensalidades.",
  "sections": [
    {
      "id": "diretorioAlunos",
      "priority": "primary",
      "purpose": "Lista de alunos para localizar a pessoa pelo nome e identificar de imediato quem está inadimplente ou bloqueado e quantas mensalidades vencidas possui.",
      "organisms": [
        "listaAlunos"
      ]
    },
    {
      "id": "situacaoAluno",
      "priority": "main",
      "purpose": "Ao lado da lista, a situação financeira do aluno escolhido: indicadores de bloqueio e inadimplência, matrículas com entrada liberada ou não e mensalidades com saldo devedor.",
      "organisms": [
        "situacaoFinanceiraAluno"
      ]
    }
  ],
  "organisms": {
    "listaAlunos": {
      "kind": "list",
      "text": "Alunos da academia com nome, situação do cadastro e indicação de inadimplente, bloqueado e quantidade de mensalidades vencidas, para achar quem precisa de atenção no balcão ou na cobrança.",
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
      "text": "Situação financeira do aluno na academia: se está bloqueado ou inadimplente, quantas mensalidades estão vencidas, suas matrículas com entrada liberada ou bloqueada e as mensalidades com total pago e saldo devedor.",
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
        "role": "tabela de alunos com indicadores",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "busca de aluno pelo nome",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "ir para matricular aluno",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "situacaoFinanceiraAluno": [
      {
        "role": "identificação do aluno e situação do cadastro",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "quantidade de mensalidades vencidas",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "aviso de aluno bloqueado ou inadimplente",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      },
      {
        "role": "mensalidades com total pago e saldo devedor",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "abrir matrícula ou mensalidades",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
