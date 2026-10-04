/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/cardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/productCatalog/page21.md",
    "experience": "masterDetailCatalog"
  },
  "intent": "Em conteúdo estreito e fluido em torno de 390px, também usável em 360px e 430px, o caixa percorre o cardápio e cadastra ou atualiza nome e preço vigente dos itens da operação.",
  "sections": [
    {
      "id": "secaoManutencao",
      "priority": "primary",
      "purpose": "Em faixa estreita, o caixa informa ou corrige nome e preço vigente e grava o item sem depender de uma grade fixa.",
      "organisms": [
        "formularioItemCardapio"
      ]
    },
    {
      "id": "secaoCatalogo",
      "priority": "main",
      "purpose": "Empilha os itens do cardápio em leitura contínua para conferir nomes e preços e selecionar o registro a atualizar.",
      "organisms": [
        "listaItensCardapio"
      ]
    }
  ],
  "organisms": {
    "listaItensCardapio": {
      "kind": "list",
      "text": "Mostra os itens cadastrados no cardápio, com o nome apresentado à equipe e o preço vigente, para o caixa conferir o que está disponível na operação e escolher o registro a atualizar.",
      "intents": []
    },
    "formularioItemCardapio": {
      "kind": "form",
      "text": "Permite cadastrar um item novo ou atualizar nome e preço vigente de um item existente, para manter o cardápio usado no lançamento das comandas.",
      "intents": [
        {
          "id": "cadastrarItemCardapio",
          "kind": "submit"
        },
        {
          "id": "atualizarItemCardapio",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "listaItensCardapio": [
      {
        "role": "collection",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "formularioItemCardapio": [
      {
        "role": "enterText",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "enterMoney",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "triggerAction",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "notifyUser",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
