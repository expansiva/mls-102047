/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page31/inicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templatesTest/decisionFirst/page21.md",
    "experience": "decisionFirst"
  },
  "intent": "No celular, mostrar ao gestor em uma coluna estreita e fluida quantas despesas da equipe esperam a decisão dele e quais são, para que ele siga rápido para a análise.",
  "sections": [
    {
      "id": "pendenciasDecisao",
      "priority": "primary",
      "purpose": "Mostrar primeiro o total de pendências e, abaixo, cada despesa em formato compacto com quem registrou, a data e o valor, legível de 360px a 430px.",
      "organisms": [
        "caixaDespesasPendentes"
      ]
    }
  ],
  "organisms": {
    "caixaDespesasPendentes": {
      "kind": "inbox",
      "text": "Vejo as despesas da equipe que estão esperando eu analisar e decidir, cada uma resumida com quem registrou, a data, a categoria, o valor e se é um reenvio. Toco para seguir para a análise e decisão.",
      "intents": [
        {
          "id": "abrirAnaliseDespesas",
          "kind": "navigate",
          "to": "despesas_da_equipe"
        }
      ]
    }
  },
  "molecules": {
    "caixaDespesasPendentes": [
      {
        "role": "Total de despesas aguardando decisão",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Quadro de cartões das despesas pendentes, um cartão por despesa com faixa de situação no topo",
        "preferred": "groupviewdata--ml-card-grid",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Ir para a análise das despesas",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
