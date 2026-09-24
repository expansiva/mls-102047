export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Lets recruiters retrieve job positions and review their available title, hiring manager, and status information to distinguish open and closed positions. It supports the job-position query and its page input; announce loading while results are requested, clearly explain when no positions are returned, and communicate retrieval errors. Ensure records and available result navigation are keyboard operable with discernible labels and state announcements.",
    "contentRef": "listJobPosition",
    "capabilityRefs": [
      "listJobPosition",
      "setListJobPositionPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-advanced-data-table",
          "groupviewtable--ml-data-table"
        ],
        "reason": "The position query returns a collection that recruiters need to scan and navigate."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Presents the selected job position’s title, requirements, responsible hiring manager, filled headcount, and remaining headcount so recruiters can assess the current hiring need. Use the job-position query state to communicate loading, no matching position, and retrieval errors accessibly; expose labels for all values and do not imply fields that are not returned. The content remains available to assistive technologies when position data changes.",
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
        "reason": "The available job-position query supplies position records whose key details need a readable record presentation."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Supports recruiters in providing the required information to open a job position and assigning its responsible hiring manager. Clearly identify required input, retain entered values while the request is in progress or after a failure, and associate validation and action errors with the affected input or submission feedback. After successful creation, confirm that the position is open; all input and feedback must be keyboard accessible and announced to assistive technology.",
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
          "groupenternumber--ml-number-input"
        ],
        "reason": "Headcount is a required numeric creation input."
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
    "description": "Provides the explicit action to open the job position using the entered creation data. Keep the action’s loading state clear, prevent duplicate submission while it is running, announce success after completion, and present an error that can be reviewed and retried without losing the user’s work. The action has a clear accessible name and supports keyboard operation.",
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
    "description": "Communicates the declared automatic closure event for a job position when filled headcount reaches required headcount. Use available position status and headcount context without inventing a closure timestamp; if event information is unavailable or no matching position is returned, say so plainly. Announce loading and retrieval errors, and ensure the event information is readable in a logical order for assistive technology.",
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
    "id": "job_positions__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/desktop/page11/job_positions.defs.ts",
    "outputPath": "l2/hiringPipeline/web/desktop/page11/job_positions.ts",
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
