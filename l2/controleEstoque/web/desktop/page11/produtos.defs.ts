export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite ao estoquista localizar produtos e consultar nome, saldo atual, saldo mínimo e a indicação de saldo abaixo do mínimo. A consulta informa carregamento, ausência de produtos quando não houver resultados e falha ao consultar; os critérios disponíveis podem ser alterados e a página de resultados pode ser definida. Os resultados e controles devem ter rótulos compreensíveis, ordem de foco utilizável por teclado e estados comunicados a tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listProduto",
      "setListProdutoId",
      "setListProdutoDetailsIdentificationName",
      "setListProdutoDetailsIdentificationSubtype",
      "setListProdutoDetailsIdentificationStatus",
      "setListProdutoDetailsIdentificationCountryCode",
      "setListProdutoPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSearchContent",
        "candidates": [
          "groupsearchcontent--ml-search-filters"
        ],
        "reason": "A consulta oferece critério de nome e atualização da lista de produtos."
      },
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A lista apresenta campos estruturados de vários produtos para comparação de saldos."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta os dados disponíveis do produto consultado, incluindo saldo atual, saldo mínimo e situação de saldo baixo, para confirmar sua disponibilidade. Enquanto a consulta estiver em andamento, informa carregamento; se não houver produto correspondente, informa ausência de resultado; se ocorrer falha, apresenta o erro da consulta. As informações devem ser legíveis por leitores de tela e a consulta pode ser refinada pelos critérios disponíveis.",
    "contentRef": "base",
    "capabilityRefs": [
      "listProduto",
      "setListProdutoId",
      "setListProdutoDetailsIdentificationName"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A capacidade de consulta disponibiliza dados de produto que podem ser lidos com destaque para cada registro retornado."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite cadastrar um produto para controle de estoque, informando nome, código do país, unidade de medida e saldo mínimo obrigatório, além dos dados complementares disponíveis. Os campos obrigatórios devem anunciar sua exigência, seus rótulos e erros de validação. Ao enviar, informa processamento, sucesso ou falha do cadastro e mantém os dados acessíveis para correção quando ocorrer erro.",
    "contentRef": "createProduto",
    "capabilityRefs": [
      "setCreateProdutoDetailsIdentificationName",
      "setCreateProdutoDetailsIdentificationCountryCode",
      "setCreateProdutoDetailsProductUnitOfMeasure",
      "setCreateProdutoDetailsControleEstoqueMinimumStock",
      "createProduto"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Nome, código do país e unidade de medida são entradas textuais do cadastro."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-input"
        ],
        "reason": "O saldo mínimo é uma entrada numérica obrigatória."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O cadastro é confirmado pelo comando de criação."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O comando expõe estados de sucesso e erro que precisam ser comunicados."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece as ações para cadastrar produto e registrar uma entrada ou saída para o produto selecionado. Para a movimentação, coleta produto, data de ocorrência, tipo e quantidade, informa quais dados são obrigatórios e impede novo envio durante o processamento. Após o registro, comunica sucesso ou erro; a movimentação registrada permanece sem alteração.",
    "contentRef": "createMovimentacaoEstoque",
    "capabilityRefs": [
      "createProduto",
      "setCreateMovimentacaoEstoqueProdutoId",
      "setCreateMovimentacaoEstoqueOccurredAt",
      "setCreateMovimentacaoEstoqueDetailsMovementType",
      "setCreateMovimentacaoEstoqueDetailsQuantity",
      "createMovimentacaoEstoque"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-select"
        ],
        "reason": "Produto e tipo de movimentação requerem uma única escolha."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker"
        ],
        "reason": "A movimentação exige informar a ocorrência."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-input"
        ],
        "reason": "A quantidade movimentada é uma entrada numérica obrigatória."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Os comandos de cadastro e de registro são ações explícitas do estoquista."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "Os comandos possuem estados de processamento, sucesso e erro."
      }
    ]
  },
  {
    "organismId": "organism.timeline.1",
    "kind": "timeline",
    "description": "Permite consultar o histórico de movimentações do produto para acompanhar os registros que atualizaram seu saldo e a situação de avisos de saldo baixo apresentada no contexto do produto. Informa carregamento durante a consulta, ausência de movimentações quando não houver histórico e falha ao carregar. A consulta pode usar os critérios disponíveis e definir a página; cada evento deve ser compreensível em sequência por teclado e leitor de tela, sem oferecer alteração do histórico.",
    "contentRef": "listMovimentacaoEstoque",
    "capabilityRefs": [
      "listMovimentacaoEstoque",
      "setListMovimentacaoEstoqueId",
      "setListMovimentacaoEstoqueProdutoId",
      "setListMovimentacaoEstoqueOccurredAt",
      "setListMovimentacaoEstoquePage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-timeline-view"
        ],
        "reason": "A consulta retorna movimentações que precisam ser acompanhadas como eventos históricos."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "produtos__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/controleEstoque/web/desktop/page11/produtos.defs.ts",
    "outputPath": "l2/controleEstoque/web/desktop/page11/produtos.ts",
    "dependsFiles": [
      "l2/controleEstoque/web/shared/produtos.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "produtos__l2_shared"
    ],
    "categoryRef": "inventoryControl",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/inventoryControl.md",
      "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts"
    ]
  }
] as const;
