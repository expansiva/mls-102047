/// <mls fileReference="_102047_/l4/agendaClinica/ontology/Profissional.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const agendaClinicaEntityProfissional = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "agendaClinica",
  "entityId": "Profissional",
  "title": "Profissional",
  "description": "Médico ou terapeuta da clínica que realiza atendimentos e consulta a própria agenda.",
  "displayField": "details.identification.name",
  "relationships": {
    "consultas": {
      "relationshipId": "consultaProfissional",
      "to": "Consulta",
      "via": "Consulta.profissionalId",
      "cardinality": "1:N",
      "title": "Consultas do profissional",
      "description": "Consultas atribuídas a este profissional como responsável pelo atendimento.",
      "mode": "fk",
      "direction": "to",
      "required": true,
      "role": "profissional responsável"
    }
  },
  "capabilities": {
    "read.byId": "Lê o profissional pelo identificador mestre para apresentar seus dados ao carregar uma consulta; usado pela recepcionista e pelo profissional.",
    "locate.byName": "Localiza médicos e terapeutas pelo nome no índice de pessoas para selecionar o responsável ao agendar; usado pela recepcionista.",
    "locate.byDocument": "Localiza um profissional pelo documento nacional para evitar duplicidade antes do seu cadastro; usado pela equipe autorizada da clínica.",
    "register.createOrAttach": "Cria a pessoa quando ausente ou anexa o papel de Profissional ao registro mestre existente, usando documento quando informado; usado pela equipe autorizada da clínica.",
    "edit.platformFields": "Atualiza os dados de identificação e os demais dados de plataforma do profissional no registro mestre; usado pela equipe autorizada da clínica.",
    "edit.moduleNamespace": "Atualiza exclusivamente a categoria de atuação em details.agendaClinica; usado pela equipe autorizada da clínica.",
    "inactivate": "Inativa ou reativa o registro mestre do profissional para retirá-lo ou devolvê-lo ao uso sem apagá-lo; usado pela equipe autorizada da clínica.",
    "agendaClinica.listarConsultas": "Lista as consultas vinculadas por Consulta.profissionalId, restringindo a agenda do dia ao próprio profissional autenticado; usado pelo profissional."
  },
  "rules": [
    "rule-foreign-namespace-refused",
    "rule-document-shape-validated",
    "rule-identity-never-in-namespace",
    "rule-person-privacy-consent-required-br-eu"
  ],
  "writer": "crud",
  "kind": "role",
  "subtype": "Person",
  "roleTag": "agendaClinica.Profissional",
  "source": "/_102034_/l4/ontology/mdm.defs.ts",
  "record": {
    "fields": {
      "id": {
        "type": "uuid",
        "required": true,
        "indexed": true,
        "derived": true,
        "description": "mdmId; stable through promotion and merge."
      },
      "version": {
        "type": "integer",
        "required": true,
        "derived": true,
        "description": "Bumped by the engine on every write; optimistic concurrency."
      },
      "details": {
        "type": "object",
        "required": true,
        "description": "Documento mestre da pessoa que atua como profissional na agenda clínica.",
        "fields": {
          "identification": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "subtype": {
                "type": "enum",
                "required": true,
                "indexed": true,
                "derived": true,
                "values": [
                  {
                    "value": "Person",
                    "title": "Pessoa",
                    "description": "Pessoa física cadastrada no MDM."
                  }
                ],
                "description": "Indica que este registro mestre é uma pessoa.",
                "title": "Subtipo",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "name": {
                "type": "string",
                "required": true,
                "indexed": true,
                "maxLength": 0,
                "description": "Nome pelo qual o médico ou terapeuta é localizado para o agendamento.",
                "title": "Nome",
                "min": 0,
                "max": 0
              },
              "status": {
                "type": "enum",
                "required": true,
                "indexed": true,
                "derived": true,
                "values": [
                  {
                    "value": "Active",
                    "title": "Ativo",
                    "description": "Registro disponível para uso."
                  },
                  {
                    "value": "Inactive",
                    "title": "Inativo",
                    "description": "Registro fora de uso."
                  },
                  {
                    "value": "Merged",
                    "title": "Mesclado",
                    "description": "Registro incorporado a outro registro mestre."
                  },
                  {
                    "value": "Blocked",
                    "title": "Bloqueado",
                    "description": "Registro bloqueado pela plataforma."
                  }
                ],
                "title": "Situação no MDM",
                "description": "Situação de atividade do registro mestre do profissional, controlada pela plataforma.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "docType": {
                "type": "enum",
                "indexed": true,
                "values": [
                  {
                    "value": "SSN",
                    "title": "SSN",
                    "description": "Documento nacional SSN."
                  },
                  {
                    "value": "EIN",
                    "title": "EIN",
                    "description": "Documento EIN."
                  },
                  {
                    "value": "Passport",
                    "title": "Passaporte",
                    "description": "Documento de passaporte."
                  },
                  {
                    "value": "DriversLicense",
                    "title": "Carteira de motorista",
                    "description": "Documento de habilitação."
                  },
                  {
                    "value": "NationalId",
                    "title": "Documento nacional",
                    "description": "Documento nacional de identificação."
                  },
                  {
                    "value": "CPF",
                    "title": "CPF",
                    "description": "Cadastro de Pessoas Físicas."
                  },
                  {
                    "value": "CNPJ",
                    "title": "CNPJ",
                    "description": "Cadastro Nacional da Pessoa Jurídica."
                  },
                  {
                    "value": "VAT",
                    "title": "VAT",
                    "description": "Identificação fiscal VAT."
                  },
                  {
                    "value": "Other",
                    "title": "Outro",
                    "description": "Outro documento aceito pela plataforma."
                  }
                ],
                "title": "Tipo de documento",
                "description": "Tipo do documento nacional usado para deduplicar o profissional quando informado.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "docId": {
                "type": "string",
                "indexed": true,
                "description": "Número do documento nacional do profissional, quando informado.",
                "title": "Número do documento",
                "maxLength": 0,
                "min": 0,
                "max": 0
              },
              "countryCode": {
                "type": "string",
                "required": true,
                "indexed": true,
                "pattern": "^[A-Z]{2}$",
                "maxLength": 0,
                "default": "US",
                "description": "Código ISO do país aplicável ao documento e às regras da pessoa profissional.",
                "title": "País",
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados de identificação da pessoa usados para localizar e manter o profissional."
          },
          "base": {
            "type": "object",
            "owner": "platform",
            "fields": {},
            "description": "Dados comuns da pessoa mantidos pela plataforma; nenhum dado base adicional é usado pela agenda clínica."
          },
          "person": {
            "type": "object",
            "owner": "platform",
            "fields": {
              "occupation": {
                "type": "string",
                "maxLength": 0,
                "title": "Ocupação",
                "description": "Ocupação profissional registrada pela plataforma, quando necessária para identificar a atuação clínica.",
                "min": 0,
                "max": 0
              },
              "privacyConsent": {
                "type": "object",
                "of": "PrivacyConsent",
                "description": "Consentimento de privacidade da pessoa, quando exigido pelas regras aplicáveis.",
                "title": "Consentimento de privacidade",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados próprios de pessoa física relevantes para a atuação do profissional."
          },
          "general": {
            "type": "object",
            "owner": "organization",
            "open": true,
            "description": "Dados promovidos pela organização e apenas lidos pela agenda clínica."
          },
          "agendaClinica": {
            "type": "object",
            "owner": "module",
            "fields": {
              "categoria": {
                "type": "enum",
                "required": true,
                "of": "Address",
                "values": [
                  {
                    "value": "medico",
                    "title": "Médico",
                    "description": "Profissional que atua como médico na clínica."
                  },
                  {
                    "value": "terapeuta",
                    "title": "Terapeuta",
                    "description": "Profissional que atua como terapeuta na clínica."
                  }
                ],
                "title": "Categoria profissional",
                "description": "Indica se o profissional atua na clínica como médico ou terapeuta.",
                "maxLength": 0,
                "min": 0,
                "max": 0
              }
            },
            "description": "Dados exclusivos da agenda clínica sobre a atuação da pessoa como profissional."
          }
        }
      }
    }
  }
} as const satisfies Ns5OntologyEntityV3;

export type AgendaClinicaEntityProfissionalType = typeof agendaClinicaEntityProfissional;

export default agendaClinicaEntityProfissional;
