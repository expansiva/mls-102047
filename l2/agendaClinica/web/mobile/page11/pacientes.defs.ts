/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/pacientes.defs.ts" enhancement="_blank"/>

export const definition = "Page: Pacientes (pacientes).\n\nPurpose: A recepcionista consulta pacientes já cadastrados e registra novos pacientes com os dados de identificação permitidos, para que fiquem disponíveis para agendamento na clínica.\n\nActors: recepcionista.\n\nExperience: compactCrudTable; No explicit style preference; used the category guidance. Selected page21 experience 'compactCrudTable' for page11.\n\nSelected source: _102020_/l4/collabux/templates/categoryList.json sha256:29bc90c7cde8de8f5fe47116a78f35503e8438f55df1a0eae36480def71e7556; _102020_/l4/collabux/templates/masterDataManagement/page21.md sha256:34813eb4c8453e68befda1325e3912112f692c38e9a13457b9bb45a9fbf89a94.\n\nAuthority references: actor:recepcionista.\n\nThe approved shared definition, DTOs, grants, rules and design-system dependencies are authoritative. Do not add operations, data, state, permissions, totals or saves absent from those sources.\n\nOperation create on Paciente: actor recepcionista; grants recepcionistaGestaoAgenda; authorities recepcionista; rules rule-foreign-namespace-refused (l4/agendaClinica/ontology/Paciente.defs.ts#rules[rule-foreign-namespace-refused]), rule-document-shape-validated (l4/agendaClinica/ontology/Paciente.defs.ts#rules[rule-document-shape-validated]), rule-identity-never-in-namespace (l4/agendaClinica/ontology/Paciente.defs.ts#rules[rule-identity-never-in-namespace]), rule-person-privacy-consent-required-br-eu (l4/agendaClinica/ontology/Paciente.defs.ts#rules[rule-person-privacy-consent-required-br-eu]).\n\nOperation list on Paciente: actor recepcionista; grants recepcionistaGestaoAgenda; authorities recepcionista; rules none.\n\nPresentation: mobile.\n\nCompose for a fluid narrow viewport: preview at 390px and check 360px and 430px. Reflow lists, details and panels into a readable sequence where needed; do not squeeze a desktop table or allow horizontal overflow. Keep actions touch-accessible and keyboard operable. Choose the sequence for this page rather than applying one mobile template everywhere.\n\nEach organism below belongs to its existing shared content scenario. When that scenario is inactive, keep its content mounted but hidden, inert and outside keyboard focus. Do not invent content scenarios or controls.\n\nOrganism organism.list.1 (list) in content content.list; declared capabilities/actions: createPaciente, listPaciente; cited output fields: ListPacienteOutput.id, ListPacienteOutput.details.identification.name, ListPacienteOutput.details.identification.docType, ListPacienteOutput.details.identification.docId, ListPacienteOutput.details.identification.countryCode. Prioriza a localização do paciente pelo nome e a leitura dos resultados em sequência, sem exigir comparação lateral. Permite iniciar o cadastro de um novo paciente quando necessário. Indica carregamento, ausência de resultados e falha da consulta de forma clara; controles de busca e resultados têm rótulos acessíveis, foco visível e áreas de toque adequadas.\n\nOrganism organism.detail.1 (detail) in content content.detail; declared capabilities/actions: createPaciente, listPaciente; cited output fields: ListPacienteOutput.id, ListPacienteOutput.details.identification.name, ListPacienteOutput.details.identification.docType, ListPacienteOutput.details.identification.docId, ListPacienteOutput.details.identification.countryCode. Apresenta, em leitura sequencial, os dados de identificação disponíveis para o paciente consultado: nome, documento e país. Não apresenta telefones nem outros contatos porque esses campos não estão no resultado aprovado. Os dados preservam rótulos acessíveis e a indisponibilidade da consulta é comunicada claramente.\n\nOrganism organism.form.1 (form) in content content.form; declared capabilities/actions: createPaciente, listPaciente; cited output fields: ListPacienteOutput.details.identification.name. Conduz o cadastro em sequência de leitura, com nome e país obrigatórios e tipo e número de documento opcionais. A recepcionista envia o cadastro e recebe indicação acessível de processamento, sucesso ou erro, inclusive falhas de validação associadas ao envio, sem acrescentar dados não autorizados. Depois do êxito, o paciente pode ser localizado pelo nome na consulta atualizada; os controles preservam rótulos claros, foco e toque adequado." as const;

