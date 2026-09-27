/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/pacientes.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-26-agent-defs-l2-shared-v4",
  "moduleName": "agendaClinica",
  "pageId": "pacientes",
  "pageName": "Pacientes",
  "baseClassName": "PacientesShared",
  "routePattern": "/pacientes",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/pacientes.defs.ts",
    "calls": [
      {
        "actionId": "createPaciente",
        "routeConst": "createPacienteRoute",
        "inputType": "CreatePacienteInput",
        "outputType": "CreatePacienteOutput"
      },
      {
        "actionId": "listPaciente",
        "routeConst": "listPacienteRoute",
        "inputType": "ListPacienteInput",
        "outputType": "ListPacienteOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.pacientes.pageStatus",
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
      "stateKey": "ui.pacientes.scenary",
      "memberName": "scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "createPaciente"
      ]
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details.identification.name",
      "memberName": "stateCreatePacienteDetailsIdentificationName",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "title": "Nome",
      "description": "Nome pelo qual o paciente é identificado pela recepção e na agenda.",
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.details.identification.name",
      "ontologyRef": "Paciente.details.identification.name",
      "dtoPath": "details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details.identification.docType",
      "memberName": "stateCreatePacienteDetailsIdentificationDocType",
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
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.details.identification.docType",
      "ontologyRef": "Paciente.details.identification.docType",
      "dtoPath": "details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details.identification.docId",
      "memberName": "stateCreatePacienteDetailsIdentificationDocId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "title": "Número do documento",
      "description": "Número do documento informado para localizar ou cadastrar o paciente.",
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.details.identification.docId",
      "ontologyRef": "Paciente.details.identification.docId",
      "dtoPath": "details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details.identification.countryCode",
      "memberName": "stateCreatePacienteDetailsIdentificationCountryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "title": "País",
      "description": "Código do país do paciente e das regras aplicáveis ao seu cadastro.",
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.details.identification.countryCode",
      "ontologyRef": "Paciente.details.identification.countryCode",
      "dtoPath": "details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.createPaciente.status",
      "memberName": "stateCreatePacienteStatus",
      "name": "createPacienteStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createPaciente"
    },
    {
      "stateKey": "ui.pacientes.createPaciente.error",
      "memberName": "stateCreatePacienteError",
      "name": "createPacienteError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createPaciente"
    },
    {
      "stateKey": "ui.pacientes.createPaciente.result",
      "memberName": "stateCreatePacienteResult",
      "name": "createPacienteResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.id",
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
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.subtype",
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
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.name",
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
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.docType",
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
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.docId",
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
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.countryCode",
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
      "stateKey": "ui.pacientes.listPaciente.input.page",
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
      "stateKey": "ui.pacientes.listPaciente.status",
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
      "stateKey": "ui.pacientes.listPaciente.error",
      "memberName": "stateListPacienteError",
      "name": "listPacienteError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listPaciente"
    },
    {
      "stateKey": "ui.pacientes.listPaciente.result",
      "memberName": "stateListPacienteResult",
      "name": "listPacienteResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteOutput",
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
        "ui.pacientes.scenary"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.scenary"
    },
    {
      "actionId": "set:createPaciente:details.identification.name",
      "methodName": "setCreatePacienteDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details.identification.name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details.identification.name"
    },
    {
      "actionId": "set:createPaciente:details.identification.docType",
      "methodName": "setCreatePacienteDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details.identification.docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details.identification.docType"
    },
    {
      "actionId": "set:createPaciente:details.identification.docId",
      "methodName": "setCreatePacienteDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details.identification.docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details.identification.docId"
    },
    {
      "actionId": "set:createPaciente:details.identification.countryCode",
      "methodName": "setCreatePacienteDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details.identification.countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details.identification.countryCode"
    },
    {
      "actionId": "createPaciente",
      "methodName": "runCreatePaciente",
      "kind": "command",
      "commandRef": "createPaciente",
      "routeRef": "createPacienteRoute",
      "inputTypeRef": "CreatePacienteInput",
      "outputTypeRef": "CreatePacienteOutput",
      "inputStateKeys": [
        "ui.pacientes.createPaciente.input.details.identification.name",
        "ui.pacientes.createPaciente.input.details.identification.docType",
        "ui.pacientes.createPaciente.input.details.identification.docId",
        "ui.pacientes.createPaciente.input.details.identification.countryCode"
      ],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.result"
      ],
      "statusStateKey": "ui.pacientes.createPaciente.status",
      "errorStateKey": "ui.pacientes.createPaciente.error",
      "refreshActionIds": [
        "listPaciente"
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
            "ruleId": "rule-foreign-namespace-refused",
            "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
            "symbol": "rules[rule-foreign-namespace-refused]",
            "description": ""
          },
          {
            "ruleId": "rule-document-shape-validated",
            "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
            "symbol": "rules[rule-document-shape-validated]",
            "description": ""
          },
          {
            "ruleId": "rule-identity-never-in-namespace",
            "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
            "symbol": "rules[rule-identity-never-in-namespace]",
            "description": ""
          },
          {
            "ruleId": "rule-person-privacy-consent-required-br-eu",
            "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
            "symbol": "rules[rule-person-privacy-consent-required-br-eu]",
            "description": ""
          }
        ],
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
          "ruleRefs": [
            {
              "ruleId": "rule-foreign-namespace-refused",
              "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
              "symbol": "rules[rule-foreign-namespace-refused]",
              "description": ""
            },
            {
              "ruleId": "rule-document-shape-validated",
              "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
              "symbol": "rules[rule-document-shape-validated]",
              "description": ""
            },
            {
              "ruleId": "rule-identity-never-in-namespace",
              "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
              "symbol": "rules[rule-identity-never-in-namespace]",
              "description": ""
            },
            {
              "ruleId": "rule-person-privacy-consent-required-br-eu",
              "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
              "symbol": "rules[rule-person-privacy-consent-required-br-eu]",
              "description": ""
            }
          ],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Paciente.defs.ts#sha256:4f63b16a12262913c0f54fdec0bed255de36d8db3e11cf2708c5dcbe6748b2bd",
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
        "ui.pacientes.listPaciente.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.id"
    },
    {
      "actionId": "set:listPaciente:details.identification.subtype",
      "methodName": "setListPacienteDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details.identification.subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.subtype"
    },
    {
      "actionId": "set:listPaciente:details.identification.name",
      "methodName": "setListPacienteDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details.identification.name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.name"
    },
    {
      "actionId": "set:listPaciente:details.identification.docType",
      "methodName": "setListPacienteDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details.identification.docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.docType"
    },
    {
      "actionId": "set:listPaciente:details.identification.docId",
      "methodName": "setListPacienteDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details.identification.docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.docId"
    },
    {
      "actionId": "set:listPaciente:details.identification.countryCode",
      "methodName": "setListPacienteDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details.identification.countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details.identification.countryCode"
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
        "ui.pacientes.listPaciente.input.id",
        "ui.pacientes.listPaciente.input.details.identification.subtype",
        "ui.pacientes.listPaciente.input.details.identification.name",
        "ui.pacientes.listPaciente.input.details.identification.docType",
        "ui.pacientes.listPaciente.input.details.identification.docId",
        "ui.pacientes.listPaciente.input.details.identification.countryCode",
        "ui.pacientes.listPaciente.input.page"
      ],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.result"
      ],
      "statusStateKey": "ui.pacientes.listPaciente.status",
      "errorStateKey": "ui.pacientes.listPaciente.error",
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
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listPaciente",
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
            "l4/agendaClinica/ontology/Paciente.defs.ts#sha256:4f63b16a12262913c0f54fdec0bed255de36d8db3e11cf2708c5dcbe6748b2bd",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "value": "createPaciente",
      "kind": "command",
      "actionId": "createPaciente",
      "preconditions": [],
      "methodName": "enterCreatePacienteScenario",
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
              "ruleId": "rule-foreign-namespace-refused",
              "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
              "symbol": "rules[rule-foreign-namespace-refused]",
              "description": ""
            },
            {
              "ruleId": "rule-document-shape-validated",
              "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
              "symbol": "rules[rule-document-shape-validated]",
              "description": ""
            },
            {
              "ruleId": "rule-identity-never-in-namespace",
              "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
              "symbol": "rules[rule-identity-never-in-namespace]",
              "description": ""
            },
            {
              "ruleId": "rule-person-privacy-consent-required-br-eu",
              "file": "l4/agendaClinica/ontology/Paciente.defs.ts",
              "symbol": "rules[rule-person-privacy-consent-required-br-eu]",
              "description": ""
            }
          ],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Paciente.defs.ts#sha256:4f63b16a12262913c0f54fdec0bed255de36d8db3e11cf2708c5dcbe6748b2bd",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    }
  ],
  "initialLoads": [
    {
      "actionId": "listPaciente",
      "stateKey": "ui.pacientes.listPaciente.result"
    }
  ],
  "dataBindings": [
    {
      "actionId": "createPaciente",
      "kind": "command",
      "routeRef": "createPacienteRoute",
      "inputTypeRef": "CreatePacienteInput",
      "outputTypeRef": "CreatePacienteOutput",
      "inputStateKeys": [
        "ui.pacientes.createPaciente.input.details.identification.name",
        "ui.pacientes.createPaciente.input.details.identification.docType",
        "ui.pacientes.createPaciente.input.details.identification.docId",
        "ui.pacientes.createPaciente.input.details.identification.countryCode"
      ],
      "resultStateKey": "ui.pacientes.createPaciente.result"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.pacientes.listPaciente.input.id",
        "ui.pacientes.listPaciente.input.details.identification.subtype",
        "ui.pacientes.listPaciente.input.details.identification.name",
        "ui.pacientes.listPaciente.input.details.identification.docType",
        "ui.pacientes.listPaciente.input.details.identification.docId",
        "ui.pacientes.listPaciente.input.details.identification.countryCode",
        "ui.pacientes.listPaciente.input.page"
      ],
      "resultStateKey": "ui.pacientes.listPaciente.result"
    }
  ],
  "coverage": [
    {
      "organismId": "organism.list.1",
      "sourceIndex": 0,
      "kind": "list",
      "contentRef": "content.list",
      "content": "Localizo o paciente pelo nome.",
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
      "source": {
        "kind": "list",
        "text": "Localizo o paciente pelo nome."
      }
    },
    {
      "organismId": "organism.detail.1",
      "sourceIndex": 1,
      "kind": "detail",
      "contentRef": "content.detail",
      "content": "Vejo os dados e os telefones de contato do paciente.",
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
      "source": {
        "kind": "detail",
        "text": "Vejo os dados e os telefones de contato do paciente."
      }
    },
    {
      "organismId": "organism.form.1",
      "sourceIndex": 2,
      "kind": "form",
      "contentRef": "content.form",
      "content": "Cadastro o paciente para viabilizar os agendamentos na clínica.",
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
      "source": {
        "kind": "form",
        "text": "Cadastro o paciente para viabilizar os agendamentos na clínica."
      }
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "pacientes__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/agendaClinica/web/shared/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/shared/pacientes.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/contracts/pacientes.defs.ts",
      "_102029_.d.ts",
      "l4/agendaClinica/access.defs.ts",
      "l4/agendaClinica/ontology/Paciente.defs.ts",
      "l4/agendaClinica/rules.defs.ts",
      "l4/agendaClinica/workflows.defs.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
