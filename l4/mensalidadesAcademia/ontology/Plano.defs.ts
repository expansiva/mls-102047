/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Plano.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityPlano = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Plano",
  "title": "Plano",
  "description": "Plano oferecido pela academia (mensal, trimestral ou anual) com valor e dia de vencimento.",
  "displayField": "nome",
  "relationships": {
    "matriculas": {
      "relationshipId": "matriculaPlano",
      "to": "Matricula",
      "via": "Matricula.planoId",
      "cardinality": "1:N",
      "title": "Matrículas do plano",
      "description": "Matrículas feitas neste plano.",
      "mode": "fk",
      "direction": "to",
      "required": true
    }
  },
  "capabilities": {
    "create": "A gerência cadastra um plano com nome, periodicidade, valor e dia de vencimento.",
    "read.byId": "Lê um plano pelo id ao exibir a matrícula ou ao gerar a mensalidade com o valor e o vencimento do plano.",
    "locate.byColumn": "Lista planos por periodicidade e situação ativa; usada pela gerência e pela recepção ao escolher o plano da matrícula.",
    "locate.byText": "Busca planos pelo nome para a gerência evitar duplicidade antes de cadastrar.",
    "count": "Conta os planos que um filtro encontra, para o cabeçalho das listagens da gerência.",
    "update": "A gerência altera valor, dia de vencimento, descrição ou desativa o plano.",
    "uniqueKey": "Impede dois planos com o mesmo nome, por índice único na coluna nome.",
    "listByForeignKey": "Lista as matrículas que apontam para o plano, pela chave planoId da matrícula, na tela do plano.",
    "comment": "A gerência deixa observações internas sobre o plano."
  },
  "rules": [
    "planoValorPositivo",
    "planoDiaVencimentoValido",
    "planoNomeUnico",
    "planoInativoNaoMatricula"
  ],
  "kind": "entity",
  "class": "core",
  "storage": {
    "target": "moduleDatabase",
    "table": "mensalidadesAcademia_plano",
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
      "nome": {
        "type": "string",
        "required": true,
        "unique": true,
        "indexed": true,
        "title": "Nome",
        "description": "Nome do plano oferecido pela academia, usado para localizar e evitar duplicidade.",
        "maxLength": 80
      },
      "periodicidade": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "mensal",
            "title": "Mensal"
          },
          {
            "value": "trimestral",
            "title": "Trimestral"
          },
          {
            "value": "anual",
            "title": "Anual"
          }
        ],
        "title": "Periodicidade",
        "description": "Periodicidade de cobrança do plano."
      },
      "ativo": {
        "type": "boolean",
        "required": true,
        "indexed": true,
        "title": "Ativo",
        "description": "Indica se o plano está disponível para novas matrículas."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Demais dados do plano.",
        "fields": {
          "valor": {
            "type": "money",
            "required": true,
            "title": "Valor",
            "description": "Valor do plano cobrado em cada mensalidade gerada.",
            "min": 0
          },
          "diaVencimento": {
            "type": "integer",
            "required": true,
            "title": "Dia de vencimento",
            "description": "Dia do mês em que vence a mensalidade deste plano.",
            "min": 1,
            "max": 28
          },
          "descricao": {
            "type": "text",
            "title": "Descrição",
            "description": "Observações livres sobre o plano."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "nome"
    ]
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type MensalidadesAcademiaEntityPlanoType = typeof mensalidadesAcademiaEntityPlano;

export default mensalidadesAcademiaEntityPlano;
