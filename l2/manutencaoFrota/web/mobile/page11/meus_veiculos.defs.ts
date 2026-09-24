export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a leitura rápida dos veículos atribuídos ao motorista e o acesso por toque às informações de cada veículo. Mostra carregamento enquanto a consulta é realizada, uma mensagem clara quando não houver veículos atribuídos e um erro compreensível se ela falhar. Caso haja mais resultados, a mudança de página deve atualizar a consulta. Preserve rótulos, foco por teclado quando houver teclado conectado e anúncios dos resultados e estados para tecnologias assistivas.",
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
        "reason": "Uma lista de registros empilhados favorece a leitura de vários veículos em espaço reduzido."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite ao motorista registrar o abastecimento de um veículo atribuído, dando prioridade à conferência dos dados operacionais do veículo, incluindo placa e quilometragem atual quando retornados na consulta. Solicita os identificadores do veículo e do motorista, os dados do abastecimento, a data, os litros, o valor e a quilometragem indicada no painel; todas essas informações são obrigatórias antes do envio. Os campos devem ser fáceis de tocar, ter rótulos e instruções anunciáveis e manter os erros próximos ao dado que precisa de correção. Ao enviar, informe o processamento e comunique sucesso ou falha; no sucesso, atualize as consultas de veículos e abastecimentos. A experiência móvel não remove nenhuma entrada nem a ação de registrar.",
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
          "groupenterdate--ml-compact-calendar"
        ],
        "reason": "A data obrigatória deve poder ser escolhida com pouco espaço disponível."
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
        "reason": "O comando de registrar abastecimento é a ação primária do fluxo."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O fluxo possui retorno de erro e sucesso que deve ser percebido após interação por toque."
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
    "description": "Dá prioridade à situação operacional e ao aviso de preventiva vencida por quilometragem do veículo consultado, para leitura imediata em deslocamento. A indicação deve identificar o veículo a que se refere e usar texto, não apenas cor ou ícone. Enquanto os dados carregam, apresente atualização; sem veículos atribuídos, explique que não há situação a mostrar; em caso de erro, informe que a situação não está disponível. Mantenha conteúdo legível e anúncios acessíveis dos alertas.",
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
    "id": "meus_veiculos__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/mobile/page11/meus_veiculos.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/mobile/page11/meus_veiculos.ts",
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
