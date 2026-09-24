export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a consulta sequencial das ordens de manutenção da frota, exibindo os dados retornados para cada ordem. A consulta pode considerar os identificadores, a oficina, a data de entrada e a página solicitada. Durante o carregamento, quando não houver ordens e em caso de falha, apresenta mensagens claras e acessíveis. Os critérios disponíveis e a paginação devem ser utilizáveis por toque e ter nomes anunciáveis.",
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
          "groupviewtable--ml-responsive-table"
        ],
        "reason": "A consulta retorna uma coleção estruturada que deve permanecer legível em tela estreita."
      },
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-compact-calendar"
        ],
        "reason": "A data de entrada é um critério aceito pela consulta e requer uso eficiente do espaço."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite consultar por toque as informações disponíveis de defeito, veículo, serviço e situação de cada ordem retornada. Dá prioridade ao conteúdo essencial e expõe somente dados retornados pela consulta. Carregamento, ausência de resultados e erro são comunicados textualmente e de modo compatível com tecnologias assistivas.",
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
        "reason": "A inspeção reúne metadados disponíveis de uma ordem para leitura concentrada em tela estreita."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Torna perceptível a indicação de manutenção concluída quando ela estiver disponível nos dados consultados, com texto que não dependa apenas de sinais visuais. Não informa conclusão durante carregamento, quando não existirem ordens ou se a consulta falhar.",
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
        "reason": "A indicação de conclusão pode acompanhar o resumo acessível da ordem."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite ao gestor registrar por toque os dados finais do serviço da ordem em contexto, incluindo veículo, plano quando aplicável, oficina, datas, detalhes, tipo, descrição e custos aceitos pela atualização. Mantém rótulos, obrigatoriedade, instruções e erros associados aos campos; preserva o que foi preenchido em caso de falha. Durante o envio e ao receber sucesso ou erro, oferece retorno acessível sem remover a capacidade de atualizar.",
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
          "groupenterdate--ml-compact-calendar"
        ],
        "reason": "A atualização aceita data de entrada e data de saída em espaço reduzido."
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
    "description": "Mantém a leitura cronológica das alterações e conclusões que forem disponibilizadas pelos dados consultados, sem criar eventos ausentes. Para leitura móvel e por leitor de tela, informa a sequência de forma clara e comunica carregamento, ausência de registros ou erro.",
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
    "description": "Disponibiliza por toque as ações de abrir ordem por defeito ou preventiva e de atualizar uma ordem selecionada. A abertura aceita os dados declarados de veículo, plano quando aplicável, oficina, data de entrada, detalhes, tipo, descrição, custos e data de saída quando disponíveis; a atualização requer uma ordem em contexto. Antes do envio, identifica obrigatoriedade; durante o processamento, no sucesso e no erro, comunica o estado de forma acessível.",
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
    "id": "ordens_manutencao__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/mobile/page11/ordens_manutencao.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/mobile/page11/ordens_manutencao.ts",
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
