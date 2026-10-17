/// <mls fileReference="_102047_/l4/inicio/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "inicio",
  "businessDomain": "Início do app da empresa: boas-vindas, preparação dos dados da empresa e conclusão do acesso de cada pessoa da organização",
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
      "entityId": "ContatoEmpresa",
      "kind": "role",
      "subtype": "ContactChannel"
    },
    {
      "entityId": "TelefonePessoa",
      "kind": "role",
      "subtype": "ContactChannel"
    }
  ],
  "relationships": [
    {
      "relationshipId": "pessoaMembroEmpresa",
      "from": "PessoaOrganizacao",
      "to": "Empresa",
      "type": "manyToOne",
      "required": true,
      "mode": "mdmRelationship",
      "description": "A pessoa faz parte da organização da empresa; o vínculo é mantido pela plataforma quando a pessoa é aceita.",
      "catalogType": "AssignedTo",
      "roles": [
        "member"
      ]
    },
    {
      "relationshipId": "empresaTemContato",
      "from": "Empresa",
      "to": "ContatoEmpresa",
      "type": "oneToMany",
      "required": false,
      "mode": "mdmRelationship",
      "description": "A empresa possui canais de contato registrados na plataforma.",
      "catalogType": "HasContact"
    },
    {
      "relationshipId": "pessoaTemTelefone",
      "from": "PessoaOrganizacao",
      "to": "TelefonePessoa",
      "type": "oneToMany",
      "required": false,
      "mode": "mdmRelationship",
      "description": "A pessoa pode ter um telefone de contato opcional registrado na plataforma.",
      "catalogType": "HasContact"
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type InicioOntologyIndexType = typeof inicioOntologyIndex;

export default inicioOntologyIndex;
