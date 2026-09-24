export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Summarizes open-position context using returned JobPosition information, including the available filled and remaining headcount values, so the recruiter can assess position capacity. It announces loading while the position query runs, explains when no positions are returned, and presents a clear error message if the query fails. Any displayed values and status messages must be available to assistive technology.",
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
        "reason": "Headline hiring indicators are derived from the available JobPosition query result and its declared headcount fields."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The query exposes a loading status with unknown duration."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The query exposes an error state that should be communicated clearly."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Draws attention to returned job positions that are nearly filled, using the declared filled and remaining headcount information. It does not claim application-screening information because no application data is supplied by the shared scenario. It communicates query loading, an empty result, and query failures in accessible text.",
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
        "reason": "The query returns a collection of JobPosition records that can be scanned for near-filled positions."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The position query provides a loading status."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The position query provides an error state."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Communicates position-related attention items only when supported by returned JobPosition information. Hiring deadlines and recurring duties cannot be presented as data because the shared scenario provides neither deadline nor duty data. It conveys loading, no returned positions, and query errors accessibly.",
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
        "reason": "The available query returns JobPosition records for any supported position-related attention information."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The query has a declared loading status."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The query has a declared error state and unsupported alert data should not be implied as available."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Identifies that declined applications awaiting rejection recording or closure are not available in the shared scenario: only JobPosition records can be queried, and no application actions are declared. It must not offer a rejection or closure action. It clearly announces the position-query loading state and reports an empty result or query failure accessibly.",
    "contentRef": "base",
    "capabilityRefs": [
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The only declared capability exposes a loading status for its query."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The declared query exposes an error state; no application data or rejection command supports an inbox action."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "recruiter_home__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/desktop/page11/recruiter_home.defs.ts",
    "outputPath": "l2/hiringPipeline/web/desktop/page11/recruiter_home.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/shared/recruiter_home.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "recruiter_home__l2_shared"
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
