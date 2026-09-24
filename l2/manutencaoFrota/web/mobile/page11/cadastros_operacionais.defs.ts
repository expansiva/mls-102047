export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite ao gestor consultar os cadastros de motoristas, veículos, oficinas e atribuições de veículos, priorizando a identificação de cada resultado para leitura sequencial em tela estreita. A consulta reflete carregamento, ausência de resultados e falha; os recursos de paginação da consulta podem solicitar outra página. Os resultados devem ter rótulos acessíveis, ordem de foco previsível e alvos adequados ao toque.",
    "contentRef": "base",
    "capabilityRefs": [
      "listDriver",
      "listVehicle",
      "listWorkshop",
      "listVehicleAssignment"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-responsive-data-table",
          "groupviewtable--ml-responsive-table"
        ],
        "reason": "As consultas retornam coleções e precisam permanecer legíveis em telas estreitas."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "As consultas possuem estados de erro que precisam ser comunicados."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta as informações disponíveis do motorista, veículo, oficina ou atribuição selecionada, com prioridade para os dados de identificação em leitura móvel. Deve comunicar indisponibilidade, carregamento e erro quando os dados consultados não puderem ser exibidos. Os dados e comandos precisam de rótulos compreensíveis para leitor de tela e foco previsível; atualizações só se aplicam após haver um registro selecionado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listDriver",
      "listVehicle",
      "listWorkshop",
      "listVehicleAssignment",
      "updateDriver",
      "updateVehicle",
      "updateWorkshop",
      "updateVehicleAssignment"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "O organismo apresenta informações de um registro selecionado para consulta e atualização contextual."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Consultas e atualizações expõem estados de erro que exigem retorno acessível no contexto do registro."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta os dados necessários para cadastrar ou atualizar motoristas, veículos, oficinas e atribuições de veículos, mantendo os mesmos campos obrigatórios e validações da experiência desktop. Em tela estreita, a leitura e o preenchimento devem seguir uma ordem clara, com rótulos, obrigatoriedade e erros associados aos respectivos campos. Para veículo, são obrigatórios placa, modelo, ano e quilometragem atual; para oficina, tipo e razão social; para atribuição, veículo, motorista e rótulo. O identificador selecionado em atualizações permanece não editável. Durante o envio, o andamento deve ser anunciado e novos envios evitados até a conclusão.",
    "contentRef": "createDriver",
    "capabilityRefs": [
      "createDriver",
      "createVehicle",
      "createWorkshop",
      "createVehicleAssignment",
      "updateDriver",
      "updateVehicle",
      "updateWorkshop",
      "updateVehicleAssignment"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Os fluxos recebem nomes, documentos, placa, modelo, razão social e rótulo de atribuição."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-input"
        ],
        "reason": "O veículo exige ano e quilometragem atual."
      },
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-combobox",
          "groupselectone--ml-select-one-autocomplete"
        ],
        "reason": "A atribuição exige a escolha de um veículo e de um motorista por identificador."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Os comandos de criação e atualização são disparados após o preenchimento."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-linear-progress"
        ],
        "reason": "Os comandos possuem estado de carregamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os comandos possuem estado de erro e requerem retorno associado ao preenchimento."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece ao gestor os mesmos comandos suportados para cadastrar e atualizar motoristas, veículos, oficinas e atribuições de veículos, com alvos de toque claros e rótulos visíveis. A atualização requer o identificador do registro selecionado. Cada comando deve anunciar execução, resultado ou erro de forma acessível, evitar acionamentos repetidos enquanto estiver carregando e permanecer operável por teclado.",
    "contentRef": "createDriver",
    "capabilityRefs": [
      "createDriver",
      "createVehicle",
      "createWorkshop",
      "createVehicleAssignment",
      "updateDriver",
      "updateVehicle",
      "updateWorkshop",
      "updateVehicleAssignment"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard",
          "grouptriggeraction--ml-button-group"
        ],
        "reason": "O organismo executa comandos explícitos de criação e atualização."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Os comandos expõem estado de carregamento sem duração declarada."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os comandos expõem resultados e erros que devem ser comunicados ao gestor."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "cadastros_operacionais__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/mobile/page11/cadastros_operacionais.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/mobile/page11/cadastros_operacionais.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/shared/cadastros_operacionais.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "cadastros_operacionais__l2_shared"
    ],
    "categoryRef": "masterDataManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/masterDataManagement.md",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;
