/// <mls fileReference="_102047_/l2/inscricaoEvento/web/mobile/page11/minhas_inscricoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Num celular, entre 360px e 430px de largura, mostrar à pessoa as suas inscrições, quais ocupam vaga e a posição na lista de espera. Ela encontra uma inscrição, confere os dados e pode cancelá-la para liberar a vaga. O conteúdo fica em uma única coluna que se ajusta à tela.",
  "sections": [
    {
      "id": "panorama",
      "priority": "secondary",
      "purpose": "Mostra em poucas linhas a situação das suas inscrições.",
      "organisms": [
        "resumoInscricoes"
      ]
    },
    {
      "id": "localizar",
      "priority": "primary",
      "purpose": "Mostra suas inscrições empilhadas, com busca pelo código ou pelo evento.",
      "organisms": [
        "listaInscricoes"
      ]
    },
    {
      "id": "inscricaoAberta",
      "priority": "main",
      "purpose": "Mostra a inscrição escolhida e, logo abaixo, a opção de cancelá-la.",
      "organisms": [
        "detalheInscricao",
        "acoesInscricao"
      ]
    },
    {
      "id": "historico",
      "priority": "secondary",
      "purpose": "Mostra quando você saiu da lista de espera e ganhou uma vaga.",
      "organisms": [
        "promocoesListaEspera"
      ]
    }
  ],
  "organisms": {
    "resumoInscricoes": {
      "kind": "summary",
      "text": "Resume suas inscrições: quantas ocupam vaga e sua posição nas que estão em lista de espera.",
      "intents": []
    },
    "listaInscricoes": {
      "kind": "list",
      "text": "Mostra suas inscrições em itens empilhados, cada um com código, evento, data e situação. Busque pelo código ou pelo evento e toque em um item para ver os detalhes.",
      "intents": [
        {
          "id": "buscarMaisEventos",
          "kind": "navigate",
          "to": "eventos_abertos"
        }
      ]
    },
    "detalheInscricao": {
      "kind": "detail",
      "text": "Mostra a inscrição escolhida: código, quando foi recebida, evento com data e local, se ocupa vaga e a posição na lista de espera.",
      "intents": []
    },
    "acoesInscricao": {
      "kind": "actions",
      "text": "Cancela a inscrição escolhida. Se ela ocupava vaga, a vaga passa automaticamente para o primeiro da lista de espera.",
      "intents": [
        {
          "id": "cancelarInscricao",
          "kind": "submit"
        }
      ]
    },
    "promocoesListaEspera": {
      "kind": "timeline",
      "text": "Mostra quando você saiu da lista de espera e passou a ocupar uma vaga liberada, com o evento e o momento da promoção.",
      "intents": []
    }
  },
  "molecules": {
    "resumoInscricoes": [
      {
        "role": "Indicadores compactos de inscrições com vaga e em espera",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
      }
    ],
    "listaInscricoes": [
      {
        "role": "Busca por código ou evento",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Lista empilhada de inscrições para tocar e abrir",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "detalheInscricao": [
      {
        "role": "Cartão com os dados da inscrição e do evento",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "acoesInscricao": [
      {
        "role": "Botão de cancelar inscrição na largura da tela",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação do cancelamento",
        "preferred": "groupnotifyuser--ml-alert-modal",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "promocoesListaEspera": [
      {
        "role": "Linha do tempo das promoções",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
