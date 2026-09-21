/// <mls fileReference="_102047_/l4/compras/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const comprasJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "compras",
  "journeys": [
    {
      "journeyId": "cadastrarFornecedorEcatalogo",
      "actorRef": "comprador",
      "title": "Cadastrar fornecedor e produtos fornecidos"
    },
    {
      "journeyId": "atualizarPrecoCombinado",
      "actorRef": "comprador",
      "title": "Atualizar preço combinado de fornecedor"
    },
    {
      "journeyId": "enviarPedidoDentroDoLimite",
      "actorRef": "comprador",
      "title": "Criar e enviar pedido de compra dentro do limite"
    },
    {
      "journeyId": "submeterPedidoParaAprovacao",
      "actorRef": "comprador",
      "title": "Submeter pedido de compra acima do limite"
    },
    {
      "journeyId": "decidirPedidoSubmetido",
      "actorRef": "gerenteCompras",
      "title": "Decidir pedido de compra submetido"
    },
    {
      "journeyId": "registrarRecebimentoDePedido",
      "actorRef": "almoxarife",
      "title": "Registrar recebimento total ou parcial"
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
