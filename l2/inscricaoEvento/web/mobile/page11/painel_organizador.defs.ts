/// <mls fileReference="_102047_/l2/inscricaoEvento/web/mobile/page11/painel_organizador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "No celular, mostrar ao organizador num conteúdo estreito e fluido (cerca de 390px, também usável de 360px a 430px) quais eventos publicados estão lotados, quantas vagas restam, a lista de espera, o total de vagas ocupadas e as publicações recentes.",
  "sections": [
    {
      "id": "alertasOcupacao",
      "priority": "primary",
      "purpose": "Mostrar no topo, em blocos empilhados, os eventos lotados ou quase sem vagas e o tamanho da lista de espera, para leitura rápida com uma mão.",
      "organisms": [
        "ocupacaoEventos"
      ]
    },
    {
      "id": "resumoGeral",
      "priority": "main",
      "purpose": "Logo abaixo, o total de vagas ocupadas em destaque e os eventos publicados recentemente com a data de publicação.",
      "organisms": [
        "resumoPublicacoes"
      ]
    }
  ],
  "organisms": {
    "ocupacaoEventos": {
      "kind": "highlights",
      "text": "Para cada evento publicado: se está lotado, quantas vagas restam em relação ao número de vagas e quantas pessoas aguardam na lista de espera. Os eventos lotados e com fila aparecem primeiro.",
      "intents": [
        {
          "id": "abrirGestaoEvento",
          "kind": "navigate",
          "to": "gestao_eventos"
        }
      ]
    },
    "resumoPublicacoes": {
      "kind": "summary",
      "text": "Total de vagas ocupadas somando os eventos publicados e os eventos publicados recentemente, com a data de publicação de cada um.",
      "intents": [
        {
          "id": "verTodosEventos",
          "kind": "navigate",
          "to": "gestao_eventos"
        }
      ]
    }
  },
  "molecules": {
    "ocupacaoEventos": [
      {
        "role": "cartão de ocupação de cada evento",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-gauge"
      },
      {
        "role": "lista de eventos publicados em tela estreita",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "barra de preenchimento das vagas por evento",
        "preferred": "groupshowprogress--ml-linear-progress"
      }
    ],
    "resumoPublicacoes": [
      {
        "role": "total de vagas ocupadas",
        "preferred": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "eventos publicados recentemente com data de publicação",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-data-table-minimal"
      }
    ]
  }
} as const;
