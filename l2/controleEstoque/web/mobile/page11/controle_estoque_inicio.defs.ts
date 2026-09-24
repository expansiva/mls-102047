export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Prioriza a confirmação rápida do produto avisado, exibindo de forma concisa o saldo atual e o saldo mínimo retornados pela consulta. Durante o carregamento, informa o andamento; sem produto, informa que não houve resultado; em falha, apresenta erro compreensível. A leitura e as atualizações devem ser anunciáveis por tecnologias assistivas e utilizáveis por toque.",
    "contentRef": "consultarProdutoAvisado",
    "capabilityRefs": [
      "listProduto"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-big-number",
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "Os valores de saldo atual e mínimo retornados pela consulta devem receber prioridade de leitura no espaço reduzido."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A consulta possui carregamento sem duração conhecida."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A consulta possui estado de erro a comunicar de modo acessível."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Permite acompanhar por toque as movimentações registradas do produto, preservando a ordem das ocorrências e as informações retornadas para entender o saldo atual. Mantém disponíveis os critérios declarados, inclusive a página quando aplicável, para consultar os resultados. Comunica carregamento, lista sem movimentações e erro de maneira breve, com rótulos e atualizações acessíveis.",
    "contentRef": "base",
    "capabilityRefs": [
      "setListMovimentacaoEstoqueId",
      "setListMovimentacaoEstoqueProdutoId",
      "setListMovimentacaoEstoqueOccurredAt",
      "setListMovimentacaoEstoquePage",
      "listMovimentacaoEstoque"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-timeline-view"
        ],
        "reason": "A sequência de movimentações retornada pela consulta é adequada para acompanhamento temporal em leitura móvel."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A consulta de movimentações possui estado de carregamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A consulta de movimentações possui estado de erro."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Dá prioridade aos produtos cujo saldo atual deve ser comparado ao saldo mínimo, permitindo identificar e confirmar o item do aviso em uma leitura curta. Mantém disponíveis os critérios declarados, inclusive a página quando aplicável, para consultar os resultados por toque. Informa claramente carregamento, ausência de produtos e erro, com nomes e valores acessíveis a leitores de tela.",
    "contentRef": "consultarProdutoAvisado",
    "capabilityRefs": [
      "setListProdutoId",
      "setListProdutoDetails",
      "setListProdutoPage",
      "listProduto"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Uma lista de registros favorece a leitura sequencial dos produtos e de seus saldos em telas estreitas."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A consulta de produtos declara carregamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A consulta de produtos declara erro."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Lista para leitura prioritária os itens retornados que exigem atenção por saldo baixo, deixando clara a comparação entre saldo atual e mínimo. O estoquista pode informar os critérios declarados, inclusive a página quando necessária, e consultar os produtos por toque, sem modificar registros. Carregamento, nenhuma pendência e erro são comunicados de forma acessível e objetiva.",
    "contentRef": "consultarProdutoAvisado",
    "capabilityRefs": [
      "setListProdutoId",
      "setListProdutoDetails",
      "setListProdutoPage",
      "listProduto"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Os produtos que demandam atenção são resultados individuais e precisam de leitura vertical e escaneável no celular."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A consulta possui estado de carregamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A consulta possui estado de erro."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "controle_estoque_inicio__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/controleEstoque/web/mobile/page11/controle_estoque_inicio.defs.ts",
    "outputPath": "l2/controleEstoque/web/mobile/page11/controle_estoque_inicio.ts",
    "dependsFiles": [
      "l2/controleEstoque/web/shared/controle_estoque_inicio.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "controle_estoque_inicio__l2_shared"
    ],
    "categoryRef": "inventoryControl",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/inventoryControl.md",
      "_102040_/l2/molecules/groupviewmetric/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts"
    ]
  }
] as const;
