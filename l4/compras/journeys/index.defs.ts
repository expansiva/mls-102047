/// <mls fileReference="_102047_/l4/compras/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const comprasJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "compras",
  "journeys": [
    {
      "journeyId": "cadastrarFornecedor",
      "actorRef": "comprador",
      "title": "Cadastrar fornecedor"
    },
    {
      "journeyId": "definirCondicoesFornecimento",
      "actorRef": "comprador",
      "title": "Definir produtos e preços de um fornecedor"
    },
    {
      "journeyId": "abrirEenviarPedidoCompra",
      "actorRef": "comprador",
      "title": "Abrir e enviar pedido de compra"
    },
    {
      "journeyId": "decidirPedidoAcimaDoLimite",
      "actorRef": "gerenteCompras",
      "title": "Aprovar ou rejeitar pedido acima do limite"
    },
    {
      "journeyId": "registrarRecebimentoPedido",
      "actorRef": "almoxarife",
      "title": "Registrar recebimento de pedido"
    },
    {
      "journeyId": "acompanharIndicadoresCompras",
      "actorRef": "gerenteCompras",
      "title": "Acompanhar indicadores de compras"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type ComprasJourneyIndexType = typeof comprasJourneyIndex;

export default comprasJourneyIndex;
