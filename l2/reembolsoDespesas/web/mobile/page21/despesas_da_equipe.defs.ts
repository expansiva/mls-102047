/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page21/despesas_da_equipe.defs.ts" enhancement="_blank"/>

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
        "role": "lista de despesas pendentes",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "busca por colaborador ou categoria",
        "preferred": "groupsearchcontent--ml-search-bar"
      }
    ],
    "analiseDespesa": [
      {
        "role": "resumo da despesa",
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
        "role": "botões aprovar e rejeitar",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "motivo da rejeição",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "confirmação da decisão",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
