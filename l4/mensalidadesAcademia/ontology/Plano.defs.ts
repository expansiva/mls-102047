/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Plano.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityPlano = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Plano",
  "title": "Plano",
  "description": "Plano da academia com periodicidade (mensal, trimestral ou anual), valor e dia de vencimento das mensalidades.",
  "displayField": "nome",
  "relationships": {
    "matriculas": {
      "relationshipId": "matriculaPlano",
      "to": "Matricula",
      "via": "Matricula.planoId",
      "cardinality": "1:N",
      "title": "Matrículas no plano",
      "description": "Matrículas feitas neste plano; cada uma usa o valor e o dia de vencimento do plano para gerar as mensalidades.",
      "mode": "fk",
      "direction": "to",
      "required": true
    }
  },
  "capabilities": {
    "read.byId": "Lê um plano pelo id, quando a gerência abre o plano para ajustar ou quando a matrícula exibe o plano escolhido.",
    "locate.byColumn": "Lista os planos filtrando por periodicidade e ordenando por nome, usado pela gerência ao consultar os planos e pela recepção ao escolher o plano do aluno.",
    "locate.byText": "Procura planos pelo trecho do nome digitado na caixa de busca da gerência e da recepção.",
    "count": "Conta os planos cadastrados para o cabeçalho da lista de planos da gerência.",
    "create": "Cria um plano com nome, periodicidade, valor e dia de vencimento; usado pela gerência no cadastro de planos.",
    "update": "Altera o valor, o dia de vencimento ou a descrição de um plano existente; usado pela gerência, valendo para as mensalidades geradas depois da alteração.",
    "uniqueKey": "Recusa um segundo plano com o mesmo nome, pelo índice único da coluna nome, aplicado pelo motor na gravação.",
    "comment": "Permite à gerência deixar observações internas sobre o plano, como motivo de um reajuste de valor."
  },
  "rules": [
    "planoNomeUnico",
    "planoValorPositivo",
    "planoDiaVencimentoValido",
    "planoAlteracaoNaoAfetaMensalidadesGeradas"
  ],
  "kind": "entity",
  "class": "supporting",
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
        "title": "Nome do plano",
        "description": "Nome pelo qual a gerência e a recepção identificam o plano (ex.: Mensal, Trimestral, Anual). A busca e a escolha do plano são feitas por ele.",
        "maxLength": 80
      },
      "periodicidade": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "monthly",
            "title": "Mensal"
          },
          {
            "value": "quarterly",
            "title": "Trimestral"
          },
          {
            "value": "annual",
            "title": "Anual"
          }
        ],
        "title": "Periodicidade",
        "description": "Período coberto pelo plano. A recepção filtra os planos por ela ao matricular o aluno."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Dados do plano",
        "description": "Valor e dia de vencimento usados na geração das mensalidades dos alunos matriculados neste plano.",
        "fields": {
          "valor": {
            "type": "money",
            "required": true,
            "title": "Valor",
            "description": "Valor cobrado em cada mensalidade gerada para os alunos matriculados neste plano.",
            "min": 0.01
          },
          "diaVencimento": {
            "type": "integer",
            "required": true,
            "title": "Dia de vencimento",
            "description": "Dia do mês em que vencem as mensalidades geradas para este plano; em meses mais curtos vale o último dia do mês.",
            "min": 1,
            "max": 31
          },
          "descricao": {
            "type": "text",
            "title": "Descrição",
            "description": "Observações da gerência sobre o plano, exibidas à recepção na escolha do plano.",
            "maxLength": 500
          },
          "matriculasAtivas": {
            "type": "integer",
            "derived": true,
            "title": "Matrículas ativas",
            "description": "Quantidade de matrículas ativas feitas neste plano, contando as matrículas não canceladas que apontam para ele."
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
