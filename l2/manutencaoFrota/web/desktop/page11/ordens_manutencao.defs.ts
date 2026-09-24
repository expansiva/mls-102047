export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta as ordens de manutenção da frota para consulta pelo gestor, com os dados retornados para cada ordem. A consulta pode considerar os identificadores, a oficina, a data de entrada e a página solicitada. Enquanto a consulta estiver em andamento, informa o carregamento; quando não houver ordens, comunica o estado vazio; se falhar, apresenta o erro de modo acessível. Os critérios disponíveis e a paginação devem ter rótulos claros e estados compreensíveis por tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenanceOrder",
      "setListMaintenanceOrderId",
      "setListMaintenanceOrderVehicleId",
      "setListMaintenanceOrderMaintenancePlanId",
      "setListMaintenanceOrderWorkshopId",
      "setListMaintenanceOrderEntryDate",
      "setListMaintenanceOrderPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção de ordens com dados estruturados para leitura comparativa."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-date-picker"
        ],
        "reason": "A data de entrada é um critério aceito pela consulta."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite inspecionar as informações disponíveis de defeito, veículo, serviço e situação de uma ordem retornada pela consulta. Expõe somente os dados retornados; durante o carregamento, na ausência de resultados ou em caso de erro, comunica esses estados de maneira textual e acessível.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenanceOrder"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "A inspeção reúne informações disponíveis de uma ordem em uma unidade de leitura com metadados."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Destaca a indicação de manutenção concluída quando ela estiver disponível nos dados da ordem consultada. O estado deve ser anunciado com texto além de qualquer sinal visual; durante o carregamento, quando não houver ordens ou se houver erro, não indica uma conclusão que não tenha sido retornada.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenanceOrder"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "A indicação de conclusão pode ser apresentada junto aos dados resumidos disponíveis da ordem."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Registra os dados finais do serviço na ordem selecionada. Mantém o identificador da ordem em contexto e permite informar veículo, plano de manutenção, oficina, data de entrada, detalhes, tipo e descrição do serviço, custos previsto e final e data de saída conforme a atualização declarada. Identifica os dados obrigatórios, associa rótulos e mensagens de validação aos respectivos campos e preserva os valores informados após erro. Durante o envio, informa o processamento; ao concluir ou falhar, comunica o resultado de forma acessível.",
    "contentRef": "updateMaintenanceOrder",
    "capabilityRefs": [
      "setUpdateMaintenanceOrderId",
      "setUpdateMaintenanceOrderVehicleId",
      "setUpdateMaintenanceOrderMaintenancePlanId",
      "setUpdateMaintenanceOrderWorkshopId",
      "setUpdateMaintenanceOrderEntryDate",
      "setUpdateMaintenanceOrderDetails",
      "setUpdateMaintenanceOrderDetailsMaintenanceType",
      "setUpdateMaintenanceOrderDetailsDescription",
      "setUpdateMaintenanceOrderDetailsEstimatedCost",
      "setUpdateMaintenanceOrderDetailsFinalCost",
      "setUpdateMaintenanceOrderDetailsExitDate",
      "updateMaintenanceOrder"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "A atualização aceita dados textuais, incluindo detalhes e descrição do serviço."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-date-picker"
        ],
        "reason": "A atualização aceita data de entrada e data de saída."
      },
      {
        "groupId": "groupEnterMoney",
        "candidates": [
          "groupentermoney--ml-enter-money-br"
        ],
        "reason": "A atualização aceita custo previsto e custo final."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Há um comando explícito para atualizar a ordem."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O comando expõe estados de sucesso e erro que exigem retorno acessível."
      }
    ]
  },
  {
    "organismId": "organism.timeline.1",
    "kind": "timeline",
    "description": "Apresenta o histórico de alterações e conclusões quando esses dados estiverem disponíveis nas ordens consultadas, sem supor eventos que não tenham sido retornados. Mantém uma sequência legível por leitores de tela e comunica carregamento, ausência de registros e falha da consulta.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenanceOrder"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-timeline-view"
        ],
        "reason": "O organismo declara a leitura de alterações e conclusões em sequência temporal."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece ao gestor as ações para abrir uma ordem por defeito ou preventiva e para atualizar os dados de uma ordem já selecionada. A abertura coleta veículo, plano quando aplicável, oficina, data de entrada, detalhes, tipo e descrição da manutenção e custos ou data de saída quando disponíveis; a atualização exige uma ordem em contexto. As ações deixam claros os dados obrigatórios, anunciam processamento, sucesso e erro e mantêm o feedback acessível.",
    "contentRef": "createMaintenanceOrder",
    "capabilityRefs": [
      "createMaintenanceOrder",
      "updateMaintenanceOrder"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Há comandos explícitos para criar e atualizar ordens."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os comandos possuem estados de sucesso e erro."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Os comandos possuem estado de carregamento sem duração declarada."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "ordens_manutencao__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/desktop/page11/ordens_manutencao.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/desktop/page11/ordens_manutencao.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/shared/ordens_manutencao.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "ordens_manutencao__l2_shared"
    ],
    "categoryRef": "assetManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/assetManagement.md",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupenterdate/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDate/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupentermoney/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterMoney/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;
