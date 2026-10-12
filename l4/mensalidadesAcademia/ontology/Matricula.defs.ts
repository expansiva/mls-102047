/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Matricula.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityMatricula = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Matricula",
  "title": "Matrícula",
  "description": "Vínculo do aluno com um plano a partir de uma data de início. Pode estar ativa, bloqueada por mensalidades vencidas ou cancelada; o cancelamento encerra a geração de mensalidades futuras.",
  "displayField": "dataInicio",
  "relationships": {
    "aluno": {
      "relationshipId": "matriculaAluno",
      "to": "Aluno",
      "via": "Matricula.alunoId",
      "cardinality": "N:1",
      "title": "Aluno da matrícula",
      "description": "Cada matrícula pertence a um aluno.",
      "mode": "fk",
      "required": true
    },
    "plano": {
      "relationshipId": "matriculaPlano",
      "to": "Plano",
      "via": "Matricula.planoId",
      "cardinality": "N:1",
      "title": "Plano da matrícula",
      "description": "Cada matrícula é feita em um plano.",
      "mode": "fk",
      "required": true
    },
    "mensalidades": {
      "relationshipId": "mensalidadeMatricula",
      "to": "Mensalidade",
      "via": "Mensalidade.matriculaId",
      "cardinality": "1:N",
      "title": "Mensalidades da matrícula",
      "description": "Mensalidades geradas a partir desta matrícula.",
      "mode": "fk",
      "direction": "to",
      "required": true
    }
  },
  "capabilities": {
    "read.byId": "Abre a matrícula pelo id para a recepção ver plano, data de início, situação e mensalidades vencidas.",
    "locate.byColumn": "Lista matrículas filtradas por situação, aluno, plano ou data de início; a gerência confere as ativas antes de gerar as mensalidades do mês.",
    "count": "Conta as matrículas ativas para o cabeçalho da lista da gerência e o painel.",
    "listByForeignKey": "Lista as matrículas de um aluno ou de um plano pela chave estrangeira, usado pela recepção ao verificar a entrada do aluno.",
    "create": "A recepção registra a matrícula do aluno no plano escolhido, com a data de início, já ativa.",
    "update": "A recepção corrige observações e dados complementares da matrícula.",
    "transition": "A recepção cancela a matrícula a pedido do aluno, passando de ativa para cancelada e encerrando mensalidades futuras.",
    "transaction": "Cria a matrícula junto com o vínculo do aluno (cadastro ou anexação do papel) numa única operação.",
    "read.mdmRecord": "Lê do cadastro mestre o nome e o documento do aluno exibidos nas listas e na verificação de entrada.",
    "comment": "Recepção e gerência deixam notas sobre a matrícula, como acordos de regularização.",
    "statusHistory.read": "Mostra quando a matrícula foi cancelada e por quem, na ficha da matrícula.",
    "audit": "Registra quem criou, alterou ou cancelou a matrícula, para consulta da gerência.",
    "mensalidadesAcademia.verificarEntrada": "Informa à recepção, na chegada do aluno, se a matrícula está liberada ou bloqueada e quantas mensalidades estão vencidas."
  },
  "rules": [
    "umaMatriculaAtivaPorAluno",
    "matriculaDataInicioObrigatoria",
    "cancelamentoEncerraMensalidadesFuturas",
    "mensalidadeVencidaAposVencimento",
    "alunoBloqueadoDuasVencidas",
    "alunoBloqueadoNaoEntra"
  ],
  "kind": "entity",
  "class": "core",
  "storage": {
    "target": "moduleDatabase",
    "table": "mensalidadesAcademia_matricula",
    "kind": "relational"
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
      "alunoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Aluno"
        ],
        "title": "Aluno",
        "description": "Aluno matriculado. Nome e documento são lidos do cadastro mestre do aluno."
      },
      "planoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Plano"
        ],
        "title": "Plano",
        "description": "Plano em que o aluno foi matriculado; dele vêm o valor e o dia de vencimento das mensalidades."
      },
      "dataInicio": {
        "type": "date",
        "required": true,
        "indexed": true,
        "title": "Data de início",
        "description": "Data a partir da qual a matrícula vale e passa a receber mensalidades."
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "ativa",
            "title": "Ativa"
          },
          {
            "value": "cancelada",
            "title": "Cancelada"
          }
        ],
        "title": "Situação",
        "description": "Situação da matrícula registrada pela recepção: ativa recebe mensalidades; cancelada não recebe mais mensalidades futuras."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Dados complementares da matrícula.",
        "fields": {
          "dataCancelamento": {
            "type": "date",
            "title": "Data de cancelamento",
            "description": "Data em que o aluno cancelou a matrícula; a partir dela não são geradas novas mensalidades."
          },
          "motivoCancelamento": {
            "type": "text",
            "title": "Motivo do cancelamento",
            "description": "Motivo informado pelo aluno ao cancelar a matrícula.",
            "maxLength": 500
          },
          "observacoes": {
            "type": "text",
            "title": "Observações",
            "description": "Anotações da recepção sobre a matrícula.",
            "maxLength": 1000
          },
          "quantidadeMensalidadesVencidas": {
            "type": "integer",
            "derived": true,
            "title": "Mensalidades vencidas",
            "description": "Quantidade de mensalidades desta matrícula que estão em aberto e com vencimento anterior a hoje."
          },
          "bloqueada": {
            "type": "boolean",
            "derived": true,
            "title": "Bloqueada",
            "description": "Verdadeiro quando o aluno tem duas ou mais mensalidades vencidas; fica bloqueado e não pode entrar até regularizar os pagamentos."
          },
          "inadimplente": {
            "type": "boolean",
            "derived": true,
            "title": "Inadimplente",
            "description": "Verdadeiro quando a matrícula tem ao menos uma mensalidade vencida e não paga."
          },
          "liberadaParaEntrada": {
            "type": "boolean",
            "derived": true,
            "title": "Liberada para entrada",
            "description": "Verdadeiro quando a matrícula está ativa e o aluno não está bloqueado por mensalidades vencidas."
          }
        }
      }
    }
  },
  "lifecycleStates": [
    {
      "state": "ativa",
      "reachedBy": "actor"
    },
    {
      "state": "cancelada",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "cancelarMatricula",
      "from": [
        "ativa"
      ],
      "to": "cancelada",
      "by": [
        "recepcao"
      ],
      "description": "A recepção registra o cancelamento pedido pelo aluno, encerrando a geração de mensalidades futuras.",
      "payload": [
        "details.dataCancelamento",
        "details.motivoCancelamento"
      ],
      "ruleRefs": [
        "cancelamentoEncerraMensalidadesFuturas"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type MensalidadesAcademiaEntityMatriculaType = typeof mensalidadesAcademiaEntityMatricula;

export default mensalidadesAcademiaEntityMatricula;
