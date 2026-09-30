/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-29-agent-defs-l2-definition-v1",
  "artifactType": "page11",
  "pageId": "produtos",
  "device": "mobile",
  "intent": "O estoquista consulta os produtos cadastrados, seus saldos atuais, quantidades mínimas e avisos de saldo abaixo do mínimo, e cadastra produtos com nome, unidade de medida e quantidade mínima para acompanhamento do estoque.",
  "sharedRef": {
    "purpose": "shared interaction definition",
    "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts"
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
      "id": "organism.summary.1",
      "kind": "summary",
      "description": "Em leitura sequencial para telas estreitas, apresenta cada produto com prioridade para nome e saldo atual, sem exigir rolagem horizontal. Informa carregamento, ausência de produtos e erro de consulta de maneira legível. Os itens e seus rótulos mantêm foco visível, leitura por tecnologias assistivas e alvos de toque acessíveis.",
      "contentRef": "contentSummary",
      "capabilityRefs": [
        {
          "purpose": "shared action createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createMovimentacaoEstoque"
        },
        {
          "purpose": "shared action createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createProduto"
        },
        {
          "purpose": "shared action listMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listProduto"
        }
      ],
      "journeyRefs": [
        {
          "purpose": "page journey acompanharSaldos",
          "fileRef": "l4/controleEstoque/journeys/acompanharSaldos.defs.ts"
        },
        {
          "purpose": "page journey cadastrarProduto",
          "fileRef": "l4/controleEstoque/journeys/cadastrarProduto.defs.ts"
        },
        {
          "purpose": "page journey registrarMovimentacaoEstoque",
          "fileRef": "l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts"
        },
        {
          "purpose": "page journey tratarAvisoSaldoBaixo",
          "fileRef": "l4/controleEstoque/journeys/tratarAvisoSaldoBaixo.defs.ts"
        }
      ],
      "fieldRefs": [
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.identification.name"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAtual"
        }
      ]
    },
    {
      "id": "organism.highlights.1",
      "kind": "highlights",
      "description": "Prioriza os avisos de saldo abaixo do mínimo em itens sequenciais, identificando produto, saldo atual e quantidade mínima e comunicando o aviso também em texto. Exibe estados de carregamento, nenhum aviso e erro sem depender apenas de cor, com alvos de toque e leitura acessíveis.",
      "contentRef": "contentHighlights",
      "capabilityRefs": [
        {
          "purpose": "shared action createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createMovimentacaoEstoque"
        },
        {
          "purpose": "shared action createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createProduto"
        },
        {
          "purpose": "shared action listMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listProduto"
        }
      ],
      "journeyRefs": [
        {
          "purpose": "page journey acompanharSaldos",
          "fileRef": "l4/controleEstoque/journeys/acompanharSaldos.defs.ts"
        },
        {
          "purpose": "page journey cadastrarProduto",
          "fileRef": "l4/controleEstoque/journeys/cadastrarProduto.defs.ts"
        },
        {
          "purpose": "page journey registrarMovimentacaoEstoque",
          "fileRef": "l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts"
        },
        {
          "purpose": "page journey tratarAvisoSaldoBaixo",
          "fileRef": "l4/controleEstoque/journeys/tratarAvisoSaldoBaixo.defs.ts"
        }
      ],
      "fieldRefs": [
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.identification.name"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAtual"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.quantidadeMinima"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo"
        }
      ]
    },
    {
      "id": "organism.list.1",
      "kind": "list",
      "description": "Apresenta os produtos como registros empilhados e fáceis de percorrer, com nome, unidade de medida, saldo, quantidade mínima e indicação de saldo abaixo do mínimo, sem comprimir informações em uma tabela estreita. Mantém carregamento, vazio e erro claros; cada registro pode receber foco ou toque para consulta.",
      "contentRef": "contentList",
      "capabilityRefs": [
        {
          "purpose": "shared action createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createMovimentacaoEstoque"
        },
        {
          "purpose": "shared action createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createProduto"
        },
        {
          "purpose": "shared action listMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listProduto"
        }
      ],
      "journeyRefs": [
        {
          "purpose": "page journey acompanharSaldos",
          "fileRef": "l4/controleEstoque/journeys/acompanharSaldos.defs.ts"
        },
        {
          "purpose": "page journey cadastrarProduto",
          "fileRef": "l4/controleEstoque/journeys/cadastrarProduto.defs.ts"
        },
        {
          "purpose": "page journey registrarMovimentacaoEstoque",
          "fileRef": "l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts"
        },
        {
          "purpose": "page journey tratarAvisoSaldoBaixo",
          "fileRef": "l4/controleEstoque/journeys/tratarAvisoSaldoBaixo.defs.ts"
        }
      ],
      "fieldRefs": [
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.identification.name"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.product.unitOfMeasure"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAtual"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.quantidadeMinima"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo"
        }
      ]
    },
    {
      "id": "organism.detail.1",
      "kind": "detail",
      "description": "Exibe em sequência legível o nome do produto, sua unidade de medida, saldo atual, quantidade mínima e indicador de saldo abaixo do mínimo. Mantém os rótulos próximos aos valores, comunica indisponibilidade ou falha em texto e permite navegação por toque, teclado e leitor de tela.",
      "contentRef": "contentDetail",
      "capabilityRefs": [
        {
          "purpose": "shared action createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createMovimentacaoEstoque"
        },
        {
          "purpose": "shared action createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createProduto"
        },
        {
          "purpose": "shared action listMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listProduto"
        }
      ],
      "journeyRefs": [
        {
          "purpose": "page journey acompanharSaldos",
          "fileRef": "l4/controleEstoque/journeys/acompanharSaldos.defs.ts"
        },
        {
          "purpose": "page journey cadastrarProduto",
          "fileRef": "l4/controleEstoque/journeys/cadastrarProduto.defs.ts"
        },
        {
          "purpose": "page journey registrarMovimentacaoEstoque",
          "fileRef": "l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts"
        },
        {
          "purpose": "page journey tratarAvisoSaldoBaixo",
          "fileRef": "l4/controleEstoque/journeys/tratarAvisoSaldoBaixo.defs.ts"
        }
      ],
      "fieldRefs": [
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.identification.name"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.product.unitOfMeasure"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAtual"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.quantidadeMinima"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo"
        }
      ]
    },
    {
      "id": "organism.form.1",
      "kind": "form",
      "description": "Organiza o cadastro em leitura vertical, com campos de nome, unidade de medida e quantidade mínima confortáveis para toque. Cada campo tem rótulo e validação compreensíveis; erros permanecem associados ao respectivo campo, e o processamento do cadastro é anunciado. Após concluir, o produto fica disponível para consulta com os dados cadastrados.",
      "contentRef": "contentForm",
      "capabilityRefs": [
        {
          "purpose": "shared action createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createMovimentacaoEstoque"
        },
        {
          "purpose": "shared action createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createProduto"
        },
        {
          "purpose": "shared action listMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listProduto"
        }
      ],
      "journeyRefs": [
        {
          "purpose": "page journey acompanharSaldos",
          "fileRef": "l4/controleEstoque/journeys/acompanharSaldos.defs.ts"
        },
        {
          "purpose": "page journey cadastrarProduto",
          "fileRef": "l4/controleEstoque/journeys/cadastrarProduto.defs.ts"
        },
        {
          "purpose": "page journey registrarMovimentacaoEstoque",
          "fileRef": "l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts"
        },
        {
          "purpose": "page journey tratarAvisoSaldoBaixo",
          "fileRef": "l4/controleEstoque/journeys/tratarAvisoSaldoBaixo.defs.ts"
        }
      ],
      "fieldRefs": [
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.identification.name"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.product.unitOfMeasure"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.quantidadeMinima"
        }
      ]
    },
    {
      "id": "organism.actions.1",
      "kind": "actions",
      "description": "Oferece uma ação de cadastro com rótulo visível e alvo de toque acessível. Durante o envio, evita duplicidade e informa o processamento; sucesso ou falha são anunciados de forma perceptível. Ao concluir, confirma a disponibilidade do produto na consulta pelos dados cadastrados.",
      "contentRef": "contentActions",
      "capabilityRefs": [
        {
          "purpose": "shared action createMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createMovimentacaoEstoque"
        },
        {
          "purpose": "shared action createProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.createProduto"
        },
        {
          "purpose": "shared action listMovimentacaoEstoque",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listMovimentacaoEstoque"
        },
        {
          "purpose": "shared action listProduto",
          "fileRef": "l2/controleEstoque/web/shared/produtos.defs.ts",
          "fragment": "actions.listProduto"
        }
      ],
      "journeyRefs": [
        {
          "purpose": "page journey acompanharSaldos",
          "fileRef": "l4/controleEstoque/journeys/acompanharSaldos.defs.ts"
        },
        {
          "purpose": "page journey cadastrarProduto",
          "fileRef": "l4/controleEstoque/journeys/cadastrarProduto.defs.ts"
        },
        {
          "purpose": "page journey registrarMovimentacaoEstoque",
          "fileRef": "l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts"
        },
        {
          "purpose": "page journey tratarAvisoSaldoBaixo",
          "fileRef": "l4/controleEstoque/journeys/tratarAvisoSaldoBaixo.defs.ts"
        }
      ],
      "fieldRefs": [
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.identification.name"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.product.unitOfMeasure"
        },
        {
          "purpose": "selected output field",
          "fileRef": "l2/controleEstoque/web/contracts/produtos.defs.ts",
          "fragment": "ListProdutoOutput.details.controleEstoque.quantidadeMinima"
        }
      ]
    }
  ],
  "moleculeRecommendations": [
    {
      "organismRef": "organism.summary.1",
      "role": "consulta sequencial de saldos",
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
        "reason": "Exibe registros empilhados e escaneáveis em espaço estreito."
      }
    },
    {
      "organismRef": "organism.summary.1",
      "role": "indicador de carregamento",
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
        "reason": "A consulta não fornece percentual de progresso."
      }
    },
    {
      "organismRef": "organism.highlights.1",
      "role": "alertas de saldo baixo",
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
        "reason": "Mantém cada alerta legível e sequencial no viewport estreito."
      }
    },
    {
      "organismRef": "organism.list.1",
      "role": "lista móvel de produtos",
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
        "reason": "Evita a compressão de uma tabela e preserva dados por registro."
      },
      "alternative": {
        "tag": "groupviewdata--ml-card-grid",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewdata/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts"
        },
        "reason": "Pode apresentar registros como cartões quando houver espaço."
      }
    },
    {
      "organismRef": "organism.detail.1",
      "role": "detalhe móvel do produto",
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
        "reason": "Preserva a ordem vertical legível dos dados do produto."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "campos textuais móveis",
      "preferred": {
        "tag": "groupentertext--ml-enter-text",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupentertext/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts"
        },
        "reason": "Fornece campos simples e rotulados para nome e unidade."
      },
      "alternative": {
        "tag": "groupentertext--ml-floating-text-input",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupentertext/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts"
        },
        "reason": "É alternativa de campo compacto de uma linha."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "quantidade mínima móvel",
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
        "reason": "Permite digitação clara da quantidade mínima."
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
        "reason": "Pode apoiar ajustes unitários com toque."
      }
    },
    {
      "organismRef": "organism.actions.1",
      "role": "confirmação do cadastro móvel",
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
        "reason": "Mantém uma ação de cadastro rotulada e acessível ao toque."
      }
    },
    {
      "organismRef": "organism.actions.1",
      "role": "mensagem de resultado móvel",
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
        "reason": "Comunica sucesso do envio de forma breve sem ocupar a composição."
      },
      "alternative": {
        "tag": "groupnotifyuser--ml-notify-banner",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
        },
        "reason": "Pode manter erro do envio visível e legível."
      }
    }
  ]
} as const;
