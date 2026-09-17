/// <mls fileReference="_102047_/l4/agendaClinica/ontology/Consulta.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const agendaClinicaEntityConsulta = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "agendaClinica",
  "entityId": "Consulta",
  "title": "Consulta",
  "description": "Agendamento de atendimento de um paciente com um profissional em data e horário definidos.",
  "displayField": "scheduledAt",
  "relationships": {
    "paciente": {
      "relationshipId": "consultaPaciente",
      "to": "Paciente",
      "via": "Consulta.pacienteId",
      "cardinality": "N:1",
      "title": "Paciente da consulta",
      "description": "Cada consulta é agendada para um paciente.",
      "mode": "fk",
      "required": "Sempre"
    },
    "profissional": {
      "relationshipId": "consultaProfissional",
      "to": "Profissional",
      "via": "Consulta.profissionalId",
      "cardinality": "N:1",
      "title": "Profissional responsável",
      "description": "Cada consulta é atribuída a um profissional responsável pelo atendimento.",
      "mode": "fk",
      "required": "Sempre"
    }
  },
  "capabilities": {
    "agendaClinica.localizarConsultas": "Localiza consultas por paciente, profissional, data, horário ou situação usando os índices da agenda; a recepcionista consulta a agenda da clínica e o profissional somente a própria agenda.",
    "agendaClinica.agendarConsulta": "Cria uma consulta com paciente, profissional e data e horário, verificando a chave única do profissional; a recepcionista usa esta ação para realizar agendamentos.",
    "agendaClinica.inspecionarConsulta": "Exibe os dados da consulta e a anotação quando existente pela rota da consulta; a recepcionista e o profissional responsável usam esta consulta conforme seu escopo.",
    "agendaClinica.consultarAgendaDoDia": "Lista as consultas de uma data pelo índice de profissional e horário; o profissional usa a ação apenas para visualizar sua própria agenda do dia.",
    "agendaClinica.confirmarConsulta": "Altera uma consulta agendada para confirmada pela transição confirmarConsulta; a recepcionista registra a confirmação feita por telefone.",
    "agendaClinica.registrarFalta": "Altera uma consulta agendada ou confirmada para falta pela transição registrarFalta; a recepcionista registra o não comparecimento do paciente.",
    "agendaClinica.registrarAtendimento": "Altera uma consulta da própria agenda para atendida pela transição registrarAtendimento e grava a anotação; o profissional responsável usa esta ação."
  },
  "rules": [
    "consultaSemConflitoHorario",
    "transicaoConsultaPermitida",
    "anotacaoObrigatoriaNoAtendimento",
    "acessoProfissionalPropriaAgenda"
  ],
  "kind": "entity",
  "class": "core",
  "storage": {
    "target": "moduleDatabase",
    "table": "agendaClinica_consulta"
  },
  "record": {
    "fields": {
      "id": {
        "type": "uuid",
        "required": true,
        "derived": true,
        "indexed": true,
        "title": "Id"
      },
      "version": {
        "type": "integer",
        "required": true,
        "derived": true
      },
      "pacienteId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "ContactSummary",
        "to": [
          "Paciente"
        ],
        "title": "Paciente",
        "description": "Paciente para quem a consulta foi agendada.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "profissionalId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "of": "ContactSummary",
        "to": [
          "Profissional"
        ],
        "title": "Profissional",
        "description": "Médico ou terapeuta responsável pelo atendimento.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "scheduledAt": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "of": "ContactSummary",
        "title": "Data e horário",
        "description": "Data e horário programados para o início da consulta.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "of": "ContactSummary",
        "values": [
          {
            "value": "scheduled",
            "title": "Agendada",
            "description": "Consulta marcada e ainda não confirmada."
          },
          {
            "value": "confirmed",
            "title": "Confirmada",
            "description": "Consulta confirmada por telefone."
          },
          {
            "value": "noShow",
            "title": "Falta",
            "description": "Paciente não compareceu à consulta."
          },
          {
            "value": "attended",
            "title": "Atendida",
            "description": "Atendimento realizado pelo profissional."
          }
        ],
        "title": "Situação",
        "description": "Situação atual da consulta no fluxo de agendamento e atendimento.",
        "maxLength": 0,
        "min": 0,
        "max": 0
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "ContactSummary",
        "title": "Detalhes da consulta",
        "description": "Informações do atendimento que não são usadas para pesquisa, ordenação ou unicidade.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "attendanceNote": {
            "type": "text",
            "of": "ContactSummary",
            "title": "Anotação do atendimento",
            "description": "Registro feito pelo profissional sobre o atendimento realizado.",
            "maxLength": 0,
            "min": 0,
            "max": 0
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "profissionalId",
      "scheduledAt"
    ]
  ],
  "lifecycleStates": [
    {
      "state": "scheduled",
      "reachedBy": "actor"
    },
    {
      "state": "confirmed",
      "reachedBy": "actor"
    },
    {
      "state": "noShow",
      "reachedBy": "actor"
    },
    {
      "state": "attended",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "confirmarConsulta",
      "from": [
        "scheduled"
      ],
      "to": "confirmed",
      "by": [
        "recepcionista"
      ],
      "description": "A recepcionista registra a confirmação telefônica da consulta.",
      "ruleRefs": [
        "transicaoConsultaPermitida"
      ]
    },
    {
      "transitionId": "registrarFalta",
      "from": [
        "scheduled",
        "confirmed"
      ],
      "to": "noShow",
      "by": [
        "recepcionista"
      ],
      "description": "A recepcionista registra que o paciente não compareceu.",
      "ruleRefs": [
        "transicaoConsultaPermitida"
      ]
    },
    {
      "transitionId": "registrarAtendimento",
      "from": [
        "scheduled",
        "confirmed"
      ],
      "to": "attended",
      "by": [
        "profissional"
      ],
      "description": "O profissional registra a realização do atendimento e sua anotação.",
      "ruleRefs": [
        "transicaoConsultaPermitida",
        "anotacaoObrigatoriaNoAtendimento",
        "acessoProfissionalPropriaAgenda"
      ]
    }
  ]
} as const satisfies Ns5OntologyEntityV3;

export type AgendaClinicaEntityConsultaType = typeof agendaClinicaEntityConsulta;

export default agendaClinicaEntityConsulta;
