export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite ao estoquista consultar movimentações de estoque com prioridade para data, produto, tipo e quantidade em leitura sequencial adequada a telas menores. Mantém os critérios disponíveis de identificação, produto, data e página. Durante o carregamento, informa o andamento; se não houver movimentações, comunica o estado vazio; se a consulta falhar, apresenta o erro de modo compreensível. A interação por toque deve também funcionar por teclado, com rótulos e estado da consulta anunciados a tecnologias assistivas.",
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
          "groupviewtable--ml-responsive-data-table"
        ],
        "reason": "A coleção estruturada de movimentações precisa continuar legível em telas estreitas, com suporte de paginação da apresentação tabular."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta os dados do produto relacionado à movimentação com prioridade para o saldo atual e o saldo mínimo configurado. Durante a consulta, comunica carregamento, ausência de resultado ou erro sem disponibilizar alteração do registro. As informações devem ser claras ao toque e corretamente anunciadas por leitor de tela.",
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
        "reason": "Os dados consultados do produto podem ser apresentados em leitura vertical adequada ao espaço reduzido."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite registrar uma entrada ou saída preenchendo produto, data da ocorrência, detalhes, tipo e quantidade, com prioridade para os campos obrigatórios e interação por toque. Mantém a consulta e a seleção do produto. Cada campo comunica rótulo, obrigatoriedade e erro de validação; durante o envio, informa o processamento e impede duplicidade; ao final, anuncia sucesso ou erro para correção e nova tentativa. O registro permanece definitivo depois de realizado.",
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
          "groupselectone--ml-select-one-autocomplete",
          "groupselectone--ml-segmented-control"
        ],
        "reason": "A seleção de produto pode exigir localização, e o tipo de movimentação é uma escolha única."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-compact-calendar"
        ],
        "reason": "A data da ocorrência é obrigatória e deve ser informada de forma acessível em espaço restrito."
      },
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Os detalhes são texto livre obrigatório."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-stepper"
        ],
        "reason": "A quantidade é numérica e pode ser ajustada por toque ou teclado."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O comando de criação precisa de acionamento explícito."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "Erros e sucesso do envio devem ser percebidos sem perder o contexto do preenchimento."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece o acionamento para registrar a movimentação preenchida, com nome acessível e interação por toque clara. Informa quando o registro está sendo enviado, evita acionamento repetido, anuncia sucesso e apresenta erro caso a operação falhe. Quando concluída, a ação atualiza as consultas de movimentações e produtos para refletir o resultado.",
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
        "reason": "O registro da movimentação é um comando primário."
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
    "id": "movimentacoes_estoque__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/controleEstoque/web/mobile/page11/movimentacoes_estoque.defs.ts",
    "outputPath": "l2/controleEstoque/web/mobile/page11/movimentacoes_estoque.ts",
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
