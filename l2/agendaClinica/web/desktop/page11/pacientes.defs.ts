export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes já associados à clínica pelos dados cadastrais disponíveis, com busca por nome e leitura dos resultados retornados. Durante a consulta, informa o carregamento; se não houver correspondências, comunica a ausência de pacientes; e, se ocorrer falha, apresenta o erro da consulta de maneira compreensível. A busca e os resultados devem ter rótulos claros, foco perceptível e leitura adequada por tecnologias assistivas.",
    "contentRef": "listPaciente",
    "capabilityRefs": [
      "listPaciente",
      "setListPacienteDetailsIdentificationName"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-floating-text-input"
        ],
        "reason": "O nome é um dado textual disponível para orientar a localização do paciente."
      },
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção de pacientes para leitura estruturada."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra os dados cadastrais retornados para o paciente localizado, priorizando nome, identificação, documento quando informado e país. Indica carregamento durante a consulta, ausência de registro quando nenhum paciente for encontrado e mensagem de erro quando a consulta não puder ser concluída. As informações devem ter rótulos associados e sequência de leitura acessível.",
    "contentRef": "listPaciente",
    "capabilityRefs": [
      "listPaciente"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-profile-card"
        ],
        "reason": "Os dados de uma pessoa podem ser apresentados como um resumo identificável do paciente."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta os dados necessários para registrar ou associar um novo paciente à clínica: dados cadastrais, nome, código do país e apelidos, com documento e observações quando informados. Explica os dados obrigatórios, preserva os valores preenchidos e associa cada campo a rótulo e mensagem de validação acessíveis. Durante o envio, informa que o cadastro está sendo processado; em caso de erro, apresenta o retorno para correção; após sucesso, confirma que o paciente ficou disponível para a agenda.",
    "contentRef": "createPaciente",
    "capabilityRefs": [
      "setCreatePacienteDetails",
      "setCreatePacienteDetailsIdentificationName",
      "setCreatePacienteDetailsIdentificationCountryCode",
      "setCreatePacienteDetailsBaseAliases",
      "setCreatePacienteDetailsIdentificationDocType",
      "setCreatePacienteDetailsIdentificationDocId",
      "setCreatePacienteDetailsBaseNotes",
      "createPaciente"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text",
          "groupentertext--ml-tag-input",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Nome, documento e país são textos; apelidos admitem múltiplos valores e observações podem ser textuais longas."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O cadastro é confirmado pelo comando de criação do paciente."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O formulário precisa comunicar validação, falha e confirmação do comando."
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
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza a ação de registrar o paciente com os dados preenchidos para que ele possa receber consultas. A ação só deve prosseguir quando os dados obrigatórios estiverem presentes, comunica o processamento enquanto o comando está em andamento, confirma o resultado bem-sucedido e expõe o erro de forma acessível caso o registro não seja concluído.",
    "contentRef": "createPaciente",
    "capabilityRefs": [
      "createPaciente"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Há um comando explícito para criar o paciente."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O resultado de sucesso ou erro do comando deve ser comunicado à recepcionista."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O comando possui estado de carregamento."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "pacientes__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/pacientes.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/pacientes.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "pacientes__l2_shared"
    ],
    "categoryRef": "masterDataManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/masterDataManagement.md",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;
