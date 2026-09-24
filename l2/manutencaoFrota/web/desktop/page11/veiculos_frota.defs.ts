export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite ao gestor localizar e consultar os veículos cadastrados na frota. A coleção informa os dados de identificação disponíveis e pode avançar entre páginas de resultados. Enquanto a consulta estiver em andamento, comunica carregamento; se não houver resultados, informa a ausência de veículos; em falha, apresenta o erro da consulta e permite tentar novamente. Os controles têm rótulos claros, foco navegável por teclado e a atualização dos resultados é anunciada por tecnologia assistiva.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle",
      "setListVehiclePage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção de veículos com campos estruturados."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta os dados operacionais do veículo consultado e relaciona seus planos preventivos e ordens de manutenção. O gestor pode consultar essas informações para conferir o veículo antes de iniciar uma manutenção. Informa carregamento e falha de cada consulta e indica quando não existem planos ou ordens retornados. A leitura é acessível por teclado, com nomes compreensíveis para os dados e avisos de estado anunciados.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle",
      "listMaintenancePlan",
      "listMaintenanceOrder"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Há coleções de planos e ordens de manutenção vinculadas à consulta do veículo."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Evidencia a situação do veículo para priorizar a manutenção, incluindo a indicação derivada de preventiva por quilometragem vencida e os próximos marcos preventivos disponíveis. Reflete carregamento, ausência de dados e erro das consultas de veículo e plano sem supor valores não retornados. As informações de situação usam texto equivalente e anúncios acessíveis quando forem atualizadas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle",
      "listMaintenancePlan"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "A situação preventiva e os próximos marcos são indicadores derivados disponíveis nas consultas."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Reúne os dados operacionais informados para localizar um veículo, como identificação, subtipo, nome, situação e código do país. Os campos obrigatórios são identificados, preservam o valor informado e oferecem orientação e erro associado ao respectivo campo. Esta página não expõe comando para gravar cadastro ou alteração de veículo; a capacidade disponível apenas atualiza os critérios da consulta e executa a localização. Todos os campos têm rótulo e instrução acessível por teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "setListVehicleDetailsIdentification",
      "setListVehicleDetailsIdentificationSubtype",
      "setListVehicleDetailsIdentificationName",
      "setListVehicleDetailsIdentificationStatus",
      "setListVehicleDetailsIdentificationCountryCode",
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Identificação, subtipo, nome, situação e código do país são critérios textuais informados para a consulta."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza ao gestor as ações de abrir uma ordem de manutenção por defeito e cadastrar um plano preventivo para o veículo. A ordem exige veículo, oficina, data de entrada, detalhes, tipo e descrição; o plano exige veículo, detalhes, nome, quilometragem e data de referência. Custos, data de saída e intervalos são opcionais conforme o contrato. Durante o envio, evita reenvio; após êxito, atualiza as coleções correspondentes; em falha, apresenta a mensagem de erro e mantém os dados para correção. As ações têm nome acessível, podem ser acionadas por teclado e comunicam resultado a leitores de tela.",
    "contentRef": "base",
    "capabilityRefs": [
      "createMaintenanceOrder",
      "createMaintenancePlan",
      "listMaintenanceOrder",
      "listMaintenancePlan",
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Há dois comandos explícitos de criação que devem ser disparados pelo gestor."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os comandos possuem estados de carregamento, sucesso e erro que precisam de retorno associado à ação."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "veiculos_frota__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/desktop/page11/veiculos_frota.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/desktop/page11/veiculos_frota.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/shared/veiculos_frota.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "veiculos_frota__l2_shared"
    ],
    "categoryRef": "assetManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/assetManagement.md",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewmetric/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;
