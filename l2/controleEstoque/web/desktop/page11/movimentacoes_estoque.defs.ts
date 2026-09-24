export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite ao estoquista consultar movimentações de estoque, identificando data, produto, tipo e quantidade. A consulta usa os critérios disponíveis de identificação, produto, data e página. Durante o carregamento, informa o andamento; se não houver movimentações, comunica o estado vazio; se houver falha, apresenta o erro da consulta de modo compreensível. Os dados e o estado da consulta devem ter rótulos claros e permanecer acessíveis por teclado e tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMovimentacaoEstoque",
      "setListMovimentacaoEstoqueId",
      "setListMovimentacaoEstoqueProdutoId",
      "setListMovimentacaoEstoqueOccurredAt",
      "setListMovimentacaoEstoquePage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção estruturada de movimentações para leitura comparável, e a própria capacidade de apresentação tabular contempla paginação."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Exibe as informações do produto relacionado à movimentação para apoiar a conferência do saldo atual e do saldo mínimo configurado. Enquanto o produto é consultado, informa o carregamento; se não houver resultado, comunica a ausência; se a consulta falhar, apresenta o erro sem sugerir alteração do registro. As informações devem usar nomes claros e ser anunciadas corretamente a tecnologias assistivas.",
    "contentRef": "produto",
    "capabilityRefs": [
      "listProduto",
      "setListProdutoId",
      "setListProdutoDetails"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A consulta do produto fornece informações para leitura de seus dados relacionados."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta os dados obrigatórios para registrar uma entrada ou saída: produto, data da ocorrência, detalhes, tipo de movimentação e quantidade. Permite consultar e selecionar o produto antes do envio. Cada campo deve informar rótulo, obrigatoriedade e erro de validação de forma acessível. Durante o registro, informa o processamento e evita reenvio; ao concluir, comunica sucesso; em falha, apresenta o erro para correção e nova tentativa. O registro permanece definitivo depois de realizado.",
    "contentRef": "createMovimentacaoEstoque",
    "capabilityRefs": [
      "listProduto",
      "setCreateMovimentacaoEstoqueProdutoId",
      "setCreateMovimentacaoEstoqueOccurredAt",
      "setCreateMovimentacaoEstoqueDetails",
      "setCreateMovimentacaoEstoqueDetailsMovementType",
      "setCreateMovimentacaoEstoqueDetailsQuantity",
      "createMovimentacaoEstoque"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-combobox",
          "groupselectone--ml-radio-group"
        ],
        "reason": "O produto é uma seleção única após consulta, e o tipo de movimentação também exige uma única escolha."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-date-picker"
        ],
        "reason": "A data da ocorrência é um dado obrigatório informado pelo usuário."
      },
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Os detalhes recebem texto livre obrigatório."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-input"
        ],
        "reason": "A quantidade é um valor numérico obrigatório."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O comando cria o registro definitivo da movimentação."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "Os estados de sucesso e erro do comando precisam ser comunicados ao usuário."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza o comando para registrar a movimentação de entrada ou saída com os dados preenchidos. A ação deve ter nome acessível, indicar o processamento e evitar acionamentos duplicados durante o envio. Ao término, comunica sucesso ou erro e atualiza as consultas de movimentações e produtos para refletir o resultado.",
    "contentRef": "createMovimentacaoEstoque",
    "capabilityRefs": [
      "createMovimentacaoEstoque",
      "listMovimentacaoEstoque",
      "listProduto"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "A criação da movimentação é um comando primário explícito."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O comando possui estados de sucesso e erro que exigem retorno acessível."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "movimentacoes_estoque__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/controleEstoque/web/desktop/page11/movimentacoes_estoque.defs.ts",
    "outputPath": "l2/controleEstoque/web/desktop/page11/movimentacoes_estoque.ts",
    "dependsFiles": [
      "l2/controleEstoque/web/shared/movimentacoes_estoque.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "movimentacoes_estoque__l2_shared"
    ],
    "categoryRef": "inventoryControl",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/inventoryControl.md",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/groupenterdate/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDate/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;
