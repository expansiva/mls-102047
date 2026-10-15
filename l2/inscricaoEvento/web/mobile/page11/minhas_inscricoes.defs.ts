/// <mls fileReference="_102047_/l2/inscricaoEvento/web/mobile/page11/minhas_inscricoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "No celular, ver rapidamente se suas inscrições garantem vaga ou em que posição estão na lista de espera, abrir uma inscrição e cancelá-la com confirmação, em conteúdo fluido de coluna estreita (cerca de 390px, usável de 360px a 430px).",
  "sections": [
    {
      "id": "visaoGeral",
      "priority": "primary",
      "purpose": "Resumo compacto no topo: inscrições com vaga e posições na lista de espera.",
      "organisms": [
        "resumoInscricoes"
      ]
    },
    {
      "id": "localizarConferir",
      "priority": "main",
      "purpose": "Buscar a inscrição pelo código ou evento em uma lista empilhada e, ao tocar, ver o detalhe logo abaixo.",
      "organisms": [
        "listaInscricoes",
        "detalheInscricao"
      ]
    },
    {
      "id": "cancelamento",
      "priority": "main",
      "purpose": "Ação de cancelar ao alcance do polegar, logo após o detalhe, com confirmação antes de liberar a vaga.",
      "organisms": [
        "acoesInscricao"
      ]
    },
    {
      "id": "promocoes",
      "priority": "secondary",
      "purpose": "Histórico curto de quando você saiu da lista de espera e ganhou uma vaga.",
      "organisms": [
        "promocoesListaEspera"
      ]
    }
  ],
  "organisms": {
    "resumoInscricoes": {
      "kind": "summary",
      "text": "Suas inscrições em poucas linhas: quantas ocupam vaga e sua posição nas listas de espera, com atalho para encontrar novos eventos.",
      "intents": [
        {
          "id": "verEventosAbertos",
          "kind": "navigate",
          "to": "eventos_abertos"
        }
      ]
    },
    "listaInscricoes": {
      "kind": "list",
      "text": "Lista empilhada das suas inscrições com código, evento, data e situação; busque pelo código ou pelo evento e toque para abrir.",
      "intents": []
    },
    "detalheInscricao": {
      "kind": "detail",
      "text": "A inscrição aberta: código, recebida em, evento com data e local, se ocupa vaga e a posição na lista de espera.",
      "intents": []
    },
    "acoesInscricao": {
      "kind": "actions",
      "text": "Cancelar minha inscrição, liberando a vaga para o primeiro da lista de espera; pede confirmação antes de concluir.",
      "intents": [
        {
          "id": "cancelarInscricao",
          "kind": "submit"
        }
      ]
    },
    "promocoesListaEspera": {
      "kind": "timeline",
      "text": "Quando você sai da lista de espera e passa a ocupar uma vaga liberada, isso aparece aqui com o evento e o momento.",
      "intents": []
    }
  },
  "molecules": {
    "resumoInscricoes": [
      {
        "role": "indicador compacto de inscrições",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "listaInscricoes": [
      {
        "role": "busca por código ou evento",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "lista de inscrições em tela estreita",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "detalheInscricao": [
      {
        "role": "cartão da inscrição",
        "preferred": "groupviewcard--ml-vertical-card"
      }
    ],
    "acoesInscricao": [
      {
        "role": "botão cancelar inscrição",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirmação do cancelamento",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "aviso de cancelamento concluído",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "promocoesListaEspera": [
      {
        "role": "linha do tempo de promoções",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
