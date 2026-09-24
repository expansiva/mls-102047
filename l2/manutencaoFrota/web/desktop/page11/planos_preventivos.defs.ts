export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta os planos preventivos da frota e sua situação para consulta. A pessoa gestora pode informar identificador ou veículo e avançar na paginação dos resultados. Durante a busca, comunica carregamento; quando não houver resultados correspondentes, informa a ausência de planos; em caso de falha, apresenta o erro de consulta. Identificadores e controles devem ter rótulos compreensíveis, foco visível e anúncio acessível das mudanças de estado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenancePlan",
      "setListMaintenancePlanId",
      "setListMaintenancePlanVehicleId",
      "setListMaintenancePlanPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta apresenta uma coleção estruturada de planos preventivos."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite consultar a periodicidade do plano, a próxima quilometragem, a próxima data e a indicação de preventiva vencida para o veículo. A consulta pode ser direcionada pelo plano ou veículo informado e deve comunicar carregamento, ausência de plano e falha. Cada valor precisa de rótulo textual associado para leitura por tecnologias assistivas. Não há capacidade compartilhada para alterar um plano existente.",
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
        "reason": "O detalhe reúne informações de um plano em uma unidade consultável."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Evidencia planos com preventiva vencida por quilometragem a partir das informações do plano e do veículo. A pessoa gestora pode consultar os registros relacionados e abrir uma ordem de manutenção preventiva para o veículo indicado. Durante a consulta, comunica carregamento; se não houver preventivas vencidas nos resultados, informa esse estado; em falha, apresenta o erro de modo acessível. O vencimento deve ser indicado por texto, e não apenas por cor, e a ação contextual deve funcionar por teclado e leitor de tela.",
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
        "reason": "Os alertas são múltiplos registros que exigem leitura rápida."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Há um comando para abrir uma ordem preventiva a partir de um alerta."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta veículo, dados e nome do plano, quilometragem e data de referência, além dos intervalos opcionais em quilômetros e meses, para cadastrar a periodicidade preventiva. Os campos obrigatórios devem ser identificados, ter instruções e mensagens de erro associadas e permanecer acessíveis por teclado. Antes do envio, informa pendências obrigatórias; durante o comando, comunica processamento; no sucesso, confirma o cadastro e atualiza as consultas de planos e veículos; em erro, mostra a mensagem sem descartar os valores informados. A capacidade disponível é de cadastro, não de atualização de plano existente.",
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
        "reason": "Nome e dados textuais do plano requerem entrada de texto."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-input"
        ],
        "reason": "Quilometragem de referência e intervalo em quilômetros são valores numéricos."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-date-picker"
        ],
        "reason": "A data de referência é informada sem horário."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O cadastro é um comando explícito de envio."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O formulário precisa comunicar validação, falha e sucesso do comando."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza os comandos para cadastrar plano preventivo e abrir ordem de manutenção preventiva vinculada ao veículo e, quando informado, ao plano. Para a ordem, coleta veículo, oficina, data de entrada, detalhes, tipo e descrição da manutenção; custos previsto e final e data de saída são opcionais. As ações devem informar requisitos obrigatórios, ter nome acessível, comunicar processamento e anunciar sucesso ou erro. A criação da ordem atualiza sua consulta; a criação do plano atualiza as consultas de planos e veículos. Não há comando compartilhado de atualização.",
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
        "reason": "Os fluxos dependem de comandos explícitos para criar plano ou ordem."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "Os comandos possuem estados de sucesso e erro que devem ser comunicados."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-date-picker"
        ],
        "reason": "A ordem recebe data de entrada e, opcionalmente, data de saída."
      },
      {
        "groupId": "groupEnterMoney",
        "candidates": [
          "groupentermoney--ml-enter-money-br"
        ],
        "reason": "Os custos previsto e final são valores monetários opcionais da ordem."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "planos_preventivos__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/desktop/page11/planos_preventivos.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/desktop/page11/planos_preventivos.ts",
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
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
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
