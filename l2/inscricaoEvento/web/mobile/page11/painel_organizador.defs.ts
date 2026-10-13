/// <mls fileReference="_102047_/l2/inscricaoEvento/web/mobile/page11/painel_organizador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "No celular, o organizador confere rapidamente quais eventos publicados lotaram, quantas vagas restam, o tamanho das listas de espera e o total de vagas ocupadas, em conteúdo fluido de coluna única pensado para cerca de 390px e utilizável entre 360px e 430px.",
  "sections": [
    {
      "id": "ocupacao",
      "priority": "primary",
      "purpose": "Abrir a tela pelos eventos que pedem atenção: lotados ou com lista de espera, cada um em um item compacto e fácil de ler.",
      "organisms": [
        "destaquesOcupacao"
      ]
    },
    {
      "id": "resumo",
      "priority": "main",
      "purpose": "Mostrar o total de vagas ocupadas e, logo abaixo, os eventos publicados recentemente com a data de publicação.",
      "organisms": [
        "resumoPublicacoes"
      ]
    }
  ],
  "organisms": {
    "destaquesOcupacao": {
      "kind": "highlights",
      "text": "Para cada evento publicado, mostra se está lotado, as vagas restantes e quantas pessoas estão na lista de espera. Os eventos que pedem atenção vêm primeiro.",
      "intents": [
        {
          "id": "abrirEventoNaGestao",
          "kind": "navigate",
          "to": "gestao_eventos"
        }
      ]
    },
    "resumoPublicacoes": {
      "kind": "summary",
      "text": "Total de vagas ocupadas nos eventos publicados e os eventos publicados recentemente, com a data de publicação.",
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
    "destaquesOcupacao": [
      {
        "role": "Ocupação por evento publicado em itens empilhados",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "Vagas ocupadas em relação ao número de vagas de cada evento",
        "preferred": "groupshowprogress--ml-linear-progress"
      }
    ],
    "resumoPublicacoes": [
      {
        "role": "Total de vagas ocupadas",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Eventos publicados recentemente com data de publicação",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ]
  }
} as const;
