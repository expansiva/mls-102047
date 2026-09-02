/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page31/ticketHub.defs.ts" enhancement="_blank"/>

export const definition = `page: Chamado
actor: atendente
purpose: Painel de Chamado.
uxExperience: dashboardCommandCenter
The page extends the shared base class of this workspace: the shared travels in this pipeline and already carries the states, actions and handlers the page inherits. Render the experience around that intent — do not list fields and do not list routines.`;

export const pipeline = [
  {
    "id": "ticketHub__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102047_/l2/controleChamados/web/desktop/page31/ticketHub.ts",
    "defPath": "_102047_/l2/controleChamados/web/desktop/page31/ticketHub.defs.ts",
    "dependsFiles": [
      "_102047_/l2/controleChamados/web/shared/ticketHubDts.txt",
      "_102047_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "ticketHub__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts",
      "_102020_/l4/collabux/templates/dashboardCommandCenter/page31.md"
    ],
    "visualStyle": {},
    "agent": "agentCfeMaterializeGen"
  }
] as const;
