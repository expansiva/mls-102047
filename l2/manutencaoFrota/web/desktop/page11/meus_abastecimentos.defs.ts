export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta os abastecimentos do motorista organizados por data para consulta. Permite informar os critérios disponíveis, inclusive identificação, veículo, motorista e página, e solicitar a lista correspondente. Enquanto a consulta estiver carregando, comunica o andamento; quando não houver registros, explica a ausência de abastecimentos; se falhar, informa o erro de consulta e permite tentar novamente. A navegação entre páginas e a leitura dos resultados devem ser acessíveis por teclado e anunciadas por tecnologias assistivas.",
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
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção de abastecimentos para leitura estruturada."
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
    "description": "Exibe os dados disponíveis do veículo consultado para o motorista conferir sua identificação e a quilometragem atual antes de registrar o abastecimento. Permite informar os critérios de consulta do veículo e carregar seus dados. Informa carregamento, ausência de veículo retornado e erro de consulta de forma compreensível, com nova tentativa disponível. As informações e o retorno da consulta devem ter nomes acessíveis para leitura assistiva.",
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
        "reason": "A consulta fornece registros de veículo com informações para conferência."
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
    "description": "Coleta os dados obrigatórios para registrar o abastecimento de um veículo atribuído: veículo, motorista, detalhes, data, litros, valor e quilometragem indicada no painel. Cada campo permite edição e deve expor rótulo, obrigatoriedade e mensagens de validação acessíveis. A pessoa pode escolher os dados do veículo consultado e enviar o registro. Durante o envio, evita duplicação; em caso de sucesso, confirma o registro e atualiza as consultas relacionadas; em caso de erro, preserva os dados informados e explica a falha para correção e nova tentativa.",
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
          "groupselectone--ml-combobox"
        ],
        "reason": "O formulário precisa definir um veículo para o registro e dispõe de consulta de veículos."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-date-picker"
        ],
        "reason": "A data do abastecimento é uma entrada obrigatória."
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
        "reason": "O envio possui estados de sucesso e erro que requerem retorno ao motorista."
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
    "description": "Disponibiliza a ação de registrar o abastecimento com os dados obrigatórios já informados. Ao acioná-la, mostra que o envio está em andamento, impede novo envio enquanto necessário, confirma o sucesso e atualiza as informações de abastecimentos e veículos; se ocorrer falha, comunica o erro e mantém a possibilidade de tentar novamente. O acionamento deve ter nome acessível e funcionar por teclado.",
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
    "id": "meus_abastecimentos__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/desktop/page11/meus_abastecimentos.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/desktop/page11/meus_abastecimentos.ts",
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
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
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
