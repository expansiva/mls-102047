/// <mls fileReference="_102047_/l4/manutencaoFrota/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "manutencaoFrota",
  "businessDomain": "Manutenção de frota de transportadora: veículos atribuídos a motoristas, abastecimentos, planos de manutenção preventiva por km ou meses e ordens de manutenção em oficinas.",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "manutencaoFrota",
    "description": "Branch details.manutencaoFrota of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Motorista",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "Oficina",
      "kind": "role",
      "subtype": "Company"
    },
    {
      "entityId": "Veiculo",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "Abastecimento",
      "kind": "entity",
      "class": "event"
    },
    {
      "entityId": "PlanoManutencao",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "OrdemManutencao",
      "kind": "entity",
      "class": "core"
    }
  ],
  "relationships": [
    {
      "relationshipId": "veiculoMotorista",
      "from": "Veiculo",
      "to": "Motorista",
      "type": "manyToOne",
      "required": false,
      "mode": "fk",
      "description": "Motorista a quem o veículo está atribuído; define os veículos que o motorista pode ver.",
      "field": "Veiculo.motoristaId"
    },
    {
      "relationshipId": "abastecimentoVeiculo",
      "from": "Abastecimento",
      "to": "Veiculo",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Veículo abastecido.",
      "field": "Abastecimento.veiculoId"
    },
    {
      "relationshipId": "abastecimentoMotorista",
      "from": "Abastecimento",
      "to": "Motorista",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Motorista que registrou o abastecimento.",
      "field": "Abastecimento.motoristaId"
    },
    {
      "relationshipId": "planoVeiculo",
      "from": "PlanoManutencao",
      "to": "Veiculo",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Veículo ao qual o plano de preventiva se aplica.",
      "field": "PlanoManutencao.veiculoId"
    },
    {
      "relationshipId": "ordemVeiculo",
      "from": "OrdemManutencao",
      "to": "Veiculo",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Veículo que entra em manutenção.",
      "field": "OrdemManutencao.veiculoId"
    },
    {
      "relationshipId": "ordemPlano",
      "from": "OrdemManutencao",
      "to": "PlanoManutencao",
      "type": "manyToOne",
      "required": false,
      "mode": "fk",
      "description": "Plano de preventiva que originou a ordem, quando ela é preventiva.",
      "field": "OrdemManutencao.planoId"
    },
    {
      "relationshipId": "ordemOficina",
      "from": "OrdemManutencao",
      "to": "Oficina",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Oficina que executa a manutenção.",
      "field": "OrdemManutencao.oficinaId"
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type ManutencaoFrotaOntologyIndexType = typeof manutencaoFrotaOntologyIndex;

export default manutencaoFrotaOntologyIndex;
