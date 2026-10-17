/// <mls fileReference="_102047_/l4/inicio/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "inicio",
  "inbound": [
    {
      "id": "loginGranted",
      "kind": "event",
      "from": "organization",
      "event": "loginGranted",
      "writes": [
        "PessoaOrganizacao"
      ],
      "effect": "update",
      "description": "Aviso da plataforma de que o login foi ligado a um cadastro de pessoa. Isso acontece depois que o responsável libera o acesso pela liberação da plataforma, quando já existia outro cadastro com o mesmo e-mail de contato. O Início (loginGranted) atualiza a PessoaOrganizacao ligada ao login para que, ao voltar, a pessoa veja só o que ainda falta completar. O módulo não guarda a pendência nem decide a qual cadastro o login fica ligado. O Início não recebe aviso de convite aceito.",
      "entityRefs": []
    }
  ],
  "outbound": [],
  "plugins": []
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type InicioIntegrationType = typeof inicioIntegration;

export default inicioIntegration;
