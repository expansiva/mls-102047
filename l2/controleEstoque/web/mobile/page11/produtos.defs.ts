/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/inventoryControl/page21.md",
    "experience": "splitViewOperations"
  },
  "intent": "Ajudar o estoquista, em conteúdo estreito e fluido em torno de 390px e ainda usável em 360px e 430px, a ver primeiro os avisos de saldo baixo, conferir saldos, localizar e consultar produtos e cadastrar um novo item com quantidade mínima.",
  "sections": [
    {
      "id": "visaoEstoque",
      "priority": "primary",
      "purpose": "Empilhar em coluna estreita e fluida os avisos de saldo abaixo do mínimo e, em seguida, o panorama de saldos, cabendo em cerca de 390px e permanecendo usável em 360px e 430px.",
      "organisms": [
        "alertasSaldoBaixo",
        "saldosResumo"
      ]
    },
    {
      "id": "consultaItens",
      "priority": "main",
      "purpose": "Seguir na mesma coluna fluida com a lista para localizar o produto e o detalhe com saldo e mínimo, sem grade fixa.",
      "organisms": [
        "listaProdutos",
        "detalheProduto"
      ]
    },
    {
      "id": "novoProduto",
      "priority": "secondary",
      "purpose": "Encerrar a coluna estreita com o formulário e a ação de cadastrar o produto e a quantidade mínima.",
      "organisms": [
        "formularioCadastro",
        "acoesCadastro"
      ]
    }
  ],
  "organisms": {
    "saldosResumo": {
      "kind": "summary",
      "text": "Mostra o saldo atual de cada produto do estoque para o estoquista enxergar rapidamente a disponibilidade na largura estreita.",
      "intents": []
    },
    "alertasSaldoBaixo": {
      "kind": "highlights",
      "text": "Destaca no topo os produtos com saldo abaixo da quantidade mínima para o estoquista priorizar a reposição no telefone.",
      "intents": []
    },
    "listaProdutos": {
      "kind": "list",
      "text": "Lista os produtos cadastrados no estoque para o estoquista localizar o item que deseja acompanhar, em leitura vertical contínua.",
      "intents": []
    },
    "detalheProduto": {
      "kind": "detail",
      "text": "Apresenta o produto escolhido, o saldo atual e a quantidade mínima para o estoquista confirmar a situação e, se precisar repor, seguir para registrar uma movimentação.",
      "intents": [
        {
          "id": "abrirMovimentacoes",
          "kind": "navigate",
          "to": "movimentacoes"
        }
      ]
    },
    "formularioCadastro": {
      "kind": "form",
      "text": "Recebe o produto, a unidade de medida e a quantidade mínima para iniciar o acompanhamento do estoque no fluxo estreito.",
      "intents": []
    },
    "acoesCadastro": {
      "kind": "actions",
      "text": "Confirma o cadastro do produto no estoque com a quantidade mínima informada.",
      "intents": [
        {
          "id": "cadastrarProduto",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "saldosResumo": [
      {
        "role": "display",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "alertasSaldoBaixo": [
      {
        "role": "display",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "listaProdutos": [
      {
        "role": "display",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "detalheProduto": [
      {
        "role": "record",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "metric",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "formularioCadastro": [
      {
        "role": "quantity",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
      }
    ],
    "acoesCadastro": [
      {
        "role": "action",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ]
  }
} as const;
