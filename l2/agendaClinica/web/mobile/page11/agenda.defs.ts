/// <mls fileReference="_102047_/l2/agendaClinica/web/mobile/page11/agenda.defs.ts" enhancement="_blank"/>

export const definition = "Page: Agenda (agenda).\n\nPurpose: O profissional consulta as próprias consultas do dia, confere os dados de cada consulta e registra o atendimento de uma consulta agendada com a anotação obrigatória.\n\nActors: profissional.\n\nExperience: calendarGrid; No explicit style preference; used the category guidance. Selected page21 experience 'calendarGrid' for page11.\n\nSelected source: _102020_/l4/collabux/templates/categoryList.json sha256:e2ec39f01cc85b102a4be59776766b3f18892661fd2097e61b9d7f2ccfb5e746; _102020_/l4/collabux/templates/calendarScheduling/page21.md sha256:036ec6737f6dc94f96f8e61f3fdb979d92a0028e5202152ef368e0ee48f2710d.\n\nAuthority references: actor:profissional.\n\nThe approved shared definition, DTOs, grants, rules and design-system dependencies are authoritative. Do not add operations, data, state, permissions, totals or saves absent from those sources.\n\nOperation transition on Consulta: actor profissional; grants profissionalAgendaPropria; authorities profissional; rules consultaSomenteAgendadaPodeRegistrarAtendimento (l4/agendaClinica/rules.defs.ts#rules.consultaSomenteAgendadaPodeRegistrarAtendimento), anotacaoObrigatoriaNoAtendimento (l4/agendaClinica/rules.defs.ts#rules.anotacaoObrigatoriaNoAtendimento), profissionalAtendeSomentePropriaConsulta (l4/agendaClinica/rules.defs.ts#rules.profissionalAtendeSomentePropriaConsulta).\n\nOperation list on Consulta: actor profissional; grants profissionalAgendaPropria; authorities profissional; rules none.\n\nPresentation: mobile.\n\nCompose for a fluid narrow viewport: preview at 390px and check 360px and 430px. Reflow lists, details and panels into a readable sequence where needed; do not squeeze a desktop table or allow horizontal overflow. Keep actions touch-accessible and keyboard operable. Choose the sequence for this page rather than applying one mobile template everywhere.\n\nEach organism below belongs to its existing shared content scenario. When that scenario is inactive, keep its content mounted but hidden, inert and outside keyboard focus. Do not invent content scenarios or controls.\n\nOrganism organism.list.1 (list) in content content.list; declared capabilities/actions: registrarAtendimento, listConsulta; cited output fields: ListConsultaOutput.scheduledAt, ListConsultaOutput.status, ListConsultaOutput.consultaPaciente.details.identification.name, ListConsultaOutput.id. Apresenta em sequência as consultas do dia do profissional, priorizando horário, paciente e situação para leitura rápida em tela estreita. Cada consulta pode ser tocada para conferência e, se estiver agendada, para iniciar o registro de atendimento. Comunica carregamento, agenda sem consultas e erro de consulta com textos acessíveis e sem exigir rolagem horizontal.\n\nOrganism organism.detail.1 (detail) in content content.detail; declared capabilities/actions: registrarAtendimento, listConsulta; cited output fields: ListConsultaOutput.scheduledAt, ListConsultaOutput.consultaPaciente.details.identification.name, ListConsultaOutput.status. Mostra de forma sequencial o horário, o paciente e a situação da consulta tocada, permitindo ao profissional conferir as informações antes de registrar o atendimento. Para consultas agendadas, mantém disponível a ação de registro com alvo de toque identificável. Se os dados não puderem ser exibidos, apresenta uma mensagem acessível de indisponibilidade ou erro.\n\nOrganism organism.form.1 (form) in content content.form; declared capabilities/actions: registrarAtendimento, listConsulta; cited output fields: ListConsultaOutput.scheduledAt, ListConsultaOutput.consultaPaciente.details.identification.name, ListConsultaOutput.status. Permite concluir o atendimento da consulta própria selecionada e agendada, registrando a anotação obrigatória em uma sequência de leitura confortável no celular. O profissional recebe indicação clara de campo obrigatório, estado de envio, confirmação de sucesso ou mensagem de erro acessível. A ação de confirmação permanece disponível com alvo de toque adequado." as const;

