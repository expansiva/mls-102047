/// <mls fileReference="_102047_/l4/manutencaoFrota/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaAccess = {
  "schemaVersion": "2026-09-12-ns5-access-v3",
  "moduleName": "manutencaoFrota",
  "actors": [
    {
      "actorId": "motorista",
      "kind": "internal",
      "origin": "named",
      "title": "Motorista",
      "description": "Motorista da transportadora que registra abastecimentos dos veículos que dirige e consulta os veículos atribuídos a si."
    },
    {
      "actorId": "gestor",
      "kind": "internal",
      "origin": "named",
      "title": "Gestor de frota",
      "description": "Gestor responsável por cadastrar planos de manutenção preventiva e abrir ordens de manutenção dos veículos."
    }
  ],
  "grants": [
    {
      "grantId": "motoristaConsultaVeiculosAtribuidos",
      "actorRef": "motorista",
      "title": "Consultar veículos atribuídos",
      "description": "Permite ao motorista consultar os dados operacionais dos veículos para os quais possui uma atribuição de condução.",
      "entityRefs": [
        "Vehicle"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Somente veículos alcançados pelas atribuições vinculadas ao motorista da sessão.",
        "anchorEntity": "Driver"
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "Exibe a identificação do veículo, placa, modelo, ano e quilometragem atual necessários à condução.",
        "allowedFields": [
          "Vehicle.id",
          "Vehicle.version",
          "Vehicle.details.identification",
          "Vehicle.details.assetVehicle",
          "Vehicle.details.manutencaoFrota"
        ]
      }
    },
    {
      "grantId": "motoristaConsultaAtribuicoes",
      "actorRef": "motorista",
      "title": "Consultar próprias atribuições",
      "description": "Permite ao motorista consultar as atribuições de veículos vinculadas ao seu próprio cadastro.",
      "entityRefs": [
        "VehicleAssignment"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Somente atribuições cujo motorista é a pessoa da sessão.",
        "anchorEntity": "Driver"
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Exibe integralmente os dados operacionais das próprias atribuições de veículos."
      }
    },
    {
      "grantId": "motoristaRegistraPropriosAbastecimentos",
      "actorRef": "motorista",
      "title": "Registrar próprios abastecimentos",
      "description": "Permite ao motorista registrar e consultar abastecimentos informados em seu próprio nome para veículos que dirige.",
      "entityRefs": [
        "Fueling"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Somente abastecimentos cujo motorista é a pessoa da sessão.",
        "anchorEntity": "Driver"
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Exibe integralmente os dados do abastecimento, incluindo veículo, data, litros, valor e leitura do odômetro."
      }
    },
    {
      "grantId": "gestorAdministraCadastrosFrota",
      "actorRef": "gestor",
      "title": "Administrar cadastros da frota",
      "description": "Permite ao gestor manter os veículos, motoristas, oficinas e atribuições de condução utilizados pela operação de manutenção da frota.",
      "entityRefs": [
        "Vehicle",
        "Driver",
        "Workshop",
        "VehicleAssignment"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Abrange os cadastros de toda a organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Exibe integralmente os registros mestres e operacionais necessários para administrar a frota e suas atribuições."
      }
    },
    {
      "grantId": "gestorAdministraManutencoes",
      "actorRef": "gestor",
      "title": "Administrar manutenções preventivas e ordens",
      "description": "Permite ao gestor cadastrar planos preventivos, consultar alertas de vencimento e abrir ou concluir ordens de manutenção para toda a frota.",
      "entityRefs": [
        "MaintenancePlan",
        "MaintenanceOrder"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Abrange os planos e as ordens de manutenção de todos os veículos da organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Exibe integralmente as periodicidades preventivas, referências calculadas e dados das ordens de manutenção."
      }
    }
  ]
} as const satisfies Ns5AccessArtifact;

export type ManutencaoFrotaAccessType = typeof manutencaoFrotaAccess;

export default manutencaoFrotaAccess;
