/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/painel.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "No celular, mostrar ao responsável em uma coluna fluida (cerca de 390px, usável de 360px a 430px) a situação da empresa, o andamento dos acessos e os pedidos de liberação, com os convites pendentes fáceis de alcançar.",
  "sections": [
    {
      "id": "situacaoEmpresa",
      "priority": "primary",
      "purpose": "Indicar de forma compacta se a empresa está preparada e quais dados faltam, com atalho para completá-los.",
      "organisms": [
        "empresaPreparada"
      ]
    },
    {
      "id": "liberacoesPendentes",
      "priority": "main",
      "purpose": "Trazer cedo os pedidos de liberação, em lista empilhada, para conferir a pessoa certa e convidá-la com um toque.",
      "organisms": [
        "pedidosLiberacao"
      ]
    },
    {
      "id": "acessosOrganizacao",
      "priority": "secondary",
      "purpose": "Resumir quantas pessoas completaram o acesso, o que falta às demais e quem precisa dar consentimento.",
      "organisms": [
        "acessosPessoas"
      ]
    }
  ],
  "organisms": {
    "empresaPreparada": {
      "kind": "summary",
      "text": "Veja se a empresa está preparada e quais dados ainda faltam para isso, para completar só o necessário.",
      "intents": [
        {
          "id": "completarDadosEmpresa",
          "kind": "navigate",
          "to": "empresa"
        }
      ]
    },
    "acessosPessoas": {
      "kind": "highlights",
      "text": "Veja quantas pessoas já completaram o acesso, o que falta para as demais e quem precisa dar consentimento.",
      "intents": [
        {
          "id": "verPessoas",
          "kind": "navigate",
          "to": "pessoas"
        }
      ]
    },
    "pedidosLiberacao": {
      "kind": "inbox",
      "text": "Pedidos de liberação de acesso: confira quem é a pessoa certa, confirme nome e país e convide pelo convite da plataforma para ligar o e-mail ao cadastro existente.",
      "intents": [
        {
          "id": "convidarPessoaCerta",
          "kind": "submit"
        },
        {
          "id": "abrirPessoas",
          "kind": "navigate",
          "to": "pessoas"
        }
      ]
    }
  },
  "molecules": {
    "empresaPreparada": [
      {
        "role": "indicador de empresa preparada",
        "preferred": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "progresso dos dados obrigatórios",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-segmented-progress"
      },
      {
        "role": "aviso de dados que faltam",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "acessosPessoas": [
      {
        "role": "total de pessoas com acesso completo",
        "preferred": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "proporção de acessos completos",
        "preferred": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "pessoas com pendência",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "pedidosLiberacao": [
      {
        "role": "fila de pedidos de liberação",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "localizar a pessoa certa pelo nome",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "convidar a pessoa certa",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do convite enviado",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
