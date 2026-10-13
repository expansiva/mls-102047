/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/mobile/page11/painel_locacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "No celular, em uma coluna fluida de cerca de 390px (que também funciona em 360px e 430px), mostrar primeiro os contratos em atraso, com dias e multa, e depois os totais de equipamentos por situação, com o contrato atual dos locados.",
  "sections": [
    {
      "id": "atrasos",
      "priority": "primary",
      "purpose": "Mostrar no topo o total de contratos em atraso e a soma das multas, seguidos de uma lista curta com o número, o cliente, os dias de atraso e a multa de cada contrato.",
      "organisms": [
        "contratosEmAtraso"
      ]
    },
    {
      "id": "situacaoEquipamentos",
      "priority": "main",
      "purpose": "Mostrar em poucos números quantos equipamentos estão disponíveis, locados e em manutenção e, abaixo, os equipamentos locados com o contrato de cada um.",
      "organisms": [
        "situacaoEquipamentos"
      ]
    }
  ],
  "organisms": {
    "contratosEmAtraso": {
      "kind": "highlights",
      "text": "Contratos em atraso, com número, cliente, dias de atraso e valor da multa de cada um, além do total de multas. Tocar em um contrato abre a página de contratos para registrar a devolução.",
      "intents": [
        {
          "id": "abrirContratos",
          "kind": "navigate",
          "to": "contratos_locacao"
        }
      ]
    },
    "situacaoEquipamentos": {
      "kind": "summary",
      "text": "Totais de equipamentos disponíveis, locados e em manutenção e, para os locados, o contrato atual. Daqui o usuário pode abrir a página de equipamentos.",
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
        "role": "Total de contratos em atraso e soma das multas",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Lista empilhada dos contratos em atraso",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "situacaoEquipamentos": [
      {
        "role": "Totais por situação",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Equipamentos por situação, com o contrato atual dos locados",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ]
  }
} as const;
