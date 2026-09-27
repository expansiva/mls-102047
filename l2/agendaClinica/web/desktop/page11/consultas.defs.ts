/// <mls fileReference="_102047_/l2/agendaClinica/web/desktop/page11/consultas.defs.ts" enhancement="_blank"/>

export const definition = "Page: Consultas (consultas).\n\nPurpose: A recepcionista consulta e localiza consultas, agenda uma consulta com paciente, profissional, data e horário, registra a confirmação telefônica e, quando aplicável, confirma o registro de falta do paciente.\n\nActors: recepcionista.\n\nExperience: calendarGrid; No explicit style preference; used the category guidance. Selected page21 experience 'calendarGrid' for page11.\n\nSelected source: _102020_/l4/collabux/templates/categoryList.json sha256:e2ec39f01cc85b102a4be59776766b3f18892661fd2097e61b9d7f2ccfb5e746; _102020_/l4/collabux/templates/calendarScheduling/page21.md sha256:036ec6737f6dc94f96f8e61f3fdb979d92a0028e5202152ef368e0ee48f2710d.\n\nAuthority references: actor:recepcionista.\n\nThe approved shared definition, DTOs, grants, rules and design-system dependencies are authoritative. Do not add operations, data, state, permissions, totals or saves absent from those sources.\n\nOperation create on Consulta: actor recepcionista; grants recepcionistaGestaoAgenda; authorities recepcionista; rules consultaHorarioProfissionalUnico (l4/agendaClinica/rules.defs.ts#rules.consultaHorarioProfissionalUnico), consultaSomenteAgendadaPodeRegistrarFalta (l4/agendaClinica/rules.defs.ts#rules.consultaSomenteAgendadaPodeRegistrarFalta), consultaSomenteAgendadaPodeRegistrarAtendimento (l4/agendaClinica/rules.defs.ts#rules.consultaSomenteAgendadaPodeRegistrarAtendimento), anotacaoObrigatoriaNoAtendimento (l4/agendaClinica/rules.defs.ts#rules.anotacaoObrigatoriaNoAtendimento), profissionalAtendeSomentePropriaConsulta (l4/agendaClinica/rules.defs.ts#rules.profissionalAtendeSomentePropriaConsulta).\n\nOperation transition on Consulta: actor recepcionista; grants recepcionistaGestaoAgenda; authorities recepcionista; rules consultaSomenteAgendadaPodeRegistrarFalta (l4/agendaClinica/rules.defs.ts#rules.consultaSomenteAgendadaPodeRegistrarFalta).\n\nOperation update on Consulta: actor recepcionista; grants recepcionistaGestaoAgenda; authorities recepcionista; rules consultaHorarioProfissionalUnico (l4/agendaClinica/rules.defs.ts#rules.consultaHorarioProfissionalUnico), consultaSomenteAgendadaPodeRegistrarFalta (l4/agendaClinica/rules.defs.ts#rules.consultaSomenteAgendadaPodeRegistrarFalta), consultaSomenteAgendadaPodeRegistrarAtendimento (l4/agendaClinica/rules.defs.ts#rules.consultaSomenteAgendadaPodeRegistrarAtendimento), anotacaoObrigatoriaNoAtendimento (l4/agendaClinica/rules.defs.ts#rules.anotacaoObrigatoriaNoAtendimento), profissionalAtendeSomentePropriaConsulta (l4/agendaClinica/rules.defs.ts#rules.profissionalAtendeSomentePropriaConsulta).\n\nOperation list on Consulta: actor recepcionista; grants recepcionistaGestaoAgenda; authorities recepcionista; rules none.\n\nOperation list on Paciente: actor recepcionista; grants recepcionistaGestaoAgenda; authorities recepcionista; rules none.\n\nOperation list on Profissional: actor recepcionista; grants recepcionistaGestaoAgenda; authorities recepcionista; rules none.\n\nPresentation: desktop.\n\nEach organism below belongs to its existing shared content scenario. When that scenario is inactive, keep its content mounted but hidden, inert and outside keyboard focus. Do not invent content scenarios or controls.\n\nOrganism organism.list.1 (list) in content content.list; declared capabilities/actions: createConsulta, registrarFalta, updateConsulta, listConsulta, listPaciente, listProfissional; cited output fields: ListConsultaOutput.consultaPaciente.details.identification.name, ListConsultaOutput.consultaProfissional.details.identification.name, ListConsultaOutput.scheduledAt, ListConsultaOutput.status, ListPacienteOutput.details.identification.name, ListProfissionalOutput.details.identification.name. Apresenta as consultas para a recepcionista localizar por paciente, profissional, data e horário ou situação. Exibe nomes vinculados, data e horário e situação; permite refinar a consulta pelos critérios disponíveis e reconhecer carregamento, ausência de resultados e falha na consulta. Os controles de filtro e seleção devem ter rótulos claros, operação por teclado e anúncio acessível das mudanças de resultado.\n\nOrganism organism.detail.1 (detail) in content content.detail; declared capabilities/actions: createConsulta, registrarFalta, updateConsulta, listConsulta, listPaciente, listProfissional; cited output fields: ListConsultaOutput.consultaPaciente.details.identification.name, ListConsultaOutput.consultaProfissional.details.identification.name, ListConsultaOutput.scheduledAt, ListConsultaOutput.status, ListConsultaOutput.details.telephoneConfirmation.confirmedAt. Mostra os dados da consulta selecionada: paciente, profissional, data e horário, situação e, quando registrado, o momento da confirmação telefônica. Mantém uma leitura clara durante carregamento, informa indisponibilidade quando não houver dados e comunica erros de consulta de forma acessível.\n\nOrganism organism.form.1 (form) in content content.form; declared capabilities/actions: createConsulta, registrarFalta, updateConsulta, listConsulta, listPaciente, listProfissional; cited output fields: ListPacienteOutput.id, ListPacienteOutput.details.identification.name, ListProfissionalOutput.id, ListProfissionalOutput.details.identification.name. Permite agendar uma consulta selecionando paciente e profissional a partir das consultas disponíveis, informando data e horário e o momento da confirmação telefônica exigido pelo registro. Ao enviar, comunica progresso, validações e falhas, inclusive quando o horário do profissional não puder ser usado; os campos obrigatórios têm rótulos, instruções e mensagens associadas acessíveis.\n\nOrganism organism.actions.1 (actions) in content content.actions; declared capabilities/actions: createConsulta, registrarFalta, updateConsulta, listConsulta, listPaciente, listProfissional; cited output fields: ListConsultaOutput.id, ListConsultaOutput.status, ListConsultaOutput.scheduledAt, ListConsultaOutput.details.telephoneConfirmation.confirmedAt. Oferece as ações contextuais da consulta: registrar a confirmação telefônica por atualização do respectivo momento e registrar falta do paciente. A falta exige confirmação explícita e só se aplica à consulta agendada; durante a execução, informa progresso, sucesso ou erro e mantém foco e rótulos acessíveis nas confirmações." as const;

