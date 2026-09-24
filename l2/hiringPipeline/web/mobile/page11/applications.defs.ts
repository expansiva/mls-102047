export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Shows applications by candidate, job position, and stage so a recruiter can locate work to review, prioritizing identifying information on narrow screens. It supports retrieving the application collection with the declared application lookup values and page value. It communicates loading while results are requested, an empty result when no applications match, and an error when retrieval fails. Touch targets, keyboard access, clear accessible names, and live status updates remain available.",
    "contentRef": "base",
    "capabilityRefs": [
      "listApplication",
      "setListApplicationId",
      "setListApplicationCandidateId",
      "setListApplicationJobPositionId",
      "setListApplicationStatus",
      "setListApplicationPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "The declared application query returns a collection whose candidate, position, and stage can be scanned in a constrained reading context."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The declared query status and error state need clear accessible loading, empty, and failure feedback."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Presents the selected application, candidate, job position, and current stage in a reading order that prioritizes decision context on a small screen. It retrieves related application, candidate, and job-position information; it communicates loading and retrieval failures, and states when requested information is unavailable. Related information and current stage must have accessible labels and remain readable without removing any information capability.",
    "contentRef": "base",
    "capabilityRefs": [
      "listApplication",
      "listCandidate",
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "The organism presents a focused application record with related candidate and position information."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Declared retrieval statuses and errors need contextual accessible feedback."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Lets a recruiter start screening by choosing a candidate and an open job position, entering required application status and details, and optionally entering a rejection reason with touch-friendly input. It retrieves candidate and job-position choices, validates required values before creating the application, indicates submission in progress, confirms success, and explains submission errors without discarding entered values. Inputs need accessible labels and required-state announcements, and all selections and submission remain keyboard and touch operable.",
    "contentRef": "createApplication",
    "capabilityRefs": [
      "listCandidate",
      "listJobPosition",
      "setCreateApplicationCandidateId",
      "setCreateApplicationJobPositionId",
      "setCreateApplicationStatus",
      "setCreateApplicationDetails",
      "setCreateApplicationDetailsRejectionReason",
      "createApplication"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-combobox",
          "groupselectone--ml-select-one-autocomplete"
        ],
        "reason": "Candidate and job-position values are required single choices supplied by declared queries and input setters."
      },
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "The form has declared setters for application status, details, and an optional rejection reason."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Creating an application is a declared command with loading and disabled states."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "Validation, command errors, and successful creation need clear feedback."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Provides touch-operable contextual decisions for the selected application: move a screened application to interview, or record required rejection details and an optional rejection reason before closing it as rejected. Moving to interview requires a selected application and reports progress, success, or failure. Rejection requires explicit confirmation before execution and must communicate its result or error accessibly; unavailable actions remain disabled until their required information is present.",
    "contentRef": "moveToInterview",
    "capabilityRefs": [
      "setMoveToInterviewId",
      "moveToInterview",
      "setRejectApplicationId",
      "setRejectApplicationDetails",
      "setRejectApplicationDetailsRejectionReason",
      "rejectApplication"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Recording declared rejection details and an optional rejection reason requires text entry."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Moving to interview and confirming rejection are declared commands."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-alert-modal",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "Rejection requires confirmation, and both commands expose status and error feedback."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Both transition commands expose loading status with unknown duration."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "applications__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/mobile/page11/applications.defs.ts",
    "outputPath": "l2/hiringPipeline/web/mobile/page11/applications.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/shared/applications.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "applications__l2_shared"
    ],
    "categoryRef": "operationsQueue",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/operationsQueue.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;
