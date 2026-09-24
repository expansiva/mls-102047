export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "hiringPipeline",
  "pageId": "applications",
  "pageName": "Applications",
  "baseClassName": "ApplicationsShared",
  "routePattern": "/applications",
  "contractRef": {
    "defPath": "l2/hiringPipeline/web/contracts/applications.defs.ts",
    "calls": [
      {
        "actionId": "createApplication",
        "routeConst": "createApplicationRoute",
        "inputType": "CreateApplicationInput",
        "outputType": "CreateApplicationOutput"
      },
      {
        "actionId": "moveToInterview",
        "routeConst": "moveToInterviewRoute",
        "inputType": "MoveToInterviewInput",
        "outputType": "MoveToInterviewOutput"
      },
      {
        "actionId": "rejectApplication",
        "routeConst": "rejectApplicationRoute",
        "inputType": "RejectApplicationInput",
        "outputType": "RejectApplicationOutput"
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
      "stateKey": "ui.applications.pageStatus",
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
      "stateKey": "ui.applications.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "createApplication",
        "moveToInterview"
      ]
    },
    {
      "stateKey": "ui.applications.createApplication.input.candidateId",
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
      "stateKey": "ui.applications.createApplication.input.jobPositionId",
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
      "stateKey": "ui.applications.createApplication.input.status",
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
      "stateKey": "ui.applications.createApplication.input.details",
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
      "stateKey": "ui.applications.createApplication.input.details_rejectionReason",
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
      "stateKey": "ui.applications.createApplication.status",
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
      "stateKey": "ui.applications.createApplication.error",
      "name": "createApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createApplication"
    },
    {
      "stateKey": "ui.applications.createApplication.result",
      "name": "createApplicationResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createApplication",
      "contractRef": "CreateApplicationOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.applications.moveToInterview.input.id",
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
      "stateKey": "ui.applications.moveToInterview.status",
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
      "stateKey": "ui.applications.moveToInterview.error",
      "name": "moveToInterviewError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "moveToInterview"
    },
    {
      "stateKey": "ui.applications.moveToInterview.result",
      "name": "moveToInterviewResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "moveToInterview",
      "contractRef": "MoveToInterviewOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.applications.rejectApplication.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "rejectApplication",
      "contractRef": "RejectApplicationInput.Application.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.applications.rejectApplication.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "rejectApplication",
      "contractRef": "RejectApplicationInput.Application.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.applications.rejectApplication.input.details_rejectionReason",
      "name": "rejectionReason",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "rejectApplication",
      "contractRef": "RejectApplicationInput.Application.details.rejectionReason",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.applications.rejectApplication.status",
      "name": "rejectApplicationStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "rejectApplication"
    },
    {
      "stateKey": "ui.applications.rejectApplication.error",
      "name": "rejectApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "rejectApplication"
    },
    {
      "stateKey": "ui.applications.rejectApplication.result",
      "name": "rejectApplicationResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "rejectApplication",
      "contractRef": "RejectApplicationOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.applications.listApplication.input.id",
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
      "stateKey": "ui.applications.listApplication.input.candidateId",
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
      "stateKey": "ui.applications.listApplication.input.jobPositionId",
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
      "stateKey": "ui.applications.listApplication.input.status",
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
      "stateKey": "ui.applications.listApplication.input.page",
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
      "stateKey": "ui.applications.listApplication.status",
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
      "stateKey": "ui.applications.listApplication.error",
      "name": "listApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listApplication"
    },
    {
      "stateKey": "ui.applications.listApplication.result",
      "name": "listApplicationResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listApplication",
      "contractRef": "ListApplicationOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.applications.listCandidate.input.id",
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
      "stateKey": "ui.applications.listCandidate.input.details",
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
      "stateKey": "ui.applications.listCandidate.input.details_identification",
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
      "stateKey": "ui.applications.listCandidate.input.details_identification_subtype",
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
      "stateKey": "ui.applications.listCandidate.input.details_identification_name",
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
      "stateKey": "ui.applications.listCandidate.input.details_identification_status",
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
      "stateKey": "ui.applications.listCandidate.input.details_identification_docType",
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
      "stateKey": "ui.applications.listCandidate.input.details_identification_docId",
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
      "stateKey": "ui.applications.listCandidate.input.details_identification_countryCode",
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
      "stateKey": "ui.applications.listCandidate.input.page",
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
      "stateKey": "ui.applications.listCandidate.status",
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
      "stateKey": "ui.applications.listCandidate.error",
      "name": "listCandidateError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listCandidate"
    },
    {
      "stateKey": "ui.applications.listCandidate.result",
      "name": "listCandidateResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.applications.listJobPosition.input.id",
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
      "stateKey": "ui.applications.listJobPosition.input.title",
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
      "stateKey": "ui.applications.listJobPosition.input.hiringManagerId",
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
      "stateKey": "ui.applications.listJobPosition.input.status",
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
      "stateKey": "ui.applications.listJobPosition.input.page",
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
      "stateKey": "ui.applications.listJobPosition.status",
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
      "stateKey": "ui.applications.listJobPosition.error",
      "name": "listJobPositionError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listJobPosition"
    },
    {
      "stateKey": "ui.applications.listJobPosition.result",
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
        "ui.applications.createApplication.input.candidateId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.createApplication.input.candidateId"
    },
    {
      "actionId": "setCreateApplicationJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.createApplication.input.jobPositionId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.createApplication.input.jobPositionId"
    },
    {
      "actionId": "setCreateApplicationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.createApplication.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.createApplication.input.status"
    },
    {
      "actionId": "setCreateApplicationDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.createApplication.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.createApplication.input.details"
    },
    {
      "actionId": "setCreateApplicationDetailsRejectionReason",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.createApplication.input.details_rejectionReason"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.createApplication.input.details_rejectionReason"
    },
    {
      "actionId": "createApplication",
      "kind": "command",
      "commandRef": "createApplication",
      "routeRef": "createApplicationRoute",
      "inputTypeRef": "CreateApplicationInput",
      "outputTypeRef": "CreateApplicationOutput",
      "inputStateKeys": [
        "ui.applications.createApplication.input.candidateId",
        "ui.applications.createApplication.input.jobPositionId",
        "ui.applications.createApplication.input.status",
        "ui.applications.createApplication.input.details",
        "ui.applications.createApplication.input.details_rejectionReason"
      ],
      "outputStateKeys": [
        "ui.applications.createApplication.result"
      ],
      "statusStateKey": "ui.applications.createApplication.status",
      "errorStateKey": "ui.applications.createApplication.error",
      "refreshActionIds": [
        "listApplication"
      ]
    },
    {
      "actionId": "setMoveToInterviewId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.moveToInterview.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.moveToInterview.input.id"
    },
    {
      "actionId": "moveToInterview",
      "kind": "command",
      "commandRef": "moveToInterview",
      "routeRef": "moveToInterviewRoute",
      "inputTypeRef": "MoveToInterviewInput",
      "outputTypeRef": "MoveToInterviewOutput",
      "inputStateKeys": [
        "ui.applications.moveToInterview.input.id"
      ],
      "outputStateKeys": [
        "ui.applications.moveToInterview.result"
      ],
      "statusStateKey": "ui.applications.moveToInterview.status",
      "errorStateKey": "ui.applications.moveToInterview.error",
      "refreshActionIds": [
        "listApplication"
      ]
    },
    {
      "actionId": "setRejectApplicationId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.rejectApplication.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.rejectApplication.input.id"
    },
    {
      "actionId": "setRejectApplicationDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.rejectApplication.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.rejectApplication.input.details"
    },
    {
      "actionId": "setRejectApplicationDetailsRejectionReason",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.rejectApplication.input.details_rejectionReason"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.rejectApplication.input.details_rejectionReason"
    },
    {
      "actionId": "rejectApplication",
      "kind": "command",
      "commandRef": "rejectApplication",
      "routeRef": "rejectApplicationRoute",
      "inputTypeRef": "RejectApplicationInput",
      "outputTypeRef": "RejectApplicationOutput",
      "inputStateKeys": [
        "ui.applications.rejectApplication.input.id",
        "ui.applications.rejectApplication.input.details",
        "ui.applications.rejectApplication.input.details_rejectionReason"
      ],
      "outputStateKeys": [
        "ui.applications.rejectApplication.result"
      ],
      "statusStateKey": "ui.applications.rejectApplication.status",
      "errorStateKey": "ui.applications.rejectApplication.error",
      "refreshActionIds": [
        "listApplication"
      ],
      "confirmation": {
        "required": true,
        "title": "Confirm application rejection",
        "description": "Confirm that this application should be moved to rejected with the recorded rejection reason."
      }
    },
    {
      "actionId": "setListApplicationId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listApplication.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listApplication.input.id"
    },
    {
      "actionId": "setListApplicationCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listApplication.input.candidateId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listApplication.input.candidateId"
    },
    {
      "actionId": "setListApplicationJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listApplication.input.jobPositionId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listApplication.input.jobPositionId"
    },
    {
      "actionId": "setListApplicationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listApplication.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listApplication.input.status"
    },
    {
      "actionId": "setListApplicationPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listApplication.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listApplication.input.page"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "commandRef": "listApplication",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.applications.listApplication.input.id",
        "ui.applications.listApplication.input.candidateId",
        "ui.applications.listApplication.input.jobPositionId",
        "ui.applications.listApplication.input.status",
        "ui.applications.listApplication.input.page"
      ],
      "outputStateKeys": [
        "ui.applications.listApplication.result"
      ],
      "statusStateKey": "ui.applications.listApplication.status",
      "errorStateKey": "ui.applications.listApplication.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.id"
    },
    {
      "actionId": "setListCandidateDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.details"
    },
    {
      "actionId": "setListCandidateDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.details_identification"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.details_identification_subtype"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.details_identification_name"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.details_identification_status"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.details_identification_docType"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.details_identification_docId"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.details_identification_countryCode"
    },
    {
      "actionId": "setListCandidatePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listCandidate.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listCandidate.input.page"
    },
    {
      "actionId": "listCandidate",
      "kind": "query",
      "commandRef": "listCandidate",
      "routeRef": "listCandidateRoute",
      "inputTypeRef": "ListCandidateInput",
      "outputTypeRef": "ListCandidateOutput",
      "inputStateKeys": [
        "ui.applications.listCandidate.input.id",
        "ui.applications.listCandidate.input.details",
        "ui.applications.listCandidate.input.details_identification",
        "ui.applications.listCandidate.input.details_identification_subtype",
        "ui.applications.listCandidate.input.details_identification_name",
        "ui.applications.listCandidate.input.details_identification_status",
        "ui.applications.listCandidate.input.details_identification_docType",
        "ui.applications.listCandidate.input.details_identification_docId",
        "ui.applications.listCandidate.input.details_identification_countryCode",
        "ui.applications.listCandidate.input.page"
      ],
      "outputStateKeys": [
        "ui.applications.listCandidate.result"
      ],
      "statusStateKey": "ui.applications.listCandidate.status",
      "errorStateKey": "ui.applications.listCandidate.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listJobPosition.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listJobPosition.input.id"
    },
    {
      "actionId": "setListJobPositionTitle",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listJobPosition.input.title"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listJobPosition.input.title"
    },
    {
      "actionId": "setListJobPositionHiringManagerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listJobPosition.input.hiringManagerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listJobPosition.input.hiringManagerId"
    },
    {
      "actionId": "setListJobPositionStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listJobPosition.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listJobPosition.input.status"
    },
    {
      "actionId": "setListJobPositionPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.applications.listJobPosition.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.applications.listJobPosition.input.page"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "commandRef": "listJobPosition",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.applications.listJobPosition.input.id",
        "ui.applications.listJobPosition.input.title",
        "ui.applications.listJobPosition.input.hiringManagerId",
        "ui.applications.listJobPosition.input.status",
        "ui.applications.listJobPosition.input.page"
      ],
      "outputStateKeys": [
        "ui.applications.listJobPosition.result"
      ],
      "statusStateKey": "ui.applications.listJobPosition.status",
      "errorStateKey": "ui.applications.listJobPosition.error",
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
      "value": "createApplication",
      "kind": "command",
      "actionId": "createApplication",
      "preconditions": [
        "ui.applications.createApplication.input.candidateId",
        "ui.applications.createApplication.input.jobPositionId",
        "ui.applications.createApplication.input.status",
        "ui.applications.createApplication.input.details"
      ]
    },
    {
      "value": "moveToInterview",
      "kind": "command",
      "actionId": "moveToInterview",
      "preconditions": [
        "ui.applications.moveToInterview.input.id"
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
        "ui.applications.createApplication.input.candidateId",
        "ui.applications.createApplication.input.jobPositionId",
        "ui.applications.createApplication.input.status",
        "ui.applications.createApplication.input.details",
        "ui.applications.createApplication.input.details_rejectionReason"
      ],
      "resultStateKey": "ui.applications.createApplication.result"
    },
    {
      "actionId": "moveToInterview",
      "kind": "command",
      "routeRef": "moveToInterviewRoute",
      "inputTypeRef": "MoveToInterviewInput",
      "outputTypeRef": "MoveToInterviewOutput",
      "inputStateKeys": [
        "ui.applications.moveToInterview.input.id"
      ],
      "resultStateKey": "ui.applications.moveToInterview.result"
    },
    {
      "actionId": "rejectApplication",
      "kind": "command",
      "routeRef": "rejectApplicationRoute",
      "inputTypeRef": "RejectApplicationInput",
      "outputTypeRef": "RejectApplicationOutput",
      "inputStateKeys": [
        "ui.applications.rejectApplication.input.id",
        "ui.applications.rejectApplication.input.details",
        "ui.applications.rejectApplication.input.details_rejectionReason"
      ],
      "resultStateKey": "ui.applications.rejectApplication.result"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.applications.listApplication.input.id",
        "ui.applications.listApplication.input.candidateId",
        "ui.applications.listApplication.input.jobPositionId",
        "ui.applications.listApplication.input.status",
        "ui.applications.listApplication.input.page"
      ],
      "resultStateKey": "ui.applications.listApplication.result"
    },
    {
      "actionId": "listCandidate",
      "kind": "query",
      "routeRef": "listCandidateRoute",
      "inputTypeRef": "ListCandidateInput",
      "outputTypeRef": "ListCandidateOutput",
      "inputStateKeys": [
        "ui.applications.listCandidate.input.id",
        "ui.applications.listCandidate.input.details",
        "ui.applications.listCandidate.input.details_identification",
        "ui.applications.listCandidate.input.details_identification_subtype",
        "ui.applications.listCandidate.input.details_identification_name",
        "ui.applications.listCandidate.input.details_identification_status",
        "ui.applications.listCandidate.input.details_identification_docType",
        "ui.applications.listCandidate.input.details_identification_docId",
        "ui.applications.listCandidate.input.details_identification_countryCode",
        "ui.applications.listCandidate.input.page"
      ],
      "resultStateKey": "ui.applications.listCandidate.result"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.applications.listJobPosition.input.id",
        "ui.applications.listJobPosition.input.title",
        "ui.applications.listJobPosition.input.hiringManagerId",
        "ui.applications.listJobPosition.input.status",
        "ui.applications.listJobPosition.input.page"
      ],
      "resultStateKey": "ui.applications.listJobPosition.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "applications__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/hiringPipeline/web/shared/applications.defs.ts",
    "outputPath": "l2/hiringPipeline/web/shared/applications.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/contracts/applications.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
