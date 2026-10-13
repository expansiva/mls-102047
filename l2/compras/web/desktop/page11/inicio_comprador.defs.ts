/// <mls fileReference="_102047_/l2/compras/web/desktop/page11/inicio_comprador.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Mostrar ao comprador, logo ao entrar, como estão os seus pedidos de compra e o que ainda depende dele: os rascunhos a completar com itens e a enviar ao fornecedor.",
  "sections": [
    {
      "id": "situacaoPedidos",
      "priority": "primary",
      "purpose": "Indicadores dos meus pedidos: em aberto, aguardando aprovação do gerente, liberados ao fornecedor e atrasados, com valor total e quantidade pendente de chegada.",
      "organisms": [
        "resumoMeusPedidos"
      ]
    },
    {
      "id": "pendenciasComprador",
      "priority": "main",
      "purpose": "Rascunhos que abri e ainda preciso completar com itens e enviar, para retomar o trabalho de onde parei.",
      "organisms": [
        "rascunhosAEnviar"
      ]
    },
    {
      "id": "meuCadastro",
      "priority": "secondary",
      "purpose": "Conferir meu cadastro de comprador no módulo compras.",
      "organisms": [
        "cadastroComprador"
      ]
    }
  ],
  "organisms": {
    "resumoMeusPedidos": {
      "kind": "summary",
      "text": "Quantos pedidos meus estão em aberto, aguardando aprovação, liberados ao fornecedor e atrasados, com o valor total e a quantidade ainda pendente de chegada; daqui sigo para a lista completa dos meus pedidos.",
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
      "text": "Pedidos em rascunho que abri, com número, fornecedor, data de abertura e valor até agora; abro cada um para incluir itens, revisar e enviar, ou começo um novo pedido.",
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
      "text": "Meus dados de comprador: nome, situação no cadastro, documento e contatos, para eu conferir que estou apto a abrir pedidos.",
      "intents": []
    }
  },
  "molecules": {
    "resumoMeusPedidos": [
      {
        "role": "indicador de cada situação dos pedidos",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "rascunhosAEnviar": [
      {
        "role": "lista dos rascunhos a completar",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-data-table"
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
