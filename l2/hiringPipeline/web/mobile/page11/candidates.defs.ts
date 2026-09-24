export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Let the recruiter find candidate records by name with touch-friendly, clearly labelled lookup controls and give reading priority to matching candidates. Support changing the candidate name lookup and requesting results; announce loading, no matches, and retrieval errors so these states remain clear on a constrained screen and with assistive technology.",
    "contentRef": "listCandidate",
    "capabilityRefs": [
      "setListCandidateDetailsIdentificationName",
      "listCandidate"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSearchContent",
        "candidates": [
          "groupsearchcontent--ml-search-bar"
        ],
        "reason": "The name lookup and candidate query are compatible with compact text search and its loading and empty feedback."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A vertically scannable display is useful for the candidate collection on a narrow screen."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Show the selected candidate’s available name, contact-related information, and qualifications with the identity information prioritized for reading on a small screen. Keep the supported name lookup and candidate retrieval available, and communicate loading, no-match, and query-error states through accessible text as well as visual status.",
    "contentRef": "listCandidate",
    "capabilityRefs": [
      "setListCandidateDetailsIdentificationName",
      "listCandidate"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-profile-card"
        ],
        "reason": "Candidate identity and available profile information are suited to a compact people-focused record display."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Enable touch and keyboard entry of the details needed to register a candidate: candidate details, name, country code, and recruitment source, with supported optional identification, person, general, and hiring-pipeline values. Clearly identify required fields, keep entered values after a failed save, and provide accessible validation and error guidance without hiding any registration capability.",
    "contentRef": "createCandidate",
    "capabilityRefs": [
      "setCreateCandidateDetails",
      "setCreateCandidateDetailsIdentificationName",
      "setCreateCandidateDetailsIdentificationCountryCode",
      "setCreateCandidateDetailsHiringPipelineSource",
      "createCandidate"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "The registration inputs include short text values such as name, country code, and source, plus a details value that may need longer entry."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "The registration command exposes error status that can be conveyed as contextual form feedback."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Provide an easily reached save action that submits the completed candidate registration from a touch device. Prevent submission until required registration information is present, expose loading while the save is in progress, announce success or failure accessibly, and retain the entered information when an error occurs.",
    "contentRef": "createCandidate",
    "capabilityRefs": [
      "createCandidate"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Registering the candidate is a single primary command with loading and disabled states."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "The command has success and error states that require clear feedback."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "The command exposes an in-progress state with unknown duration."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "candidates__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/mobile/page11/candidates.defs.ts",
    "outputPath": "l2/hiringPipeline/web/mobile/page11/candidates.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/shared/candidates.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "candidates__l2_shared"
    ],
    "categoryRef": "masterDataManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/masterDataManagement.md",
      "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;
