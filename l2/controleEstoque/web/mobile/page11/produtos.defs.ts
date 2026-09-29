/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = "Page: Produtos (produtos).\n\nPurpose: O estoquista consulta produtos, seus saldos atuais, quantidades mínimas e avisos de saldo baixo, cadastra produtos para acompanhamento do estoque e pode registrar movimentações autorizadas para atualizar os saldos.\n\nActors: estoquista.\n\nExperience: category guidance; No explicit style preference; used the category guidance. Selected category guidance for page11.\n\nSelected source: _102020_/l4/collabux/templates/categoryList.json sha256:9b1275fc3db9069c67dad58c10768614c9146217a8794365813166a218725beb.\n\nAuthority references: actor:estoquista.\n\nThe approved shared definition, DTOs, grants, rules and design-system dependencies are authoritative. Do not add operations, data, state, permissions, totals or saves absent from those sources.\n\nOperation create on MovimentacaoEstoque: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules movimentacaoEstoqueImutavel (l4/controleEstoque/rules.defs.ts#rules.movimentacaoEstoqueImutavel), quantidadeMovimentadaPositiva (l4/controleEstoque/rules.defs.ts#rules.quantidadeMovimentadaPositiva), registroMovimentacaoAtualizaSaldo (l4/controleEstoque/rules.defs.ts#rules.registroMovimentacaoAtualizaSaldo).\n\nOperation create on Produto: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules rule-foreign-namespace-refused (l4/controleEstoque/ontology/Produto.defs.ts#rules[rule-foreign-namespace-refused]), rule-document-shape-validated (l4/controleEstoque/ontology/Produto.defs.ts#rules[rule-document-shape-validated]), rule-identity-never-in-namespace (l4/controleEstoque/ontology/Produto.defs.ts#rules[rule-identity-never-in-namespace]), quantidadeMinimaValida (l4/controleEstoque/rules.defs.ts#rules.quantidadeMinimaValida), saldoAtualProduto (l4/controleEstoque/rules.defs.ts#rules.saldoAtualProduto), avisoSaldoMinimoProduto (l4/controleEstoque/rules.defs.ts#rules.avisoSaldoMinimoProduto).\n\nOperation list on MovimentacaoEstoque: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules none.\n\nOperation list on Produto: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules none.\n\nPresentation: mobile.\n\nCompose for a fluid narrow viewport: preview at 390px and check 360px and 430px. Reflow lists, details and panels into a readable sequence where needed; do not squeeze a desktop table or allow horizontal overflow. Keep actions touch-accessible and keyboard operable. Choose the sequence for this page rather than applying one mobile template everywhere.\n\nEach organism below belongs to its existing shared content scenario. When that scenario is inactive, keep its content mounted but hidden, inert and outside keyboard focus. Do not invent content scenarios or controls.\n\nOrganism organism.summary.1 (summary) in content content.summary; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.product.unitOfMeasure, ListProdutoOutput.details.controleEstoque.saldoAtual. Prioriza a leitura do nome, da unidade de medida e do saldo atual de cada produto em sequência fluida, sem exigir rolagem horizontal. Estados de carregamento, ausência de produtos e erro são anunciados de modo acessível e preservam contexto para leitura por toque e leitor de tela.\n\nOrganism organism.highlights.1 (highlights) in content content.highlights; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.controleEstoque.saldoAtual, ListProdutoOutput.details.controleEstoque.quantidadeMinima, ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo. Mostra em prioridade os produtos com aviso de saldo baixo, permitindo reconhecer por toque o nome, o saldo atual e a quantidade mínima, com o indicador de aviso associado. O carregamento, a ausência de avisos e erros de consulta recebem mensagens acessíveis.\n\nOrganism organism.list.1 (list) in content content.list; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.identification.status, ListProdutoOutput.details.product.unitOfMeasure, ListProdutoOutput.details.controleEstoque.saldoAtual, ListProdutoOutput.details.controleEstoque.quantidadeMinima, ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo. Apresenta os produtos em leitura sequencial e acionável por toque, dando prioridade a nome, saldo atual, quantidade mínima e aviso; unidade de medida e situação permanecem disponíveis sem comprimir a informação. A consulta comunica carregamento, estado vazio e erro de forma acessível.\n\nOrganism organism.detail.1 (detail) in content content.detail; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.identification.status, ListProdutoOutput.details.product.unitOfMeasure, ListProdutoOutput.details.controleEstoque.saldoAtual, ListProdutoOutput.details.controleEstoque.quantidadeMinima, ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo. Organiza a consulta do produto em leitura vertical, mantendo nome, saldo atual e quantidade mínima antes de informações complementares como unidade, situação e aviso. O foco e os rótulos permitem navegação por toque e leitor de tela, enquanto carregamento, ausência e erro são comunicados claramente.\n\nOrganism organism.form.1 (form) in content content.form; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name, ListProdutoOutput.details.product.unitOfMeasure, ListProdutoOutput.details.controleEstoque.quantidadeMinima. Permite informar nome, unidade de medida e quantidade mínima em sequência de leitura, com alvos de toque acessíveis, rótulos associados e validação compreensível para a quantidade mínima. O envio mostra processamento, anuncia sucesso quando o produto passa a estar disponível na consulta e apresenta erros de forma acessível.\n\nOrganism organism.actions.1 (actions) in content content.actions; declared capabilities/actions: createMovimentacaoEstoque, createProduto, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.details.identification.name. Oferece a ação de cadastrar o produto com alvo de toque legível e rótulo claro. Enquanto o comando é executado, informa processamento e impede reenvio; depois, anuncia sucesso ou erro de forma acessível e a consulta de produtos reflete o resultado bem-sucedido." as const;

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
            "reason": "A leitura sequencial de registros é adequada ao espaço estreito e mantém o saldo de cada produto acessível.",
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
            "reason": "Os avisos podem ser lidos como registros empilhados, com prioridade para o saldo e o limite mínimo.",
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
            "groupId": "groupViewData",
            "candidates": [
              "groupviewdata--ml-vertical-record-list"
            ],
            "reason": "Uma lista vertical de registros evita reduzir campos estruturados em uma tela estreita.",
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
            "reason": "O registro detalhado pode agrupar os dados essenciais do produto em uma unidade de leitura tocável.",
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
            "reason": "Nome e unidade de medida são valores textuais curtos adequados à entrada por toque.",
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
            "reason": "A quantidade mínima é numérica e pode ser ajustada com controles de toque.",
            "indexReference": "_102040_/l2/molecules/groupenternumber/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:94a52c28ec828918c77800447f098381bc32de7e922344d8f4ec68924211cc62",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:46387e26474ca57c3c351992faf4cc924b14df799cf437115e8c593ff2a23de6"
          },
          {
            "groupId": "groupTriggerAction",
            "candidates": [
              "grouptriggeraction--ml-button-standard"
            ],
            "reason": "O cadastro requer um acionamento explícito com estado de processamento.",
            "indexReference": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:f7ba36337caf565fb16272cf98af9410b52155e5fb9d603fc6b7c2213284679c",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:1d4607aa57f6f738a1518456d2ee8db44c5c7d0f612cd5e76f09c89dfcb126ed"
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
            "reason": "O comando de cadastro autorizado precisa de uma ação primária clara e acessível ao toque.",
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
