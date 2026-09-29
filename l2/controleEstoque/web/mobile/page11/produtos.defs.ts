/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = "Page: Produtos (produtos).\n\nPurpose: O estoquista consulta os produtos, seus saldos atuais, quantidades mínimas e avisos de saldo baixo; cadastra produtos com a quantidade mínima e registra entradas ou saídas para atualizar o saldo do produto selecionado.\n\nActors: estoquista.\n\nExperience: category guidance; No explicit style preference; used the category guidance. Selected category guidance for page11.\n\nSelected source: _102020_/l4/collabux/templates/categoryList.json sha256:9b1275fc3db9069c67dad58c10768614c9146217a8794365813166a218725beb.\n\nAuthority references: actor:estoquista.\n\nThe approved shared definition, DTOs, grants, rules and design-system dependencies are authoritative. Do not add operations, data, state, permissions, totals or saves absent from those sources.\n\nOperation create on MovimentacaoEstoque: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules movimentacaoEstoqueImutavel (l4/controleEstoque/rules.defs.ts#rules.movimentacaoEstoqueImutavel), quantidadeMovimentadaPositiva (l4/controleEstoque/rules.defs.ts#rules.quantidadeMovimentadaPositiva), registroMovimentacaoAtualizaSaldo (l4/controleEstoque/rules.defs.ts#rules.registroMovimentacaoAtualizaSaldo).\n\nOperation create on Produto: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules rule-foreign-namespace-refused (l4/controleEstoque/ontology/Produto.defs.ts#rules[rule-foreign-namespace-refused]), rule-document-shape-validated (l4/controleEstoque/ontology/Produto.defs.ts#rules[rule-document-shape-validated]), rule-identity-never-in-namespace (l4/controleEstoque/ontology/Produto.defs.ts#rules[rule-identity-never-in-namespace]), quantidadeMinimaValida (l4/controleEstoque/rules.defs.ts#rules.quantidadeMinimaValida), saldoAtualProduto (l4/controleEstoque/rules.defs.ts#rules.saldoAtualProduto), avisoSaldoMinimoProduto (l4/controleEstoque/rules.defs.ts#rules.avisoSaldoMinimoProduto).\n\nOperation list on MovimentacaoEstoque: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules none.\n\nOperation list on Produto: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules none.\n\nPresentation: mobile.\n\nCompose for a fluid narrow viewport: preview at 390px and check 360px and 430px. Reflow lists, details and panels into a readable sequence where needed; do not squeeze a desktop table or allow horizontal overflow. Keep actions touch-accessible and keyboard operable. Choose the sequence for this page rather than applying one mobile template everywhere.\n\nEach organism below belongs to its existing shared content scenario. When that scenario is inactive, keep its content mounted but hidden, inert and outside keyboard focus. Do not invent content scenarios or controls.\n\nOrganism organism.summary.1 (summary) in content content.summary; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.product.unitOfMeasure, ListProdutoOutput.details.controleEstoque.saldoAtual. Prioriza a leitura sequencial do saldo atual de cada produto, com nome e unidade de medida, sem exigir rolagem horizontal. Comunica carregamento, ausência de produtos e falha de consulta em texto acessível.\n\nOrganism organism.highlights.1 (highlights) in content content.highlights; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.controleEstoque.saldoAtual, ListProdutoOutput.details.controleEstoque.quantidadeMinima, ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo. Exibe primeiro os produtos com saldo abaixo do mínimo, preservando nome, saldo atual, quantidade mínima e indicação de saldo baixo em leitura vertical. Os estados de carregamento, nenhum aviso e erro são claros e anunciáveis.\n\nOrganism organism.list.1 (list) in content content.list; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.identification.status, ListProdutoOutput.details.product.unitOfMeasure, ListProdutoOutput.details.controleEstoque.saldoAtual, ListProdutoOutput.details.controleEstoque.quantidadeMinima, ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo. Permite pesquisar produtos pelo nome e aplicar os filtros disponíveis de tipo e situação, com alvos de toque acessíveis. Cada resultado prioriza nome, situação, saldo atual, quantidade mínima, unidade de medida e aviso de saldo baixo; comunica carregamento, ausência de resultados e erro sem comprimir a leitura.\n\nOrganism organism.detail.1 (detail) in content content.detail; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.identification.status, ListProdutoOutput.details.product.unitOfMeasure, ListProdutoOutput.details.controleEstoque.saldoAtual, ListProdutoOutput.details.controleEstoque.quantidadeMinima, ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo. Apresenta em sequência o nome do produto, situação, unidade de medida, saldo atual, quantidade mínima e aviso de saldo baixo, para confirmação rápida em tela estreita. Mantém mensagens acessíveis para carregamento, produto indisponível e erro de consulta.\n\nOrganism organism.form.1 (form) in content content.form; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.product.unitOfMeasure, ListProdutoOutput.details.controleEstoque.quantidadeMinima. Permite informar nome do produto, unidade de medida e quantidade mínima em sequência, com rótulos claros e controles adequados ao toque. Acompanha a lista atualizada pelo nome, unidade de medida e mínimo configurado após o cadastro. Orienta que o mínimo não pode ser negativo e indica validações, envio em andamento e falha com mensagens acessíveis.\n\nOrganism organism.actions.1 (actions) in content content.actions; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.product.unitOfMeasure, ListProdutoOutput.details.controleEstoque.quantidadeMinima. Oferece o comando de cadastro com rótulo visível e área de toque acessível após o preenchimento das informações, refletindo na consulta atualizada o nome, a unidade de medida e a quantidade mínima cadastrados. Durante o envio, impede acionamentos repetidos e comunica sucesso ou erro do cadastro." as const;

