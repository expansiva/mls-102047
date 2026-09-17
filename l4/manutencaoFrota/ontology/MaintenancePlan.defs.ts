/// <mls fileReference="_102047_/l4/manutencaoFrota/ontology/MaintenancePlan.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaEntityMaintenancePlan = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "manutencaoFrota",
  "entityId": "MaintenancePlan",
  "title": "Plano de manutenção preventiva",
  "description": "Periodicidade preventiva de um veículo por quilometragem, meses ou ambas.",
  "displayField": "id",
  "relationships": {
    "vehicle": {
      "relationshipId": "maintenancePlanVehicle",
      "to": "Vehicle",
      "via": "MaintenancePlan.vehicleId",
      "cardinality": "N:1",
      "title": "Veículo do plano",
      "description": "Cada plano preventivo define a periodicidade de manutenção de um veículo.",
      "mode": "fk",
      "required": "Sempre."
    },
    "maintenanceOrders": {
      "relationshipId": "maintenanceOrderPlan",
      "to": "MaintenanceOrder",
      "via": "MaintenanceOrder.maintenancePlanId",
      "cardinality": "1:N",
      "title": "Ordens de manutenção do plano",
      "description": "Ordens preventivas podem ser abertas a partir deste plano quando ele vence; ordens por defeito não precisam estar vinculadas a um plano.",
      "mode": "fk",
      "direction": "to",
      "required": "Quando uma ordem de manutenção preventiva decorrer deste plano."
    }
  },
  "capabilities": {
    "read.byId": "Consulta um plano preventivo pelo identificador da linha, usando findOne por id, para o gestor de frota.",
    "locate.byColumn": "Lista planos preventivos por veículo, com ordenação e paginação sobre a coluna indexada vehicleId, para o gestor de frota.",
    "count": "Conta os planos preventivos que correspondem ao filtro de veículo, usando a mesma condição de listagem, para o gestor de frota.",
    "listByForeignKey": "Lista os planos preventivos vinculados a um ou mais veículos pela chave estrangeira vehicleId, para as telas do gestor de frota.",
    "create": "Cria um plano preventivo com periodicidade por quilômetros, meses ou ambas, inserindo a linha para o gestor de frota.",
    "update": "Altera as periodicidades e as referências previstas de um plano, aplicando atualização parcial da linha para o gestor de frota.",
    "delete": "Remove um plano preventivo que não deve mais ser utilizado, excluindo fisicamente a linha para o gestor de frota.",
    "read.mdmRecord": "Lê o registro mestre do veículo indicado por vehicleId para mostrar seus dados e a quilometragem atual ao gestor de frota.",
    "manutencaoFrota.alertOverduePreventive": "Identifica planos cuja próxima quilometragem prevista foi ultrapassada pela quilometragem atual do veículo e gera o aviso para o gestor de frota."
  },
  "rules": [
    "maintenancePlanRequiresInterval",
    "maintenancePlanPositiveInterval",
    "maintenancePlanCalculatedSchedule"
  ],
  "kind": "entity",
  "class": "core",
  "storage": {
    "target": "moduleDatabase",
    "table": "manutencaoFrota_maintenanceplan",
    "kind": "relational"
  },
  "record": {
    "fields": {
      "id": {
        "type": "uuid",
        "required": true,
        "derived": true,
        "indexed": true,
        "title": "Id"
      },
      "version": {
        "type": "integer",
        "required": true,
        "derived": true
      },
      "vehicleId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "Address",
        "to": [
          "Vehicle"
        ],
        "title": "Veículo",
        "description": "Veículo ao qual se aplica a periodicidade de manutenção preventiva.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "Address",
        "title": "Dados do plano preventivo",
        "description": "Periodicidades e referências calculadas da manutenção preventiva do veículo.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "intervalKm": {
            "type": "integer",
            "of": "Address",
            "title": "Periodicidade por quilometragem",
            "description": "Quantidade de quilômetros entre manutenções preventivas, quando a preventiva é controlada por quilometragem.",
            "maxLength": 0,
            "min": 1,
            "max": 0
          },
          "intervalMonths": {
            "type": "integer",
            "of": "Address",
            "title": "Periodicidade por meses",
            "description": "Quantidade de meses entre manutenções preventivas, quando a preventiva é controlada por tempo.",
            "maxLength": 0,
            "min": 1,
            "max": 0
          },
          "nextMaintenanceKm": {
            "type": "integer",
            "of": "Address",
            "title": "Próxima quilometragem prevista",
            "description": "Quilometragem calculada para a próxima manutenção preventiva; serve de referência para o alerta de vencimento.",
            "maxLength": 0,
            "min": 0,
            "max": 0
          },
          "nextMaintenanceDate": {
            "type": "date",
            "of": "Address",
            "title": "Próxima data prevista",
            "description": "Data calculada para a próxima manutenção preventiva quando houver periodicidade por meses.",
            "maxLength": 0,
            "min": 0,
            "max": 0
          }
        }
      }
    }
  }
} as const satisfies Ns5OntologyEntityV3;

export type ManutencaoFrotaEntityMaintenancePlanType = typeof manutencaoFrotaEntityMaintenancePlan;

export default manutencaoFrotaEntityMaintenancePlan;
