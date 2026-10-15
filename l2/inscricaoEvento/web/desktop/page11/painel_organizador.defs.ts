/// <mls fileReference="_102047_/l2/inscricaoEvento/web/desktop/page11/painel_organizador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar ao organizador uma visão rápida da ocupação dos eventos publicados: quais estão lotados, quantas vagas restam, o tamanho da lista de espera de cada um, o total de vagas ocupadas e os eventos publicados recentemente.",
  "sections": [
    {
      "id": "alertasOcupacao",
      "priority": "primary",
      "purpose": "Destacar primeiro os eventos publicados que estão lotados ou quase sem vagas e o tamanho da lista de espera de cada um, para o organizador saber onde a demanda passou da capacidade.",
      "organisms": [
        "ocupacaoEventos"
      ]
    },
    {
      "id": "resumoGeral",
      "priority": "main",
      "purpose": "Resumir o total de vagas ocupadas e listar os eventos publicados recentemente com a data de publicação, para acompanhar o movimento das inscrições.",
      "organisms": [
        "resumoPublicacoes"
      ]
    }
  ],
  "organisms": {
    "ocupacaoEventos": {
      "kind": "highlights",
      "text": "Para cada evento publicado: se está lotado, quantas vagas restam em relação ao número de vagas e quantas pessoas aguardam na lista de espera. Os eventos lotados e com fila ficam em destaque para o organizador agir.",
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
      "text": "Total de vagas ocupadas somando os eventos publicados e a lista dos eventos publicados recentemente, com a data de publicação de cada um.",
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
        "role": "ocupação de cada evento em relação ao número de vagas",
        "preferred": "groupviewmetric--ml-metric-gauge",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "lista de eventos publicados com lotado, vagas restantes e lista de espera",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "barra de preenchimento das vagas por evento",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      }
    ],
    "resumoPublicacoes": [
      {
        "role": "total de vagas ocupadas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "eventos publicados recentemente com data de publicação",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      }
    ]
  }
} as const;
