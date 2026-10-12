/// <mls fileReference="_102047_/l4/locacaoEquipamentos/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "locacaoEquipamentos",
  "inbound": [],
  "outbound": [
    {
      "id": "contratoLocacaoAtivado",
      "kind": "event",
      "to": "financeiro",
      "event": "contratoLocacaoAtivado",
      "on": "ContratoLocacao.ativarContrato",
      "description": "Publicado quando o contrato de locação é ativado. Leva o cliente, os equipamentos e o período para que o módulo financeiro gere o título a receber da locação.",
      "entityRefs": [
        "ContratoLocacao",
        "ItemContrato",
        "Cliente"
      ]
    },
    {
      "id": "devolucaoRegistrada",
      "kind": "event",
      "to": "financeiro",
      "event": "devolucaoRegistrada",
      "on": "ContratoLocacao.registrarDevolucao",
      "description": "Publicado quando a devolução é registrada com a data real. Leva os dias de atraso e a multa calculada (diária × dias de atraso × 1,5), se houver, para que o módulo financeiro faça a cobrança.",
      "entityRefs": [
        "ContratoLocacao",
        "ItemContrato",
        "Cliente"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type LocacaoEquipamentosIntegrationType = typeof locacaoEquipamentosIntegration;

export default locacaoEquipamentosIntegration;
