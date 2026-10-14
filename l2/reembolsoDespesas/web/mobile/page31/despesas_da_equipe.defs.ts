/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page31/despesas_da_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templatesTest/decisionFirst/page21.md",
    "experience": "decisionFirst"
  },
  "intent": "No celular, em uma coluna fluida de cerca de 390px (também usável entre 360px e 430px), o gestor percorre as despesas pendentes da equipe, abre uma para analisar dados e comprovante e decide aprovar ou rejeitar com o motivo.",
  "sections": [
    {
      "id": "filaPendentes",
      "priority": "primary",
      "purpose": "Listar de forma compacta as despesas pendentes da equipe, destacando colaborador, valor e data, para tocar e abrir a análise.",
      "organisms": [
        "despesasPendentes"
      ]
    },
    {
      "id": "analiseDecisao",
      "priority": "main",
      "purpose": "Mostrar em sequência vertical os dados e o comprovante da despesa escolhida e, ao final, as ações de aprovar ou rejeitar ao alcance do polegar.",
      "organisms": [
        "analiseDespesa",
        "decisaoDespesa"
      ]
    }
  ],
  "organisms": {
    "despesasPendentes": {
      "kind": "list",
      "text": "Localizo as despesas pendentes da equipe em uma lista compacta com colaborador, valor e data e escolho a que vou analisar.",
      "intents": []
    },
    "analiseDespesa": {
      "kind": "detail",
      "text": "Analiso os dados da despesa — categoria, descrição, valor, data, reenvio e motivo de rejeição anterior — e abro o comprovante em tela cheia.",
      "intents": []
    },
    "decisaoDespesa": {
      "kind": "actions",
      "text": "Aprovo a despesa ou rejeito informando o motivo, com confirmação clara da decisão.",
      "intents": [
        {
          "id": "aprovarDespesa",
          "kind": "submit"
        },
        {
          "id": "rejeitarDespesa",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "despesasPendentes": [
      {
        "role": "Quadro de cartões das despesas pendentes, um cartão por despesa com faixa de situação no topo",
        "preferred": "groupviewdata--ml-card-grid",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "busca por colaborador ou categoria",
        "preferred": "groupsearchcontent--ml-search-bar"
      }
    ],
    "analiseDespesa": [
      {
        "role": "Despesa aberta no painel sobre o quadro",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "visualização do comprovante",
        "preferred": "groupplaymedia--ml-pdf-viewer",
        "alternative": "groupplaymedia--ml-image-gallery"
      }
    ],
    "decisaoDespesa": [
      {
        "role": "Botões aprovar e rejeitar no topo do painel, antes dos dados",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Motivo da rejeição, logo abaixo dos botões",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "Linha que substitui os botões dizendo o que foi decidido",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
