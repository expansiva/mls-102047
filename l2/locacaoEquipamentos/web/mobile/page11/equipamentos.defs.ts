/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/mobile/page11/equipamentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/assetManagement/page21.md",
    "experience": "assetRegistry"
  },
  "intent": "No celular, em uma coluna fluida de cerca de 390px (também usável entre 360px e 430px), localizar o equipamento, ver sua situação e o contrato vigente e enviar ou retornar da manutenção; o cadastro fica abaixo.",
  "sections": [
    {
      "id": "localizacao",
      "priority": "primary",
      "purpose": "Pesquisar o equipamento e filtrar por situação em uma lista compacta, fácil de tocar.",
      "organisms": [
        "listaEquipamentos"
      ]
    },
    {
      "id": "fichaEquipamento",
      "priority": "main",
      "purpose": "Ver em sequência a situação, a diária, o contrato vigente e a devolução prevista, com as ações de manutenção logo abaixo.",
      "organisms": [
        "detalheEquipamento",
        "acoesManutencao"
      ]
    },
    {
      "id": "cadastro",
      "priority": "secondary",
      "purpose": "Cadastrar ou corrigir os dados do equipamento em campos empilhados.",
      "organisms": [
        "dadosEquipamento"
      ]
    }
  ],
  "organisms": {
    "listaEquipamentos": {
      "kind": "list",
      "text": "Pesquise os equipamentos pelo código ou descrição e filtre por situação: disponível, locado ou em manutenção.",
      "intents": []
    },
    "detalheEquipamento": {
      "kind": "detail",
      "text": "Veja o equipamento: situação atual, valor da diária, contrato vigente e data prevista de devolução.",
      "intents": []
    },
    "dadosEquipamento": {
      "kind": "form",
      "text": "Cadastre e altere os dados dos equipamentos: código, descrição e valor da diária.",
      "intents": []
    },
    "acoesManutencao": {
      "kind": "actions",
      "text": "Envie para manutenção um equipamento disponível sem contrato vigente e retorne-o da manutenção quando o conserto terminar.",
      "intents": [
        {
          "id": "enviarManutencao",
          "kind": "submit"
        },
        {
          "id": "retornarManutencao",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "listaEquipamentos": [
      {
        "role": "Pesquisa por código ou descrição",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Filtro de situação",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "Lista de equipamentos",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "detalheEquipamento": [
      {
        "role": "Ficha do equipamento",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Valor da diária em destaque",
        "preferred": "groupviewmetric--ml-metric-card"
      }
    ],
    "dadosEquipamento": [
      {
        "role": "Código e descrição",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Valor da diária",
        "preferred": "groupentermoney--ml-enter-money-br"
      },
      {
        "role": "Aviso de validação",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "acoesManutencao": [
      {
        "role": "Enviar ou retornar da manutenção",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Resultado da ação",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
