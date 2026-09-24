export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Shows the hiring manager's matching job positions with identifying information prioritized for quick reading in constrained space. It retains the available position lookup inputs for identifier, title, hiring-manager identifier, status, and optional page, and allows a position to be selected for headcount review. Touch targets must be usable while inputs and selection remain keyboard operable with accessible labels and focus feedback. Communicate loading, no matching positions, and retryable errors without hiding the available lookup capabilities.",
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
          "groupviewtable--ml-responsive-table"
        ],
        "reason": "The position query returns a collection that needs a narrow-screen-friendly structured display."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Keeps filled and remaining headcount as the reading priority for the selected position, enabling the hiring manager to check hiring need before the available hire transition. It retains entry or selection of the declared position identifier and its lookup. Announce retrieval progress and errors, and state clearly when no selected position is returned. Values must have clear labels, not rely on color alone, and be available to screen readers; lookup interactions must be touch-friendly and keyboard accessible.",
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
    "description": "Makes the closure-history limitation explicit: the supplied position lookup can show filled and remaining headcount but does not provide a closure event, date, or history. It can explain that a final hire automatically closes a filled position, but it must not invent chronology. Present loading, no-result, and error feedback accessibly, and keep retry or lookup interaction labelled, touch-friendly, and keyboard operable.",
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
    "id": "managed_positions__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/mobile/page11/managed_positions.defs.ts",
    "outputPath": "l2/hiringPipeline/web/mobile/page11/managed_positions.ts",
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