export const pipeline = [
  {
    "id": "consultas__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/consultas.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/consultas.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas.ts",
      "l2/designSystem.ts",
      "l2/agendaClinica/web/contracts/consultas.defs.ts",
      "_102029_.d.ts",
      "_102020_/l2/molecules/ml-scenary.ts",
      "l4/agendaClinica/access.defs.ts",
      "l4/agendaClinica/ontology/Consulta.defs.ts",
      "l4/agendaClinica/ontology/Paciente.defs.ts",
      "l4/agendaClinica/ontology/Profissional.defs.ts",
      "l4/agendaClinica/rules.defs.ts",
      "l4/agendaClinica/workflows.defs.ts"
    ],
    "dependsOn": [
      "consultas__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md",
      "_102020_/l4/collabux/templates/categoryList.json",
      "_102020_/l4/collabux/templates/calendarScheduling/page21.md",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
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
          "detailConsulta",
          "createConsulta",
          "updateConsulta"
        ],
        "capabilityRefs": [
          "createConsulta",
          "registrarFalta",
          "updateConsulta",
          "listConsulta",
          "listPaciente",
          "listProfissional"
        ],
        "outputFieldsByCapability": {
          "createConsulta": [],
          "registrarFalta": [],
          "updateConsulta": [],
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
              "path": "details.telephoneConfirmation"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details.telephoneConfirmation.confirmedAt"
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
          ],
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
          ],
          "listProfissional": [
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "id"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "version"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.docType"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.docId"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.countryCode"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.person"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.person.occupation"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.agendaClinica"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupViewTable",
            "candidates": [
              "groupviewtable--ml-advanced-data-table"
            ],
            "reason": "A consulta retorna uma coleção estruturada de consultas com nomes vinculados, data, horário e situação.",
            "indexReference": "_102040_/l2/molecules/groupviewtable/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:c63469f28e5e81594f34672f8959fba283b99c9869c60e3def070091642e70c9",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:230955ba3517ab88fa6eb2ec4bcb1db7eeceaa260928f7c9020ea41788b2b23c"
          },
          {
            "groupId": "groupSelectOne",
            "candidates": [
              "groupselectone--ml-combobox",
              "groupselectone--ml-select-one-autocomplete"
            ],
            "reason": "Paciente, profissional e situação são critérios de escolha única para refinar a consulta.",
            "indexReference": "_102040_/l2/molecules/groupselectone/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:20b935861b3c60bddb4b2d6890d5189988430900c74338e5b58f2f2243273a5e",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:71f1e28821255daecedd4f2ccd77031042841a18ee52c6bd2aa4327a81654783"
          },
          {
            "groupId": "groupEnterDatetime",
            "candidates": [
              "groupenterdatetime--ml-datetime-picker"
            ],
            "reason": "A data e o horário são um critério de consulta disponível.",
            "indexReference": "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:2ba95b71fec77f2f7ee120e37d41d2a11a6672423a7a0a924112d5cf90a717dd",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:baabe38614f3b26f5432d6069fae593bb5bbe72fe79c1f534548684d3f3d867f"
          },
          {
            "groupId": "groupTriggerAction",
            "candidates": [
              "grouptriggeraction--ml-button-standard"
            ],
            "reason": "A consulta filtrada é uma ação de busca acionável.",
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
          "detailConsulta",
          "createConsulta",
          "updateConsulta"
        ],
        "capabilityRefs": [
          "createConsulta",
          "registrarFalta",
          "updateConsulta",
          "listConsulta",
          "listPaciente",
          "listProfissional"
        ],
        "outputFieldsByCapability": {
          "createConsulta": [],
          "registrarFalta": [],
          "updateConsulta": [],
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
              "path": "details.telephoneConfirmation"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details.telephoneConfirmation.confirmedAt"
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
          ],
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
          ],
          "listProfissional": [
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "id"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "version"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.docType"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.docId"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.countryCode"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.person"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.person.occupation"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.agendaClinica"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupViewCard",
            "candidates": [
              "groupviewcard--ml-view-card-horizontal"
            ],
            "reason": "Os dados de uma consulta selecionada podem ser apresentados como uma unidade de leitura com informações principais e contextuais.",
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
          "detailConsulta",
          "createConsulta",
          "updateConsulta"
        ],
        "capabilityRefs": [
          "createConsulta",
          "registrarFalta",
          "updateConsulta",
          "listConsulta",
          "listPaciente",
          "listProfissional"
        ],
        "outputFieldsByCapability": {
          "createConsulta": [],
          "registrarFalta": [],
          "updateConsulta": [],
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
              "path": "details.telephoneConfirmation"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details.telephoneConfirmation.confirmedAt"
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
          ],
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
          ],
          "listProfissional": [
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "id"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "version"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.docType"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.docId"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.countryCode"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.person"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.person.occupation"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.agendaClinica"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupSelectOne",
            "candidates": [
              "groupselectone--ml-combobox",
              "groupselectone--ml-select-one-autocomplete"
            ],
            "reason": "Paciente e profissional são seleções únicas obtidas nas consultas de dados mestres.",
            "indexReference": "_102040_/l2/molecules/groupselectone/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:20b935861b3c60bddb4b2d6890d5189988430900c74338e5b58f2f2243273a5e",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:71f1e28821255daecedd4f2ccd77031042841a18ee52c6bd2aa4327a81654783"
          },
          {
            "groupId": "groupEnterDatetime",
            "candidates": [
              "groupenterdatetime--ml-datetime-picker"
            ],
            "reason": "O agendamento e o registro de confirmação exigem valores de data e horário.",
            "indexReference": "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:2ba95b71fec77f2f7ee120e37d41d2a11a6672423a7a0a924112d5cf90a717dd",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:baabe38614f3b26f5432d6069fae593bb5bbe72fe79c1f534548684d3f3d867f"
          },
          {
            "groupId": "groupTriggerAction",
            "candidates": [
              "grouptriggeraction--ml-button-standard"
            ],
            "reason": "O agendamento é um comando de criação enviado pela recepcionista.",
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
            "reason": "O comando de criação possui estados de erro e resultado que exigem retorno próximo ao envio.",
            "indexReference": "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:85dae4dc3ad57039dfeb5f9a091bfcbbb0263b74709cdca72f002a6168d382f7",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:e834c37e6c05a2153c0926fabd99957bbeec9c849a5374ccd2a25847ff70e79f"
          }
        ]
      },
      {
        "organismId": "organism.actions.1",
        "sourceIndex": 3,
        "kind": "actions",
        "contentRef": "content.actions",
        "scenarioRefs": [
          "base",
          "detailConsulta",
          "createConsulta",
          "updateConsulta"
        ],
        "capabilityRefs": [
          "createConsulta",
          "registrarFalta",
          "updateConsulta",
          "listConsulta",
          "listPaciente",
          "listProfissional"
        ],
        "outputFieldsByCapability": {
          "createConsulta": [],
          "registrarFalta": [],
          "updateConsulta": [],
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
              "path": "details.telephoneConfirmation"
            },
            {
              "actionId": "listConsulta",
              "outputTypeRef": "ListConsultaOutput",
              "path": "details.telephoneConfirmation.confirmedAt"
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
          ],
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
          ],
          "listProfissional": [
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "id"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "version"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.subtype"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.name"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.status"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.docType"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.docId"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.identification.countryCode"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.base"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.person"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.person.occupation"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.general"
            },
            {
              "actionId": "listProfissional",
              "outputTypeRef": "ListProfissionalOutput",
              "path": "details.agendaClinica"
            }
          ]
        },
        "moleculeRecommendations": [
          {
            "groupId": "groupEnterDatetime",
            "candidates": [
              "groupenterdatetime--ml-datetime-picker"
            ],
            "reason": "A atualização registra o momento da confirmação telefônica.",
            "indexReference": "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
            "indexVia": "stor",
            "indexSha256": "sha256:2ba95b71fec77f2f7ee120e37d41d2a11a6672423a7a0a924112d5cf90a717dd",
            "usageContractReference": "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts",
            "usageContractVia": "stor",
            "usageContractSha256": "sha256:baabe38614f3b26f5432d6069fae593bb5bbe72fe79c1f534548684d3f3d867f"
          },
          {
            "groupId": "groupTriggerAction",
            "candidates": [
              "grouptriggeraction--ml-button-standard"
            ],
            "reason": "A atualização e o registro de falta são comandos contextuais da consulta.",
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
              "groupnotifyuser--ml-contextual-feedback",
              "groupnotifyuser--ml-alert-modal"
            ],
            "reason": "As ações possuem estados de execução e erro; a falta requer confirmação explícita.",
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
