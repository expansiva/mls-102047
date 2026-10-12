/// <mls fileReference="_102047_/l4/mensalidadesAcademia/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "mensalidadesAcademia",
  "inbound": [],
  "outbound": [
    {
      "id": "mensalidadeGerada",
      "kind": "event",
      "to": "financeiro",
      "event": "mensalidadeGerada",
      "on": "Mensalidade.create",
      "description": "Publicado quando a gerência gera a mensalidade do mês de um aluno ativo. O módulo financeiro pode usar o registro da mensalidade (aluno, valor do plano e vencimento) para abrir um título a receber.",
      "entityRefs": [
        "Mensalidade",
        "Matricula",
        "Aluno",
        "Plano"
      ]
    },
    {
      "id": "pagamentoMensalidadeRegistrado",
      "kind": "event",
      "to": "financeiro",
      "event": "pagamentoMensalidadeRegistrado",
      "on": "Pagamento.create",
      "description": "Publicado quando a recepção registra o pagamento de uma mensalidade (data, valor e forma). O módulo financeiro pode usá-lo para dar baixa no título a receber correspondente.",
      "entityRefs": [
        "Pagamento",
        "Mensalidade",
        "Aluno"
      ]
    },
    {
      "id": "matriculaCancelada",
      "kind": "event",
      "to": "any",
      "event": "matriculaCancelada",
      "on": "Matricula.cancelarMatricula",
      "description": "Publicado quando o aluno cancela a matrícula, encerrando a geração de mensalidades futuras. Outros módulos podem parar de cobrar ou de liberar serviços para esse aluno.",
      "entityRefs": [
        "Matricula",
        "Aluno",
        "Plano"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type MensalidadesAcademiaIntegrationType = typeof mensalidadesAcademiaIntegration;

export default mensalidadesAcademiaIntegration;
