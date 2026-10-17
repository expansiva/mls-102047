/// <mls fileReference="_102047_/l1/inicio/layer_2_application/scope/accessScope.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "accessScope",
  "artifactId": "accessScope",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [],
  "data": {
    "scopeId": "accessScope",
    "grants": [
      {
        "grantId": "pessoaCompletarMeuAcesso",
        "actorRef": "pessoaOrganizacao",
        "anchorEntity": "PessoaOrganizacao",
        "entityRefs": [
          "PessoaOrganizacao"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "PessoaOrganizacao",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "pessoaMeuTelefone",
        "actorRef": "pessoaOrganizacao",
        "entityRefs": [
          "TelefonePessoa"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "custom",
        "session": "verified",
        "path": [
          {
            "entityId": "TelefonePessoa",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "pessoaVerEmpresa",
        "actorRef": "pessoaOrganizacao",
        "entityRefs": [
          "Empresa"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Empresa.details.identification.name",
          "Empresa.details.company.tradeName"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Empresa",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "responsavelAcompanharPessoas",
        "actorRef": "responsavel",
        "entityRefs": [
          "PessoaOrganizacao"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "PessoaOrganizacao.details.identification",
          "PessoaOrganizacao.details.base.contacts",
          "PessoaOrganizacao.details.inicio"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "PessoaOrganizacao",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "responsavelMeuAcesso",
        "actorRef": "responsavel",
        "anchorEntity": "PessoaOrganizacao",
        "entityRefs": [
          "PessoaOrganizacao"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "PessoaOrganizacao",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "responsavelMeuTelefone",
        "actorRef": "responsavel",
        "entityRefs": [
          "TelefonePessoa"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "custom",
        "session": "verified",
        "path": [
          {
            "entityId": "TelefonePessoa",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "responsavelPrepararEmpresa",
        "actorRef": "responsavel",
        "entityRefs": [
          "Empresa",
          "ContatoEmpresa"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Empresa",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "ContatoEmpresa",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      }
    ]
  }
} as const;

export default definition;
