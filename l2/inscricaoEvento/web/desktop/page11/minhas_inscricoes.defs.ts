/// <mls fileReference="_102047_/l2/inscricaoEvento/web/desktop/page11/minhas_inscricoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Mostrar à pessoa todas as suas inscrições em eventos: quais ocupam vaga e em que posição está na lista de espera. Ela localiza uma inscrição, confere os dados e pode cancelá-la para liberar a vaga. A página também mostra quando ela foi promovida da lista de espera.",
  "sections": [
    {
      "id": "panorama",
      "priority": "secondary",
      "purpose": "Dá uma visão rápida da situação das suas inscrições antes de escolher uma delas.",
      "organisms": [
        "resumoInscricoes"
      ]
    },
    {
      "id": "localizar",
      "priority": "primary",
      "purpose": "Mostra suas inscrições para você encontrar a que procura pelo código ou pelo evento.",
      "organisms": [
        "listaInscricoes"
      ]
    },
    {
      "id": "inscricaoAberta",
      "priority": "main",
      "purpose": "Mostra a inscrição escolhida e a opção de cancelá-la, com o impacto sobre a vaga.",
      "organisms": [
        "detalheInscricao",
        "acoesInscricao"
      ]
    },
    {
      "id": "historico",
      "priority": "secondary",
      "purpose": "Mostra quando você saiu da lista de espera e passou a ocupar uma vaga.",
      "organisms": [
        "promocoesListaEspera"
      ]
    }
  ],
  "organisms": {
    "resumoInscricoes": {
      "kind": "summary",
      "text": "Resume suas inscrições: quantas ocupam vaga e, nas que estão em lista de espera, sua posição na fila. Assim você sabe onde está garantido e onde ainda aguarda.",
      "intents": []
    },
    "listaInscricoes": {
      "kind": "list",
      "text": "Lista suas inscrições com código, evento, data do evento, situação e data de recebimento. Você pode buscar pelo código ou pelo nome do evento e escolher uma para ver os detalhes.",
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
      "text": "Mostra a inscrição escolhida: código, quando foi recebida, evento com data e local, se ocupa vaga e a posição na lista de espera. Confira esses dados antes de decidir pelo cancelamento.",
      "intents": []
    },
    "acoesInscricao": {
      "kind": "actions",
      "text": "Cancela a inscrição escolhida. Se ela ocupava vaga, a vaga é liberada e passa automaticamente para o primeiro da lista de espera. O cancelamento só aparece em inscrições confirmadas ou em lista de espera.",
      "intents": [
        {
          "id": "cancelarInscricao",
          "kind": "submit"
        }
      ]
    },
    "promocoesListaEspera": {
      "kind": "timeline",
      "text": "Mostra, em ordem de tempo, as vezes em que você saiu da lista de espera e passou a ocupar uma vaga liberada, com o evento e o momento da promoção.",
      "intents": []
    }
  },
  "molecules": {
    "resumoInscricoes": [
      {
        "role": "Indicadores de inscrições com vaga e em lista de espera",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "listaInscricoes": [
      {
        "role": "Busca por código ou evento",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Tabela das inscrições para escolher uma",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "detalheInscricao": [
      {
        "role": "Cartão com os dados da inscrição e do evento",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "acoesInscricao": [
      {
        "role": "Botão de cancelar inscrição",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação do cancelamento e da liberação da vaga",
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
