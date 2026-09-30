/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-29-agent-defs-l2-definition-v1",
  "artifactType": "page11",
  "pageId": "movimentacoes",
  "device": "desktop",
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
    "reason": "No explicit style preference; used the category guidance. Selected category guidance for page11."
  },
  "organisms": [
    {
      "id": "organism.list.1",
      "kind": "list",
      "description": "Apresenta as movimentações registradas para consulta, identificando o produto, data e hora, tipo e quantidade; também disponibiliza a consulta do saldo atual, quantidade mínima e indicação de saldo abaixo do mínimo do produto selecionado. Exibe carregamento durante as consultas, mensagem clara quando não houver movimentações ou produtos e erro recuperável quando uma consulta falhar. A leitura e a seleção de produto são operáveis por teclado, com rótulos e estados anunciados adequadamente.",
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
      "description": "Permite localizar e selecionar o produto e informar data e hora da movimentação, tipo obrigatório entre entrada e saída e quantidade obrigatória positiva. Ao selecionar o produto, exibe seu nome, unidade de medida, saldo atual, quantidade mínima e situação do saldo para apoiar o registro. Enquanto os produtos são carregados, informa o estado; quando não houver produto disponível ou houver erro, explica o resultado e preserva a possibilidade de tentar novamente. Todos os campos possuem rótulos, indicação de obrigatoriedade, validação associada e uso completo por teclado.",
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
      "description": "Oferece o comando para registrar a movimentação somente após o preenchimento dos dados obrigatórios. Durante o envio, impede duplicação e comunica que o registro está em processamento; ao concluir, confirma o registro e apresenta o saldo atualizado após a atualização dos dados. Em caso de erro, apresenta uma mensagem compreensível sem descartar os dados informados. O comando tem nome acessível, foco visível e pode ser acionado por teclado.",
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
        "reason": "Erros de carregamento devem permanecer visíveis no contexto da página."
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
        "reason": "Pode confirmar brevemente uma atualização."
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
        "reason": "A duração das consultas não é mensurável."
      }
    },
    {
      "organismRef": "organism.list.1",
      "role": "item de movimentação",
      "preferred": {
        "tag": "groupviewcard--ml-view-card-horizontal",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewcard/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts"
        },
        "reason": "Condensa identificação e metadados da movimentação."
      },
      "alternative": {
        "tag": "groupviewcard--ml-vertical-card",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewcard/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts"
        },
        "reason": "Pode acomodar detalhes adicionais com menor densidade."
      }
    },
    {
      "organismRef": "organism.list.1",
      "role": "lista alternativa de registros",
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
        "reason": "Apoia leitura escaneável de registros com metadados."
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
        "reason": "A data e hora permitem leitura cronológica quando útil."
      }
    },
    {
      "organismRef": "organism.list.1",
      "role": "consulta tabular",
      "preferred": {
        "tag": "groupviewtable--ml-data-table-minimal",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewtable/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts"
        },
        "reason": "Exibe registros imutáveis com leitura compacta, estados e paginação."
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
        "reason": "Preserva listagem tabular acessível em larguras variáveis."
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
        "reason": "Permite selecionar data e hora obrigatórias de forma guiada."
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
        "reason": "Permite digitação rápida por teclado."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "quantidade movimentada",
      "preferred": {
        "tag": "groupenternumber--ml-number-input",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupenternumber/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts"
        },
        "reason": "É adequado para informar quantidade positiva precisa."
      },
      "alternative": {
        "tag": "groupenternumber--ml-number-stepper",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupenternumber/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts"
        },
        "reason": "Pode auxiliar ajustes unitários."
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
        "reason": "Permite localizar produto e confirmar uma sugestão identificada."
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
        "reason": "Pode apoiar busca dentro da relação de produtos."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "tipo de movimentação",
      "preferred": {
        "tag": "groupselectone--ml-radio-group",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupselectone/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts"
        },
        "reason": "As duas opções obrigatórias ficam visíveis para comparação imediata."
      },
      "alternative": {
        "tag": "groupselectone--ml-select",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupselectone/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts"
        },
        "reason": "Oferece seleção convencional caso o espaço seja restrito."
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
        "reason": "Vincula erro de validação ao campo ou à ação de registro."
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
        "reason": "Pode confirmar sucesso sem interromper o trabalho."
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
        "reason": "Consultas e envio não oferecem percentual conhecido."
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
        "reason": "Fornece ação primária com rótulo visível e estado de envio."
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
        "reason": "Pode servir a ação compacta secundária."
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
        "reason": "Destaca saldo atual com contexto do produto."
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
        "reason": "Pode enfatizar somente o saldo."
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
        "reason": "Confirma o registro concluído sem interromper a operação."
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
        "reason": "Pode manter erro associado à ação de envio."
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
        "reason": "O envio não possui percentual conhecido."
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
        "reason": "Torna a ação primária explícita e suporta carregamento."
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
        "reason": "Pode ser usado apenas em contexto compacto."
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
        "reason": "Evidencia o saldo após o registro."
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
        "reason": "Pode enfatizar o valor atualizado isoladamente."
      }
    }
  ]
} as const;
