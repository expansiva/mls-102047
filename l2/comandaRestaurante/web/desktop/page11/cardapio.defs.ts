/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/cardapio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/productCatalog/page21.md",
    "experience": "masterDetailCatalog"
  },
  "intent": "O caixa consulta os itens do cardápio da casa e cadastra ou atualiza nome e preço vigente para manter o que a operação usa no lançamento das comandas.",
  "sections": [
    {
      "id": "secaoCatalogo",
      "priority": "primary",
      "purpose": "Mostra o cardápio vigente para o caixa conferir o que está à venda e escolher o item que precisa de manutenção.",
      "organisms": [
        "listaItensCardapio"
      ]
    },
    {
      "id": "secaoManutencao",
      "priority": "main",
      "purpose": "Concentra o cadastro de um item novo e a atualização de nome e preço vigente do item selecionado.",
      "organisms": [
        "formularioItemCardapio"
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
        "preferred": "groupviewdata--ml-card-grid",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "formularioItemCardapio": [
      {
        "role": "enterText",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
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
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
