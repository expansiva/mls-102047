/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/mobile/page11/contratos_locacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "No celular, em conteúdo fluido estreito (referência de 390px, utilizável entre 360px e 430px), o atendente busca o contrato, confere atraso e multa e confirma ou registra a devolução em sequência vertical; a abertura de novo contrato fica como etapa própria abaixo.",
  "sections": [
    {
      "id": "localizarContratos",
      "priority": "primary",
      "purpose": "Buscar o contrato pelo número ou cliente e ver em lista compacta quais estão em atraso e quantos equipamentos têm.",
      "organisms": [
        "listaContratos"
      ]
    },
    {
      "id": "contratoSelecionado",
      "priority": "main",
      "purpose": "Ler primeiro a multa e os dias de atraso, depois os itens, e ter logo em seguida as ações de confirmar ou registrar a devolução.",
      "organisms": [
        "conferenciaContrato",
        "acoesContrato"
      ]
    },
    {
      "id": "abrirContrato",
      "priority": "secondary",
      "purpose": "Montar um novo contrato passo a passo em coluna única: cliente, período, equipamentos e itens.",
      "organisms": [
        "novoContrato"
      ]
    }
  ],
  "organisms": {
    "listaContratos": {
      "kind": "list",
      "text": "Contratos pesquisáveis pelo número ou pelo cliente, em linhas compactas com situação, quantidade de equipamentos e destaque de atraso, para chegar rápido ao contrato certo.",
      "intents": []
    },
    "novoContrato": {
      "kind": "form",
      "text": "Novo contrato em coluna única: localizar o cliente, informar retirada e devolução prevista, buscar equipamentos disponíveis e adicionar cada item com a diária, vendo dias e valor previstos.",
      "intents": [
        {
          "id": "abrirContrato",
          "kind": "submit"
        },
        {
          "id": "adicionarItem",
          "kind": "submit"
        },
        {
          "id": "verEquipamentos",
          "kind": "navigate",
          "to": "equipamentos"
        }
      ]
    },
    "conferenciaContrato": {
      "kind": "detail",
      "text": "Conferência do contrato com o valor total da multa em destaque, seguido de cliente, período, data real de devolução e itens com dias de atraso e multa de cada um.",
      "intents": []
    },
    "acoesContrato": {
      "kind": "actions",
      "text": "Confirmar o contrato em elaboração ou registrar a devolução com a data real, conferindo em seguida os dias de atraso e a multa calculada para informar o cliente.",
      "intents": [
        {
          "id": "confirmarContrato",
          "kind": "submit"
        },
        {
          "id": "registrarDevolucao",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "listaContratos": [
      {
        "role": "Busca por número do contrato ou nome do cliente",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-history"
      },
      {
        "role": "Filtro para mostrar só contratos em atraso",
        "preferred": "groupenterboolean--ml-toggle-switch",
        "alternative": "groupenterboolean--ml-boolean-segmented"
      },
      {
        "role": "Lista de contratos adaptada a tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "novoContrato": [
      {
        "role": "Localizar e escolher o cliente",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Período de retirada e devolução prevista",
        "preferred": "groupenterdateinterval--ml-date-interval-drag",
        "alternative": "groupenterdateinterval--ml-date-interval-presets"
      },
      {
        "role": "Busca de equipamentos por código ou descrição",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Escolha do equipamento disponível",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select-one-autocomplete"
      },
      {
        "role": "Diária praticada do item",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "Itens adicionados com dias e valor previstos",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Abrir contrato e adicionar item",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "conferenciaContrato": [
      {
        "role": "Valor total da multa e dias de atraso",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Resumo do cliente, situação e período",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Itens com dias de atraso e multa por item",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "acoesContrato": [
      {
        "role": "Data real de devolução",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "Confirmar contrato ou registrar devolução",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "Multa calculada após a devolução",
        "preferred": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Resultado da confirmação ou da devolução",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
