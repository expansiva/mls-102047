/// <mls fileReference="_102047_/l4/compras/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "compras",
  "journeys": [
    {
      "journeyId": "cadastrarFornecedor",
      "actorRef": "comprador",
      "title": "Cadastrar fornecedor e produtos fornecidos"
    },
    {
      "journeyId": "atualizarPrecoCombinado",
      "actorRef": "comprador",
      "title": "Atualizar preço combinado"
    },
    {
      "journeyId": "abrirEnviarPedido",
      "actorRef": "comprador",
      "title": "Abrir e enviar pedido de compra"
    },
    {
      "journeyId": "aprovarPedido",
      "actorRef": "gerenteCompras",
      "title": "Aprovar ou rejeitar pedido"
    },
    {
      "journeyId": "registrarRecebimento",
      "actorRef": "almoxarife",
      "title": "Registrar recebimento de pedido"
    },
    {
      "journeyId": "acompanharPainel",
      "actorRef": "gerenteCompras",
      "title": "Acompanhar painel de compras"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5Readonly<Ns5JourneyIndexArtifact>;

export type ComprasJourneyIndexType = typeof comprasJourneyIndex;

export default comprasJourneyIndex;
