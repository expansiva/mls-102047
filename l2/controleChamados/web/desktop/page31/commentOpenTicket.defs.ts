/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page31/commentOpenTicket.defs.ts" enhancement="_blank"/>

export const definition = `page: Registrar comentário em chamado aberto
actor: atendente
purpose: Documentar o andamento do atendimento em um chamado aberto.
uxExperience: processWizard
The page extends the shared base class of this workspace: the shared travels in this pipeline and already carries the states, actions and handlers the page inherits. Render the experience around that intent — do not list fields and do not list routines.`;

export const pipeline = [
  {
    "id": "commentOpenTicket__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102047_/l2/controleChamados/web/desktop/page31/commentOpenTicket.ts",
    "defPath": "_102047_/l2/controleChamados/web/desktop/page31/commentOpenTicket.defs.ts",
    "dependsFiles": [
      "_102047_/l2/controleChamados/web/shared/commentOpenTicketDts.txt",
      "_102047_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "commentOpenTicket__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts",
      "_102020_/l4/collabux/templates/processWizard/page31.md"
    ],
    "visualStyle": {},
    "agent": "agentCfeMaterializeGen"
  }
] as const;
