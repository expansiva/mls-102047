export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta os veículos atribuídos ao motorista para consulta e acesso às respectivas informações operacionais. Enquanto a consulta estiver em andamento, informe o carregamento; quando não houver veículos atribuídos, explique a ausência de resultados; se a consulta falhar, comunique o erro de forma compreensível. Caso haja mais resultados, a mudança de página deve atualizar a consulta. Garanta rótulos compreensíveis, foco pelo teclado e anúncio dos estados e resultados para tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle",
      "setListVehiclePage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A consulta retorna uma coleção de veículos atribuídos que precisa ser percorrida e inspecionada."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite registrar o abastecimento de um veículo atribuído, mantendo disponíveis para conferência os dados operacionais do veículo, incluindo placa e quilometragem atual quando retornados na consulta. Solicita os identificadores do veículo e do motorista, os dados do abastecimento, a data, os litros, o valor e a quilometragem indicada no painel; todas essas informações são obrigatórias antes do envio. Informe claramente campos obrigatórios e erros de preenchimento. Ao enviar, comunique o processamento, o sucesso ou a falha; após sucesso, atualize as consultas de veículos e abastecimentos. Os controles devem ter rótulos e instruções associados, ordem de foco lógica e erros anunciados para leitores de tela.",
    "contentRef": "createFueling",
    "capabilityRefs": [
      "createFueling",
      "setCreateFuelingVehicleId",
      "setCreateFuelingDriverId",
      "setCreateFuelingDetails",
      "setCreateFuelingDetailsFuelingDate",
      "setCreateFuelingDetailsLiters",
      "setCreateFuelingDetailsAmount",
      "setCreateFuelingDetailsOdometerKm",
      "listVehicle",
      "listFueling"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterDate",
        "candidates": [
          "groupenterdate--ml-date-picker"
        ],
        "reason": "O registro exige a data do abastecimento."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-input"
        ],
        "reason": "Litros e quilometragem do painel são valores numéricos obrigatórios."
      },
      {
        "groupId": "groupEnterMoney",
        "candidates": [
          "groupentermoney--ml-enter-money-br"
        ],
        "reason": "O valor do abastecimento exige entrada monetária apropriada ao contexto brasileiro."
      },
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Os identificadores obrigatórios de veículo e motorista precisam de entrada textual."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O comando de registrar abastecimento é uma ação primária de envio."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O fluxo possui estados de erro e sucesso que devem retornar feedback ao motorista."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O status do comando informa processamento sem duração conhecida."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Resume a situação operacional do veículo consultado e destaca a indicação de manutenção preventiva vencida por quilometragem quando essa informação estiver disponível. A indicação deve estar associada ao veículo que a originou e permanecer compreensível sem depender apenas de cor ou ícone. Durante o carregamento, apresente o estado de atualização; sem veículos atribuídos, não exiba alertas sem referência; em erro, informe que a situação não pôde ser carregada. As informações precisam ter texto acessível e leitura anunciável por tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "A situação operacional e a indicação de preventiva vencida são indicadores destacados derivados da consulta do veículo."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "meus_veiculos__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/desktop/page11/meus_veiculos.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/desktop/page11/meus_veiculos.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/shared/meus_veiculos.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "meus_veiculos__l2_shared"
    ],
    "categoryRef": "assetManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/assetManagement.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupenterdate/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDate/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/groupentermoney/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterMoney/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupviewmetric/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts"
    ]
  }
] as const;
