export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes já associados à clínica e consultar os resultados retornados. A busca usa os dados de paciente disponíveis, incluindo identificação e nome, para apoiar a prevenção de cadastros duplicados. Enquanto a consulta estiver em andamento, informa o carregamento; se não houver resultados, comunica que nenhum paciente foi encontrado; se falhar, apresenta o erro e oferece nova tentativa. A coleção e seus controles de consulta devem ter rótulos acessíveis e resultados compreensíveis por tecnologias assistivas.",
    "contentRef": "listPaciente",
    "capabilityRefs": [
      "listPaciente",
      "setListPacienteDetailsIdentificationName",
      "setListPacientePage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção de pacientes que precisa ser lida e percorrida."
      },
      {
        "groupId": "groupSearchContent",
        "candidates": [
          "groupsearchcontent--ml-search-filters"
        ],
        "reason": "A localização de paciente pode usar o nome informado na consulta para refinar os resultados."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta os dados disponíveis do paciente localizado para que a recepcionista confira nome e identificação antes de continuar o atendimento. Indica carregamento durante a consulta, ausência de dados quando não houver paciente retornado e erro com opção de tentar consultar novamente. As informações devem ter rótulos claros e uma leitura acessível da identificação e dos demais dados retornados.",
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
        "reason": "Os dados de um paciente podem ser apresentados como um resumo individual, com nome e identificação em destaque."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta os dados cadastrais necessários para criar ou associar um paciente à clínica: nome e código do país são obrigatórios; tipo e número do documento, apelidos e observações podem ser informados quando aplicáveis. Os campos devem expor rótulos, obrigatoriedade e instruções de forma acessível. Durante o envio, preserva os valores e informa que o cadastro está sendo processado; em caso de erro, comunica a falha associada ao envio para correção e nova submissão.",
    "contentRef": "createPaciente",
    "capabilityRefs": [
      "setCreatePacienteDetailsIdentificationName",
      "setCreatePacienteDetailsIdentificationCountryCode",
      "setCreatePacienteDetailsIdentificationDocType",
      "setCreatePacienteDetailsIdentificationDocId",
      "setCreatePacienteDetailsBaseAliases",
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
        "reason": "O cadastro recebe nome, dados textuais de identificação, apelidos e observações."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O cadastro precisa de uma ação explícita para executar createPaciente."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O envio possui estados de erro que devem ser comunicados junto ao cadastro."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza a ação para registrar o paciente informado e confirmar que ele poderá receber consultas. A ação só deve ser executada com os dados obrigatórios preenchidos; informa o processamento, o resultado concluído ou o erro retornado, permitindo nova tentativa. O comando deve ter nome acessível, estado desabilitado ou de carregamento quando apropriado e feedback anunciado de forma acessível.",
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
        "reason": "Há um comando de criação de paciente a ser disparado pela recepcionista."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O comando possui estados de sucesso e erro que requerem retorno à usuária."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O estado de envio do comando tem duração não especificada."
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
      "l2/agendaClinica/web/shared/pacientes.ts"
    ],
    "dependsOn": [
      "pacientes__l2_shared"
    ],
    "categoryRef": "masterDataManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/masterDataManagement.md",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;
