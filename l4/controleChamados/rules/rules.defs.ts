/// <mls fileReference="_102047_/l4/controleChamados/rules/rules.defs.ts" enhancement="_blank"/>

import type { Ns4RulesArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosRules = {
  "schemaVersion": "2026-08-09-ns4-rules-v2",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "rules": [
    {
      "id": "closedTicketCannotBeReopened",
      "description": "Um chamado fechado é encerrado definitivamente e não pode voltar ao status aberto."
    },
    {
      "id": "onlyOpenTicketCanBeClosed",
      "description": "Somente um chamado com status aberto pode ser fechado."
    },
    {
      "id": "onlyOpenTicketCanReceiveComment",
      "description": "Somente um chamado com status aberto pode receber comentários."
    }
  ],
  "rulesHash": "sha256:b6356c46bee687ee1f1aa2d750e415392b3de005047b3fe236224feab6242529",
  "approvedBy": "auto",
  "approvedAt": "2026-09-02T12:55:34.793Z",
  "realization": {
    "status": "pending",
    "compiledFromRulesHash": "sha256:b6356c46bee687ee1f1aa2d750e415392b3de005047b3fe236224feab6242529"
  }
} as const satisfies Ns4RulesArtifact;

export type ControleChamadosRulesType = typeof controleChamadosRules;

export default controleChamadosRules;