export const pipeline = [
  {
    "id": "produtos__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/controleEstoque/web/mobile/page11/produtos.defs.ts",
    "outputPath": "l2/controleEstoque/web/mobile/page11/produtos.ts",
    "dependsFiles": [
      "l2/controleEstoque/web/shared/produtos.ts",
      "l2/designSystem.ts",
      "l2/controleEstoque/web/contracts/produtos.defs.ts",
      "_102029_.d.ts",
      "_102020_/l2/molecules/ml-scenary.ts",
      "l4/controleEstoque/access.defs.ts",
      "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts",
      "l4/controleEstoque/ontology/Produto.defs.ts",
      "l4/controleEstoque/rules.defs.ts",
      "l4/controleEstoque/workflows.defs.ts"
    ],
    "dependsOn": [
      "produtos__l2_shared"
    ],
    "categoryRef": "inventoryControl",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/inventoryControl.md",
      "_102020_/l4/collabux/templates/categoryList.json",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
    ],
    "templateSelection": {
      "categoryRef": "inventoryControl",
      "experiencePage": null,
      "experienceId": null,
      "styleId": null,
      "layoutId": null,
      "targetPage": "page11",
      "reason": "No explicit style preference; used the category guidance. Selected category guidance for page11.",
      "requirementsMet": [],
      "digest": "sha256:b39a0b2d4cfb411e232248026a7c00c6cfe0b07a21300eadc70037ecc6def41c",
      "sources": [
        {
          "role": "category-catalog-entry",
          "reference": "_102020_/l4/collabux/templates/categoryList.json",
          "sha256": "sha256:9b1275fc3db9069c67dad58c10768614c9146217a8794365813166a218725beb"
        }
      ]
    },
    "coverage": [
      {
        "organismId": "organism.summary.1",
        "sourceIndex": 0,
        "kind": "summary",
        "contentRef": "content.summary",
        "scenarioRefs": [
          "base",
          "detail",
          "createMovimentacaoEstoque",
          "createProduto"
        ],
        "capabilityRefs": [
          "createMovimentacaoEstoque",
          "createProduto",
          "listMovimentacaoEstoque",
          "listProduto"
        ],
        "outputFieldsByCapability": {
          "createMovimentacaoEstoque": [],
          "createProduto": [],
          "listMovimentacaoEstoque": [
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "version"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "produtoId"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentadoEm"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.tipo"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.quantidade"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification.name"
            }
          ],
          "listProduto": [
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "id"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "version"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product.unitOfMeasure"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.quantidadeMinima"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAtual"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAbaixoDoMinimo"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupViewData",
            "candidates": [
              "groupviewdata--ml-vertical-record-list"
            ],
            "reason": "A leitura de vários produtos em tela estreita é favorecida por registros empilhados e escaneáveis.",
            "indexReference": "_102040_/l2/molecules/groupviewdata/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:4c2e33ab4b2eb697a3a015dd1b423f3146f490564f3d728d9d275efdfcdd0910",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:23632c5755e10bf0b0fd2b396c497bb15de577cbcbc1c01ccdb7a27a383c68c9"
          }
        ]
      },
      {
        "organismId": "organism.highlights.1",
        "sourceIndex": 1,
        "kind": "highlights",
        "contentRef": "content.highlights",
        "scenarioRefs": [
          "base",
          "detail",
          "createMovimentacaoEstoque",
          "createProduto"
        ],
        "capabilityRefs": [
          "createMovimentacaoEstoque",
          "createProduto",
          "listMovimentacaoEstoque",
          "listProduto"
        ],
        "outputFieldsByCapability": {
          "createMovimentacaoEstoque": [],
          "createProduto": [],
          "listMovimentacaoEstoque": [
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "version"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "produtoId"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentadoEm"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.tipo"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.quantidade"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification.name"
            }
          ],
          "listProduto": [
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "id"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "version"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product.unitOfMeasure"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.quantidadeMinima"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAtual"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAbaixoDoMinimo"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupViewData",
            "candidates": [
              "groupviewdata--ml-vertical-record-list"
            ],
            "reason": "Os avisos podem ser percorridos como registros prioritários em uma sequência fluida.",
            "indexReference": "_102040_/l2/molecules/groupviewdata/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:4c2e33ab4b2eb697a3a015dd1b423f3146f490564f3d728d9d275efdfcdd0910",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:23632c5755e10bf0b0fd2b396c497bb15de577cbcbc1c01ccdb7a27a383c68c9"
          }
        ]
      },
      {
        "organismId": "organism.list.1",
        "sourceIndex": 2,
        "kind": "list",
        "contentRef": "content.list",
        "scenarioRefs": [
          "base",
          "detail",
          "createMovimentacaoEstoque",
          "createProduto"
        ],
        "capabilityRefs": [
          "createMovimentacaoEstoque",
          "createProduto",
          "listMovimentacaoEstoque",
          "listProduto"
        ],
        "outputFieldsByCapability": {
          "createMovimentacaoEstoque": [],
          "createProduto": [],
          "listMovimentacaoEstoque": [
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "version"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "produtoId"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentadoEm"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.tipo"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.quantidade"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification.name"
            }
          ],
          "listProduto": [
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "id"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "version"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product.unitOfMeasure"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.quantidadeMinima"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAtual"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAbaixoDoMinimo"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupSearchContent",
            "candidates": [
              "groupsearchcontent--ml-search-bar"
            ],
            "reason": "O nome do produto é um critério disponível para localizar registros.",
            "indexReference": "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:4458436e93cf3d9d2ee59d0b9d1e27cbfd4b8c93c5c46f7f877f9eedef966867",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:1caf53d5f4027944d7904bdc8bc6e59ad33930072d1f3158b129d575cfbcdd85"
          },
          {
            "groupId": "groupViewData",
            "candidates": [
              "groupviewdata--ml-vertical-record-list"
            ],
            "reason": "Os resultados permanecem legíveis em sequência em larguras móveis.",
            "indexReference": "_102040_/l2/molecules/groupviewdata/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:4c2e33ab4b2eb697a3a015dd1b423f3146f490564f3d728d9d275efdfcdd0910",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:23632c5755e10bf0b0fd2b396c497bb15de577cbcbc1c01ccdb7a27a383c68c9"
          }
        ]
      },
      {
        "organismId": "organism.detail.1",
        "sourceIndex": 3,
        "kind": "detail",
        "contentRef": "content.detail",
        "scenarioRefs": [
          "base",
          "detail",
          "createMovimentacaoEstoque",
          "createProduto"
        ],
        "capabilityRefs": [
          "createMovimentacaoEstoque",
          "createProduto",
          "listMovimentacaoEstoque",
          "listProduto"
        ],
        "outputFieldsByCapability": {
          "createMovimentacaoEstoque": [],
          "createProduto": [],
          "listMovimentacaoEstoque": [
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "version"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "produtoId"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentadoEm"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.tipo"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.quantidade"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification.name"
            }
          ],
          "listProduto": [
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "id"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "version"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product.unitOfMeasure"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.quantidadeMinima"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAtual"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAbaixoDoMinimo"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupViewCard",
            "candidates": [
              "groupviewcard--ml-view-card-horizontal"
            ],
            "reason": "O produto é uma unidade de consulta com metadados e estado de estoque que pode ser lida sem perder contexto.",
            "indexReference": "_102040_/l2/molecules/groupviewcard/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:cdfd46bdd1403f4c5e591a95c20760cdcdea27a08a35e3ac65f3445195efdbc0",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:48c753bba438f309527c84f761b2d5de6e6dc434a862579cefeeb32716a034b8"
          }
        ]
      },
      {
        "organismId": "organism.form.1",
        "sourceIndex": 4,
        "kind": "form",
        "contentRef": "content.form",
        "scenarioRefs": [
          "base",
          "detail",
          "createMovimentacaoEstoque",
          "createProduto"
        ],
        "capabilityRefs": [
          "createMovimentacaoEstoque",
          "createProduto",
          "listMovimentacaoEstoque",
          "listProduto"
        ],
        "outputFieldsByCapability": {
          "createMovimentacaoEstoque": [],
          "createProduto": [],
          "listMovimentacaoEstoque": [
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "version"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "produtoId"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentadoEm"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.tipo"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.quantidade"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification.name"
            }
          ],
          "listProduto": [
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "id"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "version"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product.unitOfMeasure"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.quantidadeMinima"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAtual"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAbaixoDoMinimo"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupEnterText",
            "candidates": [
              "groupentertext--ml-enter-text"
            ],
            "reason": "Nome do produto e unidade de medida são entradas textuais diretas.",
            "indexReference": "_102040_/l2/molecules/groupentertext/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:224a115414c9a393b96ffece5577e00e65975f049f6d11e6fadcce6a1e73cd48",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:42b85a1e9fc97f1c12ae621670afa7cc7262cb62998eba133171cc0f7be32028"
          },
          {
            "groupId": "groupEnterNumber",
            "candidates": [
              "groupenternumber--ml-number-stepper"
            ],
            "reason": "A quantidade mínima é numérica e se beneficia de ajuste acessível ao toque.",
            "indexReference": "_102040_/l2/molecules/groupenternumber/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:94a52c28ec828918c77800447f098381bc32de7e922344d8f4ec68924211cc62",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:46387e26474ca57c3c351992faf4cc924b14df799cf437115e8c593ff2a23de6"
          }
        ]
      },
      {
        "organismId": "organism.actions.1",
        "sourceIndex": 5,
        "kind": "actions",
        "contentRef": "content.actions",
        "scenarioRefs": [
          "base",
          "detail",
          "createMovimentacaoEstoque",
          "createProduto"
        ],
        "capabilityRefs": [
          "createMovimentacaoEstoque",
          "createProduto",
          "listMovimentacaoEstoque",
          "listProduto"
        ],
        "outputFieldsByCapability": {
          "createMovimentacaoEstoque": [],
          "createProduto": [],
          "listMovimentacaoEstoque": [
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "version"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "produtoId"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentadoEm"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.tipo"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "details.quantidade"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.id"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification"
            },
            {
              "actionId": "listMovimentacaoEstoque",
              "outputTypeRef": "ListMovimentacaoEstoqueOutput",
              "path": "movimentacaoEstoqueProduto.details.identification.name"
            }
          ],
          "listProduto": [
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "id"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "version"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.product.unitOfMeasure"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.quantidadeMinima"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAtual"
            },
            {
              "actionId": "listProduto",
              "outputTypeRef": "ListProdutoOutput",
              "path": "details.controleEstoque.saldoAbaixoDoMinimo"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupTriggerAction",
            "candidates": [
              "grouptriggeraction--ml-button-standard"
            ],
            "reason": "O comando de cadastro requer um acionamento primário explícito, legível e adequado ao toque.",
            "indexReference": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:f7ba36337caf565fb16272cf98af9410b52155e5fb9d603fc6b7c2213284679c",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:1d4607aa57f6f738a1518456d2ee8db44c5c7d0f612cd5e76f09c89dfcb126ed"
          }
        ]
      }
    ]
  }
] as const;
