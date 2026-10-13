/// <mls fileReference="_102047_/l2/manutencaoFrota/web/desktop/page11/painel_frota.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar ao gestor, logo ao abrir, a visão das exceções da frota: quais preventivas já venceram por km ou por tempo, quanto cada veículo passou do previsto e se já existe ordem aberta para resolver. Ao lado, ver as ordens em andamento com os dias na oficina e o preço por litro dos abastecimentos recentes.",
  "sections": [
    {
      "id": "alertasPreventiva",
      "priority": "primary",
      "purpose": "Mostrar primeiro as preventivas vencidas, que exigem ação. A pergunta é quais veículos passaram do km ou da data prevista e quais ainda não têm ordem aberta.",
      "organisms": [
        "preventivasVencidas"
      ]
    },
    {
      "id": "andamentoOperacao",
      "priority": "main",
      "purpose": "Acompanhar o que já está em execução e o custo do combustível: há quantos dias cada veículo está na oficina e quanto se pagou por litro nos abastecimentos recentes.",
      "organisms": [
        "ordensEAbastecimentos"
      ]
    }
  ],
  "organisms": {
    "preventivasVencidas": {
      "kind": "highlights",
      "text": "Preventivas vencidas por km ou por tempo. Para cada uma: o veículo pela placa, o plano, o km previsto, a quilometragem atual, quantos km passou do previsto, a data prevista e se já há ordem aberta. Os planos ainda sem ordem aberta ficam em destaque, porque são os que pedem ação do gestor.",
      "intents": [
        {
          "id": "abrirPlanosPreventiva",
          "kind": "navigate",
          "to": "planos_manutencao"
        }
      ]
    },
    "ordensEAbastecimentos": {
      "kind": "summary",
      "text": "Ordens de manutenção em andamento, com número, veículo, oficina, data de entrada e dias na oficina, para ver os veículos parados há mais tempo. Também mostra o preço por litro dos abastecimentos recentes, por veículo e data, para acompanhar o custo do combustível.",
      "intents": [
        {
          "id": "abrirOrdens",
          "kind": "navigate",
          "to": "ordens_manutencao"
        },
        {
          "id": "abrirAbastecimentos",
          "kind": "navigate",
          "to": "abastecimentos"
        }
      ]
    }
  },
  "molecules": {
    "preventivasVencidas": [
      {
        "role": "Total de preventivas vencidas e quantas ainda não têm ordem",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Lista das preventivas vencidas com km excedido e situação da ordem",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "ordensEAbastecimentos": [
      {
        "role": "Ordens em andamento com dias na oficina",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-timeline-view"
      },
      {
        "role": "Preço por litro dos abastecimentos recentes",
        "preferred": "groupviewmetric--ml-compact-metric-sparkline",
        "alternative": "groupviewmetric--ml-metric-trend-compare"
      }
    ]
  }
} as const;