export const pipeline = [
  {
    "id": "agenda__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/agenda.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/agenda.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/agenda.ts",
      "l2/designSystem.ts",
      "l2/agendaClinica/web/contracts/agenda.defs.ts",
      "_102029_.d.ts",
      "_102020_/l2/molecules/ml-scenary.ts",
      "l4/agendaClinica/access.defs.ts",
      "l4/agendaClinica/ontology/Consulta.defs.ts",
      "l4/agendaClinica/rules.defs.ts",
      "l4/agendaClinica/workflows.defs.ts"
    ],
    "dependsOn": [
      "agenda__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md",
      "_102020_/l4/collabux/templates/categoryList.json",
      "_102020_/l4/collabux/templates/calendarScheduling/page21.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ],
    "templateSelection": {
      "categoryRef": "calendarScheduling",
      "experiencePage": "page21",
      "experienceId": "calendarGrid",
      "styleId": null,
      "layoutId": null,
      "targetPage": "page11",
      "reason": "No explicit style preference; used the category guidance. Selected page21 experience 'calendarGrid' for page11.",
      "requirementsMet": [],
      "digest": "sha256:ddd60d62b4b0b6bae8ee0217b034f7767c6a81229251cf4271c8ce754066278a",
      "sources": [
        {
          "role": "category-catalog-entry",
          "reference": "_102020_/l4/collabux/templates/categoryList.json",
          "sha256": "sha256:e2ec39f01cc85b102a4be59776766b3f18892661fd2097e61b9d7f2ccfb5e746"
        },
        {
          "role": "category",
          "reference": "_102020_/l4/collabux/templates/calendarScheduling/page21.md",
          "sha256": "sha256:036ec6737f6dc94f96f8e61f3fdb979d92a0028e5202152ef368e0ee48f2710d"
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
          "registrarAtendimento"
        ],
        "capabilityRefs": [
          "registrarAtendimento",
          "listConsulta"
        ],
        "outputFieldsByCapability": {
          "registrarAtendimento": [],
          "listConsulta": [
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "id"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "version"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "pacienteId"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "profissionalId"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "scheduledAt"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "status"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details.attendanceNote"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.id"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.details"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.details.identification"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.details.identification.name"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.id"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.details"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.details.identification"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.details.identification.name"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupViewData",
            "candidates": [
              "groupviewdata--ml-vertical-record-list"
            ],
            "reason": "A lista vertical favorece a leitura sequencial das consultas em viewport estreito.",
            "indexReference": "_102040_/l2/molecules/groupviewdata/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:4c2e33ab4b2eb697a3a015dd1b423f3146f490564f3d728d9d275efdfcdd0910",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:23632c5755e10bf0b0fd2b396c497bb15de577cbcbc1c01ccdb7a27a383c68c9"
          },
          {
            "groupId": "groupTriggerAction",
            "candidates": [
              "grouptriggeraction--ml-button-standard"
            ],
            "reason": "Há uma ação contextual tocável para iniciar o registro de atendimento.",
            "indexReference": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:f7ba36337caf565fb16272cf98af9410b52155e5fb9d603fc6b7c2213284679c",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:1d4607aa57f6f738a1518456d2ee8db44c5c7d0f612cd5e76f09c89dfcb126ed"
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
          "registrarAtendimento"
        ],
        "capabilityRefs": [
          "registrarAtendimento",
          "listConsulta"
        ],
        "outputFieldsByCapability": {
          "registrarAtendimento": [],
          "listConsulta": [
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "id"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "version"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "pacienteId"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "profissionalId"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "scheduledAt"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "status"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details.attendanceNote"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.id"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.details"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.details.identification"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.details.identification.name"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.id"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.details"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.details.identification"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.details.identification.name"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupViewCard",
            "candidates": [
              "groupviewcard--ml-view-card-horizontal"
            ],
            "reason": "A apresentação compacta concentra os dados essenciais da consulta e sua ação contextual.",
            "indexReference": "_102040_/l2/molecules/groupviewcard/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:cdfd46bdd1403f4c5e591a95c20760cdcdea27a08a35e3ac65f3445195efdbc0",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:48c753bba438f309527c84f761b2d5de6e6dc434a862579cefeeb32716a034b8"
          },
          {
            "groupId": "groupTriggerAction",
            "candidates": [
              "grouptriggeraction--ml-button-standard"
            ],
            "reason": "Registrar atendimento continua sendo uma ação principal clara e tocável.",
            "indexReference": "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:f7ba36337caf565fb16272cf98af9410b52155e5fb9d603fc6b7c2213284679c",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:1d4607aa57f6f738a1518456d2ee8db44c5c7d0f612cd5e76f09c89dfcb126ed"
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
          "registrarAtendimento"
        ],
        "capabilityRefs": [
          "registrarAtendimento",
          "listConsulta"
        ],
        "outputFieldsByCapability": {
          "registrarAtendimento": [],
          "listConsulta": [
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "id"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "version"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "pacienteId"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "profissionalId"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "scheduledAt"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "status"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details.attendanceNote"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.id"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.details"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.details.identification"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaPaciente.details.identification.name"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.id"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.details"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.details.identification"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "consultaProfissional.details.identification.name"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupEnterText",
            "candidates": [
              "groupentertext--ml-multiline-text"
            ],
            "reason": "A anotação é texto livre e requer espaço de edição confortável em tela estreita.",
            "indexReference": "_102040_/l2/molecules/groupentertext/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:224a115414c9a393b96ffece5577e00e65975f049f6d11e6fadcce6a1e73cd48",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:42b85a1e9fc97f1c12ae621670afa7cc7262cb62998eba133171cc0f7be32028"
          },
          {
            "groupId": "groupTriggerAction",
            "candidates": [
              "grouptriggeraction--ml-button-standard"
            ],
            "reason": "O comando de registrar atendimento requer confirmação explícita e acessível ao toque.",
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
            "reason": "O retorno de validação, envio, sucesso ou erro precisa permanecer próximo da ação.",
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
