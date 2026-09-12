/// <mls fileReference="_102047_/l4/organization/registry.defs.ts" enhancement="_blank"/>

import type { Ns4SolutionRegistryArtifact } from '/_102035_/l2/agentNewSolution/types.js';

export const solutionRegistry = {
  "schemaVersion": "ns4-solution-registry-v1",
  "level1SchemaVersion": "ns4-level1-v1",
  "modules": [
    {
      "moduleName": "mensalidadesAcademia",
      "actors": [
        {
          "actorId": "recepcao",
          "kind": "internal"
        },
        {
          "actorId": "gerencia",
          "kind": "internal"
        },
        {
          "actorId": "aluno",
          "kind": "external"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Person",
          "role": "mensalidadesAcademia.Aluno",
          "namespace": "mensalidadesAcademia"
        },
        {
          "mdmSubtype": "Service",
          "role": "mensalidadesAcademia.Plano",
          "namespace": "mensalidadesAcademia"
        }
      ],
      "generalFields": [],
      "updatedAt": "2026-09-12T08:00:54.176Z"
    },
    {
      "moduleName": "comandaRestaurante",
      "actors": [
        {
          "actorId": "garcom",
          "kind": "internal"
        },
        {
          "actorId": "caixa",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "AssetEquipment",
          "role": "comandaRestaurante.Mesa",
          "namespace": "comandaRestaurante"
        },
        {
          "mdmSubtype": "Product",
          "role": "comandaRestaurante.ItemCardapio",
          "namespace": "comandaRestaurante"
        }
      ],
      "generalFields": [],
      "updatedAt": "2026-09-12T08:10:57.094Z"
    },
    {
      "moduleName": "controleEstoque",
      "actors": [
        {
          "actorId": "estoquista",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Product",
          "role": "controleEstoque.Product",
          "namespace": "controleEstoque"
        }
      ],
      "generalFields": [],
      "updatedAt": "2026-09-12T08:22:06.542Z"
    },
    {
      "moduleName": "compras",
      "actors": [
        {
          "actorId": "comprador",
          "kind": "internal"
        },
        {
          "actorId": "gerenteCompras",
          "kind": "internal"
        },
        {
          "actorId": "almoxarife",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Company",
          "role": "compras.Supplier",
          "namespace": "compras"
        },
        {
          "mdmSubtype": "Product",
          "role": "compras.Product",
          "namespace": "compras"
        }
      ],
      "generalFields": [],
      "updatedAt": "2026-09-12T08:27:05.112Z"
    },
    {
      "moduleName": "locacaoEquipamentos",
      "actors": [
        {
          "actorId": "atendente",
          "kind": "internal"
        },
        {
          "actorId": "gerente",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Person",
          "role": "locacaoEquipamentos.Cliente",
          "namespace": "locacaoEquipamentos"
        },
        {
          "mdmSubtype": "AssetEquipment",
          "role": "locacaoEquipamentos.Equipamento",
          "namespace": "locacaoEquipamentos"
        }
      ],
      "generalFields": [],
      "updatedAt": "2026-09-12T08:41:25.107Z"
    },
    {
      "moduleName": "hiringPipeline",
      "actors": [
        {
          "actorId": "recruiter",
          "kind": "internal"
        },
        {
          "actorId": "hiringManager",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Person",
          "role": "hiringPipeline.Candidate",
          "namespace": "hiringPipeline"
        }
      ],
      "generalFields": [],
      "updatedAt": "2026-09-12T08:45:40.977Z"
    }
  ]
} as const satisfies Ns4SolutionRegistryArtifact;

export type SolutionRegistryType = typeof solutionRegistry;

export default solutionRegistry;
