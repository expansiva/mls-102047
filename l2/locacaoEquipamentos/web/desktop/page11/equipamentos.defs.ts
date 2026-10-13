/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/desktop/page11/equipamentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/assetManagement/page21.md",
    "experience": "assetRegistry"
  },
  "intent": "Permitir que o atendente e o gerente encontrem equipamentos pelo código ou pela descrição e vejam se cada um está disponível, locado ou em manutenção, com o valor da diária e o contrato atual. Assim fica claro o que pode ser incluído em um novo contrato de locação.",
  "sections": [
    {
      "id": "localizarEquipamentos",
      "priority": "primary",
      "purpose": "Busca e lista de equipamentos com a situação atual e o valor da diária, para saber rapidamente o que está livre para locar.",
      "organisms": [
        "listaEquipamentos"
      ]
    },
    {
      "id": "equipamentoSelecionado",
      "priority": "main",
      "purpose": "Detalhe do equipamento escolhido: situação atual, se está locado e em qual contrato, com o cliente e o período.",
      "organisms": [
        "detalheEquipamento",
        "cadastroEquipamento"
      ]
    },
    {
      "id": "acoesEquipamento",
      "priority": "secondary",
      "purpose": "Atalhos para seguir com a locação: abrir um novo contrato com o equipamento ou consultar o contrato em que ele está.",
      "organisms": [
        "acoesEquipamentos"
      ]
    }
  ],
  "organisms": {
    "listaEquipamentos": {
      "kind": "list",
      "text": "Busca de equipamentos pelo código ou pela descrição, mostrando a situação atual (disponível, locado ou em manutenção) e o valor da diária de cada um.",
      "intents": []
    },
    "detalheEquipamento": {
      "kind": "detail",
      "text": "Ficha do equipamento selecionado: código, descrição, situação atual, se está locado e o contrato atual, com o número, o cliente e o período da locação.",
      "intents": [
        {
          "id": "abrirContratoAtual",
          "kind": "navigate",
          "to": "contratos_locacao"
        }
      ]
    },
    "cadastroEquipamento": {
      "kind": "form",
      "text": "Dados cadastrais do equipamento: código, descrição, valor da diária e situação cadastral (disponível ou em manutenção). Equipamento em manutenção não pode ser locado.",
      "intents": []
    },
    "acoesEquipamentos": {
      "kind": "actions",
      "text": "Abrir um novo contrato de locação para incluir equipamentos disponíveis ou voltar ao painel com os totais por situação.",
      "intents": [
        {
          "id": "novoContratoComEquipamento",
          "kind": "navigate",
          "to": "contratos_locacao"
        },
        {
          "id": "verPainelSituacao",
          "kind": "navigate",
          "to": "painel_locacao"
        }
      ]
    }
  },
  "molecules": {
    "listaEquipamentos": [
      {
        "role": "busca por código ou descrição",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "tabela de equipamentos com situação e diária",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "detalheEquipamento": [
      {
        "role": "cartão do equipamento e contrato atual",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "cadastroEquipamento": [
      {
        "role": "código e descrição",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "valor da diária",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "situação cadastral",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-radio-group"
      }
    ],
    "acoesEquipamentos": [
      {
        "role": "abrir novo contrato",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "aviso sobre equipamento indisponível",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
