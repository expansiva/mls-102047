/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/mobile/page11/equipamentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/assetManagement/page21.md",
    "experience": "assetRegistry"
  },
  "intent": "No celular, deixar o atendente e o gerente buscarem um equipamento e verem na hora se está disponível, locado ou em manutenção, com a diária e o contrato atual. O conteúdo fica em uma coluna fluida, pensada para cerca de 390px e que continua usável entre 360px e 430px.",
  "sections": [
    {
      "id": "localizarEquipamentos",
      "priority": "primary",
      "purpose": "Busca no topo e lista empilhada de equipamentos com a situação atual e a diária, fácil de rolar com o polegar.",
      "organisms": [
        "listaEquipamentos"
      ]
    },
    {
      "id": "equipamentoSelecionado",
      "priority": "main",
      "purpose": "Ao tocar em um equipamento, aparecem a ficha com a situação, o contrato atual e os dados cadastrais.",
      "organisms": [
        "detalheEquipamento",
        "cadastroEquipamento"
      ]
    },
    {
      "id": "acoesEquipamento",
      "priority": "secondary",
      "purpose": "Botões de largura total para abrir um novo contrato ou ir ao painel da locação.",
      "organisms": [
        "acoesEquipamentos"
      ]
    }
  ],
  "organisms": {
    "listaEquipamentos": {
      "kind": "list",
      "text": "Busca de equipamentos pelo código ou pela descrição, em uma lista compacta com a situação atual e o valor da diária.",
      "intents": []
    },
    "detalheEquipamento": {
      "kind": "detail",
      "text": "Ficha do equipamento: situação atual, se está locado e em qual contrato, com o cliente e o período da locação.",
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
      "text": "Dados cadastrais do equipamento: código, descrição, valor da diária e situação cadastral (disponível ou em manutenção).",
      "intents": []
    },
    "acoesEquipamentos": {
      "kind": "actions",
      "text": "Abrir um novo contrato de locação com equipamentos disponíveis ou ir ao painel com os totais por situação.",
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
        "alternative": "groupsearchcontent--ml-search-history"
      },
      {
        "role": "lista de equipamentos com situação e diária",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "detalheEquipamento": [
      {
        "role": "cartão do equipamento e contrato atual",
        "preferred": "groupviewcard--ml-vertical-card"
      }
    ],
    "cadastroEquipamento": [
      {
        "role": "código e descrição",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "valor da diária",
        "preferred": "groupentermoney--ml-enter-money-br"
      },
      {
        "role": "situação cadastral",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "acoesEquipamentos": [
      {
        "role": "abrir novo contrato",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "aviso sobre equipamento indisponível",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
