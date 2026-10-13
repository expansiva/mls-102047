/// <mls fileReference="_102047_/l2/manutencaoFrota/web/mobile/page11/painel_frota.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "No celular, o gestor confere rápido as exceções da frota em uma coluna fluida de cerca de 390px, que também funciona em 360px e 430px. Primeiro vêm as preventivas vencidas e se já têm ordem aberta. Depois, as ordens em andamento com os dias na oficina e o preço por litro dos abastecimentos recentes.",
  "sections": [
    {
      "id": "alertasPreventiva",
      "priority": "primary",
      "purpose": "Abrir com os números das preventivas vencidas e, logo abaixo, cada preventiva vencida em um item empilhado: placa, km além do previsto e se há ordem aberta.",
      "organisms": [
        "preventivasVencidas"
      ]
    },
    {
      "id": "andamentoOperacao",
      "priority": "main",
      "purpose": "Depois dos alertas, ver as ordens em andamento ordenadas pelos dias na oficina e o preço por litro recente, em blocos compactos que cabem na largura estreita.",
      "organisms": [
        "ordensEAbastecimentos"
      ]
    }
  ],
  "organisms": {
    "preventivasVencidas": {
      "kind": "highlights",
      "text": "Preventivas vencidas por km ou por tempo, uma por item empilhado. Cada item mostra a placa do veículo, o plano, quantos km passou do previsto ou a data prevista que já passou, e se já há ordem aberta. As que estão sem ordem vêm primeiro.",
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
      "text": "Ordens em andamento com número, placa, oficina e dias na oficina, seguidas do preço por litro dos abastecimentos recentes, para acompanhar o custo do combustível sem sair do painel.",
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
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Preventivas vencidas em itens empilhados",
        "preferred": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "ordensEAbastecimentos": [
      {
        "role": "Ordens em andamento com dias na oficina",
        "preferred": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Preço por litro dos abastecimentos recentes",
        "preferred": "groupviewmetric--ml-compact-metric-sparkline",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ]
  }
} as const;
