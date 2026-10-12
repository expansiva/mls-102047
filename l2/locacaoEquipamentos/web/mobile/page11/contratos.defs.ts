/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/mobile/page11/contratos.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "No celular, em conteúdo fluido estreito (referência de 390px, usável de 360px a 430px), o atendente encontra o contrato e vê os atrasos primeiro, confere valores e multa, confirma ou registra a devolução, e monta um novo contrato em blocos empilhados.",
  "sections": [
    {
      "id": "localizarContratos",
      "priority": "primary",
      "purpose": "Pesquisar o contrato pelo número ou cliente e enxergar os atrasos em uma lista compacta, de leitura vertical.",
      "organisms": [
        "listaContratos"
      ]
    },
    {
      "id": "conferirContrato",
      "priority": "main",
      "purpose": "Ler o resumo do contrato com valor previsto, dias de atraso e multa em destaque, seguido dos itens e das ações de confirmar ou registrar a devolução.",
      "organisms": [
        "conferenciaContrato",
        "acoesContrato"
      ]
    },
    {
      "id": "montarContrato",
      "priority": "secondary",
      "purpose": "Montar um novo contrato em passos empilhados: cliente, período, busca de equipamentos e inclusão dos itens.",
      "organisms": [
        "novoContrato"
      ]
    }
  ],
  "organisms": {
    "listaContratos": {
      "kind": "list",
      "text": "Pesquise os contratos pelo número ou pelo cliente e veja quais estão em atraso, com situação e data prevista de devolução em cada linha, para abrir o contrato com um toque.",
      "intents": []
    },
    "novoContrato": {
      "kind": "form",
      "text": "Novo contrato: escolha o cliente, informe o período, pesquise os equipamentos pelo código ou descrição, confira a situação e o valor da diária e adicione os itens.",
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
      "text": "Confira o contrato: cliente, período, itens, dias contratados, valor previsto, dias de atraso e multa por atraso, com os valores principais no topo.",
      "intents": []
    },
    "acoesContrato": {
      "kind": "actions",
      "text": "Confirme o contrato em elaboração ou informe a data real de devolução para encerrar o contrato vigente e calcular a multa por atraso.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-history"
      },
      {
        "role": "Mostrar somente contratos em atraso",
        "preferred": "groupenterboolean--ml-toggle-switch",
        "alternative": "groupenterboolean--ml-boolean-segmented"
      },
      {
        "role": "Lista de contratos em tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
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
        "preferred": "groupenterdateinterval--ml-date-interval-drag"
      },
      {
        "role": "Pesquisa de equipamentos por código ou descrição",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Equipamentos encontrados e itens adicionados",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Criar contrato e adicionar item",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "conferenciaContrato": [
      {
        "role": "Valor previsto, dias de atraso e multa",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Cliente e período do contrato",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Itens do contrato",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "acoesContrato": [
      {
        "role": "Data real de devolução",
        "preferred": "groupenterdate--ml-date-shortcut-picker",
        "alternative": "groupenterdate--ml-date-picker"
      },
      {
        "role": "Confirmar contrato e registrar devolução",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "Resultado da confirmação ou da devolução",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
