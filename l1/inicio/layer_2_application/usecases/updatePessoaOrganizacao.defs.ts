/// <mls fileReference="_102047_/l1/inicio/layer_2_application/usecases/updatePessoaOrganizacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "updatePessoaOrganizacao",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_3_domain/entities/pessoaOrganizacao.defs.ts",
    "_102047_/l4/inicio/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "updatePessoaOrganizacao",
    "entityId": "PessoaOrganizacao",
    "operation": "update",
    "rulesApplied": [
      "acessoCompletoDadosMinimos",
      "dadosNaoConcedemPermissoes",
      "emailContaNaoEditavel",
      "ligacaoLoginPelaPlataforma",
      "repetirNaoDuplicaPessoa"
    ],
    "effects": [],
    "mdm": {
      "namespace": "inicio",
      "role": "inicio.PessoaOrganizacao",
      "atomic": true,
      "calls": [
        {
          "id": "update",
          "method": "update",
          "target": "entity",
          "shape": "write",
          "capabilities": [
            "edit.platformFields"
          ],
          "alternative": false,
          "when": [],
          "arguments": [
            {
              "name": "mdmId",
              "role": "selector",
              "origin": {
                "kind": "contract",
                "path": "id"
              },
              "path": "id"
            },
            {
              "name": "expectedVersion",
              "role": "parameter",
              "origin": {
                "kind": "contract",
                "path": "version",
                "evidence": "writePrecondition"
              },
              "path": "version"
            },
            {
              "name": "countryCode",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.identification.countryCode"
              },
              "capability": "edit.platformFields",
              "path": "details.identification.countryCode"
            },
            {
              "name": "name",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.identification.name"
              },
              "capability": "edit.platformFields",
              "path": "details.identification.name"
            },
            {
              "name": "privacyConsent",
              "role": "patch",
              "origin": {
                "kind": "contract",
                "path": "details.person.privacyConsent"
              },
              "capability": "edit.platformFields",
              "path": "details.person.privacyConsent"
            }
          ],
          "result": [
            "mdmId",
            "version",
            "details"
          ]
        }
      ]
    }
  }
} as const;

export default definition;
