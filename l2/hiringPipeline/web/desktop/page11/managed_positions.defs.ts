export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Shows the job positions for which the hiring manager is responsible and supports refining the available position lookup by identifier, title, hiring-manager identifier, status, and optional page. The user can retrieve matching positions and select one for headcount review. Communicate when the lookup is loading, when it returns no matching positions, and when it fails; expose an understandable error and allow the user to revise the supplied lookup values and try again. All inputs and selectable results must have clear accessible names, keyboard operation, and visible focus.",
    "contentRef": "positionHeadcount",
    "capabilityRefs": [
      "setListJobPositionId",
      "setListJobPositionTitle",
      "setListJobPositionHiringManagerId",
      "setListJobPositionStatus",
      "setListJobPositionPage",
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "The declared position lookup accepts editable identifier and text values."
      },
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "The position lookup returns a collection that can be scanned and selected for further review."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Presents the selected job position's filled headcount and remaining headcount so the hiring manager can verify current hiring need before confirming a hire. The user supplies or selects the provided position identifier and retrieves its position information. Announce loading, state clearly when no position is returned, and present a comprehensible, retryable lookup error. Headcount values and lookup controls must use clear labels and remain understandable without color alone.",
    "contentRef": "positionHeadcount",
    "capabilityRefs": [
      "setListJobPositionId",
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "The supported position identifier is editable text input for the declared position lookup."
      },
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "Filled and remaining headcount are the declared derived position values and can be emphasized as readable indicators."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "The position query exposes loading and error states that require understandable feedback."
      }
    ]
  },
  {
    "organismId": "organism.timeline.1",
    "kind": "timeline",
    "description": "Clarifies the automatic closure condition: a position closes when the final hire fills its required headcount. The available position lookup supplies only filled and remaining headcount, not a closure event, timestamp, or event history; therefore no chronological closure record is asserted. Clearly communicate lookup loading, no result, and error states, with a labelled and keyboard-accessible way to retry or update the lookup.",
    "contentRef": "positionHeadcount",
    "capabilityRefs": [
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The available query status and the absence of closure-event history need clear feedback rather than fabricated timeline entries."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "managed_positions__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/desktop/page11/managed_positions.defs.ts",
    "outputPath": "l2/hiringPipeline/web/desktop/page11/managed_positions.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/shared/managed_positions.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "managed_positions__l2_shared"
    ],
    "categoryRef": "operationsQueue",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/operationsQueue.md",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupviewmetric/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;
