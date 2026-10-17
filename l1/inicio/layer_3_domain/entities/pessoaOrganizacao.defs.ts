/// <mls fileReference="_102047_/l1/inicio/layer_3_domain/entities/pessoaOrganizacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "PessoaOrganizacao",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [],
  "data": {
    "entityId": "PessoaOrganizacao",
    "storageTarget": "mdm",
    "fields": [
      {
        "name": "id",
        "type": "uuid",
        "derived": true
      },
      {
        "name": "version",
        "type": "integer",
        "derived": true
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.identification",
        "type": "object"
      },
      {
        "name": "details.identification.subtype",
        "type": "enum",
        "derived": true
      },
      {
        "name": "details.identification.name",
        "type": "string"
      },
      {
        "name": "details.identification.status",
        "type": "enum",
        "derived": true
      },
      {
        "name": "details.identification.countryCode",
        "type": "string"
      },
      {
        "name": "details.identification.tags",
        "type": "string",
        "derived": true
      },
      {
        "name": "details.base",
        "type": "object"
      },
      {
        "name": "details.base.contacts",
        "type": "object",
        "derived": true
      },
      {
        "name": "details.base.relationshipRefs",
        "type": "object",
        "derived": true
      },
      {
        "name": "details.person",
        "type": "object"
      },
      {
        "name": "details.person.privacyConsent",
        "type": "object"
      },
      {
        "name": "details.general",
        "type": "object"
      },
      {
        "name": "details.inicio",
        "type": "object"
      },
      {
        "name": "details.inicio.acessoCompleto",
        "type": "boolean",
        "derived": true
      },
      {
        "name": "details.inicio.dadosFaltantes",
        "type": "string",
        "derived": true
      },
      {
        "name": "details.inicio.consentimentoExigido",
        "type": "boolean",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [],
      "transitions": []
    },
    "invariants": [
      "acessoCompletoDadosMinimos",
      "emailContaNaoEditavel",
      "repetirNaoDuplicaPessoa",
      "dadosNaoConcedemPermissoes",
      "ligacaoLoginPelaPlataforma"
    ],
    "imports": []
  }
} as const;

export default definition;
