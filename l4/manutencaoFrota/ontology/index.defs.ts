/// <mls fileReference="_102047_/l4/manutencaoFrota/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3 } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaOntologyIndex = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "manutencaoFrota",
  "businessDomain": "Gestão de manutenção de frota para transportadora",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "manutencaoFrota",
    "description": "Branch details.manutencaoFrota of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Vehicle",
      "kind": "role",
      "subtype": "AssetVehicle"
    },
    {
      "entityId": "Driver",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "Workshop",
      "kind": "role",
      "subtype": "Company"
    },
    {
      "entityId": "VehicleAssignment",
      "kind": "entity",
      "class": "supporting"
    },
    {
      "entityId": "Fueling",
      "kind": "entity",
      "class": "event"
    },
    {
      "entityId": "MaintenancePlan",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "MaintenanceOrder",
      "kind": "entity",
      "class": "core"
    }
  ],
  "relationships": [
    {
      "relationshipId": "vehicleAssignmentVehicle",
      "from": "VehicleAssignment",
      "to": "Vehicle",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada atribuição vincula obrigatoriamente um veículo da frota.",
      "field": "VehicleAssignment.vehicleId"
    },
    {
      "relationshipId": "vehicleAssignmentDriver",
      "from": "VehicleAssignment",
      "to": "Driver",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada atribuição vincula obrigatoriamente o motorista autorizado a dirigir o veículo.",
      "field": "VehicleAssignment.driverId"
    },
    {
      "relationshipId": "vehicleAssignedDrivers",
      "from": "Vehicle",
      "to": "Driver",
      "type": "manyToMany",
      "required": false,
      "mode": "throughTable",
      "description": "Os veículos visíveis ao motorista são derivados das atribuições de veículo registradas para ele.",
      "through": "VehicleAssignment",
      "path": "VehicleAssignment.vehicleId -> VehicleAssignment.driverId",
      "derived": true
    },
    {
      "relationshipId": "fuelingVehicle",
      "from": "Fueling",
      "to": "Vehicle",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada abastecimento é registrado para um único veículo.",
      "field": "Fueling.vehicleId"
    },
    {
      "relationshipId": "fuelingDriver",
      "from": "Fueling",
      "to": "Driver",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada abastecimento registra o motorista que o realizou.",
      "field": "Fueling.driverId"
    },
    {
      "relationshipId": "maintenancePlanVehicle",
      "from": "MaintenancePlan",
      "to": "Vehicle",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada plano preventivo define a periodicidade de manutenção de um veículo.",
      "field": "MaintenancePlan.vehicleId"
    },
    {
      "relationshipId": "maintenanceOrderVehicle",
      "from": "MaintenanceOrder",
      "to": "Vehicle",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada ordem de manutenção trata um único veículo.",
      "field": "MaintenanceOrder.vehicleId"
    },
    {
      "relationshipId": "maintenanceOrderWorkshop",
      "from": "MaintenanceOrder",
      "to": "Workshop",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada ordem de manutenção informa a oficina responsável pela execução do serviço.",
      "field": "MaintenanceOrder.workshopId"
    },
    {
      "relationshipId": "maintenanceOrderPlan",
      "from": "MaintenanceOrder",
      "to": "MaintenancePlan",
      "type": "manyToOne",
      "required": false,
      "mode": "fk",
      "description": "Uma ordem preventiva pode decorrer de um plano de manutenção vencido; ordens por defeito não precisam de plano.",
      "field": "MaintenanceOrder.maintenancePlanId"
    }
  ]
} as const satisfies Ns5OntologyIndexV3;

export type ManutencaoFrotaOntologyIndexType = typeof manutencaoFrotaOntologyIndex;

export default manutencaoFrotaOntologyIndex;
