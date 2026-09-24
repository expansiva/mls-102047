export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Find candidate records by name and review the returned candidate results. Support entering or changing the candidate lookup values and requesting the candidate query; communicate loading while results are being retrieved, an empty result when no candidate matches, and an actionable error when retrieval fails. Make search and result controls operable by keyboard with clear labels and status announcements.",
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
        "reason": "The name lookup and candidate query are compatible with text search and its loading and empty feedback."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "The candidate query returns a collection that needs a scannable record display."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Present the selected candidate information returned by the candidate lookup, including the available name, contact-related details, and qualifications. Allow the recruiter to refine the name lookup and retrieve candidate data; identify loading, no-match, and query-error states accessibly so the current result is understandable without relying on visual cues alone.",
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
        "reason": "Candidate identity and available profile information are suited to a people-focused record display."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Capture the candidate details required to register a master record: candidate details, name, country code, and recruitment source, with optional identification, person, general, and hiring-pipeline details when available. Update the supported input values accessibly, indicate required information before saving, and retain entered values with clear field-level guidance if registration fails.",
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
    "description": "Submit the completed candidate registration to save the candidate in the registry. Keep the save action available only when the required registration information is present; announce in-progress, successful, and failed submission states, preserve the form after an error, and ensure the action can be reached and activated by keyboard.",
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
    "id": "candidates__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/hiringPipeline/web/desktop/page11/candidates.defs.ts",
    "outputPath": "l2/hiringPipeline/web/desktop/page11/candidates.ts",
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
