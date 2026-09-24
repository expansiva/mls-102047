export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Lets the hiring manager look up interviewed and offered applications on managed positions using the available application lookup values: application, candidate, job position, status, and page. The manager can change those values and request results to identify an application for review. Prioritize application identity and status for touch-readable scanning in constrained space. Announce retrieval while it is loading, clearly explain when no applications match the supplied values, and provide an accessible recoverable error when retrieval fails. Ensure lookup controls and results have clear names and are operable by keyboard.",
    "contentRef": "base",
    "capabilityRefs": [
      "setListApplicationId",
      "setListApplicationCandidateId",
      "setListApplicationJobPositionId",
      "setListApplicationStatus",
      "setListApplicationPage",
      "listApplication"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "The declared application lookup has editable identifier values supplied by the user."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A stacked record list supports scanning the application query results in constrained space."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The application query has a loading status with unknown duration."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "The application query exposes an error state requiring accessible recovery guidance."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Supports review of selected candidate information, including qualifications and available resume context, before an offer decision. It also lets the manager request related job-position information, including remaining headcount, before confirming a hire. Keep candidate information first in the reading order on a small screen. For each requested detail, announce loading, explain when no matching detail is returned, and present query failures without losing the selected application context. Make disclosed information understandable to assistive technology and detail requests available by touch and keyboard.",
    "contentRef": "candidate",
    "capabilityRefs": [
      "setListCandidateId",
      "listCandidate",
      "setListJobPositionId",
      "listJobPosition"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "The declared candidate and job-position lookups accept editable identifier values."
      },
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-profile-card"
        ],
        "reason": "A profile-oriented candidate detail presentation supports focused mobile review."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "The declared candidate and job-position lookups return collections of records suited to stacked reading."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The declared detail queries expose loading statuses with unknown duration."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Detail-query errors should be explained near the requested information."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Provides contextual decisions for the selected application: advance an interviewed candidate to offer or move an offered candidate to hired. Keep each decision clearly labeled and touch accessible. A hire refreshes application and job-position information, reflecting that filling remaining headcount closes the position automatically. Report command progress, success, and failure accessibly, prevent repeat activation while a command is loading, and return focus to an understandable updated result. Declining is a referral to the recruiter for rejection processing; this page declares no rejection-recording command.",
    "contentRef": "moveToOffer",
    "capabilityRefs": [
      "setMoveToOfferId",
      "moveToOffer",
      "setMoveToHiredId",
      "moveToHired"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "The declared offer and hire capabilities are direct commands requiring clearly labeled touch actions."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Both commands expose loading states with unknown duration."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "The command success and error states require accessible outcome feedback."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "managed_applications__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/mobile/page11/managed_applications.defs.ts",
    "outputPath": "l2/hiringPipeline/web/mobile/page11/managed_applications.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/shared/managed_applications.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "managed_applications__l2_shared"
    ],
    "categoryRef": "operationsQueue",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/operationsQueue.md",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
    ]
  }
] as const;
