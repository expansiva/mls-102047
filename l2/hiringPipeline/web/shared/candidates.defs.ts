export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "hiringPipeline",
  "pageId": "candidates",
  "pageName": "Candidates",
  "baseClassName": "CandidatesShared",
  "routePattern": "/candidates",
  "contractRef": {
    "defPath": "l2/hiringPipeline/web/contracts/candidates.defs.ts",
    "calls": [
      {
        "actionId": "createApplication",
        "routeConst": "createApplicationRoute",
        "inputType": "CreateApplicationInput",
        "outputType": "CreateApplicationOutput"
      },
      {
        "actionId": "createCandidate",
        "routeConst": "createCandidateRoute",
        "inputType": "CreateCandidateInput",
        "outputType": "CreateCandidateOutput"
      },
      {
        "actionId": "moveToInterview",
        "routeConst": "moveToInterviewRoute",
        "inputType": "MoveToInterviewInput",
        "outputType": "MoveToInterviewOutput"
      },
      {
        "actionId": "listApplication",
        "routeConst": "listApplicationRoute",
        "inputType": "ListApplicationInput",
        "outputType": "ListApplicationOutput"
      },
      {
        "actionId": "listCandidate",
        "routeConst": "listCandidateRoute",
        "inputType": "ListCandidateInput",
        "outputType": "ListCandidateOutput"
      },
      {
        "actionId": "listJobPosition",
        "routeConst": "listJobPositionRoute",
        "inputType": "ListJobPositionInput",
        "outputType": "ListJobPositionOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.candidates.pageStatus",
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
      "stateKey": "ui.candidates.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "listCandidate",
        "listJobPosition",
        "createApplication",
        "createCandidate",
        "moveToInterview"
      ]
    },
    {
      "stateKey": "ui.candidates.createApplication.input.candidateId",
      "name": "candidateId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createApplication",
      "contractRef": "CreateApplicationInput.Application.candidateId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.createApplication.input.jobPositionId",
      "name": "jobPositionId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createApplication",
      "contractRef": "CreateApplicationInput.Application.jobPositionId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.createApplication.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createApplication",
      "contractRef": "CreateApplicationInput.Application.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.createApplication.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createApplication",
      "contractRef": "CreateApplicationInput.Application.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.createApplication.input.details_rejectionReason",
      "name": "rejectionReason",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createApplication",
      "contractRef": "CreateApplicationInput.Application.details.rejectionReason",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.createApplication.status",
      "name": "createApplicationStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createApplication"
    },
    {
      "stateKey": "ui.candidates.createApplication.error",
      "name": "createApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createApplication"
    },
    {
      "stateKey": "ui.candidates.createApplication.result",
      "name": "createApplicationResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createApplication",
      "contractRef": "CreateApplicationOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details_person",
      "name": "person",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details.person",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details_hiringPipeline",
      "name": "hiringPipeline",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details.hiringPipeline",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.createCandidate.input.details_hiringPipeline_source",
      "name": "source",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateInput.Candidate.details.hiringPipeline.source",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.createCandidate.status",
      "name": "createCandidateStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createCandidate"
    },
    {
      "stateKey": "ui.candidates.createCandidate.error",
      "name": "createCandidateError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createCandidate"
    },
    {
      "stateKey": "ui.candidates.createCandidate.result",
      "name": "createCandidateResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createCandidate",
      "contractRef": "CreateCandidateOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.candidates.moveToInterview.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "moveToInterview",
      "contractRef": "MoveToInterviewInput.Application.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.candidates.moveToInterview.status",
      "name": "moveToInterviewStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "moveToInterview"
    },
    {
      "stateKey": "ui.candidates.moveToInterview.error",
      "name": "moveToInterviewError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "moveToInterview"
    },
    {
      "stateKey": "ui.candidates.moveToInterview.result",
      "name": "moveToInterviewResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "moveToInterview",
      "contractRef": "MoveToInterviewOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.candidates.listApplication.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listApplication.input.candidateId",
      "name": "candidateId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.candidateId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listApplication.input.jobPositionId",
      "name": "jobPositionId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.jobPositionId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listApplication.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listApplication.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.listApplication.status",
      "name": "listApplicationStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listApplication"
    },
    {
      "stateKey": "ui.candidates.listApplication.error",
      "name": "listApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listApplication"
    },
    {
      "stateKey": "ui.candidates.listApplication.result",
      "name": "listApplicationResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listApplication",
      "contractRef": "ListApplicationOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.details_identification_subtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.details_identification_status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listCandidate.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateInput.Candidate.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.listCandidate.status",
      "name": "listCandidateStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listCandidate"
    },
    {
      "stateKey": "ui.candidates.listCandidate.error",
      "name": "listCandidateError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listCandidate"
    },
    {
      "stateKey": "ui.candidates.listCandidate.result",
      "name": "listCandidateResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.candidates.listJobPosition.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listJobPosition.input.title",
      "name": "title",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.title",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listJobPosition.input.hiringManagerId",
      "name": "hiringManagerId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.hiringManagerId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listJobPosition.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.candidates.listJobPosition.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.candidates.listJobPosition.status",
      "name": "listJobPositionStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listJobPosition"
    },
    {
      "stateKey": "ui.candidates.listJobPosition.error",
      "name": "listJobPositionError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listJobPosition"
    },
    {
      "stateKey": "ui.candidates.listJobPosition.result",
      "name": "listJobPositionResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setCreateApplicationCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createApplication.input.candidateId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createApplication.input.candidateId"
    },
    {
      "actionId": "setCreateApplicationJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createApplication.input.jobPositionId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createApplication.input.jobPositionId"
    },
    {
      "actionId": "setCreateApplicationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createApplication.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createApplication.input.status"
    },
    {
      "actionId": "setCreateApplicationDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createApplication.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createApplication.input.details"
    },
    {
      "actionId": "setCreateApplicationDetailsRejectionReason",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createApplication.input.details_rejectionReason"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createApplication.input.details_rejectionReason"
    },
    {
      "actionId": "createApplication",
      "kind": "command",
      "commandRef": "createApplication",
      "routeRef": "createApplicationRoute",
      "inputTypeRef": "CreateApplicationInput",
      "outputTypeRef": "CreateApplicationOutput",
      "inputStateKeys": [
        "ui.candidates.createApplication.input.candidateId",
        "ui.candidates.createApplication.input.jobPositionId",
        "ui.candidates.createApplication.input.status",
        "ui.candidates.createApplication.input.details",
        "ui.candidates.createApplication.input.details_rejectionReason"
      ],
      "outputStateKeys": [
        "ui.candidates.createApplication.result"
      ],
      "statusStateKey": "ui.candidates.createApplication.status",
      "errorStateKey": "ui.candidates.createApplication.error",
      "refreshActionIds": [
        "listApplication"
      ]
    },
    {
      "actionId": "setCreateCandidateDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details"
    },
    {
      "actionId": "setCreateCandidateDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details_identification"
    },
    {
      "actionId": "setCreateCandidateDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details_identification_name"
    },
    {
      "actionId": "setCreateCandidateDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details_identification_docType"
    },
    {
      "actionId": "setCreateCandidateDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details_identification_docId"
    },
    {
      "actionId": "setCreateCandidateDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details_identification_countryCode"
    },
    {
      "actionId": "setCreateCandidateDetailsPerson",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details_person"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details_person"
    },
    {
      "actionId": "setCreateCandidateDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details_general"
    },
    {
      "actionId": "setCreateCandidateDetailsHiringPipeline",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details_hiringPipeline"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details_hiringPipeline"
    },
    {
      "actionId": "setCreateCandidateDetailsHiringPipelineSource",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.createCandidate.input.details_hiringPipeline_source"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.createCandidate.input.details_hiringPipeline_source"
    },
    {
      "actionId": "createCandidate",
      "kind": "command",
      "commandRef": "createCandidate",
      "routeRef": "createCandidateRoute",
      "inputTypeRef": "CreateCandidateInput",
      "outputTypeRef": "CreateCandidateOutput",
      "inputStateKeys": [
        "ui.candidates.createCandidate.input.details",
        "ui.candidates.createCandidate.input.details_identification",
        "ui.candidates.createCandidate.input.details_identification_name",
        "ui.candidates.createCandidate.input.details_identification_docType",
        "ui.candidates.createCandidate.input.details_identification_docId",
        "ui.candidates.createCandidate.input.details_identification_countryCode",
        "ui.candidates.createCandidate.input.details_person",
        "ui.candidates.createCandidate.input.details_general",
        "ui.candidates.createCandidate.input.details_hiringPipeline",
        "ui.candidates.createCandidate.input.details_hiringPipeline_source"
      ],
      "outputStateKeys": [
        "ui.candidates.createCandidate.result"
      ],
      "statusStateKey": "ui.candidates.createCandidate.status",
      "errorStateKey": "ui.candidates.createCandidate.error",
      "refreshActionIds": [
        "listCandidate"
      ]
    },
    {
      "actionId": "setMoveToInterviewId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.moveToInterview.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.moveToInterview.input.id"
    },
    {
      "actionId": "moveToInterview",
      "kind": "command",
      "commandRef": "moveToInterview",
      "routeRef": "moveToInterviewRoute",
      "inputTypeRef": "MoveToInterviewInput",
      "outputTypeRef": "MoveToInterviewOutput",
      "inputStateKeys": [
        "ui.candidates.moveToInterview.input.id"
      ],
      "outputStateKeys": [
        "ui.candidates.moveToInterview.result"
      ],
      "statusStateKey": "ui.candidates.moveToInterview.status",
      "errorStateKey": "ui.candidates.moveToInterview.error",
      "refreshActionIds": [
        "listApplication"
      ]
    },
    {
      "actionId": "setListApplicationId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listApplication.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listApplication.input.id"
    },
    {
      "actionId": "setListApplicationCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listApplication.input.candidateId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listApplication.input.candidateId"
    },
    {
      "actionId": "setListApplicationJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listApplication.input.jobPositionId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listApplication.input.jobPositionId"
    },
    {
      "actionId": "setListApplicationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listApplication.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listApplication.input.status"
    },
    {
      "actionId": "setListApplicationPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listApplication.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listApplication.input.page"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "commandRef": "listApplication",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.candidates.listApplication.input.id",
        "ui.candidates.listApplication.input.candidateId",
        "ui.candidates.listApplication.input.jobPositionId",
        "ui.candidates.listApplication.input.status",
        "ui.candidates.listApplication.input.page"
      ],
      "outputStateKeys": [
        "ui.candidates.listApplication.result"
      ],
      "statusStateKey": "ui.candidates.listApplication.status",
      "errorStateKey": "ui.candidates.listApplication.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.id"
    },
    {
      "actionId": "setListCandidateDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.details"
    },
    {
      "actionId": "setListCandidateDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.details_identification"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.details_identification_subtype"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.details_identification_name"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.details_identification_status"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.details_identification_docType"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.details_identification_docId"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.details_identification_countryCode"
    },
    {
      "actionId": "setListCandidatePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listCandidate.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listCandidate.input.page"
    },
    {
      "actionId": "listCandidate",
      "kind": "query",
      "commandRef": "listCandidate",
      "routeRef": "listCandidateRoute",
      "inputTypeRef": "ListCandidateInput",
      "outputTypeRef": "ListCandidateOutput",
      "inputStateKeys": [
        "ui.candidates.listCandidate.input.id",
        "ui.candidates.listCandidate.input.details",
        "ui.candidates.listCandidate.input.details_identification",
        "ui.candidates.listCandidate.input.details_identification_subtype",
        "ui.candidates.listCandidate.input.details_identification_name",
        "ui.candidates.listCandidate.input.details_identification_status",
        "ui.candidates.listCandidate.input.details_identification_docType",
        "ui.candidates.listCandidate.input.details_identification_docId",
        "ui.candidates.listCandidate.input.details_identification_countryCode",
        "ui.candidates.listCandidate.input.page"
      ],
      "outputStateKeys": [
        "ui.candidates.listCandidate.result"
      ],
      "statusStateKey": "ui.candidates.listCandidate.status",
      "errorStateKey": "ui.candidates.listCandidate.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listJobPosition.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listJobPosition.input.id"
    },
    {
      "actionId": "setListJobPositionTitle",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listJobPosition.input.title"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listJobPosition.input.title"
    },
    {
      "actionId": "setListJobPositionHiringManagerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listJobPosition.input.hiringManagerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listJobPosition.input.hiringManagerId"
    },
    {
      "actionId": "setListJobPositionStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listJobPosition.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listJobPosition.input.status"
    },
    {
      "actionId": "setListJobPositionPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.candidates.listJobPosition.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.candidates.listJobPosition.input.page"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "commandRef": "listJobPosition",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.candidates.listJobPosition.input.id",
        "ui.candidates.listJobPosition.input.title",
        "ui.candidates.listJobPosition.input.hiringManagerId",
        "ui.candidates.listJobPosition.input.status",
        "ui.candidates.listJobPosition.input.page"
      ],
      "outputStateKeys": [
        "ui.candidates.listJobPosition.result"
      ],
      "statusStateKey": "ui.candidates.listJobPosition.status",
      "errorStateKey": "ui.candidates.listJobPosition.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listApplication",
      "preconditions": []
    },
    {
      "value": "listCandidate",
      "kind": "detail",
      "actionId": "listCandidate",
      "preconditions": []
    },
    {
      "value": "listJobPosition",
      "kind": "detail",
      "actionId": "listJobPosition",
      "preconditions": []
    },
    {
      "value": "createApplication",
      "kind": "command",
      "actionId": "createApplication",
      "preconditions": [
        "ui.candidates.createApplication.input.candidateId",
        "ui.candidates.createApplication.input.jobPositionId",
        "ui.candidates.createApplication.input.status",
        "ui.candidates.createApplication.input.details"
      ]
    },
    {
      "value": "createCandidate",
      "kind": "command",
      "actionId": "createCandidate",
      "preconditions": [
        "ui.candidates.createCandidate.input.details"
      ]
    },
    {
      "value": "moveToInterview",
      "kind": "command",
      "actionId": "moveToInterview",
      "preconditions": [
        "ui.candidates.moveToInterview.input.id"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "createApplication",
      "kind": "command",
      "routeRef": "createApplicationRoute",
      "inputTypeRef": "CreateApplicationInput",
      "outputTypeRef": "CreateApplicationOutput",
      "inputStateKeys": [
        "ui.candidates.createApplication.input.candidateId",
        "ui.candidates.createApplication.input.jobPositionId",
        "ui.candidates.createApplication.input.status",
        "ui.candidates.createApplication.input.details",
        "ui.candidates.createApplication.input.details_rejectionReason"
      ],
      "resultStateKey": "ui.candidates.createApplication.result"
    },
    {
      "actionId": "createCandidate",
      "kind": "command",
      "routeRef": "createCandidateRoute",
      "inputTypeRef": "CreateCandidateInput",
      "outputTypeRef": "CreateCandidateOutput",
      "inputStateKeys": [
        "ui.candidates.createCandidate.input.details",
        "ui.candidates.createCandidate.input.details_identification",
        "ui.candidates.createCandidate.input.details_identification_name",
        "ui.candidates.createCandidate.input.details_identification_docType",
        "ui.candidates.createCandidate.input.details_identification_docId",
        "ui.candidates.createCandidate.input.details_identification_countryCode",
        "ui.candidates.createCandidate.input.details_person",
        "ui.candidates.createCandidate.input.details_general",
        "ui.candidates.createCandidate.input.details_hiringPipeline",
        "ui.candidates.createCandidate.input.details_hiringPipeline_source"
      ],
      "resultStateKey": "ui.candidates.createCandidate.result"
    },
    {
      "actionId": "moveToInterview",
      "kind": "command",
      "routeRef": "moveToInterviewRoute",
      "inputTypeRef": "MoveToInterviewInput",
      "outputTypeRef": "MoveToInterviewOutput",
      "inputStateKeys": [
        "ui.candidates.moveToInterview.input.id"
      ],
      "resultStateKey": "ui.candidates.moveToInterview.result"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.candidates.listApplication.input.id",
        "ui.candidates.listApplication.input.candidateId",
        "ui.candidates.listApplication.input.jobPositionId",
        "ui.candidates.listApplication.input.status",
        "ui.candidates.listApplication.input.page"
      ],
      "resultStateKey": "ui.candidates.listApplication.result"
    },
    {
      "actionId": "listCandidate",
      "kind": "query",
      "routeRef": "listCandidateRoute",
      "inputTypeRef": "ListCandidateInput",
      "outputTypeRef": "ListCandidateOutput",
      "inputStateKeys": [
        "ui.candidates.listCandidate.input.id",
        "ui.candidates.listCandidate.input.details",
        "ui.candidates.listCandidate.input.details_identification",
        "ui.candidates.listCandidate.input.details_identification_subtype",
        "ui.candidates.listCandidate.input.details_identification_name",
        "ui.candidates.listCandidate.input.details_identification_status",
        "ui.candidates.listCandidate.input.details_identification_docType",
        "ui.candidates.listCandidate.input.details_identification_docId",
        "ui.candidates.listCandidate.input.details_identification_countryCode",
        "ui.candidates.listCandidate.input.page"
      ],
      "resultStateKey": "ui.candidates.listCandidate.result"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.candidates.listJobPosition.input.id",
        "ui.candidates.listJobPosition.input.title",
        "ui.candidates.listJobPosition.input.hiringManagerId",
        "ui.candidates.listJobPosition.input.status",
        "ui.candidates.listJobPosition.input.page"
      ],
      "resultStateKey": "ui.candidates.listJobPosition.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "candidates__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/hiringPipeline/web/shared/candidates.defs.ts",
    "outputPath": "l2/hiringPipeline/web/shared/candidates.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/contracts/candidates.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
