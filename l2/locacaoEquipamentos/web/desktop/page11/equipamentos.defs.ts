/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/desktop/page11/equipamentos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/assetManagement/page21.md",
    "experience": "assetRegistry"
  },
  "intent": "Acompanhar todos os equipamentos da locadora, saber quais estão disponíveis, locados ou em manutenção, consultar o contrato vigente e a data prevista de devolução, manter o cadastro e enviar ou retornar equipamentos da manutenção.",
  "sections": [
    {
      "id": "localizacao",
      "priority": "primary",
      "purpose": "Encontrar rapidamente o equipamento pelo código ou descrição e enxergar a situação de cada um.",
      "organisms": [
        "listaEquipamentos"
      ]
    },
    {
      "id": "fichaEquipamento",
      "priority": "main",
      "purpose": "Conferir a situação atual do equipamento escolhido, com o contrato vigente e a devolução prevista, e agir sobre a manutenção.",
      "organisms": [
        "detalheEquipamento",
        "acoesManutencao"
      ]
    },
    {
      "id": "cadastro",
      "priority": "secondary",
      "purpose": "Cadastrar novos equipamentos e corrigir os dados dos existentes.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Filtro de situação",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Tabela de equipamentos",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "detalheEquipamento": [
      {
        "role": "Ficha do equipamento",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Valor da diária em destaque",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "dadosEquipamento": [
      {
        "role": "Código e descrição",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "Valor da diária",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "Aviso de validação",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "acoesManutencao": [
      {
        "role": "Enviar ou retornar da manutenção",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "Resultado da ação",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
