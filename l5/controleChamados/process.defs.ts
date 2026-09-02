/// <mls fileReference="_102047_/l5/controleChamados/process.defs.ts" enhancement="_blank"/>

import type { Ns4L5ProcessArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosProcess = {
  "schemaVersion": "2026-08-13-ns4-process-v1",
  "moduleName": "controleChamados",
  "sourceHashes": {
    "journeys": [
      {
        "journeyId": "closeOpenTicket",
        "businessHash": "sha256:59a221f329e03b3d9664759d9ade26252066313814e79d983a82e7fb299aba3e"
      },
      {
        "journeyId": "commentOpenTicket",
        "businessHash": "sha256:496a92da9d280e9db4975401bd6575e57c703078ff53ed3fe4a1383c62164363"
      },
      {
        "journeyId": "consultTicket",
        "businessHash": "sha256:28f65c7aea1dbed9d07c2e278d447809cbf29f4800e00f70af45cd0dcfcca8ce"
      },
      {
        "journeyId": "registerTicket",
        "businessHash": "sha256:fec1c17f3843924c7160eaf9b48ec99cecc163ce2a415c7f4c18385d34c79120"
      }
    ],
    "accessHash": "sha256:03668099f53ef20645623a13d5c51a48a8c15b9bc3bbe3bc50833957bbe3b35f",
    "ontologyHash": "sha256:563cf2c2d6bfb3cca7f9abda33d56065755c6df6b2e5dba2880f51bb37e1787a",
    "rulesHash": "sha256:b6356c46bee687ee1f1aa2d750e415392b3de005047b3fe236224feab6242529"
  },
  "counts": {
    "journeys": 4,
    "workspaces": 4,
    "operations": 13,
    "contracts": 17,
    "decisions": 6
  },
  "validation": {
    "status": "passed",
    "reportPath": "l4/controleChamados/pipeline/e10-validation-report.json",
    "reportHash": "sha256:2c313fd73bb4274cf69fd5e0d512988d25446d4d9b5e46e9ae4f17afe2194143",
    "warningCount": 0,
    "registrarCount": 0
  },
  "next": {
    "frontend": "todoFrontend",
    "backend": "todoBackend"
  },
  "processHash": "sha256:01d1b70a5c3da5c270134ac688ae7076e99150a720220911a57f610d719bbf80"
} as const satisfies Ns4L5ProcessArtifact;

export type ControleChamadosProcessType = typeof controleChamadosProcess;

export default controleChamadosProcess;
