/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/desktop/page11/contratos_locacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Permitir ao atendente localizar contratos de locação, abrir um novo contrato com os equipamentos do cliente, conferir itens, atrasos e multa e conduzir o contrato da confirmação até a devolução; o gerente consulta os mesmos contratos para acompanhar atrasos.",
  "sections": [
    {
      "id": "localizarContratos",
      "priority": "primary",
      "purpose": "Encontrar rapidamente um contrato pelo número ou pelo cliente e enxergar de imediato quais estão em atraso e quantos equipamentos cada um tem.",
      "organisms": [
        "listaContratos"
      ]
    },
    {
      "id": "contratoSelecionado",
      "priority": "main",
      "purpose": "Conferir o contrato escolhido — cliente, período, itens, dias de atraso e multa — e executar a confirmação ou a devolução ao lado dessa conferência.",
      "organisms": [
        "conferenciaContrato",
        "acoesContrato"
      ]
    },
    {
      "id": "abrirContrato",
      "priority": "secondary",
      "purpose": "Montar um novo contrato: escolher o cliente, informar o período, consultar equipamentos disponíveis e incluir os itens com dias e valor previstos.",
      "organisms": [
        "novoContrato"
      ]
    }
  ],
  "organisms": {
    "listaContratos": {
      "kind": "list",
      "text": "Contratos de locação pesquisáveis pelo número ou pelo nome do cliente, mostrando situação, período, quantidade de equipamentos e destaque para os que estão em atraso, para que o atendente chegue ao contrato certo e priorize os atrasados.",
      "intents": []
    },
    "novoContrato": {
      "kind": "form",
      "text": "Abertura de contrato: localizar o cliente, informar data de retirada e data prevista de devolução, buscar equipamentos disponíveis pelo código ou descrição e adicionar cada um com a diária praticada, vendo dias e valor previstos de cada item.",
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
      "text": "Conferência do contrato: cliente, situação, data de retirada, data prevista e data real de devolução, itens com equipamento, diária, dias e valor previstos, dias de atraso e multa por item, e o valor total da multa a informar ao cliente.",
      "intents": []
    },
    "acoesContrato": {
      "kind": "actions",
      "text": "Confirmar o contrato em elaboração para que os equipamentos passem a constar como locados; ou registrar a devolução informando a data real e conferir os dias de atraso e a multa calculada.",
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
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Filtro para mostrar só contratos em atraso",
        "preferred": "groupenterboolean--ml-toggle-switch",
        "alternative": "groupenterboolean--ml-checkbox-preference"
      },
      {
        "role": "Tabela de contratos com atraso e quantidade de equipamentos",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
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
        "preferred": "groupenterdateinterval--ml-date-range-dual-calendar",
        "alternative": "groupenterdateinterval--ml-date-interval-presets"
      },
      {
        "role": "Busca de equipamentos por código ou descrição",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Escolha do equipamento comparando situação e diária",
        "preferred": "groupselectone--ml-table-single-select",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Diária praticada do item",
        "preferred": "groupentermoney--ml-enter-money-br",
        "alternative": "groupentermoney--ml-currency-input"
      },
      {
        "role": "Itens já adicionados com dias e valor previstos",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "Abrir contrato e adicionar item",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ],
    "conferenciaContrato": [
      {
        "role": "Resumo do cliente, situação e período",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Valor total da multa e dias de atraso",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Itens com dias de atraso e multa por item",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "acoesContrato": [
      {
        "role": "Data real de devolução",
        "preferred": "groupenterdate--ml-date-picker",
        "alternative": "groupenterdate--ml-date-shortcut-picker"
      },
      {
        "role": "Confirmar contrato e registrar devolução",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Multa calculada após a devolução",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Resultado da confirmação ou da devolução",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
