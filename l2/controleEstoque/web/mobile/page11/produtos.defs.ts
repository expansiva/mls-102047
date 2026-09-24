export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite ao estoquista localizar produtos e prioriza a leitura de nome, saldo atual, saldo mínimo e aviso de saldo baixo em uma sequência compacta. A consulta informa carregamento, ausência de produtos e falha; os critérios e a definição da página de resultados continuam disponíveis ao toque e por teclado. Rótulos, foco visível e anúncios de atualização tornam a interação acessível.",
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
          "groupviewtable--ml-responsive-table"
        ],
        "reason": "Os dados estruturados dos produtos precisam continuar consultáveis em tela estreita."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta de forma prioritária os dados do produto consultado, saldo atual, saldo mínimo e situação de saldo baixo para confirmação rápida da disponibilidade. Informa carregamento, ausência de resultado e erro da consulta. O conteúdo deve seguir uma ordem de leitura clara, com rótulos anunciados por tecnologias assistivas, e os critérios disponíveis continuam acessíveis ao toque e teclado.",
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
    "description": "Permite cadastrar um produto em sequência de leitura adequada a tela reduzida, com nome, código do país, unidade de medida e saldo mínimo obrigatório. Os campos devem expor rótulos, obrigatoriedade e mensagens de erro acessíveis. O envio comunica processamento, sucesso ou falha e preserva dados digitados para correção após erro.",
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
          "groupenternumber--ml-number-stepper"
        ],
        "reason": "O saldo mínimo é uma entrada numérica obrigatória adequada a ajuste por toque."
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
    "description": "Disponibiliza, sem remover capacidades, o cadastro de produto e o registro de entrada ou saída para o produto selecionado. No registro, coleta produto, ocorrência, tipo e quantidade com rótulos e obrigatoriedade anunciados; controles de toque devem ter identificação clara. Durante o envio, informa processamento e evita repetição; após concluir, comunica sucesso ou erro. A movimentação registrada permanece imutável.",
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
          "groupselectone--ml-select-dropdown"
        ],
        "reason": "Produto e tipo de movimentação requerem uma única escolha com uso econômico do espaço."
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
          "groupenternumber--ml-number-stepper"
        ],
        "reason": "A quantidade movimentada é uma entrada numérica obrigatória adequada a toque."
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
    "description": "Permite acompanhar, em leitura sequencial adequada ao celular, as movimentações consultadas para o produto e a situação dos avisos de saldo baixo no seu contexto. Informa carregamento, histórico vazio e falha de consulta. Mantém critérios e definição de página disponíveis ao toque e teclado; cada evento deve ter data e informações anunciadas de modo acessível, sem permitir alterar o histórico.",
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
    "id": "produtos__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/controleEstoque/web/mobile/page11/produtos.defs.ts",
    "outputPath": "l2/controleEstoque/web/mobile/page11/produtos.ts",
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
