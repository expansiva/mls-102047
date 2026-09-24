export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Resume o produto consultado no aviso, destacando o saldo atual e o saldo mínimo disponíveis no resultado para que o estoquista confirme a condição de saldo baixo. Enquanto a consulta é carregada, comunica o andamento; se não houver produto correspondente, informa a ausência de resultado; se falhar, expõe uma mensagem de erro compreensível. As informações e mudanças de estado devem permanecer legíveis por tecnologias assistivas.",
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
        "reason": "A consulta do produto fornece os valores de saldo atual e mínimo que precisam de leitura destacada para confirmação da situação."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A consulta possui estado de carregamento de duração não determinada."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A consulta possui estado de erro que exige retorno acessível e contextual."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Apresenta as movimentações registradas do produto para acompanhar a origem do saldo atual, priorizando as informações de cada movimentação retornadas pela consulta. Permite informar os critérios disponíveis, inclusive a página quando aplicável, e consultar os resultados. Indica carregamento, ausência de movimentações e erro da consulta, com rótulos claros e atualização anunciável para leitores de tela.",
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
        "reason": "As movimentações são registros relacionados por ocorrência e podem ser acompanhadas em sequência."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A consulta de movimentações declara estado de carregamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A consulta declara estado de erro."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Mostra os produtos retornados na consulta cujo saldo atual pode ser confrontado com o saldo mínimo, permitindo ao estoquista identificar o item avisado e confirmar o alerta de saldo baixo. Permite informar os critérios declarados, inclusive a página quando aplicável, e consultar os resultados. Explica carregamento, resultado vazio e falha sem ocultar o conteúdo já compreensível, mantendo nomes, valores e mensagens disponíveis a leitores de tela.",
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
        "reason": "A consulta retorna uma coleção de produtos e cada registro precisa expor saldo atual e saldo mínimo para inspeção."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A consulta de produtos declara estado de carregamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A consulta de produtos declara estado de erro."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Reúne os itens de estoque que demandam atenção na consulta do produto avisado, com foco em tornar explícita a diferença entre saldo atual e saldo mínimo. Permite informar os critérios declarados, inclusive a página quando necessário, e consultar os resultados sem alterar os dados. Comunica carregamento, nenhuma pendência encontrada e erro de forma acessível, com foco e rótulos que apoiam uso por teclado.",
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
        "reason": "Os itens de atenção são produtos retornados pela consulta e precisam ser lidos como registros individuais."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A consulta possui estado de carregamento declarado."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A consulta possui estado de erro declarado."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "controle_estoque_inicio__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/controleEstoque/web/desktop/page11/controle_estoque_inicio.defs.ts",
    "outputPath": "l2/controleEstoque/web/desktop/page11/controle_estoque_inicio.ts",
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
