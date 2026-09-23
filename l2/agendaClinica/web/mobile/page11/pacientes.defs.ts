export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes já associados à clínica e consultar os resultados retornados, priorizando nome e identificação para leitura em tela menor. A busca usa os dados de paciente disponíveis para apoiar a prevenção de cadastros duplicados. Durante o carregamento, informa o progresso; sem resultados, comunica que nenhum paciente foi encontrado; em erro, apresenta a falha e permite nova tentativa. Os controles de busca, paginação e resultados devem ter rótulos acessíveis e alvos de toque claros.",
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
          "groupviewtable--ml-responsive-data-table"
        ],
        "reason": "A consulta retorna uma coleção de pacientes que deve permanecer legível em telas estreitas."
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
    "description": "Apresenta os dados disponíveis do paciente localizado para conferência, dando prioridade ao nome e à identificação na leitura móvel. Indica carregamento durante a consulta, ausência de dados quando não houver paciente retornado e erro com opção de tentar consultar novamente. As informações precisam de rótulos claros e leitura acessível por tecnologias assistivas.",
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
        "reason": "Os dados de um paciente podem ser apresentados como um resumo individual adequado à leitura móvel."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta os dados para criar ou associar um paciente à clínica, com nome e código do país obrigatórios e dados complementares de identificação, apelidos e observações quando aplicáveis. Em espaço reduzido, mantém a prioridade dos campos obrigatórios sem remover os demais dados suportados. Rótulos, obrigatoriedade e erros devem ser anunciados de forma acessível. Ao enviar, preserva os valores, informa o processamento e comunica a falha retornada para correção e nova submissão.",
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
    "description": "Oferece o toque para registrar o paciente informado e confirmar que ele poderá receber consultas. A ação respeita os dados obrigatórios, informa processamento, sucesso ou erro e permite nova tentativa se necessário. O controle deve ter rótulo acessível, alvo de toque claro e estado de carregamento ou indisponibilidade comunicado adequadamente.",
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
    "id": "pacientes__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/pacientes.ts",
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
