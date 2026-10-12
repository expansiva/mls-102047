/// <mls fileReference="_102047_/l4/financeiro/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const financeiroIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "financeiro",
  "inbound": [
    {
      "id": "comandaFechada",
      "kind": "event",
      "from": "comandaRestaurante",
      "event": "comandaFechada",
      "writes": [
        "TituloReceber",
        "Pagador"
      ],
      "effect": "create",
      "description": "Quando a comanda é fechada no restaurante (Comanda.fecharComanda), cria um título a receber com origem 'comanda', valor igual ao total da comanda, vencimento na data do fechamento e o cliente da comanda como pagador (localiza ou cria o Pagador).",
      "entityRefs": []
    },
    {
      "id": "mensalidadeGerada",
      "kind": "event",
      "from": "mensalidadesAcademia",
      "event": "mensalidadeGerada",
      "writes": [
        "TituloReceber",
        "Pagador"
      ],
      "effect": "create",
      "description": "Quando uma mensalidade é gerada na academia (Mensalidade.create), cria um título a receber com origem 'mensalidade', valor e vencimento da mensalidade e o aluno como pagador (localiza ou cria o Pagador).",
      "entityRefs": []
    },
    {
      "id": "ordenServicioFinalizada",
      "kind": "event",
      "from": "ordenServicio",
      "event": "ordenServicioFinalizada",
      "writes": [
        "TituloReceber",
        "Pagador"
      ],
      "effect": "create",
      "description": "Quando a ordem de serviço é finalizada/entregue na assistência técnica (OrdenServicio.finalizar), cria um título a receber com origem 'ordem de serviço', valor do orçamento aprovado, vencimento na entrega e o cliente da ordem como pagador (localiza ou cria o Pagador).",
      "entityRefs": []
    },
    {
      "id": "pessoaAtualizada",
      "kind": "event",
      "from": "organization",
      "event": "mdmUpdated",
      "writes": [
        "Pagador"
      ],
      "effect": "update",
      "description": "Quando os dados cadastrais da pessoa são atualizados no catálogo da organização, atualiza nome e documento do Pagador correspondente.",
      "entityRefs": []
    }
  ],
  "outbound": [
    {
      "id": "recebimentoRegistrado",
      "kind": "event",
      "to": "any",
      "event": "recebimentoRegistrado",
      "on": "Recebimento.create",
      "description": "Publicado quando um recebimento (total ou parcial) é registrado para um título, para que o módulo de origem (comanda, mensalidade ou ordem de serviço) saiba que a cobrança foi paga.",
      "entityRefs": [
        "Recebimento",
        "TituloReceber",
        "Pagador"
      ]
    },
    {
      "id": "recebimentoEstornado",
      "kind": "event",
      "to": "any",
      "event": "recebimentoEstornado",
      "on": "Recebimento.estornar",
      "description": "Publicado quando um recebimento é estornado no mesmo dia, para que o módulo de origem volte a considerar a cobrança em aberto.",
      "entityRefs": [
        "Recebimento",
        "TituloReceber",
        "Pagador"
      ]
    }
  ],
  "plugins": [
    {
      "pluginId": "stripe",
      "description": "Processa o pagamento com cartão via Stripe, tanto no caixa ao receber um título quanto no portal quando o pagador paga um título em aberto. Os dados do cartão ficam no Stripe.",
      "usedBy": [
        "receberTitulo.registrarRecebimento",
        "pagarTituloCartao.pagarCartao"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type FinanceiroIntegrationType = typeof financeiroIntegration;

export default financeiroIntegration;
