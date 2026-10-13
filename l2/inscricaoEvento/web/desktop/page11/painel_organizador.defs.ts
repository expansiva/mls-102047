/// <mls fileReference="_102047_/l2/inscricaoEvento/web/desktop/page11/painel_organizador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar ao organizador, em uma só tela, a situação de ocupação dos seus eventos publicados: quais já lotaram, quantas vagas ainda restam, quantas pessoas aguardam na lista de espera, o total de vagas ocupadas e o que foi publicado recentemente.",
  "sections": [
    {
      "id": "ocupacao",
      "priority": "primary",
      "purpose": "Mostrar primeiro os eventos que pedem atenção: lotados, com poucas vagas restantes ou com lista de espera crescendo.",
      "organisms": [
        "destaquesOcupacao"
      ]
    },
    {
      "id": "resumo",
      "priority": "main",
      "purpose": "Resumir o total de vagas ocupadas e listar os eventos publicados recentemente, com a data de publicação, para o organizador acompanhar o andamento das inscrições.",
      "organisms": [
        "resumoPublicacoes"
      ]
    }
  ],
  "organisms": {
    "destaquesOcupacao": {
      "kind": "highlights",
      "text": "Para cada evento publicado, mostra se está lotado, quantas vagas restam e o tamanho da lista de espera. Os lotados e os que têm fila aparecem em destaque para o organizador decidir onde agir.",
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
    "destaquesOcupacao": [
      {
        "role": "Ocupação por evento publicado (lotado, vagas restantes, lista de espera)",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-card-grid"
      },
      {
        "role": "Vagas ocupadas em relação ao número de vagas de cada evento",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      }
    ],
    "resumoPublicacoes": [
      {
        "role": "Total de vagas ocupadas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Eventos publicados recentemente com data de publicação",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-data-table-minimal"
      }
    ]
  }
} as const;
