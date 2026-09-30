/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-29-agent-defs-l2-definition-v1",
  "artifactType": "page11",
  "pageId": "movimentacoes",
  "device": "mobile",
  "intent": "Como estoquista, acompanho as entradas e saídas já registradas e registro uma nova movimentação de um produto para atualizar seu saldo.",
  "sharedRef": {
    "purpose": "shared interaction definition",
    "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts"
  },
  "references": [
    {
      "purpose": "project design system",
      "fileRef": "l2/designSystem.ts"
    },
    {
      "purpose": "page category inventoryControl",
      "fileRef": "_102020_/l2/agentDefsL2/skills/pageCategories/inventoryControl.md"
    },
    {
      "purpose": "technical page definition guidance",
      "fileRef": "_102020_/l2/agentDefsL2/skills/genD2Page11Definition.ts"
    },
    {
      "purpose": "selected category-catalog-entry template source",
      "fileRef": "_102020_/l4/collabux/templates/categoryList.json"
    },
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/access.defs.ts"
    },
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts"
    },
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/ontology/Produto.defs.ts"
    },
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/rules.defs.ts"
    },
    {
      "purpose": "page journey, rule, authority or ontology source",
      "fileRef": "l4/controleEstoque/workflows.defs.ts"
    }
  ],
  "presentation": {
    "categoryRef": {
      "purpose": "page category inventoryControl",
      "fileRef": "_102020_/l2/agentDefsL2/skills/pageCategories/inventoryControl.md"
    },
    "reason": "No explicit style preference; used the category guidance. Selected category guidance for page11.",
    "mobileWidthRef": {
      "purpose": "validate mobile at 390px and inspect 360px and 430px",
      "fileRef": "_102020_/l2/agentDefsL2/skills/genD2Page11Definition.ts"
    }
  },
  "organisms": [
    {
      "id": "organism.list.1",
      "kind": "list",
      "description": "Em viewport estreito, mostra cada movimentação em leitura sequencial, priorizando produto, tipo, quantidade e data e hora sem exigir rolagem horizontal. Mantém disponível a consulta do saldo atual, mínimo e indicação de saldo abaixo do mínimo do produto selecionado. Carregamento, ausência de registros ou produtos e falhas de consulta são comunicados de forma visível e acessível. Seleção e navegação funcionam por toque com alvos adequados e também por teclado.",
      "contentRef": "contentList",
      "capabilityRefs": [
        {
          "purpose": "shared action createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "actions.createMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "actions.listMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listProduto",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "actions.listProduto"
        }
      ],
      "journeyRefs": [
        {
          "purpose": "page journey registrarMovimentacaoEstoque",
          "fileRef": "l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts"
        }
      ],
      "fieldRefs": [
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListMovimentacaoEstoqueOutput.produtoId"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListMovimentacaoEstoqueOutput.movimentadoEm"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListMovimentacaoEstoqueOutput.details.tipo"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListMovimentacaoEstoqueOutput.details.quantidade"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAtual"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.quantidadeMinima"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo"
        }
      ]
    },
    {
      "id": "organism.form.1",
      "kind": "form",
      "description": "Organiza o registro em sequência de leitura: produto, saldo de referência, data e hora, tipo e quantidade positiva. A seleção mostra nome, unidade de medida, saldo atual, mínimo e situação do estoque antes do envio. Estados de carregamento, ausência de produtos e erro permanecem explícitos. Os campos têm rótulos, obrigatoriedade e mensagens de validação associadas, com controles confortáveis para toque e operação por teclado.",
      "contentRef": "contentForm",
      "capabilityRefs": [
        {
          "purpose": "shared action createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "actions.createMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "actions.listMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listProduto",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "actions.listProduto"
        }
      ],
      "journeyRefs": [
        {
          "purpose": "page journey registrarMovimentacaoEstoque",
          "fileRef": "l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts"
        }
      ],
      "fieldRefs": [
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.id"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.details.identification.name"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.details.product.unitOfMeasure"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAtual"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.quantidadeMinima"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo"
        }
      ]
    },
    {
      "id": "organism.actions.1",
      "kind": "actions",
      "description": "Disponibiliza uma ação de registro claramente identificada e fácil de alcançar por toque, após os dados obrigatórios. Comunica envio em andamento, sucesso com o saldo atualizado e falha sem perder os valores preenchidos. O controle mantém nome acessível, foco visível e acionamento por teclado.",
      "contentRef": "contentActions",
      "capabilityRefs": [
        {
          "purpose": "shared action createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "actions.createMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "actions.listMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listProduto",
          "fileRef": "l2/controleEstoque/web/shared/movimentacoes.defs.ts",
          "fragment": "actions.listProduto"
        }
      ],
      "journeyRefs": [
        {
          "purpose": "page journey registrarMovimentacaoEstoque",
          "fileRef": "l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts"
        }
      ],
      "fieldRefs": [
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAtual"
        }
      ]
    }
  ],
  "moleculeRecommendations": [
    {
      "organismRef": "organism.list.1",
      "role": "feedback de consulta",
      "preferred": {
        "tag": "groupnotifyuser--ml-notify-banner",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
        },
        "reason": "Mantém falhas de consulta visíveis no fluxo estreito."
      },
      "alternative": {
        "tag": "groupnotifyuser--ml-toast-notification",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
        },
        "reason": "Pode confirmar atualização brevemente."
      }
    },
    {
      "organismRef": "organism.list.1",
      "role": "carregamento de consulta",
      "preferred": {
        "tag": "groupshowprogress--ml-indeterminate-spinner",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupshowprogress/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
        },
        "reason": "A duração da consulta é desconhecida."
      }
    },
    {
      "organismRef": "organism.list.1",
      "role": "item de movimentação",
      "preferred": {
        "tag": "groupviewcard--ml-vertical-card",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewcard/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts"
        },
        "reason": "Empilha identificação e metadados para leitura sem rolagem horizontal."
      },
      "alternative": {
        "tag": "groupviewcard--ml-view-card-horizontal",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewcard/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts"
        },
        "reason": "Pode condensar uma linha quando houver pouco texto."
      }
    },
    {
      "organismRef": "organism.list.1",
      "role": "lista sequencial",
      "preferred": {
        "tag": "groupviewdata--ml-vertical-record-list",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewdata/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts"
        },
        "reason": "É próprio para registros empilhados em espaço estreito."
      },
      "alternative": {
        "tag": "groupviewdata--ml-timeline-view",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewdata/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts"
        },
        "reason": "Pode explorar a ordem temporal das movimentações."
      }
    },
    {
      "organismRef": "organism.list.1",
      "role": "listagem responsiva",
      "preferred": {
        "tag": "groupviewtable--ml-responsive-table",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewtable/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts"
        },
        "reason": "Converte leitura tabular em registros rotulados em espaço restrito."
      },
      "alternative": {
        "tag": "groupviewtable--ml-responsive-data-table",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewtable/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts"
        },
        "reason": "Mantém semântica tabular acessível quando apropriado."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "data e hora da movimentação",
      "preferred": {
        "tag": "groupenterdatetime--ml-datetime-picker",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupenterdatetime/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts"
        },
        "reason": "Oferece seleção guiada de data e hora em toque."
      },
      "alternative": {
        "tag": "groupenterdatetime--ml-enter-datetime-masked-input",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupenterdatetime/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts"
        },
        "reason": "Mantém opção eficiente para teclado."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "quantidade movimentada",
      "preferred": {
        "tag": "groupenternumber--ml-number-stepper",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupenternumber/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts"
        },
        "reason": "Combina digitação com ajustes unitários por toque."
      },
      "alternative": {
        "tag": "groupenternumber--ml-number-input",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupenternumber/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts"
        },
        "reason": "É adequado para entrada numérica direta."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "localização de produto",
      "preferred": {
        "tag": "groupsearchcontent--ml-search-bar",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupsearchcontent/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts"
        },
        "reason": "Permite buscar e escolher produto por sugestões."
      },
      "alternative": {
        "tag": "groupsearchcontent--ml-search-filters",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupsearchcontent/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts"
        },
        "reason": "Pode restringir a busca dentro dos produtos disponíveis."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "tipo de movimentação",
      "preferred": {
        "tag": "groupselectone--ml-segmented-control",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupselectone/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts"
        },
        "reason": "Torna as duas opções visíveis e fáceis de tocar."
      },
      "alternative": {
        "tag": "groupselectone--ml-radio-group",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupselectone/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts"
        },
        "reason": "Mantém opções explícitas com boa acessibilidade."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "feedback de validação e envio",
      "preferred": {
        "tag": "groupnotifyuser--ml-contextual-feedback",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
        },
        "reason": "Mantém validação próxima do campo em leitura sequencial."
      },
      "alternative": {
        "tag": "groupnotifyuser--ml-toast-notification",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
        },
        "reason": "Confirma sucesso sem ocupar o formulário."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "carregamento de produtos e envio",
      "preferred": {
        "tag": "groupshowprogress--ml-indeterminate-spinner",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupshowprogress/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
        },
        "reason": "Não há duração conhecida."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "envio do registro",
      "preferred": {
        "tag": "grouptriggeraction--ml-button-standard",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
        },
        "reason": "Mantém rótulo explícito e área de toque adequada."
      },
      "alternative": {
        "tag": "grouptriggeraction--ml-icon-button",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
        },
        "reason": "Pode atender ação secundária compacta."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "saldo de referência",
      "preferred": {
        "tag": "groupviewmetric--ml-metric-card",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewmetric/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts"
        },
        "reason": "Apresenta saldo e contexto de forma legível antes do envio."
      },
      "alternative": {
        "tag": "groupviewmetric--ml-metric-big-number",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewmetric/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts"
        },
        "reason": "Pode priorizar apenas o saldo."
      }
    },
    {
      "organismRef": "organism.actions.1",
      "role": "confirmação do registro",
      "preferred": {
        "tag": "groupnotifyuser--ml-toast-notification",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
        },
        "reason": "Confirma rapidamente o sucesso sem interromper o fluxo móvel."
      },
      "alternative": {
        "tag": "groupnotifyuser--ml-contextual-feedback",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
        },
        "reason": "Pode exibir erro junto ao comando."
      }
    },
    {
      "organismRef": "organism.actions.1",
      "role": "processamento do registro",
      "preferred": {
        "tag": "groupshowprogress--ml-indeterminate-spinner",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupshowprogress/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
        },
        "reason": "O envio tem duração desconhecida."
      }
    },
    {
      "organismRef": "organism.actions.1",
      "role": "registrar movimentação",
      "preferred": {
        "tag": "grouptriggeraction--ml-button-standard",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
        },
        "reason": "Oferece rótulo claro, estado de envio e alvo de toque adequado."
      },
      "alternative": {
        "tag": "grouptriggeraction--ml-icon-button",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
        },
        "reason": "Pode servir em contexto compacto secundário."
      }
    },
    {
      "organismRef": "organism.actions.1",
      "role": "saldo atualizado",
      "preferred": {
        "tag": "groupviewmetric--ml-metric-card",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewmetric/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts"
        },
        "reason": "Mostra o saldo atualizado com contexto legível."
      },
      "alternative": {
        "tag": "groupviewmetric--ml-metric-big-number",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewmetric/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts"
        },
        "reason": "Pode enfatizar o valor isolado."
      }
    }
  ]
} as const;
