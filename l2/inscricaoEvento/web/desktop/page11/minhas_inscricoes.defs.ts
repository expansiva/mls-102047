/// <mls fileReference="_102047_/l2/inscricaoEvento/web/desktop/page11/minhas_inscricoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Acompanhar as próprias inscrições em eventos: ver quais garantem vaga e qual a posição na lista de espera, localizar uma inscrição, conferir seus dados e cancelá-la quando não puder comparecer, liberando a vaga para quem está aguardando.",
  "sections": [
    {
      "id": "visaoGeral",
      "priority": "primary",
      "purpose": "Mostrar logo de início a situação das suas inscrições: quantas ocupam vaga e em que posição você está nas listas de espera.",
      "organisms": [
        "resumoInscricoes"
      ]
    },
    {
      "id": "localizarConferir",
      "priority": "main",
      "purpose": "Encontrar a inscrição pelo código ou pelo evento e conferir ao lado os dados dela antes de decidir qualquer coisa.",
      "organisms": [
        "listaInscricoes",
        "detalheInscricao"
      ]
    },
    {
      "id": "cancelamento",
      "priority": "main",
      "purpose": "Permitir cancelar a inscrição selecionada, deixando claro que a vaga será liberada para o primeiro da lista de espera.",
      "organisms": [
        "acoesInscricao"
      ]
    },
    {
      "id": "promocoes",
      "priority": "secondary",
      "purpose": "Registrar quando uma inscrição sua saiu da lista de espera e passou a ocupar uma vaga liberada.",
      "organisms": [
        "promocoesListaEspera"
      ]
    }
  ],
  "organisms": {
    "resumoInscricoes": {
      "kind": "summary",
      "text": "Resumo das suas inscrições: quais já ocupam vaga no evento e, para as que aguardam, sua posição na lista de espera. Daqui você também pode buscar novos eventos.",
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
      "text": "Suas inscrições com código, evento, data do evento, recebida em e situação; busque pelo código ou pelo nome do evento e escolha uma para ver o detalhe.",
      "intents": []
    },
    "detalheInscricao": {
      "kind": "detail",
      "text": "Detalhe da inscrição escolhida: código, recebida em, evento com data e local, se ocupa vaga e a posição na lista de espera quando estiver aguardando.",
      "intents": []
    },
    "acoesInscricao": {
      "kind": "actions",
      "text": "Cancelar minha inscrição. Se ela ocupava vaga, a vaga é liberada e passa automaticamente ao primeiro da lista de espera; o cancelamento pede confirmação.",
      "intents": [
        {
          "id": "cancelarInscricao",
          "kind": "submit"
        }
      ]
    },
    "promocoesListaEspera": {
      "kind": "timeline",
      "text": "Linha do tempo das suas promoções: quando uma inscrição sua sai da lista de espera e passa a ocupar uma vaga liberada, aparece aqui com o evento e o momento da promoção.",
      "intents": []
    }
  },
  "molecules": {
    "resumoInscricoes": [
      {
        "role": "indicador de inscrições com vaga e em espera",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "listaInscricoes": [
      {
        "role": "busca por código ou evento",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "lista de inscrições",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "detalheInscricao": [
      {
        "role": "cartão da inscrição",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
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
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "promocoesListaEspera": [
      {
        "role": "linha do tempo de promoções",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "aviso de nova promoção",
        "preferred": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
