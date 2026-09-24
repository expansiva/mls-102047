export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "hiringPipeline",
  "pageId": "job_positions",
  "pageName": "Job positions",
  "baseClassName": "JobPositionsShared",
  "routePattern": "/job_positions",
  "contractRef": {
    "defPath": "l2/hiringPipeline/web/contracts/job_positions.defs.ts",
    "calls": [
      {
        "actionId": "createApplication",
        "routeConst": "createApplicationRoute",
        "inputType": "CreateApplicationInput",
        "outputType": "CreateApplicationOutput"
      },
      {
        "actionId": "createJobPosition",
        "routeConst": "createJobPositionRoute",
        "inputType": "CreateJobPositionInput",
        "outputType": "CreateJobPositionOutput"
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
      "stateKey": "ui.job_positions.pageStatus",
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
      "stateKey": "ui.job_positions.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "listCandidate",
        "listJobPosition",
        "createApplication",
        "createJobPosition"
      ]
    },
    {
      "stateKey": "ui.job_positions.createApplication.input.candidateId",
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
      "stateKey": "ui.job_positions.createApplication.input.jobPositionId",
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
      "stateKey": "ui.job_positions.createApplication.input.status",
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
      "stateKey": "ui.job_positions.createApplication.input.details",
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
      "stateKey": "ui.job_positions.createApplication.input.details_rejectionReason",
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
      "stateKey": "ui.job_positions.createApplication.status",
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
      "stateKey": "ui.job_positions.createApplication.error",
      "name": "createApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createApplication"
    },
    {
      "stateKey": "ui.job_positions.createApplication.result",
      "name": "createApplicationResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createApplication",
      "contractRef": "CreateApplicationOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.input.title",
      "name": "title",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createJobPosition",
      "contractRef": "CreateJobPositionInput.JobPosition.title",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.input.hiringManagerId",
      "name": "hiringManagerId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createJobPosition",
      "contractRef": "CreateJobPositionInput.JobPosition.hiringManagerId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createJobPosition",
      "contractRef": "CreateJobPositionInput.JobPosition.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createJobPosition",
      "contractRef": "CreateJobPositionInput.JobPosition.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.input.details_department",
      "name": "department",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createJobPosition",
      "contractRef": "CreateJobPositionInput.JobPosition.details.department",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.input.details_description",
      "name": "description",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createJobPosition",
      "contractRef": "CreateJobPositionInput.JobPosition.details.description",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.input.details_headcount",
      "name": "headcount",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createJobPosition",
      "contractRef": "CreateJobPositionInput.JobPosition.details.headcount",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.status",
      "name": "createJobPositionStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createJobPosition"
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.error",
      "name": "createJobPositionError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createJobPosition"
    },
    {
      "stateKey": "ui.job_positions.createJobPosition.result",
      "name": "createJobPositionResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createJobPosition",
      "contractRef": "CreateJobPositionOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.job_positions.rejectApplication.input.id",
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
      "stateKey": "ui.job_positions.rejectApplication.input.details",
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
      "stateKey": "ui.job_positions.rejectApplication.input.details_rejectionReason",
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
      "stateKey": "ui.job_positions.rejectApplication.status",
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
      "stateKey": "ui.job_positions.rejectApplication.error",
      "name": "rejectApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "rejectApplication"
    },
    {
      "stateKey": "ui.job_positions.rejectApplication.result",
      "name": "rejectApplicationResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "rejectApplication",
      "contractRef": "RejectApplicationOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.job_positions.listApplication.input.id",
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
      "stateKey": "ui.job_positions.listApplication.input.candidateId",
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
      "stateKey": "ui.job_positions.listApplication.input.jobPositionId",
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
      "stateKey": "ui.job_positions.listApplication.input.status",
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
      "stateKey": "ui.job_positions.listApplication.input.page",
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
      "stateKey": "ui.job_positions.listApplication.status",
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
      "stateKey": "ui.job_positions.listApplication.error",
      "name": "listApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listApplication"
    },
    {
      "stateKey": "ui.job_positions.listApplication.result",
      "name": "listApplicationResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listApplication",
      "contractRef": "ListApplicationOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.job_positions.listCandidate.input.id",
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
      "stateKey": "ui.job_positions.listCandidate.input.details",
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
      "stateKey": "ui.job_positions.listCandidate.input.details_identification",
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
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_subtype",
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
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_name",
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
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_status",
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
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_docType",
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
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_docId",
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
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_countryCode",
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
      "stateKey": "ui.job_positions.listCandidate.input.page",
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
      "stateKey": "ui.job_positions.listCandidate.status",
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
      "stateKey": "ui.job_positions.listCandidate.error",
      "name": "listCandidateError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listCandidate"
    },
    {
      "stateKey": "ui.job_positions.listCandidate.result",
      "name": "listCandidateResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.job_positions.listJobPosition.input.id",
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
      "stateKey": "ui.job_positions.listJobPosition.input.title",
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
      "stateKey": "ui.job_positions.listJobPosition.input.hiringManagerId",
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
      "stateKey": "ui.job_positions.listJobPosition.input.status",
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
      "stateKey": "ui.job_positions.listJobPosition.input.page",
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
      "stateKey": "ui.job_positions.listJobPosition.status",
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
      "stateKey": "ui.job_positions.listJobPosition.error",
      "name": "listJobPositionError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listJobPosition"
    },
    {
      "stateKey": "ui.job_positions.listJobPosition.result",
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
        "ui.job_positions.createApplication.input.candidateId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createApplication.input.candidateId"
    },
    {
      "actionId": "setCreateApplicationJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createApplication.input.jobPositionId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createApplication.input.jobPositionId"
    },
    {
      "actionId": "setCreateApplicationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createApplication.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createApplication.input.status"
    },
    {
      "actionId": "setCreateApplicationDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createApplication.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createApplication.input.details"
    },
    {
      "actionId": "setCreateApplicationDetailsRejectionReason",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createApplication.input.details_rejectionReason"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createApplication.input.details_rejectionReason"
    },
    {
      "actionId": "createApplication",
      "kind": "command",
      "commandRef": "createApplication",
      "routeRef": "createApplicationRoute",
      "inputTypeRef": "CreateApplicationInput",
      "outputTypeRef": "CreateApplicationOutput",
      "inputStateKeys": [
        "ui.job_positions.createApplication.input.candidateId",
        "ui.job_positions.createApplication.input.jobPositionId",
        "ui.job_positions.createApplication.input.status",
        "ui.job_positions.createApplication.input.details",
        "ui.job_positions.createApplication.input.details_rejectionReason"
      ],
      "outputStateKeys": [
        "ui.job_positions.createApplication.result"
      ],
      "statusStateKey": "ui.job_positions.createApplication.status",
      "errorStateKey": "ui.job_positions.createApplication.error",
      "refreshActionIds": [
        "listApplication"
      ]
    },
    {
      "actionId": "setCreateJobPositionTitle",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createJobPosition.input.title"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createJobPosition.input.title"
    },
    {
      "actionId": "setCreateJobPositionHiringManagerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createJobPosition.input.hiringManagerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createJobPosition.input.hiringManagerId"
    },
    {
      "actionId": "setCreateJobPositionStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createJobPosition.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createJobPosition.input.status"
    },
    {
      "actionId": "setCreateJobPositionDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createJobPosition.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createJobPosition.input.details"
    },
    {
      "actionId": "setCreateJobPositionDetailsDepartment",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createJobPosition.input.details_department"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createJobPosition.input.details_department"
    },
    {
      "actionId": "setCreateJobPositionDetailsDescription",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createJobPosition.input.details_description"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createJobPosition.input.details_description"
    },
    {
      "actionId": "setCreateJobPositionDetailsHeadcount",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.createJobPosition.input.details_headcount"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.createJobPosition.input.details_headcount"
    },
    {
      "actionId": "createJobPosition",
      "kind": "command",
      "commandRef": "createJobPosition",
      "routeRef": "createJobPositionRoute",
      "inputTypeRef": "CreateJobPositionInput",
      "outputTypeRef": "CreateJobPositionOutput",
      "inputStateKeys": [
        "ui.job_positions.createJobPosition.input.title",
        "ui.job_positions.createJobPosition.input.hiringManagerId",
        "ui.job_positions.createJobPosition.input.status",
        "ui.job_positions.createJobPosition.input.details",
        "ui.job_positions.createJobPosition.input.details_department",
        "ui.job_positions.createJobPosition.input.details_description",
        "ui.job_positions.createJobPosition.input.details_headcount"
      ],
      "outputStateKeys": [
        "ui.job_positions.createJobPosition.result"
      ],
      "statusStateKey": "ui.job_positions.createJobPosition.status",
      "errorStateKey": "ui.job_positions.createJobPosition.error",
      "refreshActionIds": [
        "listJobPosition"
      ]
    },
    {
      "actionId": "setRejectApplicationId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.rejectApplication.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.rejectApplication.input.id"
    },
    {
      "actionId": "setRejectApplicationDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.rejectApplication.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.rejectApplication.input.details"
    },
    {
      "actionId": "setRejectApplicationDetailsRejectionReason",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.rejectApplication.input.details_rejectionReason"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.rejectApplication.input.details_rejectionReason"
    },
    {
      "actionId": "rejectApplication",
      "kind": "command",
      "commandRef": "rejectApplication",
      "routeRef": "rejectApplicationRoute",
      "inputTypeRef": "RejectApplicationInput",
      "outputTypeRef": "RejectApplicationOutput",
      "inputStateKeys": [
        "ui.job_positions.rejectApplication.input.id",
        "ui.job_positions.rejectApplication.input.details",
        "ui.job_positions.rejectApplication.input.details_rejectionReason"
      ],
      "outputStateKeys": [
        "ui.job_positions.rejectApplication.result"
      ],
      "statusStateKey": "ui.job_positions.rejectApplication.status",
      "errorStateKey": "ui.job_positions.rejectApplication.error",
      "refreshActionIds": [
        "listApplication"
      ],
      "confirmation": {
        "required": true,
        "title": "Confirm application rejection",
        "description": "Confirm that this application should be closed as rejected with the recorded rejection reason."
      }
    },
    {
      "actionId": "setListApplicationId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listApplication.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listApplication.input.id"
    },
    {
      "actionId": "setListApplicationCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listApplication.input.candidateId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listApplication.input.candidateId"
    },
    {
      "actionId": "setListApplicationJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listApplication.input.jobPositionId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listApplication.input.jobPositionId"
    },
    {
      "actionId": "setListApplicationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listApplication.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listApplication.input.status"
    },
    {
      "actionId": "setListApplicationPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listApplication.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listApplication.input.page"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "commandRef": "listApplication",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.job_positions.listApplication.input.id",
        "ui.job_positions.listApplication.input.candidateId",
        "ui.job_positions.listApplication.input.jobPositionId",
        "ui.job_positions.listApplication.input.status",
        "ui.job_positions.listApplication.input.page"
      ],
      "outputStateKeys": [
        "ui.job_positions.listApplication.result"
      ],
      "statusStateKey": "ui.job_positions.listApplication.status",
      "errorStateKey": "ui.job_positions.listApplication.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.id"
    },
    {
      "actionId": "setListCandidateDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.details"
    },
    {
      "actionId": "setListCandidateDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.details_identification"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_subtype"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_name"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_status"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_docType"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_docId"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.details_identification_countryCode"
    },
    {
      "actionId": "setListCandidatePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listCandidate.input.page"
    },
    {
      "actionId": "listCandidate",
      "kind": "query",
      "commandRef": "listCandidate",
      "routeRef": "listCandidateRoute",
      "inputTypeRef": "ListCandidateInput",
      "outputTypeRef": "ListCandidateOutput",
      "inputStateKeys": [
        "ui.job_positions.listCandidate.input.id",
        "ui.job_positions.listCandidate.input.details",
        "ui.job_positions.listCandidate.input.details_identification",
        "ui.job_positions.listCandidate.input.details_identification_subtype",
        "ui.job_positions.listCandidate.input.details_identification_name",
        "ui.job_positions.listCandidate.input.details_identification_status",
        "ui.job_positions.listCandidate.input.details_identification_docType",
        "ui.job_positions.listCandidate.input.details_identification_docId",
        "ui.job_positions.listCandidate.input.details_identification_countryCode",
        "ui.job_positions.listCandidate.input.page"
      ],
      "outputStateKeys": [
        "ui.job_positions.listCandidate.result"
      ],
      "statusStateKey": "ui.job_positions.listCandidate.status",
      "errorStateKey": "ui.job_positions.listCandidate.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listJobPosition.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listJobPosition.input.id"
    },
    {
      "actionId": "setListJobPositionTitle",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listJobPosition.input.title"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listJobPosition.input.title"
    },
    {
      "actionId": "setListJobPositionHiringManagerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listJobPosition.input.hiringManagerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listJobPosition.input.hiringManagerId"
    },
    {
      "actionId": "setListJobPositionStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listJobPosition.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listJobPosition.input.status"
    },
    {
      "actionId": "setListJobPositionPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.job_positions.listJobPosition.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.job_positions.listJobPosition.input.page"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "commandRef": "listJobPosition",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.job_positions.listJobPosition.input.id",
        "ui.job_positions.listJobPosition.input.title",
        "ui.job_positions.listJobPosition.input.hiringManagerId",
        "ui.job_positions.listJobPosition.input.status",
        "ui.job_positions.listJobPosition.input.page"
      ],
      "outputStateKeys": [
        "ui.job_positions.listJobPosition.result"
      ],
      "statusStateKey": "ui.job_positions.listJobPosition.status",
      "errorStateKey": "ui.job_positions.listJobPosition.error",
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
        "ui.job_positions.createApplication.input.candidateId",
        "ui.job_positions.createApplication.input.jobPositionId"
      ]
    },
    {
      "value": "createJobPosition",
      "kind": "command",
      "actionId": "createJobPosition",
      "preconditions": [
        "ui.job_positions.createJobPosition.input.hiringManagerId"
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
        "ui.job_positions.createApplication.input.candidateId",
        "ui.job_positions.createApplication.input.jobPositionId",
        "ui.job_positions.createApplication.input.status",
        "ui.job_positions.createApplication.input.details",
        "ui.job_positions.createApplication.input.details_rejectionReason"
      ],
      "resultStateKey": "ui.job_positions.createApplication.result"
    },
    {
      "actionId": "createJobPosition",
      "kind": "command",
      "routeRef": "createJobPositionRoute",
      "inputTypeRef": "CreateJobPositionInput",
      "outputTypeRef": "CreateJobPositionOutput",
      "inputStateKeys": [
        "ui.job_positions.createJobPosition.input.title",
        "ui.job_positions.createJobPosition.input.hiringManagerId",
        "ui.job_positions.createJobPosition.input.status",
        "ui.job_positions.createJobPosition.input.details",
        "ui.job_positions.createJobPosition.input.details_department",
        "ui.job_positions.createJobPosition.input.details_description",
        "ui.job_positions.createJobPosition.input.details_headcount"
      ],
      "resultStateKey": "ui.job_positions.createJobPosition.result"
    },
    {
      "actionId": "rejectApplication",
      "kind": "command",
      "routeRef": "rejectApplicationRoute",
      "inputTypeRef": "RejectApplicationInput",
      "outputTypeRef": "RejectApplicationOutput",
      "inputStateKeys": [
        "ui.job_positions.rejectApplication.input.id",
        "ui.job_positions.rejectApplication.input.details",
        "ui.job_positions.rejectApplication.input.details_rejectionReason"
      ],
      "resultStateKey": "ui.job_positions.rejectApplication.result"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.job_positions.listApplication.input.id",
        "ui.job_positions.listApplication.input.candidateId",
        "ui.job_positions.listApplication.input.jobPositionId",
        "ui.job_positions.listApplication.input.status",
        "ui.job_positions.listApplication.input.page"
      ],
      "resultStateKey": "ui.job_positions.listApplication.result"
    },
    {
      "actionId": "listCandidate",
      "kind": "query",
      "routeRef": "listCandidateRoute",
      "inputTypeRef": "ListCandidateInput",
      "outputTypeRef": "ListCandidateOutput",
      "inputStateKeys": [
        "ui.job_positions.listCandidate.input.id",
        "ui.job_positions.listCandidate.input.details",
        "ui.job_positions.listCandidate.input.details_identification",
        "ui.job_positions.listCandidate.input.details_identification_subtype",
        "ui.job_positions.listCandidate.input.details_identification_name",
        "ui.job_positions.listCandidate.input.details_identification_status",
        "ui.job_positions.listCandidate.input.details_identification_docType",
        "ui.job_positions.listCandidate.input.details_identification_docId",
        "ui.job_positions.listCandidate.input.details_identification_countryCode",
        "ui.job_positions.listCandidate.input.page"
      ],
      "resultStateKey": "ui.job_positions.listCandidate.result"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.job_positions.listJobPosition.input.id",
        "ui.job_positions.listJobPosition.input.title",
        "ui.job_positions.listJobPosition.input.hiringManagerId",
        "ui.job_positions.listJobPosition.input.status",
        "ui.job_positions.listJobPosition.input.page"
      ],
      "resultStateKey": "ui.job_positions.listJobPosition.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "job_positions__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/hiringPipeline/web/shared/job_positions.defs.ts",
    "outputPath": "l2/hiringPipeline/web/shared/job_positions.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/contracts/job_positions.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
