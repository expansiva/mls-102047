/// <mls fileReference="_102047_/l2/controleEstoque/web/desktop/page11/produtos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-29-agent-defs-l2-definition-v1",
  "artifactType": "page11",
  "pageId": "produtos",
  "device": "desktop",
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
    "reason": "No explicit style preference; used the category guidance. Selected category guidance for page11."
  },
  "organisms": [
    {
      "id": "organism.summary.1",
      "kind": "summary",
      "description": "Apresenta uma visão rapidamente examinável dos produtos com seus nomes e saldos atuais. Enquanto a consulta estiver em andamento, informa o carregamento; se não houver produtos, explica que não há saldo a acompanhar; em caso de falha, apresenta um erro perceptível e recuperável. As informações possuem rótulos claros e podem ser percorridas por teclado.",
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
      "description": "Destaca os produtos cujo indicador informa saldo abaixo do mínimo, identificando cada produto e exibindo saldo atual e quantidade mínima para orientar a reposição. Exibe carregamento, ausência de avisos e falha de consulta de forma compreensível, sem depender apenas de cor, com leitura e foco acessíveis por teclado.",
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
      "description": "Lista os produtos cadastrados para localização e comparação, mostrando nome, unidade de medida, saldo atual, quantidade mínima e indicação de saldo abaixo do mínimo. Mantém estados explícitos de carregamento, lista vazia e erro; cada registro pode receber foco e ser acionado por teclado para consulta.",
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
      "description": "Mostra os detalhes do produto em contexto: nome, unidade de medida, saldo atual, quantidade mínima e o indicador de saldo abaixo do mínimo. Ao não haver produto disponível ou ocorrer erro, comunica o estado em texto; os valores são associados a rótulos e seguem uma ordem de leitura acessível.",
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
      "description": "Oferece o cadastro de produto com campos editáveis para nome, unidade de medida e quantidade mínima. Apresenta rótulos, ajuda e validação de quantidade mínima junto ao campo, preserva os valores informados quando houver erro e informa o processamento do cadastro. Após a conclusão, a presença do produto com os dados cadastrados fica disponível na consulta; todos os campos e mensagens são acessíveis por teclado.",
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
      "description": "Disponibiliza a ação de cadastrar o produto informado. A ação fica claramente identificada, pode ser ativada por teclado, evita novo envio enquanto o cadastro está em processamento e anuncia sucesso ou erro. Quando concluído, o produto cadastrado passa a estar disponível na lista com nome, unidade de medida e quantidade mínima.",
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
      "role": "consulta tabular de saldos",
      "preferred": {
        "tag": "groupviewtable--ml-responsive-data-table",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewtable/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts"
        },
        "reason": "Suporta listagem tabular acessível com estados de carregamento, vazio e erro para os saldos."
      },
      "alternative": {
        "tag": "groupviewtable--ml-view-table",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewtable/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts"
        },
        "reason": "É uma alternativa compacta para leitura simples, mas oferece menos adaptação declarada."
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
        "reason": "A duração da consulta de produtos é desconhecida."
      }
    },
    {
      "organismRef": "organism.highlights.1",
      "role": "itens destacados de saldo baixo",
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
        "reason": "Acomoda identificação e contexto de alerta de cada produto sem pressupor mídia."
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
        "reason": "Pode condensar itens de alerta em leitura densa."
      }
    },
    {
      "organismRef": "organism.list.1",
      "role": "listagem de produtos",
      "preferred": {
        "tag": "groupviewtable--ml-responsive-data-table",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewtable/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts"
        },
        "reason": "Apresenta campos estruturados e estados de dados acessíveis."
      },
      "alternative": {
        "tag": "groupviewtable--ml-view-table",
        "indexRef": {
          "purpose": "selected molecule catalog index",
          "fileRef": "_102040_/l2/molecules/groupviewtable/index.defs.ts"
        },
        "usageRef": {
          "purpose": "selected molecule usage contract",
          "fileRef": "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts"
        },
        "reason": "Pode servir à leitura compacta sem interação adicional."
      }
    },
    {
      "organismRef": "organism.detail.1",
      "role": "detalhe do produto",
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
        "reason": "Organiza os valores do produto em blocos legíveis e neutros."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "campos textuais do produto",
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
        "reason": "Atende nome e unidade de medida como entradas simples de uma linha."
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
        "reason": "Também aceita texto de uma linha com rótulo flutuante."
      }
    },
    {
      "organismRef": "organism.form.1",
      "role": "quantidade mínima",
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
        "reason": "Permite informar diretamente a quantidade mínima numérica."
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
        "reason": "Pode facilitar ajustes unitários de quantidade."
      }
    },
    {
      "organismRef": "organism.actions.1",
      "role": "envio do cadastro",
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
        "reason": "É a ação primária única de cadastrar com suporte a carregamento."
      }
    },
    {
      "organismRef": "organism.actions.1",
      "role": "retorno do cadastro",
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
        "reason": "Confirma o resultado do cadastro sem interromper a consulta."
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
        "reason": "Pode manter uma falha de cadastro visível no conteúdo."
      }
    }
  ]
} as const;
