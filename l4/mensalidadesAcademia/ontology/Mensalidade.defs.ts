/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Mensalidade.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityMensalidade = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Mensalidade",
  "title": "Mensalidade",
  "description": "Cobrança mensal de uma matrícula ativa para uma competência, com valor do plano e vencimento no dia do plano; única por matrícula e competência. Vencida é derivada: em aberto e com vencimento anterior a hoje.",
  "displayField": "competencia",
  "relationships": {
    "matricula": {
      "relationshipId": "mensalidadeMatricula",
      "to": "Matricula",
      "via": "Mensalidade.matriculaId",
      "cardinality": "N:1",
      "title": "Matrícula da mensalidade",
      "description": "Cada mensalidade pertence a uma matrícula ativa, uma por competência.",
      "mode": "fk",
      "required": true
    },
    "pagamentos": {
      "relationshipId": "pagamentoMensalidade",
      "to": "Pagamento",
      "via": "Pagamento.mensalidadeId",
      "cardinality": "1:N",
      "title": "Pagamentos da mensalidade",
      "description": "Pagamentos registrados pela recepção que quitam esta mensalidade.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "aluno": {
      "relationshipId": "alunoMensalidades",
      "to": "Aluno",
      "via": "Matricula",
      "cardinality": "N:1",
      "title": "Aluno da mensalidade",
      "description": "Aluno alcançado pela matrícula; usado para verificar vencidas e bloqueio.",
      "mode": "throughTable",
      "path": "Aluno <- Matricula.alunoId <- Mensalidade.matriculaId",
      "derived": true,
      "direction": "to"
    }
  },
  "capabilities": {
    "read.byId": "Abre uma mensalidade pelo id para a recepção conferir competência, valor, vencimento e situação antes de lançar o pagamento.",
    "locate.byColumn": "Lista mensalidades filtradas por competência, matrícula ou vencimento, ordenadas por vencimento; usada pela gerência para conferir as geradas no mês e listar as vencidas, e pela recepção para achar as em aberto do aluno.",
    "count": "Conta as mensalidades de uma competência ou vencidas para os totais das listas da gerência.",
    "listByForeignKey": "Lista as mensalidades de uma ou várias matrículas de uma vez (findManyByValues), para a recepção ver as cobranças do aluno e para verificar o bloqueio.",
    "create": "Grava as mensalidades da competência, uma por matrícula ativa, com valor do plano e vencimento no dia do plano; executada pela gerência na geração do mês.",
    "update": "Corrige a observação de uma mensalidade; usada pela gerência.",
    "uniqueKey": "Recusa uma segunda mensalidade para a mesma matrícula e competência, garantindo que a geração do mês não duplique cobranças.",
    "transaction": "Grava todas as mensalidades da geração do mês de uma vez, tudo ou nada, quando a gerência gera a competência.",
    "read.mdmRecord": "Lê o registro mestre do aluno por trás da matrícula para mostrar o nome nas listas de mensalidades da recepção e da gerência.",
    "comment": "Permite à recepção e à gerência deixar notas sobre uma cobrança, como acordos de pagamento.",
    "mensalidadesAcademia.gerarMensalidadesDoMes": "Gera, para a competência informada pela gerência, uma mensalidade por matrícula ativa com o valor do plano e vencimento no dia do plano, ignorando as já geradas e as matrículas canceladas."
  },
  "rules": [
    "mensalidadeUnicaPorMatriculaCompetencia",
    "mensalidadeSomenteMatriculaAtiva",
    "mensalidadeValorDoPlano",
    "mensalidadeVencimentoNoDiaDoPlano",
    "mensalidadePagaQuandoQuitada",
    "mensalidadeVencidaAposVencimento",
    "alunoBloqueadoComDuasVencidas",
    "matriculaCanceladaNaoGeraMensalidade"
  ],
  "kind": "entity",
  "class": "event",
  "storage": {
    "target": "moduleDatabase",
    "table": "mensalidadesAcademia_mensalidade",
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
      "matriculaId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Matricula"
        ],
        "title": "Matrícula",
        "description": "Matrícula ativa para a qual a mensalidade foi gerada; por ela se chega ao aluno e ao plano."
      },
      "competencia": {
        "type": "string",
        "required": true,
        "indexed": true,
        "title": "Competência",
        "description": "Mês de referência da cobrança no formato AAAA-MM; usado para listar as mensalidades do mês e impedir duplicidade.",
        "pattern": "^\\d{4}-(0[1-9]|1[0-2])$",
        "maxLength": 7
      },
      "vencimento": {
        "type": "date",
        "required": true,
        "indexed": true,
        "title": "Vencimento",
        "description": "Data de vencimento da mensalidade, no dia de vencimento do plano dentro da competência; usada para ordenar e identificar as vencidas."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Dados da cobrança que não são filtrados.",
        "fields": {
          "valor": {
            "type": "money",
            "required": true,
            "title": "Valor",
            "description": "Valor cobrado, copiado do valor do plano da matrícula no momento da geração.",
            "min": 0
          },
          "geradaEm": {
            "type": "timestamp",
            "required": true,
            "title": "Gerada em",
            "description": "Momento em que a gerência gerou a mensalidade na geração do mês."
          },
          "observacao": {
            "type": "text",
            "title": "Observação",
            "description": "Anotação livre sobre a cobrança, quando necessário.",
            "maxLength": 1000
          },
          "totalPago": {
            "type": "money",
            "derived": true,
            "title": "Total pago",
            "description": "Soma dos valores dos pagamentos registrados pela recepção para esta mensalidade."
          },
          "paga": {
            "type": "boolean",
            "derived": true,
            "title": "Paga",
            "description": "Verdadeiro quando a soma dos pagamentos desta mensalidade alcança o valor cobrado."
          },
          "vencida": {
            "type": "boolean",
            "derived": true,
            "title": "Vencida",
            "description": "Em aberto (não paga) e com vencimento anterior a hoje."
          },
          "situacao": {
            "type": "enum",
            "derived": true,
            "title": "Situação",
            "description": "Paga quando quitada pelos pagamentos; vencida quando em aberto e com vencimento anterior a hoje; caso contrário, em aberto."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "matriculaId",
      "competencia"
    ]
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type MensalidadesAcademiaEntityMensalidadeType = typeof mensalidadesAcademiaEntityMensalidade;

export default mensalidadesAcademiaEntityMensalidade;
