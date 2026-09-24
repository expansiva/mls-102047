export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a leitura dos abastecimentos do motorista organizados por data, com resultados fáceis de percorrer em espaço reduzido. Permite informar os critérios disponíveis, inclusive identificação, veículo, motorista e página, e solicitar a lista correspondente. Durante o carregamento, comunica o andamento; sem registros, informa a ausência de abastecimentos; em caso de erro, explica a falha e oferece nova tentativa. A navegação entre páginas e cada resultado devem ter alvos de toque identificáveis e alternativas por leitor de tela.",
    "contentRef": "base",
    "capabilityRefs": [
      "listFueling",
      "setListFuelingId",
      "setListFuelingVehicleId",
      "setListFuelingDriverId",
      "setListFuelingPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A consulta retorna vários abastecimentos e a lista empilhada favorece leitura em tela estreita."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "A consulta possui estados de erro que precisam ser comunicados."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra os dados disponíveis do veículo consultado, dando prioridade à identificação e à quilometragem atual para conferência antes do abastecimento. Permite informar os critérios de consulta e carregar os dados do veículo. Comunica carregamento, ausência de resultado e erro, permitindo nova tentativa. Os dados devem permanecer legíveis em tela reduzida e ter nomes acessíveis para tecnologias assistivas.",
    "contentRef": "vehicle",
    "capabilityRefs": [
      "listVehicle",
      "setListVehicleDetails",
      "setListVehicleDetailsIdentification",
      "setListVehicleDetailsIdentificationSubtype",
      "setListVehicleDetailsIdentificationName",
      "setListVehicleDetailsIdentificationStatus",
      "setListVehicleDetailsIdentificationCountryCode",
      "setListVehiclePage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A consulta fornece registros de veículo para conferência em leitura vertical."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "A consulta do veículo possui estado de erro."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite ao motorista registrar, com prioridade de leitura e toque, veículo, motorista, detalhes, data, litros, valor e quilometragem do painel. Todos os dados são obrigatórios, editáveis e precisam ter rótulos, indicação de obrigatoriedade e mensagens de validação anunciadas de modo acessível. A pessoa pode usar os veículos consultados para definir o veículo do registro e enviar os dados. No envio, evita duplicação; confirma o sucesso e atualiza as consultas relacionadas; se falhar, mantém as informações preenchidas e apresenta a orientação para nova tentativa.",
    "contentRef": "createFueling",
    "capabilityRefs": [
      "listVehicle",
      "setCreateFuelingVehicleId",
      "setCreateFuelingDriverId",
      "setCreateFuelingDetails",
      "setCreateFuelingDetailsFuelingDate",
      "setCreateFuelingDetailsLiters",
      "setCreateFuelingDetailsAmount",
      "setCreateFuelingDetailsOdometerKm",
      "createFueling"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-select-one-autocomplete"
        ],
        "reason": "O formulário precisa definir um veículo a partir da consulta disponível, preservando a busca em espaço reduzido."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-compact-calendar"
        ],
        "reason": "A data obrigatória deve ser informada com economia de espaço."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-input"
        ],
        "reason": "Litros e quilometragem são entradas numéricas obrigatórias."
      },
      {
        "groupId": "groupEnterMoney",
        "candidates": [
          "groupentermoney--ml-enter-money-br"
        ],
        "reason": "O valor do abastecimento é uma entrada monetária obrigatória."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O envio possui sucesso e erro que requerem retorno acessível."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O formulário executa o comando de registrar abastecimento."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece o acionamento para registrar o abastecimento depois que os dados obrigatórios foram preenchidos. Comunica o envio em andamento, evita novo toque enquanto necessário, confirma o resultado e atualiza as informações de abastecimentos e veículos; se houver falha, explica o erro e permite tentar novamente. O alvo de toque deve ter nome acessível e também ser operável por tecnologias assistivas.",
    "contentRef": "createFueling",
    "capabilityRefs": [
      "createFueling"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Executa o comando de criar o registro de abastecimento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O comando possui resultado e erro que devem ser comunicados."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O comando possui estado de carregamento de duração não definida."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "meus_abastecimentos__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/mobile/page11/meus_abastecimentos.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/mobile/page11/meus_abastecimentos.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/shared/meus_abastecimentos.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "meus_abastecimentos__l2_shared"
    ],
    "categoryRef": "fieldDataCapture",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/fieldDataCapture.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/groupenterdate/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDate/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/groupentermoney/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterMoney/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;
