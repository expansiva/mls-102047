/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/movimentacoes.defs.ts" enhancement="_blank"/>

export const definition = "Page: Movimentações (movimentacoes).\n\nPurpose: Permitir que o estoquista consulte as movimentações de estoque e registre uma entrada ou saída de unidades para um produto, atualizando o saldo correspondente.\n\nActors: estoquista.\n\nExperience: category guidance; No explicit style preference; used the category guidance. Selected category guidance for page11.\n\nSelected source: _102020_/l4/collabux/templates/categoryList.json sha256:9b1275fc3db9069c67dad58c10768614c9146217a8794365813166a218725beb.\n\nAuthority references: actor:estoquista.\n\nThe approved shared definition, DTOs, grants, rules and design-system dependencies are authoritative. Do not add operations, data, state, permissions, totals or saves absent from those sources.\n\nOperation create on MovimentacaoEstoque: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules movimentacaoEstoqueImutavel (l4/controleEstoque/rules.defs.ts#rules.movimentacaoEstoqueImutavel), quantidadeMovimentadaPositiva (l4/controleEstoque/rules.defs.ts#rules.quantidadeMovimentadaPositiva), registroMovimentacaoAtualizaSaldo (l4/controleEstoque/rules.defs.ts#rules.registroMovimentacaoAtualizaSaldo).\n\nOperation list on MovimentacaoEstoque: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules none.\n\nOperation list on Produto: actor estoquista; grants gerenciarEstoque; authorities estoquista; rules none.\n\nPresentation: mobile.\n\nCompose for a fluid narrow viewport: preview at 390px and check 360px and 430px. Reflow lists, details and panels into a readable sequence where needed; do not squeeze a desktop table or allow horizontal overflow. Keep actions touch-accessible and keyboard operable. Choose the sequence for this page rather than applying one mobile template everywhere.\n\nEach organism below belongs to its existing shared content scenario. When that scenario is inactive, keep its content mounted but hidden, inert and outside keyboard focus. Do not invent content scenarios or controls.\n\nOrganism organism.list.1 (list) in content content.list; declared capabilities/actions: createMovimentacaoEstoque, listMovimentacaoEstoque, listProduto; cited output fields: ListMovimentacaoEstoqueOutput.movimentacaoEstoqueProduto.details.identification.name, ListMovimentacaoEstoqueOutput.movimentadoEm, ListMovimentacaoEstoqueOutput.details.tipo, ListMovimentacaoEstoqueOutput.details.quantidade. Mostra as movimentações em registros sequenciais de leitura rápida, priorizando nome do produto, data e hora, tipo e quantidade sem exigir rolagem horizontal. O histórico mantém estados acessíveis de carregamento, vazio e erro e pode ser percorrido por toque e por leitor de tela.\n\nOrganism organism.form.1 (form) in content content.form; declared capabilities/actions: createMovimentacaoEstoque, listMovimentacaoEstoque, listProduto; cited output fields: ListProdutoOutput.id, ListProdutoOutput.details.identification.name, ListProdutoOutput.details.controleEstoque.quantidadeMinima, ListProdutoOutput.details.controleEstoque.saldoAtual, ListProdutoOutput.details.controleEstoque.saldoAbaixoDoMinimo. Organiza o registro em sequência de toque: escolha do produto com seu saldo atual e quantidade mínima, seguida de data e hora, tipo e quantidade positiva. Os controles têm rótulos e indicação de obrigatoriedade, mantêm mensagens de validação próximas ao campo e preservam acesso por teclado e tecnologias assistivas em telas estreitas.\n\nOrganism organism.actions.1 (actions) in content content.actions; declared capabilities/actions: createMovimentacaoEstoque, listMovimentacaoEstoque, listProduto; cited output fields: ListMovimentacaoEstoqueOutput.id, ListProdutoOutput.details.controleEstoque.saldoAtual. Disponibiliza um acionamento de toque claro para registrar a movimentação quando todos os dados obrigatórios estiverem preenchidos. Exibe processamento sem permitir envio duplicado e comunica sucesso ou erro de forma acessível; no sucesso, atualiza o histórico com a identificação do registro e o saldo atual do produto. O registro permanece inalterável depois de concluído." as const;

