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
      "description": "Quando a comanda é fechada no restaurante (Comanda.fecharComanda), cria um título a receber com origem 'comanda', valor total da comanda, vencimento no próprio dia e o pagador informado no fechamento (criando o Pagador se ainda não existir).",
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
      "description": "Quando a academia gera uma mensalidade (Mensalidade.create), cria um título a receber com origem 'mensalidade', valor e vencimento da mensalidade e o aluno como pagador (criando o Pagador se ainda não existir).",
      "entityRefs": []
    },
    {
      "id": "entregarYfinalizar",
      "kind": "event",
      "from": "ordenServicio",
      "event": "entregarYfinalizar",
      "writes": [
        "TituloReceber",
        "Pagador"
      ],
      "effect": "create",
      "description": "Quando a ordem de serviço é entregue e finalizada na assistência técnica (OrdenServicio.entregarYfinalizar), cria um título a receber com origem 'ordem de serviço', valor do orçamento aprovado, vencimento na entrega e o cliente como pagador (criando o Pagador se ainda não existir).",
      "entityRefs": []
    },
    {
      "id": "mdmCreated",
      "kind": "event",
      "from": "organization",
      "event": "mdmCreated",
      "writes": [
        "Pagador"
      ],
      "effect": "create",
      "description": "Quando uma pessoa ou empresa é cadastrada no catálogo da organização e é referenciada como pagador de um título, registra o Pagador vinculado ao cadastro mestre.",
      "entityRefs": []
    },
    {
      "id": "mdmUpdated",
      "kind": "event",
      "from": "organization",
      "event": "mdmUpdated",
      "writes": [
        "Pagador"
      ],
      "effect": "update",
      "description": "Atualiza nome, documento e contatos do Pagador quando o cadastro mestre da pessoa ou empresa é alterado.",
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
      "description": "Publicado quando um recebimento (total ou parcial) é registrado em um título, para que o módulo de origem (comanda, mensalidade, ordem de serviço) marque a cobrança como paga ou parcialmente paga.",
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
      "description": "Publicado quando um recebimento é estornado no mesmo dia, para que o módulo de origem reabra a cobrança correspondente.",
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
      "description": "Processa o pagamento com cartão via Stripe, tanto no recebimento feito pelo caixa quanto no pagamento feito pelo pagador no portal; os dados do cartão ficam com o Stripe.",
      "usedBy": [
        "receberTitulo.registrarRecebimento",
        "pagarTituloPortal.pagarCartao"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type FinanceiroIntegrationType = typeof financeiroIntegration;

export default financeiroIntegration;
