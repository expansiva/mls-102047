export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes já associados à clínica por dados cadastrais, com prioridade para a busca por nome e leitura rápida dos resultados em espaço reduzido. Enquanto consulta, anuncia o carregamento; sem correspondências, informa que não há pacientes encontrados; e, em falha, mostra o erro de forma compreensível. Os controles devem ter alvos de toque claros, rótulos acessíveis e foco perceptível para navegação assistiva.",
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
          "groupviewtable--ml-responsive-data-table"
        ],
        "reason": "A consulta retorna uma coleção de pacientes que precisa permanecer legível em telas estreitas."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta os dados cadastrais retornados para o paciente localizado, dando prioridade ao nome e à identificação antes dos demais dados, como documento e país quando informados. Comunica carregamento, ausência de registro e erro da consulta sem depender apenas de cor. O conteúdo deve ser lido em ordem lógica, com rótulos associados, e funcionar por toque e tecnologias assistivas.",
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
    "description": "Coleta para o cadastro do paciente os dados cadastrais, nome, código do país e apelidos obrigatórios, além de documento e observações quando informados. Em tela reduzida, mantém a leitura e o preenchimento em sequência clara, com rótulos, obrigatoriedade e erros vinculados aos campos para toque e leitores de tela. Informa o processamento ao enviar, permite corrigir erro retornado e confirma o sucesso quando o paciente fica disponível para a agenda.",
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
    "description": "Oferece uma ação de toque para registrar o paciente com os dados preenchidos, mantendo-a disponível somente quando os dados obrigatórios permitirem o envio. Comunica de forma acessível o processamento, a confirmação do registro e qualquer erro que impeça a conclusão, sem remover a possibilidade de corrigir os dados e tentar novamente.",
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
    "id": "pacientes__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/pacientes.ts",
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
