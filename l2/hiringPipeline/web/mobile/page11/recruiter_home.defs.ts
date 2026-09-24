export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Prioritizes concise, readable position-capacity indicators from the returned JobPosition information, including declared filled and remaining headcount values. It announces loading, no returned positions, and query errors to assistive technology. Touch interaction is not required for the displayed indicators.",
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
        "reason": "Compact headline indicators suit the available JobPosition headcount information."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The query has an unknown-duration loading state."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The query error state requires an accessible status message."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Prioritizes near-filled returned job positions for quick reading on constrained screens, based on declared filled and remaining headcount information. It does not imply that application-screening information is available. Loading, empty results, and query failures are announced in accessible language.",
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
        "reason": "A scannable record list fits the returned JobPosition collection on constrained screens."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The position query supplies a loading status."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The position query supplies an error state."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Keeps any supported position-related attention information easy to read and reachable by touch. The shared scenario contains no deadline or recurring-duty data, so those alerts must be described as unavailable rather than inferred. It announces loading, no returned positions, and query errors accessibly.",
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
        "reason": "The available query returns a JobPosition collection for supported attention information."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The query declares a loading status."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The query declares an error state and unavailable alert data must not be represented as loaded."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Clearly states that declined applications, rejection recording, and closure are unavailable because the shared scenario only queries JobPosition records and declares no application command. It provides no unsupported touch action. It announces the position-query loading state and communicates empty results or failures accessibly.",
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
        "reason": "The only declared capability includes a loading state for its query."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The query includes an error state, while no application action is declared."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "recruiter_home__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/mobile/page11/recruiter_home.defs.ts",
    "outputPath": "l2/hiringPipeline/web/mobile/page11/recruiter_home.ts",
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
