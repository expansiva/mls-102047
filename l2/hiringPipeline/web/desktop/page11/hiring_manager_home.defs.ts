export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Shows the hiring manager a concise summary of remaining headcount on their positions and applications awaiting a decision, using the available job-position results. It communicates loading while positions are being retrieved, an empty outcome when no positions are returned, and a clear retrieval error when the query fails. Values and status text must remain understandable to assistive technologies.",
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
        "reason": "Headline summary indicators are compatible with the job-position query result."
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
    "description": "Presents notable hiring outcomes, specifically positions that filled and offers still outstanding, from the available position data. It distinguishes loading, no returned highlights, and query failure without implying unavailable offer details. Any available item labels and status information are exposed as readable text for assistive technology.",
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
        "reason": "A scannable record collection is compatible with queried position highlights."
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
    "description": "Surfaces deadline-related hiring information for offer and hiring decisions when represented in the available position results. It announces when data is loading, states when there are no deadline alerts to show, and explains that alerts could not be retrieved if the query errors. Alert text, urgency, and state are conveyed in text rather than color alone.",
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
    "description": "Lists interviewed applications awaiting an offer decision and offered applications awaiting a hiring outcome when those states are available through the queried results. It provides clear loading, empty, and retrieval-error messages, and each available item is readable and identifiable to keyboard and assistive-technology users. This organism presents the waiting work; no decision command is declared on this page.",
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
        "reason": "A scannable collection is compatible with the queried waiting-work records."
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
    "id": "hiring_manager_home__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/desktop/page11/hiring_manager_home.defs.ts",
    "outputPath": "l2/hiringPipeline/web/desktop/page11/hiring_manager_home.ts",
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
