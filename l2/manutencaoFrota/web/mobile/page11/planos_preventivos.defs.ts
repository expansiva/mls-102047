export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a consulta compacta dos planos preventivos da frota, preservando a busca por identificador ou veículo e a navegação entre páginas. Mostra carregamento durante a consulta, mensagem clara quando não houver planos correspondentes e erro de consulta de forma acessível. Os controles devem ter áreas de toque adequadas, rótulos claros e anúncio das mudanças de estado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenancePlan",
      "setListMaintenancePlanId",
      "setListMaintenancePlanVehicleId",
      "setListMaintenancePlanPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A leitura vertical favorece a consulta dos registros em espaço reduzido."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Exibe, com prioridade para leitura, a periodicidade, próxima quilometragem, próxima data e indicação de preventiva vencida do plano consultado. Mantém a consulta por plano ou veículo e comunica carregamento, ausência de resultado e falha. Os valores devem ter rótulos textuais e ordem de foco coerente para toque, teclado e leitor de tela. Não há capacidade compartilhada para alterar o plano.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenancePlan",
      "setListMaintenancePlanId",
      "setListMaintenancePlanVehicleId"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "O agrupamento compacto favorece a consulta do detalhe em telas estreitas."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Destaca preventivas vencidas por quilometragem para que a pessoa gestora identifique itens que exigem encaminhamento. Permite consultar os registros relacionados e abrir a ordem preventiva disponível. Comunica carregamento, ausência de alertas nos resultados e erro de consulta; o vencimento deve ser expresso em texto além de qualquer sinal visual, e a ação deve ser acessível por toque e leitor de tela.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenancePlan",
      "listVehicle",
      "setListMaintenancePlanVehicleId",
      "setListVehicleId",
      "createMaintenanceOrder"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A lista vertical torna alertas individuais mais fáceis de examinar em tela estreita."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "A abertura de ordem preventiva é um comando contextual disponível."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite cadastrar a periodicidade de um plano com veículo, dados e nome do plano, quilometragem e data de referência e intervalos opcionais em quilômetros e meses. Em espaço reduzido, prioriza os campos obrigatórios e mantém instruções e erros associados ao respectivo campo. A submissão comunica processamento, sucesso e erro de forma acessível, preserva os valores em caso de falha e atualiza as consultas de planos e veículos após sucesso. A capacidade disponível é de cadastro, não de atualização de plano existente.",
    "contentRef": "createMaintenancePlan",
    "capabilityRefs": [
      "setCreateMaintenancePlanVehicleId",
      "setCreateMaintenancePlanDetails",
      "setCreateMaintenancePlanDetailsName",
      "setCreateMaintenancePlanDetailsIntervalKilometers",
      "setCreateMaintenancePlanDetailsIntervalMonths",
      "setCreateMaintenancePlanDetailsReferenceMileage",
      "setCreateMaintenancePlanDetailsReferenceDate",
      "createMaintenancePlan"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Nome e dados textuais do plano exigem entrada textual."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-input"
        ],
        "reason": "Quilometragem e intervalo em quilômetros exigem entrada numérica precisa."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-compact-calendar"
        ],
        "reason": "A data de referência pode ser escolhida preservando espaço em tela."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O cadastro requer um comando explícito."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "Validação e resultado do cadastro devem ser comunicados no contexto móvel."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece, sem remover capacidades no celular, os comandos para cadastrar plano e abrir ordem preventiva. Para a ordem, coleta veículo, oficina, data de entrada, detalhes, tipo e descrição da manutenção; custos e data de saída permanecem opcionais. Cada comando deve expor requisitos antes do envio, ter alvo de toque identificável, informar carregamento e anunciar sucesso ou falha para tecnologias assistivas. A criação de ordem atualiza sua consulta, e a criação de plano atualiza planos e veículos. Não existe comando compartilhado para atualização.",
    "contentRef": "createMaintenanceOrder",
    "capabilityRefs": [
      "createMaintenancePlan",
      "createMaintenanceOrder",
      "setCreateMaintenanceOrderVehicleId",
      "setCreateMaintenanceOrderMaintenancePlanId",
      "setCreateMaintenanceOrderWorkshopId",
      "setCreateMaintenanceOrderEntryDate",
      "setCreateMaintenanceOrderDetails",
      "setCreateMaintenanceOrderDetailsMaintenanceType",
      "setCreateMaintenanceOrderDetailsDescription",
      "setCreateMaintenanceOrderDetailsEstimatedCost",
      "setCreateMaintenanceOrderDetailsFinalCost",
      "setCreateMaintenanceOrderDetailsExitDate"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Os comandos de criação exigem acionamento explícito e feedback de processamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "Sucessos e falhas dos comandos precisam ser anunciados."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-compact-calendar"
        ],
        "reason": "As datas de entrada e saída da ordem são campos de data adequados a espaço restrito."
      },
      {
        "groupId": "groupEnterMoney",
        "candidates": [
          "groupentermoney--ml-enter-money-br"
        ],
        "reason": "Custos opcionalmente informados na ordem requerem entrada monetária localizada."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "planos_preventivos__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/mobile/page11/planos_preventivos.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/mobile/page11/planos_preventivos.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/shared/planos_preventivos.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "planos_preventivos__l2_shared"
    ],
    "categoryRef": "assetManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/assetManagement.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/groupenterdate/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDate/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupentermoney/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterMoney/usage.ts"
    ]
  }
] as const;
