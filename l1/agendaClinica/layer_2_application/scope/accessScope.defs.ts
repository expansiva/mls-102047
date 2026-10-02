/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/scope/accessScope.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "accessScope",
  "artifactId": "accessScope",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [],
  "data": {
    "scopeId": "accessScope",
    "grants": [
      {
        "grantId": "cadastrarPacientes",
        "actorRef": "recepcionista",
        "entityRefs": [
          "Paciente"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Paciente.id",
          "Paciente.version",
          "Paciente.details.identification",
          "Paciente.details.base",
          "Paciente.details.person"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Paciente",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "consultarCanaisDosPacientes",
        "actorRef": "recepcionista",
        "entityRefs": [
          "ContatoPaciente"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "ContatoPaciente.id",
          "ContatoPaciente.version",
          "ContatoPaciente.details.identification",
          "ContatoPaciente.details.contactChannel"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "ContatoPaciente",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "consultarPacientesDaPropriaAgenda",
        "actorRef": "profissional",
        "anchorEntity": "Paciente",
        "entityRefs": [
          "Paciente"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Paciente.id",
          "Paciente.details.identification"
        ],
        "scopeMode": "related",
        "session": "verified",
        "path": [
          {
            "entityId": "Paciente",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "consultarProfissionaisParaAgenda",
        "actorRef": "recepcionista",
        "entityRefs": [
          "Profissional"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Profissional.id",
          "Profissional.version",
          "Profissional.details.identification",
          "Profissional.details.person"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Profissional",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "consultarPropriaAgenda",
        "actorRef": "profissional",
        "anchorEntity": "Profissional",
        "entityRefs": [
          "Consulta"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "Consulta",
            "steps": [
              {
                "relationshipId": "consultaProfissional",
                "from": "Consulta",
                "to": "Profissional",
                "field": "Consulta.profissionalId"
              }
            ],
            "pending": ""
          }
        ],
        "pending": "ACCESS_ANCHOR"
      },
      {
        "grantId": "consultarProprioCadastroProfissional",
        "actorRef": "profissional",
        "anchorEntity": "Profissional",
        "entityRefs": [
          "Profissional"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Profissional.id",
          "Profissional.version",
          "Profissional.details.identification",
          "Profissional.details.person"
        ],
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "Profissional",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "consultarProprioCadastroRecepcao",
        "actorRef": "recepcionista",
        "anchorEntity": "Recepcionista",
        "entityRefs": [
          "Recepcionista"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Recepcionista.id",
          "Recepcionista.version",
          "Recepcionista.details.identification",
          "Recepcionista.details.person"
        ],
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "Recepcionista",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "organizarAgenda",
        "actorRef": "recepcionista",
        "entityRefs": [
          "Consulta"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Consulta.id",
          "Consulta.version",
          "Consulta.pacienteId",
          "Consulta.profissionalId",
          "Consulta.scheduledAt",
          "Consulta.status"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Consulta",
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
