/// <mls fileReference="_102047_/l4/inicio/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inicio",
  "businessDomain": "Início do app da empresa: boas-vindas, preparação dos dados da empresa e conclusão do acesso de cada pessoa da organização, sobre os cadastros mestres da plataforma, sem tabelas próprias.",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "inicio",
    "description": "Branch details.inicio of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Empresa",
      "kind": "role",
      "subtype": "Company"
    },
    {
      "entityId": "PessoaOrganizacao",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "Contato",
      "kind": "role",
      "subtype": "ContactChannel"
    }
  ],
  "relationships": [
    {
      "relationshipId": "empresaTemContato",
      "from": "Empresa",
      "to": "Contato",
      "type": "oneToMany",
      "required": false,
      "mode": "mdmRelationship",
      "description": "A empresa tem canais de contato, um deles exigido para que ela fique preparada.",
      "catalogType": "HasContact"
    },
    {
      "relationshipId": "pessoaTemContato",
      "from": "PessoaOrganizacao",
      "to": "Contato",
      "type": "oneToMany",
      "required": false,
      "mode": "mdmRelationship",
      "description": "A pessoa pode informar um telefone opcional como canal de contato.",
      "catalogType": "HasContact"
    },
    {
      "relationshipId": "pessoaMembroEmpresa",
      "from": "PessoaOrganizacao",
      "to": "Empresa",
      "type": "manyToOne",
      "required": true,
      "mode": "mdmRelationship",
      "description": "A pessoa faz parte da organização da empresa e aparece na lista de pessoas que o responsável acompanha.",
      "catalogType": "AssignedTo",
      "roles": [
        "member"
      ]
    },
    {
      "relationshipId": "responsavelPelaEmpresa",
      "from": "PessoaOrganizacao",
      "to": "Empresa",
      "type": "manyToOne",
      "required": false,
      "mode": "mdmRelationship",
      "description": "A pessoa que a plataforma reconhece como responsável pela empresa, o que limita a preparação à empresa dela.",
      "catalogType": "ManagedBy",
      "roles": [
        "manager"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type InicioOntologyIndexType = typeof inicioOntologyIndex;

export default inicioOntologyIndex;