export const pipeline = [
  {
    "id": "movimentacoes__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/controleEstoque/web/mobile/page11/movimentacoes.defs.ts",
    "outputPath": "l2/controleEstoque/web/mobile/page11/movimentacoes.ts",
    "dependsFiles": [
      "l2/controleEstoque/web/shared/movimentacoes.ts",
      "l2/designSystem.ts",
      "l2/controleEstoque/web/contracts/movimentacoes.defs.ts",
      "_102029_.d.ts",
      "_102020_/l2/molecules/ml-scenary.ts",
      "l4/controleEstoque/access.defs.ts",
      "l4/controleEstoque/ontology/MovimentacaoEstoque.defs.ts",
      "l4/controleEstoque/ontology/Produto.defs.ts",
      "l4/controleEstoque/rules.defs.ts",
      "l4/controleEstoque/workflows.defs.ts"
    ],
    "dependsOn": [
      "movimentacoes__l2_shared"
    ],
    "categoryRef": "inventoryControl",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/inventoryControl.md",
      "_102020_/l4/collabux/templates/categoryList.json",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
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
        "organismId": "organism.list.1",
        "sourceIndex": 0,
        "kind": "list",
        "contentRef": "content.list",
        "scenarioRefs": [
          "base",
          "createMovimentacaoEstoque"
        ],
        "capabilityRefs": [
          "createMovimentacaoEstoque",
          "listMovimentacaoEstoque",
          "listProduto"
        ],
        "outputFieldsByCapability": {
          "createMovimentacaoEstoque": [],
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
            "reason": "A coleção de movimentações pode ser apresentada como itens empilhados e escaneáveis em largura reduzida.",
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
        "organismId": "organism.form.1",
        "sourceIndex": 1,
        "kind": "form",
        "contentRef": "content.form",
        "scenarioRefs": [
          "base",
          "createMovimentacaoEstoque"
        ],
        "capabilityRefs": [
          "createMovimentacaoEstoque",
          "listMovimentacaoEstoque",
          "listProduto"
        ],
        "outputFieldsByCapability": {
          "createMovimentacaoEstoque": [],
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
            "groupId": "groupSelectOne",
            "candidates": [
              "groupselectone--ml-select-one-autocomplete",
              "groupselectone--ml-segmented-control"
            ],
            "reason": "A seleção de produto pode exigir localização em uma lista e o tipo possui duas opções mutuamente exclusivas.",
            "indexReference": "_102040_/l2/molecules/groupselectone/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:20b935861b3c60bddb4b2d6890d5189988430900c74338e5b58f2f2243273a5e",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:71f1e28821255daecedd4f2ccd77031042841a18ee52c6bd2aa4327a81654783"
          },
          {
            "groupId": "groupEnterDatetime",
            "candidates": [
              "groupenterdatetime--ml-datetime-picker"
            ],
            "reason": "A movimentação exige data e hora.",
            "indexReference": "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:2ba95b71fec77f2f7ee120e37d41d2a11a6672423a7a0a924112d5cf90a717dd",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:baabe38614f3b26f5432d6069fae593bb5bbe72fe79c1f534548684d3f3d867f"
          },
          {
            "groupId": "groupEnterNumber",
            "candidates": [
              "groupenternumber--ml-number-stepper"
            ],
            "reason": "A quantidade positiva é informada em um controle adequado ao toque.",
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
        "sourceIndex": 2,
        "kind": "actions",
        "contentRef": "content.actions",
        "scenarioRefs": [
          "base",
          "createMovimentacaoEstoque"
        ],
        "capabilityRefs": [
          "createMovimentacaoEstoque",
          "listMovimentacaoEstoque",
          "listProduto"
        ],
        "outputFieldsByCapability": {
          "createMovimentacaoEstoque": [],
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
            "reason": "O organismo dispara o comando de registro com estado de carregamento.",
            "indexReference": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:f7ba36337caf565fb16272cf98af9410b52155e5fb9d603fc6b7c2213284679c",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:1d4607aa57f6f738a1518456d2ee8db44c5c7d0f612cd5e76f09c89dfcb126ed"
          },
          {
            "groupId": "groupNotifyUser",
            "candidates": [
              "groupnotifyuser--ml-toast-notification",
              "groupnotifyuser--ml-contextual-feedback"
            ],
            "reason": "O comando precisa informar sucesso e erro sem ocultar o contexto do preenchimento.",
            "indexReference": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:85dae4dc3ad57039dfeb5f9a091bfcbbb0263b74709cdca72f002a6168d382f7",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:e834c37e6c05a2153c0926fabd99957bbeec9c849a5374ccd2a25847ff70e79f"
          }
        ]
      }
    ]
  }
] as const;
