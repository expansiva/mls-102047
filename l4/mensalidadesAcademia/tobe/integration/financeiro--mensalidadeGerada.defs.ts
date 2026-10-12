/// <mls fileReference="_102047_/l4/mensalidadesAcademia/tobe/integration/financeiro--mensalidadeGerada.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationRequestArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const financeiromensalidadeGeradaRequest = {
  "schemaVersion": "2026-09-12-ns5-integration-request-v1",
  "requestedBy": "financeiro",
  "eventId": "mensalidadeGerada",
  "on": "TituloReceber.create",
  "entityRefs": [
    "TituloReceber",
    "Pagador"
  ],
  "description": "Quando a academia gera uma mensalidade (Mensalidade.create), cria um título a receber com origem 'mensalidade', valor e vencimento da mensalidade e o aluno como pagador (criando o Pagador se ainda não existir).",
  "status": "requested"
} as const satisfies Ns5Readonly<Ns5IntegrationRequestArtifact>;

export type FinanceiromensalidadeGeradaRequestType = typeof financeiromensalidadeGeradaRequest;

export default financeiromensalidadeGeradaRequest;
