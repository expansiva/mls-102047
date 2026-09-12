/// <mls fileReference="_102047_/l4/compras/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const comprasJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "compras",
  "journeys": [
    {
      "journeyId": "cadastrarFornecedorEoferta",
      "actorRef": "comprador",
      "title": "Cadastrar fornecedor e produtos fornecidos"
    },
    {
      "journeyId": "abrirEenviarPedidoCompra",
      "actorRef": "comprador",
      "title": "Abrir e enviar pedido de compra"
    },
    {
      "journeyId": "aprovarPedidoAcimaDoLimite",
      "actorRef": "gerenteCompras",
      "title": "Aprovar pedido acima do limite"
    },
    {
      "journeyId": "rejeitarPedidoAcimaDoLimite",
      "actorRef": "gerenteCompras",
      "title": "Rejeitar pedido acima do limite"
    },
    {
      "journeyId": "registrarRecebimentoDePedido",
      "actorRef": "almoxarife",
      "title": "Registrar recebimento de pedido"
    },
    {
      "journeyId": "acompanharIndicadoresDeCompras",
      "actorRef": "gerenteCompras",
      "title": "Acompanhar indicadores de compras"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type ComprasJourneyIndexType = typeof comprasJourneyIndex;

export default comprasJourneyIndex;
