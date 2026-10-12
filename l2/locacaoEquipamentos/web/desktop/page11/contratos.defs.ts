/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/desktop/page11/contratos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Permitir ao atendente localizar contratos de locação e ver os que estão em atraso, montar um novo contrato com cliente, período e equipamentos, conferir valores, dias de atraso e multa, e confirmar o contrato ou registrar a devolução sem sair da página.",
  "sections": [
    {
      "id": "localizarContratos",
      "priority": "primary",
      "purpose": "Encontrar rapidamente o contrato pelo número ou pelo cliente e identificar de imediato quais estão em atraso.",
      "organisms": [
        "listaContratos"
      ]
    },
    {
      "id": "conferirContrato",
      "priority": "main",
      "purpose": "Conferir o contrato escolhido com cliente, período, itens, valor previsto, dias de atraso e multa, e agir sobre ele: confirmar a locação ou registrar a data real de devolução.",
      "organisms": [
        "conferenciaContrato",
        "acoesContrato"
      ]
    },
    {
      "id": "montarContrato",
      "priority": "secondary",
      "purpose": "Montar um novo contrato: escolher o cliente, informar o período e incluir os equipamentos conferindo situação e valor da diária.",
      "organisms": [
        "novoContrato"
      ]
    }
  ],
  "organisms": {
    "listaContratos": {
      "kind": "list",
      "text": "Pesquise os contratos pelo número ou pelo cliente e veja quais estão em atraso, com situação, data de retirada, data prevista de devolução e dias de atraso, para abrir o contrato certo na conferência.",
      "intents": []
    },
    "novoContrato": {
      "kind": "form",
      "text": "Novo contrato: escolha o cliente, informe o período de retirada e devolução prevista, pesquise os equipamentos pelo código ou descrição, confira a situação e o valor da diária e adicione os itens ao contrato.",
      "intents": [
        {
          "id": "criarContrato",
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
      "text": "Confira o contrato: número, situação, cliente, período, itens com equipamento e diária praticada, dias contratados, valor previsto, data real de devolução, dias de atraso e multa por atraso para informar ao cliente.",
      "intents": []
    },
    "acoesContrato": {
      "kind": "actions",
      "text": "Confirme o contrato em elaboração para torná-lo vigente, ou informe a data real de devolução de um contrato vigente para encerrá-lo e calcular a multa quando houver atraso.",
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
        "role": "Pesquisa por número do contrato ou cliente",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Mostrar somente contratos em atraso",
        "preferred": "groupenterboolean--ml-toggle-switch",
        "alternative": "groupenterboolean--ml-checkbox-preference"
      },
      {
        "role": "Tabela de contratos com situação e atraso",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "novoContrato": [
      {
        "role": "Escolha do cliente",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Período de retirada e devolução prevista",
        "preferred": "groupenterdateinterval--ml-date-range-dual-calendar",
        "alternative": "groupenterdateinterval--ml-date-interval-drag"
      },
      {
        "role": "Pesquisa de equipamentos por código ou descrição",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Equipamentos encontrados e itens adicionados com situação e diária",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "Criar contrato e adicionar item",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ],
    "conferenciaContrato": [
      {
        "role": "Cabeçalho do contrato com cliente e período",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Valor previsto, dias de atraso e multa",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Itens do contrato",
        "preferred": "groupviewtable--ml-view-table",
        "alternative": "groupviewtable--ml-data-table"
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
        "role": "Resultado da confirmação ou da devolução",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
