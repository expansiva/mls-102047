/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "authorityMap",
  "artifactId": "authorityMap",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "mapId": "authorityMap",
    "entries": [
      {
        "grantId": "cadastrarPacientes",
        "actorRef": "recepcionista"
      },
      {
        "grantId": "consultarCanaisDosPacientes",
        "actorRef": "recepcionista"
      },
      {
        "grantId": "consultarPacientesDaPropriaAgenda",
        "actorRef": "profissional"
      },
      {
        "grantId": "consultarProfissionaisParaAgenda",
        "actorRef": "recepcionista"
      },
      {
        "grantId": "consultarPropriaAgenda",
        "actorRef": "profissional"
      },
      {
        "grantId": "consultarProprioCadastroProfissional",
        "actorRef": "profissional"
      },
      {
        "grantId": "consultarProprioCadastroRecepcao",
        "actorRef": "recepcionista"
      },
      {
        "grantId": "organizarAgenda",
        "actorRef": "recepcionista"
      }
    ]
  }
} as const;

export default definition;
