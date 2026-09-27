/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/consultas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-26-agent-defs-l2-shared-v4",
  "moduleName": "agendaClinica",
  "pageId": "consultas",
  "pageName": "Consultas",
  "baseClassName": "ConsultasShared",
  "routePattern": "/consultas",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/consultas.defs.ts",
    "calls": [
      {
        "actionId": "createConsulta",
        "routeConst": "createConsultaRoute",
        "inputType": "CreateConsultaInput",
        "outputType": "CreateConsultaOutput"
      },
      {
        "actionId": "registrarFalta",
        "routeConst": "registrarFaltaRoute",
        "inputType": "RegistrarFaltaInput",
        "outputType": "RegistrarFaltaOutput"
      },
      {
        "actionId": "updateConsulta",
        "routeConst": "updateConsultaRoute",
        "inputType": "UpdateConsultaInput",
        "outputType": "UpdateConsultaOutput"
      },
      {
        "actionId": "listConsulta",
        "routeConst": "listConsultaRoute",
        "inputType": "ListConsultaInput",
        "outputType": "ListConsultaOutput"
      },
      {
        "actionId": "listPaciente",
        "routeConst": "listPacienteRoute",
        "inputType": "ListPacienteInput",
        "outputType": "ListPacienteOutput"
      },
      {
        "actionId": "listProfissional",
        "routeConst": "listProfissionalRoute",
        "inputType": "ListProfissionalInput",
        "outputType": "ListProfissionalOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.consultas.pageStatus",
      "memberName": "pageStatus",
      "name": "pageStatus",
      "kind": "pageStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "empty",
        "success",
        "error"
      ]
    },
    {
      "stateKey": "ui.consultas.scenary",
      "memberName": "scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "detailConsulta",
        "createConsulta",
        "updateConsulta"
      ]
    },
    {
      "stateKey": "ui.consultas.createConsulta.input.pacienteId",
      "memberName": "stateCreateConsultaPacienteId",
      "name": "pacienteId",
      "kind": "input",
      "defaultValue": null,
      "title": "Paciente",
      "description": "Paciente para quem a consulta foi agendada.",
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.pacienteId",
      "ontologyRef": "Consulta.pacienteId",
      "dtoPath": "pacienteId",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas.createConsulta.input.profissionalId",
      "memberName": "stateCreateConsultaProfissionalId",
      "name": "profissionalId",
      "kind": "input",
      "defaultValue": null,
      "title": "Profissional",
      "description": "Profissional responsável por realizar a consulta.",
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.profissionalId",
      "ontologyRef": "Consulta.profissionalId",
      "dtoPath": "profissionalId",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas.createConsulta.input.scheduledAt",
      "memberName": "stateCreateConsultaScheduledAt",
      "name": "scheduledAt",
      "kind": "input",
      "defaultValue": null,
      "title": "Data e horário",
      "description": "Data e horário em que a consulta está marcada; é usado para consultar a agenda diária do profissional.",
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.scheduledAt",
      "ontologyRef": "Consulta.scheduledAt",
      "dtoPath": "scheduledAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.createConsulta.input.details.telephoneConfirmation.confirmedAt",
      "memberName": "stateCreateConsultaDetailsTelephoneConfirmationConfirmedAt",
      "name": "confirmedAt",
      "kind": "input",
      "defaultValue": null,
      "title": "Confirmada em",
      "description": "Data e horário em que a consulta foi confirmada por telefone.",
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.details.telephoneConfirmation.confirmedAt",
      "ontologyRef": "Consulta.details.telephoneConfirmation.confirmedAt",
      "dtoPath": "details.telephoneConfirmation.confirmedAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.createConsulta.status",
      "memberName": "stateCreateConsultaStatus",
      "name": "createConsultaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createConsulta"
    },
    {
      "stateKey": "ui.consultas.createConsulta.error",
      "memberName": "stateCreateConsultaError",
      "name": "createConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createConsulta"
    },
    {
      "stateKey": "ui.consultas.createConsulta.result",
      "memberName": "stateCreateConsultaResult",
      "name": "createConsultaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas.registrarFalta.input.id",
      "memberName": "stateRegistrarFaltaId",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "title": "Id",
      "actionRef": "registrarFalta",
      "contractRef": "RegistrarFaltaInput.id",
      "ontologyRef": "Consulta.id",
      "dtoPath": "id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas.registrarFalta.status",
      "memberName": "stateRegistrarFaltaStatus",
      "name": "registrarFaltaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "registrarFalta"
    },
    {
      "stateKey": "ui.consultas.registrarFalta.error",
      "memberName": "stateRegistrarFaltaError",
      "name": "registrarFaltaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "registrarFalta"
    },
    {
      "stateKey": "ui.consultas.registrarFalta.result",
      "memberName": "stateRegistrarFaltaResult",
      "name": "registrarFaltaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "registrarFalta",
      "contractRef": "RegistrarFaltaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.id",
      "memberName": "stateUpdateConsultaId",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "title": "Id",
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.id",
      "ontologyRef": "Consulta.id",
      "dtoPath": "id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.pacienteId",
      "memberName": "stateUpdateConsultaPacienteId",
      "name": "pacienteId",
      "kind": "input",
      "defaultValue": null,
      "title": "Paciente",
      "description": "Paciente para quem a consulta foi agendada.",
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.pacienteId",
      "ontologyRef": "Consulta.pacienteId",
      "dtoPath": "pacienteId",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.profissionalId",
      "memberName": "stateUpdateConsultaProfissionalId",
      "name": "profissionalId",
      "kind": "input",
      "defaultValue": null,
      "title": "Profissional",
      "description": "Profissional responsável por realizar a consulta.",
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.profissionalId",
      "ontologyRef": "Consulta.profissionalId",
      "dtoPath": "profissionalId",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.scheduledAt",
      "memberName": "stateUpdateConsultaScheduledAt",
      "name": "scheduledAt",
      "kind": "input",
      "defaultValue": null,
      "title": "Data e horário",
      "description": "Data e horário em que a consulta está marcada; é usado para consultar a agenda diária do profissional.",
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.scheduledAt",
      "ontologyRef": "Consulta.scheduledAt",
      "dtoPath": "scheduledAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.details.telephoneConfirmation.confirmedAt",
      "memberName": "stateUpdateConsultaDetailsTelephoneConfirmationConfirmedAt",
      "name": "confirmedAt",
      "kind": "input",
      "defaultValue": null,
      "title": "Confirmada em",
      "description": "Data e horário em que a consulta foi confirmada por telefone.",
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.details.telephoneConfirmation.confirmedAt",
      "ontologyRef": "Consulta.details.telephoneConfirmation.confirmedAt",
      "dtoPath": "details.telephoneConfirmation.confirmedAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.status",
      "memberName": "stateUpdateConsultaStatus",
      "name": "updateConsultaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateConsulta"
    },
    {
      "stateKey": "ui.consultas.updateConsulta.error",
      "memberName": "stateUpdateConsultaError",
      "name": "updateConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateConsulta"
    },
    {
      "stateKey": "ui.consultas.updateConsulta.result",
      "memberName": "stateUpdateConsultaResult",
      "name": "updateConsultaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas.listConsulta.input.id",
      "memberName": "stateListConsultaId",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "title": "Id",
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.id",
      "ontologyRef": "Consulta.id",
      "dtoPath": "id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listConsulta.input.pacienteId",
      "memberName": "stateListConsultaPacienteId",
      "name": "pacienteId",
      "kind": "input",
      "defaultValue": null,
      "title": "Paciente",
      "description": "Paciente para quem a consulta foi agendada.",
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.pacienteId",
      "ontologyRef": "Consulta.pacienteId",
      "dtoPath": "pacienteId",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listConsulta.input.profissionalId",
      "memberName": "stateListConsultaProfissionalId",
      "name": "profissionalId",
      "kind": "input",
      "defaultValue": null,
      "title": "Profissional",
      "description": "Profissional responsável por realizar a consulta.",
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.profissionalId",
      "ontologyRef": "Consulta.profissionalId",
      "dtoPath": "profissionalId",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listConsulta.input.scheduledAt",
      "memberName": "stateListConsultaScheduledAt",
      "name": "scheduledAt",
      "kind": "input",
      "defaultValue": null,
      "title": "Data e horário",
      "description": "Data e horário em que a consulta está marcada; é usado para consultar a agenda diária do profissional.",
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.scheduledAt",
      "ontologyRef": "Consulta.scheduledAt",
      "dtoPath": "scheduledAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listConsulta.input.status",
      "memberName": "stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "title": "Situação",
      "description": "Situação operacional da consulta.",
      "enumOptions": [
        {
          "value": "scheduled",
          "label": "Agendada"
        },
        {
          "value": "noShow",
          "label": "Falta registrada"
        },
        {
          "value": "attended",
          "label": "Atendida"
        }
      ],
      "valueSet": [
        "scheduled",
        "noShow",
        "attended"
      ],
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.status",
      "ontologyRef": "Consulta.status",
      "dtoPath": "status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listConsulta.input.page",
      "memberName": "stateListConsultaPage",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.page",
      "ontologyRef": "Consulta.$page",
      "dtoPath": "page",
      "source": "routeParam",
      "presentation": "route",
      "editable": false,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listConsulta.status",
      "memberName": "stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006300006f00006e00007300007500006c00007400006100007300002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073",
      "name": "listConsultaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.consultas.listConsulta.error",
      "memberName": "stateListConsultaError",
      "name": "listConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.consultas.listConsulta.result",
      "memberName": "stateListConsultaResult",
      "name": "listConsultaResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.consultas.listPaciente.input.id",
      "memberName": "stateListPacienteId",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "description": "mdmId; stable through promotion and merge.",
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.id",
      "ontologyRef": "Paciente.id",
      "dtoPath": "id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listPaciente.input.details.identification.subtype",
      "memberName": "stateListPacienteDetailsIdentificationSubtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "title": "Tipo de cadastro",
      "description": "Indica que este registro mestre é uma pessoa.",
      "enumOptions": [
        {
          "value": "Person",
          "label": "Pessoa física"
        }
      ],
      "valueSet": [
        "Person"
      ],
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.details.identification.subtype",
      "ontologyRef": "Paciente.details.identification.subtype",
      "dtoPath": "details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listPaciente.input.details.identification.name",
      "memberName": "stateListPacienteDetailsIdentificationName",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "title": "Nome",
      "description": "Nome pelo qual o paciente é identificado pela recepção e na agenda.",
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.details.identification.name",
      "ontologyRef": "Paciente.details.identification.name",
      "dtoPath": "details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listPaciente.input.details.identification.docType",
      "memberName": "stateListPacienteDetailsIdentificationDocType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "title": "Tipo de documento",
      "description": "Tipo do documento nacional informado para identificar e evitar duplicidade de paciente.",
      "enumOptions": [
        {
          "value": "CPF",
          "label": "CPF"
        },
        {
          "value": "NationalId",
          "label": "Documento nacional"
        },
        {
          "value": "Passport",
          "label": "Passaporte"
        },
        {
          "value": "Other",
          "label": "Outro"
        }
      ],
      "valueSet": [
        "CPF",
        "NationalId",
        "Passport",
        "Other"
      ],
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.details.identification.docType",
      "ontologyRef": "Paciente.details.identification.docType",
      "dtoPath": "details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listPaciente.input.details.identification.docId",
      "memberName": "stateListPacienteDetailsIdentificationDocId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "title": "Número do documento",
      "description": "Número do documento informado para localizar ou cadastrar o paciente.",
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.details.identification.docId",
      "ontologyRef": "Paciente.details.identification.docId",
      "dtoPath": "details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listPaciente.input.details.identification.countryCode",
      "memberName": "stateListPacienteDetailsIdentificationCountryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "title": "País",
      "description": "Código do país do paciente e das regras aplicáveis ao seu cadastro.",
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.details.identification.countryCode",
      "ontologyRef": "Paciente.details.identification.countryCode",
      "dtoPath": "details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listPaciente.input.page",
      "memberName": "stateListPacientePage",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.page",
      "ontologyRef": "Paciente.$page",
      "dtoPath": "page",
      "source": "routeParam",
      "presentation": "route",
      "editable": false,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listPaciente.status",
      "memberName": "stateListPacienteStatus",
      "name": "listPacienteStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listPaciente"
    },
    {
      "stateKey": "ui.consultas.listPaciente.error",
      "memberName": "stateListPacienteError",
      "name": "listPacienteError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listPaciente"
    },
    {
      "stateKey": "ui.consultas.listPaciente.result",
      "memberName": "stateListPacienteResult",
      "name": "listPacienteResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.consultas.listProfissional.input.id",
      "memberName": "stateListProfissionalId",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "description": "mdmId; stable through promotion and merge.",
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.id",
      "ontologyRef": "Profissional.id",
      "dtoPath": "id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listProfissional.input.details.identification.subtype",
      "memberName": "stateListProfissionalDetailsIdentificationSubtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "title": "Tipo de cadastro",
      "description": "Indica que este cadastro mestre é de uma pessoa.",
      "enumOptions": [
        {
          "value": "Person",
          "label": "Pessoa"
        }
      ],
      "valueSet": [
        "Person"
      ],
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.details.identification.subtype",
      "ontologyRef": "Profissional.details.identification.subtype",
      "dtoPath": "details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listProfissional.input.details.identification.name",
      "memberName": "stateListProfissionalDetailsIdentificationName",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "title": "Nome",
      "description": "Nome pelo qual a recepcionista localiza o profissional ao agendar uma consulta.",
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.details.identification.name",
      "ontologyRef": "Profissional.details.identification.name",
      "dtoPath": "details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listProfissional.input.details.identification.status",
      "memberName": "stateListProfissionalDetailsIdentificationStatus",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "title": "Situação do cadastro",
      "description": "Situação mestre do profissional, usada para mantê-lo ativo ou inativo na clínica.",
      "enumOptions": [
        {
          "value": "Active",
          "label": "Ativo"
        },
        {
          "value": "Inactive",
          "label": "Inativo"
        },
        {
          "value": "Merged",
          "label": "Unificado"
        },
        {
          "value": "Blocked",
          "label": "Bloqueado"
        }
      ],
      "valueSet": [
        "Active",
        "Inactive",
        "Merged",
        "Blocked"
      ],
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.details.identification.status",
      "ontologyRef": "Profissional.details.identification.status",
      "dtoPath": "details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listProfissional.input.details.identification.docType",
      "memberName": "stateListProfissionalDetailsIdentificationDocType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "title": "Tipo de documento",
      "description": "Tipo do documento nacional usado para deduplicar o profissional no cadastro mestre.",
      "enumOptions": [
        {
          "value": "CPF",
          "label": "CPF"
        },
        {
          "value": "Passport",
          "label": "Passaporte"
        },
        {
          "value": "NationalId",
          "label": "Documento nacional"
        },
        {
          "value": "Other",
          "label": "Outro"
        }
      ],
      "valueSet": [
        "CPF",
        "Passport",
        "NationalId",
        "Other"
      ],
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.details.identification.docType",
      "ontologyRef": "Profissional.details.identification.docType",
      "dtoPath": "details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listProfissional.input.details.identification.docId",
      "memberName": "stateListProfissionalDetailsIdentificationDocId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "title": "Número do documento",
      "description": "Número do documento nacional informado para localizar ou deduplicar o profissional.",
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.details.identification.docId",
      "ontologyRef": "Profissional.details.identification.docId",
      "dtoPath": "details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listProfissional.input.details.identification.countryCode",
      "memberName": "stateListProfissionalDetailsIdentificationCountryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "title": "País",
      "description": "Código do país que define as regras aplicáveis ao documento do profissional.",
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.details.identification.countryCode",
      "ontologyRef": "Profissional.details.identification.countryCode",
      "dtoPath": "details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listProfissional.input.page",
      "memberName": "stateListProfissionalPage",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.page",
      "ontologyRef": "Profissional.$page",
      "dtoPath": "page",
      "source": "routeParam",
      "presentation": "route",
      "editable": false,
      "required": false
    },
    {
      "stateKey": "ui.consultas.listProfissional.status",
      "memberName": "stateListProfissionalStatus",
      "name": "listProfissionalStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listProfissional"
    },
    {
      "stateKey": "ui.consultas.listProfissional.error",
      "memberName": "stateListProfissionalError",
      "name": "listProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProfissional"
    },
    {
      "stateKey": "ui.consultas.listProfissional.result",
      "memberName": "stateListProfissionalResult",
      "name": "listProfissionalResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "set:scenario",
      "methodName": "setScenario",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.scenary"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.scenary"
    },
    {
      "actionId": "select:createConsulta:pacienteId",
      "methodName": "selectCreateConsultaPacienteId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.pacienteId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.pacienteId",
      "selection": {
        "sourceActionId": "listPaciente",
        "resultStateKey": "ui.consultas.listPaciente.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "select:createConsulta:profissionalId",
      "methodName": "selectCreateConsultaProfissionalId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.profissionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.profissionalId",
      "selection": {
        "sourceActionId": "listProfissional",
        "resultStateKey": "ui.consultas.listProfissional.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "set:createConsulta:scheduledAt",
      "methodName": "setCreateConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.scheduledAt"
    },
    {
      "actionId": "set:createConsulta:details.telephoneConfirmation.confirmedAt",
      "methodName": "setCreateConsultaDetailsTelephoneConfirmationConfirmedAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.details.telephoneConfirmation.confirmedAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.details.telephoneConfirmation.confirmedAt"
    },
    {
      "actionId": "createConsulta",
      "methodName": "runCreateConsulta",
      "kind": "command",
      "commandRef": "createConsulta",
      "routeRef": "createConsultaRoute",
      "inputTypeRef": "CreateConsultaInput",
      "outputTypeRef": "CreateConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.createConsulta.input.pacienteId",
        "ui.consultas.createConsulta.input.profissionalId",
        "ui.consultas.createConsulta.input.scheduledAt",
        "ui.consultas.createConsulta.input.details.telephoneConfirmation.confirmedAt"
      ],
      "outputStateKeys": [
        "ui.consultas.createConsulta.result"
      ],
      "statusStateKey": "ui.consultas.createConsulta.status",
      "errorStateKey": "ui.consultas.createConsulta.error",
      "refreshActionIds": [
        "listConsulta"
      ],
      "operationBinding": {
        "actorRef": "recepcionista",
        "grantRefs": [
          "recepcionistaGestaoAgenda"
        ],
        "authorities": [
          "recepcionista"
        ],
        "ruleRefs": [
          {
            "ruleId": "consultaHorarioProfissionalUnico",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.consultaHorarioProfissionalUnico",
            "description": "Não pode haver duas consultas para o mesmo profissional na mesma data e horário."
          },
          {
            "ruleId": "consultaSomenteAgendadaPodeRegistrarFalta",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.consultaSomenteAgendadaPodeRegistrarFalta",
            "description": "A falta do paciente só pode ser registrada para uma consulta com situação agendada."
          },
          {
            "ruleId": "consultaSomenteAgendadaPodeRegistrarAtendimento",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.consultaSomenteAgendadaPodeRegistrarAtendimento",
            "description": "O atendimento só pode ser registrado para uma consulta com situação agendada."
          },
          {
            "ruleId": "anotacaoObrigatoriaNoAtendimento",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.anotacaoObrigatoriaNoAtendimento",
            "description": "O registro de atendimento deve incluir uma anotação do atendimento."
          },
          {
            "ruleId": "profissionalAtendeSomentePropriaConsulta",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.profissionalAtendeSomentePropriaConsulta",
            "description": "O profissional só pode registrar o atendimento de uma consulta atribuída a ele."
          }
        ],
        "sourceHashes": [
          "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
          "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
          "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "ruleRefs": [
            {
              "ruleId": "consultaHorarioProfissionalUnico",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaHorarioProfissionalUnico",
              "description": "Não pode haver duas consultas para o mesmo profissional na mesma data e horário."
            },
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarFalta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarFalta",
              "description": "A falta do paciente só pode ser registrada para uma consulta com situação agendada."
            },
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarAtendimento",
              "description": "O atendimento só pode ser registrado para uma consulta com situação agendada."
            },
            {
              "ruleId": "anotacaoObrigatoriaNoAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.anotacaoObrigatoriaNoAtendimento",
              "description": "O registro de atendimento deve incluir uma anotação do atendimento."
            },
            {
              "ruleId": "profissionalAtendeSomentePropriaConsulta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.profissionalAtendeSomentePropriaConsulta",
              "description": "O profissional só pode registrar o atendimento de uma consulta atribuída a ele."
            }
          ],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "actionId": "select:registrarFalta:id",
      "methodName": "selectRegistrarFaltaId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.registrarFalta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.registrarFalta.input.id",
      "selection": {
        "sourceActionId": "listConsulta",
        "resultStateKey": "ui.consultas.listConsulta.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "registrarFalta",
      "methodName": "runRegistrarFalta",
      "kind": "command",
      "commandRef": "registrarFalta",
      "routeRef": "registrarFaltaRoute",
      "inputTypeRef": "RegistrarFaltaInput",
      "outputTypeRef": "RegistrarFaltaOutput",
      "inputStateKeys": [
        "ui.consultas.registrarFalta.input.id"
      ],
      "outputStateKeys": [
        "ui.consultas.registrarFalta.result"
      ],
      "statusStateKey": "ui.consultas.registrarFalta.status",
      "errorStateKey": "ui.consultas.registrarFalta.error",
      "refreshActionIds": [
        "listConsulta"
      ],
      "operationBinding": {
        "actorRef": "recepcionista",
        "grantRefs": [
          "recepcionistaGestaoAgenda"
        ],
        "authorities": [
          "recepcionista"
        ],
        "transition": {
          "transitionId": "registrarFalta",
          "from": [
            "scheduled"
          ],
          "to": "noShow",
          "by": [
            "recepcionista"
          ],
          "payload": []
        },
        "ruleRefs": [
          {
            "ruleId": "consultaSomenteAgendadaPodeRegistrarFalta",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.consultaSomenteAgendadaPodeRegistrarFalta",
            "description": "A falta do paciente só pode ser registrada para uma consulta com situação agendada."
          }
        ],
        "sourceHashes": [
          "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
          "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
          "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
        ]
      },
      "confirmation": {
        "required": true,
        "title": "Registrar falta do paciente",
        "description": "Confirme que o paciente não compareceu à consulta agendada. A consulta será marcada como falta."
      },
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "transition": {
            "transitionId": "registrarFalta",
            "from": [
              "scheduled"
            ],
            "to": "noShow",
            "by": [
              "recepcionista"
            ],
            "payload": []
          },
          "ruleRefs": [
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarFalta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarFalta",
              "description": "A falta do paciente só pode ser registrada para uma consulta com situação agendada."
            }
          ],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "actionId": "select:updateConsulta:id",
      "methodName": "selectUpdateConsultaId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.id",
      "selection": {
        "sourceActionId": "listConsulta",
        "resultStateKey": "ui.consultas.listConsulta.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "select:updateConsulta:pacienteId",
      "methodName": "selectUpdateConsultaPacienteId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.pacienteId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.pacienteId",
      "selection": {
        "sourceActionId": "listPaciente",
        "resultStateKey": "ui.consultas.listPaciente.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "select:updateConsulta:profissionalId",
      "methodName": "selectUpdateConsultaProfissionalId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.profissionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.profissionalId",
      "selection": {
        "sourceActionId": "listProfissional",
        "resultStateKey": "ui.consultas.listProfissional.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "set:updateConsulta:scheduledAt",
      "methodName": "setUpdateConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.scheduledAt"
    },
    {
      "actionId": "set:updateConsulta:details.telephoneConfirmation.confirmedAt",
      "methodName": "setUpdateConsultaDetailsTelephoneConfirmationConfirmedAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.details.telephoneConfirmation.confirmedAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.details.telephoneConfirmation.confirmedAt"
    },
    {
      "actionId": "updateConsulta",
      "methodName": "runUpdateConsulta",
      "kind": "command",
      "commandRef": "updateConsulta",
      "routeRef": "updateConsultaRoute",
      "inputTypeRef": "UpdateConsultaInput",
      "outputTypeRef": "UpdateConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.updateConsulta.input.id",
        "ui.consultas.updateConsulta.input.pacienteId",
        "ui.consultas.updateConsulta.input.profissionalId",
        "ui.consultas.updateConsulta.input.scheduledAt",
        "ui.consultas.updateConsulta.input.details.telephoneConfirmation.confirmedAt"
      ],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.result"
      ],
      "statusStateKey": "ui.consultas.updateConsulta.status",
      "errorStateKey": "ui.consultas.updateConsulta.error",
      "refreshActionIds": [
        "listConsulta"
      ],
      "operationBinding": {
        "actorRef": "recepcionista",
        "grantRefs": [
          "recepcionistaGestaoAgenda"
        ],
        "authorities": [
          "recepcionista"
        ],
        "ruleRefs": [
          {
            "ruleId": "consultaHorarioProfissionalUnico",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.consultaHorarioProfissionalUnico",
            "description": "Não pode haver duas consultas para o mesmo profissional na mesma data e horário."
          },
          {
            "ruleId": "consultaSomenteAgendadaPodeRegistrarFalta",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.consultaSomenteAgendadaPodeRegistrarFalta",
            "description": "A falta do paciente só pode ser registrada para uma consulta com situação agendada."
          },
          {
            "ruleId": "consultaSomenteAgendadaPodeRegistrarAtendimento",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.consultaSomenteAgendadaPodeRegistrarAtendimento",
            "description": "O atendimento só pode ser registrado para uma consulta com situação agendada."
          },
          {
            "ruleId": "anotacaoObrigatoriaNoAtendimento",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.anotacaoObrigatoriaNoAtendimento",
            "description": "O registro de atendimento deve incluir uma anotação do atendimento."
          },
          {
            "ruleId": "profissionalAtendeSomentePropriaConsulta",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.profissionalAtendeSomentePropriaConsulta",
            "description": "O profissional só pode registrar o atendimento de uma consulta atribuída a ele."
          }
        ],
        "sourceHashes": [
          "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
          "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
          "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "ruleRefs": [
            {
              "ruleId": "consultaHorarioProfissionalUnico",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaHorarioProfissionalUnico",
              "description": "Não pode haver duas consultas para o mesmo profissional na mesma data e horário."
            },
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarFalta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarFalta",
              "description": "A falta do paciente só pode ser registrada para uma consulta com situação agendada."
            },
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarAtendimento",
              "description": "O atendimento só pode ser registrado para uma consulta com situação agendada."
            },
            {
              "ruleId": "anotacaoObrigatoriaNoAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.anotacaoObrigatoriaNoAtendimento",
              "description": "O registro de atendimento deve incluir uma anotação do atendimento."
            },
            {
              "ruleId": "profissionalAtendeSomentePropriaConsulta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.profissionalAtendeSomentePropriaConsulta",
              "description": "O profissional só pode registrar o atendimento de uma consulta atribuída a ele."
            }
          ],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "actionId": "set:listConsulta:id",
      "methodName": "setListConsultaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.id"
    },
    {
      "actionId": "select:listConsulta:pacienteId",
      "methodName": "selectListConsultaPacienteId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.pacienteId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.pacienteId",
      "selection": {
        "sourceActionId": "listPaciente",
        "resultStateKey": "ui.consultas.listPaciente.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "select:listConsulta:profissionalId",
      "methodName": "selectListConsultaProfissionalId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.profissionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.profissionalId",
      "selection": {
        "sourceActionId": "listProfissional",
        "resultStateKey": "ui.consultas.listProfissional.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "set:listConsulta:scheduledAt",
      "methodName": "setListConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.scheduledAt"
    },
    {
      "actionId": "set:listConsulta:status",
      "methodName": "setListConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.status"
    },
    {
      "actionId": "listConsulta",
      "methodName": "runListConsulta",
      "kind": "query",
      "commandRef": "listConsulta",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.listConsulta.input.id",
        "ui.consultas.listConsulta.input.pacienteId",
        "ui.consultas.listConsulta.input.profissionalId",
        "ui.consultas.listConsulta.input.scheduledAt",
        "ui.consultas.listConsulta.input.status",
        "ui.consultas.listConsulta.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas.listConsulta.result"
      ],
      "statusStateKey": "ui.consultas.listConsulta.status",
      "errorStateKey": "ui.consultas.listConsulta.error",
      "refreshActionIds": [],
      "operationBinding": {
        "actorRef": "recepcionista",
        "grantRefs": [
          "recepcionistaGestaoAgenda"
        ],
        "authorities": [
          "recepcionista"
        ],
        "ruleRefs": [],
        "sourceHashes": [
          "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
          "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
          "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "actionId": "set:listPaciente:id",
      "methodName": "setListPacienteId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.id"
    },
    {
      "actionId": "set:listPaciente:details.identification.subtype",
      "methodName": "setListPacienteDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details.identification.subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details.identification.subtype"
    },
    {
      "actionId": "set:listPaciente:details.identification.name",
      "methodName": "setListPacienteDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details.identification.name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details.identification.name"
    },
    {
      "actionId": "set:listPaciente:details.identification.docType",
      "methodName": "setListPacienteDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details.identification.docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details.identification.docType"
    },
    {
      "actionId": "set:listPaciente:details.identification.docId",
      "methodName": "setListPacienteDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details.identification.docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details.identification.docId"
    },
    {
      "actionId": "set:listPaciente:details.identification.countryCode",
      "methodName": "setListPacienteDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details.identification.countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details.identification.countryCode"
    },
    {
      "actionId": "listPaciente",
      "methodName": "runListPaciente",
      "kind": "query",
      "commandRef": "listPaciente",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.consultas.listPaciente.input.id",
        "ui.consultas.listPaciente.input.details.identification.subtype",
        "ui.consultas.listPaciente.input.details.identification.name",
        "ui.consultas.listPaciente.input.details.identification.docType",
        "ui.consultas.listPaciente.input.details.identification.docId",
        "ui.consultas.listPaciente.input.details.identification.countryCode",
        "ui.consultas.listPaciente.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas.listPaciente.result"
      ],
      "statusStateKey": "ui.consultas.listPaciente.status",
      "errorStateKey": "ui.consultas.listPaciente.error",
      "refreshActionIds": [],
      "operationBinding": {
        "actorRef": "recepcionista",
        "grantRefs": [
          "recepcionistaGestaoAgenda"
        ],
        "authorities": [
          "recepcionista"
        ],
        "ruleRefs": [],
        "sourceHashes": [
          "l4/agendaClinica/ontology/Paciente.defs.ts#sha256:4f63b16a12262913c0f54fdec0bed255de36d8db3e11cf2708c5dcbe6748b2bd",
          "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
          "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Paciente.defs.ts#sha256:4f63b16a12262913c0f54fdec0bed255de36d8db3e11cf2708c5dcbe6748b2bd",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "actionId": "set:listProfissional:id",
      "methodName": "setListProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.id"
    },
    {
      "actionId": "set:listProfissional:details.identification.subtype",
      "methodName": "setListProfissionalDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details.identification.subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details.identification.subtype"
    },
    {
      "actionId": "set:listProfissional:details.identification.name",
      "methodName": "setListProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details.identification.name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details.identification.name"
    },
    {
      "actionId": "set:listProfissional:details.identification.status",
      "methodName": "setListProfissionalDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details.identification.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details.identification.status"
    },
    {
      "actionId": "set:listProfissional:details.identification.docType",
      "methodName": "setListProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details.identification.docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details.identification.docType"
    },
    {
      "actionId": "set:listProfissional:details.identification.docId",
      "methodName": "setListProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details.identification.docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details.identification.docId"
    },
    {
      "actionId": "set:listProfissional:details.identification.countryCode",
      "methodName": "setListProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details.identification.countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details.identification.countryCode"
    },
    {
      "actionId": "listProfissional",
      "methodName": "runListProfissional",
      "kind": "query",
      "commandRef": "listProfissional",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.consultas.listProfissional.input.id",
        "ui.consultas.listProfissional.input.details.identification.subtype",
        "ui.consultas.listProfissional.input.details.identification.name",
        "ui.consultas.listProfissional.input.details.identification.status",
        "ui.consultas.listProfissional.input.details.identification.docType",
        "ui.consultas.listProfissional.input.details.identification.docId",
        "ui.consultas.listProfissional.input.details.identification.countryCode",
        "ui.consultas.listProfissional.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas.listProfissional.result"
      ],
      "statusStateKey": "ui.consultas.listProfissional.status",
      "errorStateKey": "ui.consultas.listProfissional.error",
      "refreshActionIds": [],
      "operationBinding": {
        "actorRef": "recepcionista",
        "grantRefs": [
          "recepcionistaGestaoAgenda"
        ],
        "authorities": [
          "recepcionista"
        ],
        "ruleRefs": [],
        "sourceHashes": [
          "l4/agendaClinica/ontology/Profissional.defs.ts#sha256:38b591caa01dec68d410202198270cb41fcee4314477fac8c5b1bc07b46d5f32",
          "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
          "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Profissional.defs.ts#sha256:38b591caa01dec68d410202198270cb41fcee4314477fac8c5b1bc07b46d5f32",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listConsulta",
      "preconditions": [],
      "methodName": "enterBaseScenario",
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "value": "detailConsulta",
      "kind": "detail",
      "actionId": "listConsulta",
      "preconditions": [],
      "methodName": "enterDetailConsultaScenario",
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "value": "createConsulta",
      "kind": "command",
      "actionId": "createConsulta",
      "preconditions": [],
      "methodName": "enterCreateConsultaScenario",
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "ruleRefs": [
            {
              "ruleId": "consultaHorarioProfissionalUnico",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaHorarioProfissionalUnico",
              "description": "Não pode haver duas consultas para o mesmo profissional na mesma data e horário."
            },
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarFalta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarFalta",
              "description": "A falta do paciente só pode ser registrada para uma consulta com situação agendada."
            },
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarAtendimento",
              "description": "O atendimento só pode ser registrado para uma consulta com situação agendada."
            },
            {
              "ruleId": "anotacaoObrigatoriaNoAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.anotacaoObrigatoriaNoAtendimento",
              "description": "O registro de atendimento deve incluir uma anotação do atendimento."
            },
            {
              "ruleId": "profissionalAtendeSomentePropriaConsulta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.profissionalAtendeSomentePropriaConsulta",
              "description": "O profissional só pode registrar o atendimento de uma consulta atribuída a ele."
            }
          ],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "value": "updateConsulta",
      "kind": "command",
      "actionId": "updateConsulta",
      "preconditions": [
        "ui.consultas.updateConsulta.input.id"
      ],
      "methodName": "enterUpdateConsultaScenario",
      "operationBindings": [
        {
          "actorRef": "recepcionista",
          "grantRefs": [
            "recepcionistaGestaoAgenda"
          ],
          "authorities": [
            "recepcionista"
          ],
          "ruleRefs": [
            {
              "ruleId": "consultaHorarioProfissionalUnico",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaHorarioProfissionalUnico",
              "description": "Não pode haver duas consultas para o mesmo profissional na mesma data e horário."
            },
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarFalta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarFalta",
              "description": "A falta do paciente só pode ser registrada para uma consulta com situação agendada."
            },
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarAtendimento",
              "description": "O atendimento só pode ser registrado para uma consulta com situação agendada."
            },
            {
              "ruleId": "anotacaoObrigatoriaNoAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.anotacaoObrigatoriaNoAtendimento",
              "description": "O registro de atendimento deve incluir uma anotação do atendimento."
            },
            {
              "ruleId": "profissionalAtendeSomentePropriaConsulta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.profissionalAtendeSomentePropriaConsulta",
              "description": "O profissional só pode registrar o atendimento de uma consulta atribuída a ele."
            }
          ],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    }
  ],
  "initialLoads": [
    {
      "actionId": "listConsulta",
      "stateKey": "ui.consultas.listConsulta.result"
    },
    {
      "actionId": "listPaciente",
      "stateKey": "ui.consultas.listPaciente.result"
    },
    {
      "actionId": "listProfissional",
      "stateKey": "ui.consultas.listProfissional.result"
    }
  ],
  "dataBindings": [
    {
      "actionId": "createConsulta",
      "kind": "command",
      "routeRef": "createConsultaRoute",
      "inputTypeRef": "CreateConsultaInput",
      "outputTypeRef": "CreateConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.createConsulta.input.pacienteId",
        "ui.consultas.createConsulta.input.profissionalId",
        "ui.consultas.createConsulta.input.scheduledAt",
        "ui.consultas.createConsulta.input.details.telephoneConfirmation.confirmedAt"
      ],
      "resultStateKey": "ui.consultas.createConsulta.result"
    },
    {
      "actionId": "registrarFalta",
      "kind": "command",
      "routeRef": "registrarFaltaRoute",
      "inputTypeRef": "RegistrarFaltaInput",
      "outputTypeRef": "RegistrarFaltaOutput",
      "inputStateKeys": [
        "ui.consultas.registrarFalta.input.id"
      ],
      "resultStateKey": "ui.consultas.registrarFalta.result"
    },
    {
      "actionId": "updateConsulta",
      "kind": "command",
      "routeRef": "updateConsultaRoute",
      "inputTypeRef": "UpdateConsultaInput",
      "outputTypeRef": "UpdateConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.updateConsulta.input.id",
        "ui.consultas.updateConsulta.input.pacienteId",
        "ui.consultas.updateConsulta.input.profissionalId",
        "ui.consultas.updateConsulta.input.scheduledAt",
        "ui.consultas.updateConsulta.input.details.telephoneConfirmation.confirmedAt"
      ],
      "resultStateKey": "ui.consultas.updateConsulta.result"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.listConsulta.input.id",
        "ui.consultas.listConsulta.input.pacienteId",
        "ui.consultas.listConsulta.input.profissionalId",
        "ui.consultas.listConsulta.input.scheduledAt",
        "ui.consultas.listConsulta.input.status",
        "ui.consultas.listConsulta.input.page"
      ],
      "resultStateKey": "ui.consultas.listConsulta.result"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.consultas.listPaciente.input.id",
        "ui.consultas.listPaciente.input.details.identification.subtype",
        "ui.consultas.listPaciente.input.details.identification.name",
        "ui.consultas.listPaciente.input.details.identification.docType",
        "ui.consultas.listPaciente.input.details.identification.docId",
        "ui.consultas.listPaciente.input.details.identification.countryCode",
        "ui.consultas.listPaciente.input.page"
      ],
      "resultStateKey": "ui.consultas.listPaciente.result"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.consultas.listProfissional.input.id",
        "ui.consultas.listProfissional.input.details.identification.subtype",
        "ui.consultas.listProfissional.input.details.identification.name",
        "ui.consultas.listProfissional.input.details.identification.status",
        "ui.consultas.listProfissional.input.details.identification.docType",
        "ui.consultas.listProfissional.input.details.identification.docId",
        "ui.consultas.listProfissional.input.details.identification.countryCode",
        "ui.consultas.listProfissional.input.page"
      ],
      "resultStateKey": "ui.consultas.listProfissional.result"
    }
  ],
  "coverage": [
    {
      "organismId": "organism.list.1",
      "sourceIndex": 0,
      "kind": "list",
      "contentRef": "content.list",
      "content": "Vejo as consultas da clínica e localizo pelo paciente, pelo profissional ou pelo horário.",
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
      "source": {
        "kind": "list",
        "text": "Vejo as consultas da clínica e localizo pelo paciente, pelo profissional ou pelo horário."
      }
    },
    {
      "organismId": "organism.detail.1",
      "sourceIndex": 1,
      "kind": "detail",
      "contentRef": "content.detail",
      "content": "Vejo os dados da consulta, o paciente, o profissional e o telefone de contato.",
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
      "source": {
        "kind": "detail",
        "text": "Vejo os dados da consulta, o paciente, o profissional e o telefone de contato."
      }
    },
    {
      "organismId": "organism.form.1",
      "sourceIndex": 2,
      "kind": "form",
      "contentRef": "content.form",
      "content": "Agendo a consulta escolhendo o paciente, o profissional e um horário disponível.",
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
      "source": {
        "kind": "form",
        "text": "Agendo a consulta escolhendo o paciente, o profissional e um horário disponível."
      }
    },
    {
      "organismId": "organism.actions.1",
      "sourceIndex": 3,
      "kind": "actions",
      "contentRef": "content.actions",
      "content": "Confirmo a consulta por telefone ou registro a falta do paciente.",
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
      "source": {
        "kind": "actions",
        "text": "Confirmo a consulta por telefone ou registro a falta do paciente."
      }
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "consultas__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/agendaClinica/web/shared/consultas.defs.ts",
    "outputPath": "l2/agendaClinica/web/shared/consultas.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/contracts/consultas.defs.ts",
      "_102029_.d.ts",
      "l4/agendaClinica/access.defs.ts",
      "l4/agendaClinica/ontology/Consulta.defs.ts",
      "l4/agendaClinica/ontology/Paciente.defs.ts",
      "l4/agendaClinica/ontology/Profissional.defs.ts",
      "l4/agendaClinica/rules.defs.ts",
      "l4/agendaClinica/workflows.defs.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
