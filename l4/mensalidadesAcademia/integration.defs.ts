/// <mls fileReference="_102047_/l4/mensalidadesAcademia/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "mensalidadesAcademia",
  "inbound": [],
  "outbound": [
    {
      "id": "matriculaCancelada",
      "kind": "event",
      "to": "any",
      "event": "matriculaCancelada",
      "on": "Matricula.cancelarMatricula",
      "description": "Publicado quando o aluno cancela a matrícula, encerrando a geração de mensalidades futuras; outros módulos podem usar o registro da matrícula cancelada (aluno, plano e data) para parar cobranças ou acessos relacionados.",
      "entityRefs": [
        "Matricula",
        "Aluno",
        "Plano"
      ]
    },
    {
      "id": "mensalidadeGerada",
      "kind": "event",
      "to": "any",
      "event": "mensalidadeGerada",
      "on": "Mensalidade.create",
      "description": "Publicado quando a gerência gera a mensalidade do mês de um aluno ativo, com valor do plano e vencimento; um módulo financeiro pode usar o registro para controlar o valor a receber.",
      "entityRefs": [
        "Mensalidade",
        "Matricula",
        "Aluno"
      ]
    },
    {
      "id": "pagamentoRegistrado",
      "kind": "event",
      "to": "any",
      "event": "pagamentoRegistrado",
      "on": "Pagamento.create",
      "description": "Publicado quando a recepção registra o pagamento de uma mensalidade (data, valor e forma); outros módulos podem usar o registro para conciliar valores recebidos.",
      "entityRefs": [
        "Pagamento",
        "Mensalidade",
        "Aluno"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type MensalidadesAcademiaIntegrationType = typeof mensalidadesAcademiaIntegration;

export default mensalidadesAcademiaIntegration;
