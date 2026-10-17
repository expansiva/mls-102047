/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/painel.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar ao responsável, logo ao entrar, uma visão de quanto a organização está pronta: se a empresa está preparada e o que falta nela, quantas pessoas já completaram o acesso e o que falta às demais, e os pedidos de liberação que aguardam o convite da pessoa certa.",
  "sections": [
    {
      "id": "situacaoEmpresa",
      "priority": "primary",
      "purpose": "Mostrar primeiro se a empresa está preparada e, se não estiver, quais dados obrigatórios ainda faltam, com caminho direto para completá-los.",
      "organisms": [
        "empresaPreparada"
      ]
    },
    {
      "id": "acessosOrganizacao",
      "priority": "main",
      "purpose": "Mostrar o andamento dos acessos das pessoas: quantas completaram, o que falta às demais e quem precisa dar consentimento.",
      "organisms": [
        "acessosPessoas"
      ]
    },
    {
      "id": "liberacoesPendentes",
      "priority": "main",
      "purpose": "Listar os pedidos de liberação de acesso para o responsável conferir a pessoa certa e convidá-la sem criar outro cadastro.",
      "organisms": [
        "pedidosLiberacao"
      ]
    }
  ],
  "organisms": {
    "empresaPreparada": {
      "kind": "summary",
      "text": "Veja se a empresa está preparada e quais dados ainda faltam para isso (nome, documento, endereço ou contato). Assim você sabe o que completar antes de seguir.",
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
      "text": "Veja quantas pessoas já completaram o acesso, o que falta para as demais e quem precisa dar consentimento, para acompanhar quem ainda não consegue usar os módulos.",
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
      "text": "Pedidos de liberação de acesso: confira quem é a pessoa certa, confirme o nome e o país do cadastro e convide pelo convite da plataforma para ligar o e-mail ao cadastro existente, sem criar uma segunda pessoa.",
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
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "progresso dos dados obrigatórios",
        "preferred": "groupshowprogress--ml-segmented-progress",
        "alternative": "groupshowprogress--ml-linear-progress"
      },
      {
        "role": "aviso de dados que faltam",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "acessosPessoas": [
      {
        "role": "total de pessoas com acesso completo",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "proporção de acessos completos",
        "preferred": "groupshowprogress--ml-circular-progress",
        "alternative": "groupshowprogress--ml-linear-progress"
      },
      {
        "role": "pessoas com pendência e consentimento exigido",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "pedidosLiberacao": [
      {
        "role": "fila de pedidos de liberação",
        "preferred": "groupviewtable--ml-lazy-record-detail-table",
        "alternative": "groupviewtable--ml-data-table"
      },
      {
        "role": "localizar a pessoa certa pelo nome",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "convidar a pessoa certa",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "confirmação do convite enviado",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
