/// <mls fileReference="_102047_/l4/controleChamados/usecases/index.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseIndexArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosUseCaseIndex = {
  "schemaVersion": "2026-08-10-ns4-usecase-index-v3",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "sourceHashes": {
    "journeys": [
      {
        "journeyId": "commentOpenTicket",
        "businessHash": "sha256:496a92da9d280e9db4975401bd6575e57c703078ff53ed3fe4a1383c62164363"
      },
      {
        "journeyId": "closeOpenTicket",
        "businessHash": "sha256:59a221f329e03b3d9664759d9ade26252066313814e79d983a82e7fb299aba3e"
      },
      {
        "journeyId": "registerTicket",
        "businessHash": "sha256:fec1c17f3843924c7160eaf9b48ec99cecc163ce2a415c7f4c18385d34c79120"
      },
      {
        "journeyId": "consultTicket",
        "businessHash": "sha256:28f65c7aea1dbed9d07c2e278d447809cbf29f4800e00f70af45cd0dcfcca8ce"
      }
    ],
    "ontologyHash": "sha256:563cf2c2d6bfb3cca7f9abda33d56065755c6df6b2e5dba2880f51bb37e1787a",
    "rulesHash": "sha256:b6356c46bee687ee1f1aa2d750e415392b3de005047b3fe236224feab6242529"
  },
  "useCases": [
    {
      "useCaseId": "createTicket",
      "title": "Registrar os dados do chamado",
      "kind": "command",
      "compiledFrom": [
        "registerTicket.createTicket"
      ],
      "useCaseHash": "sha256:349119b3b7c62ec3a84ac030108473f9447db64a3af8595b043ad6670f35013e",
      "artifactPath": "l4/controleChamados/usecases/createTicket.defs.ts"
    },
    {
      "useCaseId": "decideClosure",
      "title": "Confirmar o fechamento do chamado",
      "kind": "command",
      "compiledFrom": [
        "closeOpenTicket.decideClosure"
      ],
      "useCaseHash": "sha256:ccffc522c34fe9145b4ba8ffbbe76b6c2c21edf94ca88998f17633e94e852c5e",
      "artifactPath": "l4/controleChamados/usecases/decideClosure.defs.ts"
    },
    {
      "useCaseId": "inspectTicket",
      "title": "Consultar informações e histórico do chamado",
      "kind": "command",
      "compiledFrom": [
        "consultTicket.inspectTicket"
      ],
      "useCaseHash": "sha256:76d3254e8fac81c69a2f973caace12ec233578cfd0944f38c6e4c43541d95c1f",
      "artifactPath": "l4/controleChamados/usecases/inspectTicket.defs.ts"
    },
    {
      "useCaseId": "locateTicket",
      "title": "Localizar o chamado aberto",
      "kind": "query",
      "compiledFrom": [
        "closeOpenTicket.locateTicket",
        "commentOpenTicket.locateTicket",
        "consultTicket.locateTicket"
      ],
      "useCaseHash": "sha256:23dbe6fecdc23416a6c699043a61a643029a904cb33c05dc36d76d4363f97d80",
      "artifactPath": "l4/controleChamados/usecases/locateTicket.defs.ts"
    },
    {
      "useCaseId": "recordComment",
      "title": "Registrar comentário",
      "kind": "command",
      "compiledFrom": [
        "commentOpenTicket.recordComment"
      ],
      "useCaseHash": "sha256:d657ea9d78e877857748609e5f3a7dd814302afbe4b8ec5c615648d23cefb7c6",
      "artifactPath": "l4/controleChamados/usecases/recordComment.defs.ts"
    }
  ],
  "realizationHash": "sha256:c04bd703428ac5be860ec897e7fe71f34604760cffd5e79b7546feaae111448a",
  "generatedAt": "2026-09-02T12:55:53.516Z"
} as const satisfies Ns4UseCaseIndexArtifactV3;

export type ControleChamadosUseCaseIndexType = typeof controleChamadosUseCaseIndex;

export default controleChamadosUseCaseIndex;
