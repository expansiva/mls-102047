export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Lets recruiters retrieve open and closed job positions, prioritizing available title, hiring manager, and status information for quick reading on a small screen. It supports the same job-position query and page input; announce loading, no returned positions, and retrieval errors. Records and available result navigation remain touch-operable, keyboard accessible, and clearly labeled.",
    "contentRef": "listJobPosition",
    "capabilityRefs": [
      "listJobPosition",
      "setListJobPositionPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-responsive-data-table",
          "groupviewtable--ml-responsive-table"
        ],
        "reason": "The position query returns a collection that must remain legible on narrow screens."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Shows the selected position’s title, requirements, hiring manager, filled headcount, and remaining headcount, with staffing information prioritized for narrow-screen reading. Use the job-position query state to announce loading, no match, and retrieval errors; label every value and do not claim undeclared details. Updated data remains accessible to screen-reader users.",
    "contentRef": "listJobPosition",
    "capabilityRefs": [
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "The available job-position query supplies position records whose key details need a compact readable presentation."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Supports recruiters in providing the required information to open a job position and assigning its responsible hiring manager. Prioritize required input for touch entry, keep entered values intact during loading or after errors, and link validation and action errors to the affected input or submission feedback. Confirm successful opening accessibly, with all input and feedback usable by touch and keyboard.",
    "contentRef": "createJobPosition",
    "capabilityRefs": [
      "setCreateJobPositionTitle",
      "setCreateJobPositionHiringManagerId",
      "setCreateJobPositionStatus",
      "setCreateJobPositionDetails",
      "setCreateJobPositionDetailsDepartment",
      "setCreateJobPositionDetailsDescription",
      "setCreateJobPositionDetailsHeadcount",
      "createJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "The creation command includes textual title, hiring-manager identifier, status, details, department, and description inputs."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-stepper"
        ],
        "reason": "Headcount is a required numeric creation input and benefits from touch-friendly adjustment."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "The form invokes the declared create-job-position command."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "The command exposes loading, success, and error states that require accessible feedback."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Provides the touch-accessible action that opens the job position from the entered creation data. Clearly convey that submission is in progress, prevent duplicate activation, announce success, and show an actionable error without discarding entered values. The action retains a discernible name and keyboard support.",
    "contentRef": "createJobPosition",
    "capabilityRefs": [
      "createJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Opening a position invokes the create-job-position command."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "The command provides success and error states requiring user feedback."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The command has a loading status with no declared completion percentage."
      }
    ]
  },
  {
    "organismId": "organism.timeline.1",
    "kind": "timeline",
    "description": "Communicates the declared automatic closure event after filled headcount reaches required headcount, with closure status and staffing context prioritized for small-screen reading. Do not invent a closure timestamp; clearly state when event information is unavailable or no matching position is returned. Loading and retrieval errors are announced accessibly, and the event content remains readable in logical order.",
    "contentRef": "listJobPosition",
    "capabilityRefs": [
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-timeline-view"
        ],
        "reason": "The organism’s declared purpose is to communicate a position closure event."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "job_positions__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/mobile/page11/job_positions.defs.ts",
    "outputPath": "l2/hiringPipeline/web/mobile/page11/job_positions.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/shared/job_positions.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "job_positions__l2_shared"
    ],
    "categoryRef": "bespoke",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/bespoke.md",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;
