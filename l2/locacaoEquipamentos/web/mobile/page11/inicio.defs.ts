/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/mobile/page11/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Painel inicial em tela estreita e fluida, de cerca de 390px e também usável entre 360px e 430px. Mostra primeiro o alerta de contratos em atraso, com cartões empilhados, e logo abaixo os totais da frota por situação e a lista resumida dos equipamentos.",
  "sections": [
    {
      "id": "alertasAtraso",
      "priority": "primary",
      "purpose": "Mostrar no topo quantos contratos estão em atraso e listar cada um em um bloco curto, fácil de ler no celular.",
      "organisms": [
        "contratosEmAtraso"
      ]
    },
    {
      "id": "situacaoFrota",
      "priority": "main",
      "purpose": "Resumir a frota em totais compactos de disponíveis, locados e em manutenção, seguidos da lista de equipamentos. Nos locados, a lista mostra o contrato vigente e a data prevista de devolução.",
      "organisms": [
        "equipamentosPorSituacao"
      ]
    }
  ],
  "organisms": {
    "contratosEmAtraso": {
      "kind": "highlights",
      "text": "Contratos em atraso: número do contrato, cliente e data prevista de devolução já vencida. Ficam em destaque os dias de atraso e a multa por atraso de cada contrato.",
      "intents": []
    },
    "equipamentosPorSituacao": {
      "kind": "summary",
      "text": "Equipamentos por situação atual, com os totais de disponíveis, locados e em manutenção. Para cada equipamento locado, aparecem o contrato vigente e a data prevista de devolução.",
      "intents": [
        {
          "id": "abrirEquipamentos",
          "kind": "navigate",
          "to": "equipamentos"
        }
      ]
    }
  },
  "molecules": {
    "contratosEmAtraso": [
      {
        "role": "total de contratos em atraso",
        "preferred": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "contratos em atraso empilhados",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "equipamentosPorSituacao": [
      {
        "role": "totais por situação",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
      },
      {
        "role": "lista de equipamentos por situação",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
