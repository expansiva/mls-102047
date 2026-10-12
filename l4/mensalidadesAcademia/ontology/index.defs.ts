/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "mensalidadesAcademia",
  "businessDomain": "Gestão de matrículas e mensalidades de academia: planos, matrícula de alunos, geração mensal de mensalidades, registro de pagamentos, bloqueio por inadimplência e painel financeiro da gerência.",
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
      "entityId": "Recepcionista",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "Plano",
      "kind": "entity",
      "class": "supporting"
    },
    {
      "entityId": "Matricula",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "Mensalidade",
      "kind": "entity",
      "class": "event"
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
      "description": "A matrícula pertence a um aluno; um aluno pode ter várias matrículas ao longo do tempo.",
      "field": "Matricula.alunoId"
    },
    {
      "relationshipId": "matriculaPlano",
      "from": "Matricula",
      "to": "Plano",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "A matrícula é feita em um plano, que define valor e dia de vencimento das mensalidades.",
      "field": "Matricula.planoId"
    },
    {
      "relationshipId": "matriculaRecepcionista",
      "from": "Matricula",
      "to": "Recepcionista",
      "type": "manyToOne",
      "required": false,
      "mode": "fk",
      "description": "Recepcionista que registrou a matrícula, usada para o escopo das matrículas da recepção.",
      "field": "Matricula.recepcionistaId"
    },
    {
      "relationshipId": "mensalidadeMatricula",
      "from": "Mensalidade",
      "to": "Matricula",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada mensalidade é gerada para uma matrícula ativa, uma por competência.",
      "field": "Mensalidade.matriculaId"
    },
    {
      "relationshipId": "pagamentoMensalidade",
      "from": "Pagamento",
      "to": "Mensalidade",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "O pagamento quita uma mensalidade, que passa a paga.",
      "field": "Pagamento.mensalidadeId"
    },
    {
      "relationshipId": "alunoMensalidades",
      "from": "Aluno",
      "to": "Mensalidade",
      "type": "oneToMany",
      "required": false,
      "mode": "throughTable",
      "description": "Mensalidades do aluno obtidas pelas suas matrículas, usadas para verificar vencidas e bloqueio.",
      "through": "Matricula",
      "path": "Aluno <- Matricula.alunoId <- Mensalidade.matriculaId",
      "derived": true
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type MensalidadesAcademiaOntologyIndexType = typeof mensalidadesAcademiaOntologyIndex;

export default mensalidadesAcademiaOntologyIndex;
