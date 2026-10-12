/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "mensalidadesAcademia",
  "businessDomain": "Gestão de mensalidades de academia: planos, matrículas, cobrança mensal, pagamentos, bloqueio por inadimplência e painel financeiro",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "mensalidadesAcademia",
    "description": "Branch details.mensalidadesAcademia of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Aluno",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "Plano",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "Matricula",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "Mensalidade",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "Pagamento",
      "kind": "entity",
      "class": "event"
    },
    {
      "entityId": "PainelMensalidades",
      "kind": "entity",
      "class": "supporting"
    }
  ],
  "relationships": [
    {
      "relationshipId": "matriculaAluno",
      "from": "Matricula",
      "to": "Aluno",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada matrícula pertence a um aluno.",
      "field": "Matricula.alunoId"
    },
    {
      "relationshipId": "matriculaPlano",
      "from": "Matricula",
      "to": "Plano",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada matrícula é feita em um plano.",
      "field": "Matricula.planoId"
    },
    {
      "relationshipId": "mensalidadeMatricula",
      "from": "Mensalidade",
      "to": "Matricula",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada mensalidade é gerada a partir de uma matrícula ativa.",
      "field": "Mensalidade.matriculaId"
    },
    {
      "relationshipId": "mensalidadeAluno",
      "from": "Mensalidade",
      "to": "Aluno",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada mensalidade é cobrada de um aluno, permitindo localizar suas mensalidades em aberto ou vencidas.",
      "field": "Mensalidade.alunoId"
    },
    {
      "relationshipId": "pagamentoMensalidade",
      "from": "Pagamento",
      "to": "Mensalidade",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada pagamento quita uma mensalidade.",
      "field": "Pagamento.mensalidadeId"
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type MensalidadesAcademiaOntologyIndexType = typeof mensalidadesAcademiaOntologyIndex;

export default mensalidadesAcademiaOntologyIndex;