export const pipeline = [
  {
    "id": "pacientes__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/pacientes.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/pacientes.ts",
      "l2/designSystem.ts",
      "l2/agendaClinica/web/contracts/pacientes.defs.ts",
      "_102029_.d.ts",
      "_102020_/l2/molecules/ml-scenary.ts",
      "l4/agendaClinica/access.defs.ts",
      "l4/agendaClinica/ontology/Paciente.defs.ts",
      "l4/agendaClinica/rules.defs.ts",
      "l4/agendaClinica/workflows.defs.ts"
    ],
    "dependsOn": [
      "pacientes__l2_shared"
    ],
    "categoryRef": "masterDataManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/masterDataManagement.md",
      "_102020_/l4/collabux/templates/categoryList.json",
      "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
      "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ],
    "templateSelection": {
      "categoryRef": "masterDataManagement",
      "experiencePage": "page21",
      "experienceId": "compactCrudTable",
      "styleId": null,
      "layoutId": null,
      "targetPage": "page11",
      "reason": "No explicit style preference; used the category guidance. Selected page21 experience 'compactCrudTable' for page11.",
      "requirementsMet": [],
      "digest": "sha256:e712b0ceb301c6d7582f5d25f1841877e47c46f5c04fd9434ab7d5de5cd8164b",
      "sources": [
        {
          "role": "category-catalog-entry",
          "reference": "_102020_/l4/collabux/templates/categoryList.json",
          "sha256": "sha256:29bc90c7cde8de8f5fe47116a78f35503e8438f55df1a0eae36480def71e7556"
        },
        {
          "role": "category",
          "reference": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
          "sha256": "sha256:34813eb4c8453e68befda1325e3912112f692c38e9a13457b9bb45a9fbf89a94"
        }
      ]
    },
    "coverage": [
      {
        "organismId": "organism.list.1",
        "sourceIndex": 0,
        "kind": "list",
        "contentRef": "content.list",
        "scenarioRefs": [
          "base",
          "createPaciente"
        ],
        "capabilityRefs": [
          "createPaciente",
          "listPaciente"
        ],
        "outputFieldsByCapability": {
          "createPaciente": [],
          "listPaciente": [
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "id"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "version"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.docType"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.docId"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.countryCode"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.base"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.general"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.agendaClinica"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupSearchContent",
            "candidates": [
              "groupsearchcontent--ml-search-bar"
            ],
            "reason": "A consulta permite localizar pacientes pelo nome em espaço reduzido.",
            "indexReference": "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:4458436e93cf3d9d2ee59d0b9d1e27cbfd4b8c93c5c46f7f877f9eedef966867",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:1caf53d5f4027944d7904bdc8bc6e59ad33930072d1f3158b129d575cfbcdd85"
          },
          {
            "groupId": "groupViewData",
            "candidates": [
              "groupviewdata--ml-vertical-record-list"
            ],
            "reason": "A capacidade listPaciente retorna vários registros que podem ser lidos sequencialmente.",
            "indexReference": "_102040_/l2/molecules/groupviewdata/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:4c2e33ab4b2eb697a3a015dd1b423f3146f490564f3d728d9d275efdfcdd0910",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:23632c5755e10bf0b0fd2b396c497bb15de577cbcbc1c01ccdb7a27a383c68c9"
          }
        ]
      },
      {
        "organismId": "organism.detail.1",
        "sourceIndex": 1,
        "kind": "detail",
        "contentRef": "content.detail",
        "scenarioRefs": [
          "base",
          "createPaciente"
        ],
        "capabilityRefs": [
          "createPaciente",
          "listPaciente"
        ],
        "outputFieldsByCapability": {
          "createPaciente": [],
          "listPaciente": [
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "id"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "version"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.docType"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.docId"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.countryCode"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.base"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.general"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.agendaClinica"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupViewCard",
            "candidates": [
              "groupviewcard--ml-profile-card"
            ],
            "reason": "Os dados de identificação de um paciente consultado podem ser apresentados como uma unidade de perfil adequada à leitura móvel.",
            "indexReference": "_102040_/l2/molecules/groupviewcard/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:cdfd46bdd1403f4c5e591a95c20760cdcdea27a08a35e3ac65f3445195efdbc0",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:48c753bba438f309527c84f761b2d5de6e6dc434a862579cefeeb32716a034b8"
          }
        ]
      },
      {
        "organismId": "organism.form.1",
        "sourceIndex": 2,
        "kind": "form",
        "contentRef": "content.form",
        "scenarioRefs": [
          "base",
          "createPaciente"
        ],
        "capabilityRefs": [
          "createPaciente",
          "listPaciente"
        ],
        "outputFieldsByCapability": {
          "createPaciente": [],
          "listPaciente": [
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "id"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "version"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.docType"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.docId"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.identification.countryCode"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.base"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.general"
            },
            {
              "actionId": "listPaciente",
              "outputTypeRef": "ListPacienteOutput",
              "path": "details.agendaClinica"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupEnterText",
            "candidates": [
              "groupentertext--ml-enter-text"
            ],
            "reason": "Nome, número de documento e país são dados textuais de entrada autorizados.",
            "indexReference": "_102040_/l2/molecules/groupentertext/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:224a115414c9a393b96ffece5577e00e65975f049f6d11e6fadcce6a1e73cd48",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:42b85a1e9fc97f1c12ae621670afa7cc7262cb62998eba133171cc0f7be32028"
          },
          {
            "groupId": "groupSelectOne",
            "candidates": [
              "groupselectone--ml-select"
            ],
            "reason": "O tipo de documento possui opções mutuamente exclusivas aprovadas.",
            "indexReference": "_102040_/l2/molecules/groupselectone/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:20b935861b3c60bddb4b2d6890d5189988430900c74338e5b58f2f2243273a5e",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:71f1e28821255daecedd4f2ccd77031042841a18ee52c6bd2aa4327a81654783"
          },
          {
            "groupId": "groupTriggerAction",
            "candidates": [
              "grouptriggeraction--ml-button-standard"
            ],
            "reason": "O cadastro exige o disparo explícito do comando createPaciente.",
            "indexReference": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:f7ba36337caf565fb16272cf98af9410b52155e5fb9d603fc6b7c2213284679c",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:1d4607aa57f6f738a1518456d2ee8db44c5c7d0f612cd5e76f09c89dfcb126ed"
          },
          {
            "groupId": "groupNotifyUser",
            "candidates": [
              "groupnotifyuser--ml-contextual-feedback"
            ],
            "reason": "A operação de cadastro possui estados de sucesso e erro que requerem retorno ao usuário.",
            "indexReference": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:85dae4dc3ad57039dfeb5f9a091bfcbbb0263b74709cdca72f002a6168d382f7",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:e834c37e6c05a2153c0926fabd99957bbeec9c849a5374ccd2a25847ff70e79f"
          }
        ]
      }
    ]
  }
] as const;
