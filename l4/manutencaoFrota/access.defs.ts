/// <mls fileReference="_102047_/l4/manutencaoFrota/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaAccess = {
  "schemaVersion": "2026-09-10-ns5-access-v2",
  "moduleName": "manutencaoFrota",
  "actors": [
    {
      "actorId": "motorista",
      "kind": "internal",
      "origin": "named",
      "title": "Motorista",
      "description": "Motorista da transportadora que registra os abastecimentos dos veículos que dirige."
    },
    {
      "actorId": "gestorFrota",
      "kind": "internal",
      "origin": "named",
      "title": "Gestor de frota",
      "description": "Responsável pela gestão da frota, pelos planos preventivos e pelas ordens de manutenção."
    }
  ],
  "authorities": [
    {
      "authorityId": "registrarAbastecimentosAtribuidos",
      "title": "Registrar abastecimentos de veículos atribuídos",
      "description": "Permite consultar os veículos atribuídos ao motorista e registrar seus abastecimentos."
    },
    {
      "authorityId": "gerenciarManutencaoFrota",
      "title": "Gerenciar manutenção da frota",
      "description": "Permite consultar a frota, definir planos preventivos e abrir ou concluir ordens de manutenção."
    },
    {
      "authorityId": "gerenciarOficinas",
      "title": "Gerenciar oficinas",
      "description": "Permite cadastrar e manter as oficinas prestadoras de serviços de manutenção."
    }
  ],
  "grants": [
    {
      "grantId": "motoristaRegistraAbastecimentosAtribuidos",
      "actorRef": "motorista",
      "authorityRef": "registrarAbastecimentosAtribuidos",
      "entityRefs": [
        "Veiculo",
        "Abastecimento"
      ],
      "dataScope": {
        "mode": "custom",
        "description": "Somente veículos atribuídos ao motorista autenticado e os abastecimentos registrados para esses veículos."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Permite visualizar os dados completos dos veículos atribuídos e dos respectivos registros de abastecimento."
      }
    },
    {
      "grantId": "gestorGerenciaManutencaoFrota",
      "actorRef": "gestorFrota",
      "authorityRef": "gerenciarManutencaoFrota",
      "entityRefs": [
        "Veiculo",
        "PlanoManutencaoPreventiva",
        "OrdemManutencao"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todos os veículos, planos preventivos e ordens de manutenção da organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Permite visualizar e administrar integralmente os dados necessários à manutenção da frota."
      }
    },
    {
      "grantId": "gestorGerenciaOficinas",
      "actorRef": "gestorFrota",
      "authorityRef": "gerenciarOficinas",
      "entityRefs": [
        "Oficina"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Todas as oficinas cadastradas pela organização."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Permite visualizar e manter integralmente os cadastros de oficinas."
      }
    }
  ]
} as const satisfies Ns5AccessArtifact;

export type ManutencaoFrotaAccessType = typeof manutencaoFrotaAccess;

export default manutencaoFrotaAccess;
