export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "hiringPipeline",
  "pageId": "managed_applications",
  "pageName": "Applications",
  "baseClassName": "ManagedApplicationsShared",
  "routePattern": "/hiring_workspace/managed_applications",
  "contractRef": {
    "defPath": "l2/hiringPipeline/web/contracts/managed_applications.defs.ts",
    "calls": [
      {
        "actionId": "moveToHired",
        "routeConst": "moveToHiredRoute",
        "inputType": "MoveToHiredInput",
        "outputType": "MoveToHiredOutput"
      },
      {
        "actionId": "moveToOffer",
        "routeConst": "moveToOfferRoute",
        "inputType": "MoveToOfferInput",
        "outputType": "MoveToOfferOutput"
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
      "stateKey": "ui.managed_applications.pageStatus",
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
      "stateKey": "ui.managed_applications.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "candidate",
        "jobPosition",
        "moveToHired",
        "moveToOffer"
      ]
    },
    {
      "stateKey": "ui.managed_applications.moveToHired.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "moveToHired",
      "contractRef": "MoveToHiredInput.Application.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.managed_applications.moveToHired.status",
      "name": "moveToHiredStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "moveToHired"
    },
    {
      "stateKey": "ui.managed_applications.moveToHired.error",
      "name": "moveToHiredError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "moveToHired"
    },
    {
      "stateKey": "ui.managed_applications.moveToHired.result",
      "name": "moveToHiredResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "moveToHired",
      "contractRef": "MoveToHiredOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.managed_applications.moveToOffer.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "moveToOffer",
      "contractRef": "MoveToOfferInput.Application.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.managed_applications.moveToOffer.status",
      "name": "moveToOfferStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "moveToOffer"
    },
    {
      "stateKey": "ui.managed_applications.moveToOffer.error",
      "name": "moveToOfferError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "moveToOffer"
    },
    {
      "stateKey": "ui.managed_applications.moveToOffer.result",
      "name": "moveToOfferResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "moveToOffer",
      "contractRef": "MoveToOfferOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.managed_applications.listApplication.input.id",
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
      "stateKey": "ui.managed_applications.listApplication.input.candidateId",
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
      "stateKey": "ui.managed_applications.listApplication.input.jobPositionId",
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
      "stateKey": "ui.managed_applications.listApplication.input.status",
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
      "stateKey": "ui.managed_applications.listApplication.input.page",
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
      "stateKey": "ui.managed_applications.listApplication.status",
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
      "stateKey": "ui.managed_applications.listApplication.error",
      "name": "listApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listApplication"
    },
    {
      "stateKey": "ui.managed_applications.listApplication.result",
      "name": "listApplicationResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listApplication",
      "contractRef": "ListApplicationOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.managed_applications.listCandidate.input.id",
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
      "stateKey": "ui.managed_applications.listCandidate.input.details",
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
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification",
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
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_subtype",
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
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_name",
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
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_status",
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
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_docType",
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
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_docId",
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
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_countryCode",
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
      "stateKey": "ui.managed_applications.listCandidate.input.page",
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
      "stateKey": "ui.managed_applications.listCandidate.status",
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
      "stateKey": "ui.managed_applications.listCandidate.error",
      "name": "listCandidateError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listCandidate"
    },
    {
      "stateKey": "ui.managed_applications.listCandidate.result",
      "name": "listCandidateResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listCandidate",
      "contractRef": "ListCandidateOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.managed_applications.listJobPosition.input.id",
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
      "stateKey": "ui.managed_applications.listJobPosition.input.title",
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
      "stateKey": "ui.managed_applications.listJobPosition.input.hiringManagerId",
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
      "stateKey": "ui.managed_applications.listJobPosition.input.status",
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
      "stateKey": "ui.managed_applications.listJobPosition.input.page",
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
      "stateKey": "ui.managed_applications.listJobPosition.status",
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
      "stateKey": "ui.managed_applications.listJobPosition.error",
      "name": "listJobPositionError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listJobPosition"
    },
    {
      "stateKey": "ui.managed_applications.listJobPosition.result",
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
      "actionId": "setMoveToHiredId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.moveToHired.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.moveToHired.input.id"
    },
    {
      "actionId": "moveToHired",
      "kind": "command",
      "commandRef": "moveToHired",
      "routeRef": "moveToHiredRoute",
      "inputTypeRef": "MoveToHiredInput",
      "outputTypeRef": "MoveToHiredOutput",
      "inputStateKeys": [
        "ui.managed_applications.moveToHired.input.id"
      ],
      "outputStateKeys": [
        "ui.managed_applications.moveToHired.result"
      ],
      "statusStateKey": "ui.managed_applications.moveToHired.status",
      "errorStateKey": "ui.managed_applications.moveToHired.error",
      "refreshActionIds": [
        "listApplication",
        "listJobPosition"
      ]
    },
    {
      "actionId": "setMoveToOfferId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.moveToOffer.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.moveToOffer.input.id"
    },
    {
      "actionId": "moveToOffer",
      "kind": "command",
      "commandRef": "moveToOffer",
      "routeRef": "moveToOfferRoute",
      "inputTypeRef": "MoveToOfferInput",
      "outputTypeRef": "MoveToOfferOutput",
      "inputStateKeys": [
        "ui.managed_applications.moveToOffer.input.id"
      ],
      "outputStateKeys": [
        "ui.managed_applications.moveToOffer.result"
      ],
      "statusStateKey": "ui.managed_applications.moveToOffer.status",
      "errorStateKey": "ui.managed_applications.moveToOffer.error",
      "refreshActionIds": [
        "listApplication"
      ]
    },
    {
      "actionId": "setListApplicationId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listApplication.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listApplication.input.id"
    },
    {
      "actionId": "setListApplicationCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listApplication.input.candidateId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listApplication.input.candidateId"
    },
    {
      "actionId": "setListApplicationJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listApplication.input.jobPositionId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listApplication.input.jobPositionId"
    },
    {
      "actionId": "setListApplicationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listApplication.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listApplication.input.status"
    },
    {
      "actionId": "setListApplicationPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listApplication.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listApplication.input.page"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "commandRef": "listApplication",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.managed_applications.listApplication.input.id",
        "ui.managed_applications.listApplication.input.candidateId",
        "ui.managed_applications.listApplication.input.jobPositionId",
        "ui.managed_applications.listApplication.input.status",
        "ui.managed_applications.listApplication.input.page"
      ],
      "outputStateKeys": [
        "ui.managed_applications.listApplication.result"
      ],
      "statusStateKey": "ui.managed_applications.listApplication.status",
      "errorStateKey": "ui.managed_applications.listApplication.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.id"
    },
    {
      "actionId": "setListCandidateDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.details"
    },
    {
      "actionId": "setListCandidateDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_subtype"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_name"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_status"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_docType"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_docId"
    },
    {
      "actionId": "setListCandidateDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.details_identification_countryCode"
    },
    {
      "actionId": "setListCandidatePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listCandidate.input.page"
    },
    {
      "actionId": "listCandidate",
      "kind": "query",
      "commandRef": "listCandidate",
      "routeRef": "listCandidateRoute",
      "inputTypeRef": "ListCandidateInput",
      "outputTypeRef": "ListCandidateOutput",
      "inputStateKeys": [
        "ui.managed_applications.listCandidate.input.id",
        "ui.managed_applications.listCandidate.input.details",
        "ui.managed_applications.listCandidate.input.details_identification",
        "ui.managed_applications.listCandidate.input.details_identification_subtype",
        "ui.managed_applications.listCandidate.input.details_identification_name",
        "ui.managed_applications.listCandidate.input.details_identification_status",
        "ui.managed_applications.listCandidate.input.details_identification_docType",
        "ui.managed_applications.listCandidate.input.details_identification_docId",
        "ui.managed_applications.listCandidate.input.details_identification_countryCode",
        "ui.managed_applications.listCandidate.input.page"
      ],
      "outputStateKeys": [
        "ui.managed_applications.listCandidate.result"
      ],
      "statusStateKey": "ui.managed_applications.listCandidate.status",
      "errorStateKey": "ui.managed_applications.listCandidate.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listJobPosition.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listJobPosition.input.id"
    },
    {
      "actionId": "setListJobPositionTitle",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listJobPosition.input.title"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listJobPosition.input.title"
    },
    {
      "actionId": "setListJobPositionHiringManagerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listJobPosition.input.hiringManagerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listJobPosition.input.hiringManagerId"
    },
    {
      "actionId": "setListJobPositionStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listJobPosition.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listJobPosition.input.status"
    },
    {
      "actionId": "setListJobPositionPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_applications.listJobPosition.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_applications.listJobPosition.input.page"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "commandRef": "listJobPosition",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.managed_applications.listJobPosition.input.id",
        "ui.managed_applications.listJobPosition.input.title",
        "ui.managed_applications.listJobPosition.input.hiringManagerId",
        "ui.managed_applications.listJobPosition.input.status",
        "ui.managed_applications.listJobPosition.input.page"
      ],
      "outputStateKeys": [
        "ui.managed_applications.listJobPosition.result"
      ],
      "statusStateKey": "ui.managed_applications.listJobPosition.status",
      "errorStateKey": "ui.managed_applications.listJobPosition.error",
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
      "value": "candidate",
      "kind": "detail",
      "actionId": "listCandidate",
      "preconditions": [
        "ui.managed_applications.listCandidate.input.id"
      ]
    },
    {
      "value": "jobPosition",
      "kind": "detail",
      "actionId": "listJobPosition",
      "preconditions": [
        "ui.managed_applications.listJobPosition.input.id"
      ]
    },
    {
      "value": "moveToHired",
      "kind": "command",
      "actionId": "moveToHired",
      "preconditions": [
        "ui.managed_applications.moveToHired.input.id"
      ]
    },
    {
      "value": "moveToOffer",
      "kind": "command",
      "actionId": "moveToOffer",
      "preconditions": [
        "ui.managed_applications.moveToOffer.input.id"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "moveToHired",
      "kind": "command",
      "routeRef": "moveToHiredRoute",
      "inputTypeRef": "MoveToHiredInput",
      "outputTypeRef": "MoveToHiredOutput",
      "inputStateKeys": [
        "ui.managed_applications.moveToHired.input.id"
      ],
      "resultStateKey": "ui.managed_applications.moveToHired.result"
    },
    {
      "actionId": "moveToOffer",
      "kind": "command",
      "routeRef": "moveToOfferRoute",
      "inputTypeRef": "MoveToOfferInput",
      "outputTypeRef": "MoveToOfferOutput",
      "inputStateKeys": [
        "ui.managed_applications.moveToOffer.input.id"
      ],
      "resultStateKey": "ui.managed_applications.moveToOffer.result"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.managed_applications.listApplication.input.id",
        "ui.managed_applications.listApplication.input.candidateId",
        "ui.managed_applications.listApplication.input.jobPositionId",
        "ui.managed_applications.listApplication.input.status",
        "ui.managed_applications.listApplication.input.page"
      ],
      "resultStateKey": "ui.managed_applications.listApplication.result"
    },
    {
      "actionId": "listCandidate",
      "kind": "query",
      "routeRef": "listCandidateRoute",
      "inputTypeRef": "ListCandidateInput",
      "outputTypeRef": "ListCandidateOutput",
      "inputStateKeys": [
        "ui.managed_applications.listCandidate.input.id",
        "ui.managed_applications.listCandidate.input.details",
        "ui.managed_applications.listCandidate.input.details_identification",
        "ui.managed_applications.listCandidate.input.details_identification_subtype",
        "ui.managed_applications.listCandidate.input.details_identification_name",
        "ui.managed_applications.listCandidate.input.details_identification_status",
        "ui.managed_applications.listCandidate.input.details_identification_docType",
        "ui.managed_applications.listCandidate.input.details_identification_docId",
        "ui.managed_applications.listCandidate.input.details_identification_countryCode",
        "ui.managed_applications.listCandidate.input.page"
      ],
      "resultStateKey": "ui.managed_applications.listCandidate.result"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.managed_applications.listJobPosition.input.id",
        "ui.managed_applications.listJobPosition.input.title",
        "ui.managed_applications.listJobPosition.input.hiringManagerId",
        "ui.managed_applications.listJobPosition.input.status",
        "ui.managed_applications.listJobPosition.input.page"
      ],
      "resultStateKey": "ui.managed_applications.listJobPosition.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "managed_applications__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/hiringPipeline/web/shared/managed_applications.defs.ts",
    "outputPath": "l2/hiringPipeline/web/shared/managed_applications.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/contracts/managed_applications.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
