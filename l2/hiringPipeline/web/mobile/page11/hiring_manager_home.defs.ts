export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Prioritizes a concise, touch-readable summary of remaining headcount and applications awaiting a decision from the available job-position results. It communicates loading, no returned positions, and retrieval errors in readable text, with status changes available to assistive technologies.",
    "contentRef": "base",
    "capabilityRefs": [
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-big-number",
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "Compact headline indicators are compatible with the job-position query result on constrained screens."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The query has a loading status with unknown duration."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "A visible, accessible query-failure message is needed."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Keeps filled positions and outstanding offers easy to scan in a touch-readable presentation based on the available position data. It distinguishes loading, no highlights returned, and retrieval failure without implying offer details that are not available. Available status labels remain readable to assistive technologies.",
    "contentRef": "base",
    "capabilityRefs": [
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A vertically scannable queried record collection suits constrained screens."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The query loading state needs an indeterminate progress indicator."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The query error state needs accessible feedback."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Prioritizes deadline-related offer and hiring-decision alerts that are represented in the available position results. It gives text-based loading, no-alert, and retrieval-error feedback, and conveys alert urgency without relying only on color for touch and assistive-technology users.",
    "contentRef": "base",
    "capabilityRefs": [
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-timeline-view"
        ],
        "reason": "Time-ordered deadline information is compatible with a queried record collection."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The query loading state needs an indeterminate progress indicator."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The query error state needs accessible feedback."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Makes waiting interviewed and offered applications easy to review by touch when those states are available through queried results. It clearly reports loading, no waiting work, and retrieval failure; available items remain identifiable and readable for keyboard and assistive-technology users. It presents pending work only because no decision command is declared.",
    "contentRef": "base",
    "capabilityRefs": [
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A touch-friendly, vertically scannable collection is compatible with queried waiting-work records."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The query loading state needs an indeterminate progress indicator."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The query error state needs accessible feedback."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "hiring_manager_home__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/mobile/page11/hiring_manager_home.defs.ts",
    "outputPath": "l2/hiringPipeline/web/mobile/page11/hiring_manager_home.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/shared/hiring_manager_home.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "hiring_manager_home__l2_shared"
    ],
    "categoryRef": "dashboardCommandCenter",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/dashboardCommandCenter.md",
      "_102040_/l2/molecules/groupviewmetric/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts"
    ]
  }
] as const;
