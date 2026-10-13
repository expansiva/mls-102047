/// <mls fileReference="_102047_/l2/compras/web/mobile/page11/inicio_comprador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "No celular, o comprador vê primeiro os indicadores dos seus pedidos e logo abaixo os rascunhos a completar e enviar, em conteúdo fluido de coluna estreita (cerca de 390px, usável de 360px a 430px).",
  "sections": [
    {
      "id": "situacaoPedidos",
      "priority": "primary",
      "purpose": "Indicadores compactos dos meus pedidos: em aberto, aguardando aprovação, liberados e atrasados, com valor total e quantidade pendente.",
      "organisms": [
        "resumoMeusPedidos"
      ]
    },
    {
      "id": "pendenciasComprador",
      "priority": "main",
      "purpose": "Rascunhos a completar e enviar, em lista empilhada fácil de tocar.",
      "organisms": [
        "rascunhosAEnviar"
      ]
    },
    {
      "id": "meuCadastro",
      "priority": "secondary",
      "purpose": "Meu cadastro de comprador, consultado quando necessário ao final da página.",
      "organisms": [
        "cadastroComprador"
      ]
    }
  ],
  "organisms": {
    "resumoMeusPedidos": {
      "kind": "summary",
      "text": "Contagem dos meus pedidos por situação, com valor total e quantidade pendente; um toque leva à lista completa dos meus pedidos.",
      "intents": [
        {
          "id": "verMeusPedidos",
          "kind": "navigate",
          "to": "pedidos_comprador"
        }
      ]
    },
    "rascunhosAEnviar": {
      "kind": "inbox",
      "text": "Meus rascunhos com número, fornecedor e valor até agora; toco em um para incluir itens, revisar e enviar, ou começo um novo pedido.",
      "intents": [
        {
          "id": "completarPedido",
          "kind": "navigate",
          "to": "pedidos_comprador"
        },
        {
          "id": "abrirNovoPedido",
          "kind": "navigate",
          "to": "pedidos_comprador"
        }
      ]
    },
    "cadastroComprador": {
      "kind": "detail",
      "text": "Meu nome, situação, documento e contatos de comprador.",
      "intents": []
    }
  },
  "molecules": {
    "resumoMeusPedidos": [
      {
        "role": "indicador compacto de cada situação",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
      }
    ],
    "rascunhosAEnviar": [
      {
        "role": "lista empilhada dos rascunhos",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "atalho para abrir novo pedido",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "cadastroComprador": [
      {
        "role": "campos do cadastro exibidos em modo leitura",
        "preferred": "groupentertext--ml-enter-text"
      }
    ]
  }
} as const;
