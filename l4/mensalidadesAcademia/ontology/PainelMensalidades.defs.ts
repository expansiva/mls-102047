/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/PainelMensalidades.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityPainelMensalidades = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "mensalidadesAcademia",
  "entityId": "PainelMensalidades",
  "title": "Painel de mensalidades",
  "description": "Painel da gerência recalculado por competência: total a receber no mês, total recebido, quantidade de alunos ativos, bloqueados e inadimplentes.",
  "displayField": "competencia",
  "relationships": {},
  "capabilities": {
    "aggregate.byWindow": "Resume as mensalidades, os pagamentos e as matrículas por competência mensal (agregado contínuo com time_bucket mensal), gerando os totais e as quantidades que a gerência acompanha no painel.",
    "read.window": "Lê os indicadores de uma competência ou de um intervalo de meses pela coluna indexada competencia; usado pela gerência ao abrir o painel de mensalidades.",
    "refresh": "Mantém o painel atualizado conforme a gerência gera mensalidades e a recepção registra pagamentos, por política de atualização do agregado executada pela plataforma.",
    "rebuild": "Recalcula todo o painel a partir das mensalidades, pagamentos e matrículas numa migração ou publicação do módulo.",
    "retain": "Descarta competências antigas que a gerência não consulta mais, para o painel não crescer indefinidamente.",
    "backfill": "Preenche os indicadores de competências já passadas quando o painel é ativado depois de as mensalidades existirem; usado pela gerência para ver o histórico."
  },
  "rules": [
    "mensalidadeVencidaAposVencimento",
    "alunoBloqueadoComDuasVencidas",
    "alunoInadimplenteComMensalidadeVencida",
    "matriculaCanceladaEncerraGeracao"
  ],
  "kind": "entity",
  "class": "supporting",
  "storage": {
    "target": "moduleDatabase",
    "table": "mensalidadesAcademia_painelmensalidades",
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
      "competencia": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "title": "Competência",
        "description": "Início do mês de competência que esta linha resume. É a janela mensal do painel: a gerência escolhe o mês e o painel mostra os números daquela competência.",
        "derived": true
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Indicadores do mês",
        "description": "Indicadores recalculados a partir das mensalidades, pagamentos e matrículas da competência. Ninguém digita estes valores.",
        "fields": {
          "totalAReceber": {
            "type": "money",
            "required": true,
            "title": "Total a receber no mês",
            "description": "Soma dos valores das mensalidades geradas para a competência que ainda não foram quitadas.",
            "min": 0,
            "derived": true
          },
          "totalRecebido": {
            "type": "money",
            "required": true,
            "title": "Total recebido no mês",
            "description": "Soma dos pagamentos registrados pela recepção para mensalidades da competência.",
            "min": 0,
            "derived": true
          },
          "totalGerado": {
            "type": "money",
            "required": true,
            "title": "Total gerado no mês",
            "description": "Soma dos valores de todas as mensalidades geradas pela gerência para a competência, pagas ou não.",
            "min": 0,
            "derived": true
          },
          "quantidadeMensalidades": {
            "type": "integer",
            "required": true,
            "title": "Mensalidades geradas",
            "description": "Quantidade de mensalidades geradas para a competência, uma por aluno ativo.",
            "min": 0,
            "derived": true
          },
          "quantidadeMensalidadesVencidas": {
            "type": "integer",
            "required": true,
            "title": "Mensalidades vencidas",
            "description": "Quantidade de mensalidades da competência em aberto e com vencimento anterior à data do cálculo.",
            "min": 0,
            "derived": true
          },
          "alunosAtivos": {
            "type": "integer",
            "required": true,
            "title": "Alunos ativos",
            "description": "Quantidade de alunos com matrícula ativa (não cancelada) na competência.",
            "min": 0,
            "derived": true
          },
          "alunosBloqueados": {
            "type": "integer",
            "required": true,
            "title": "Alunos bloqueados",
            "description": "Quantidade de alunos com duas ou mais mensalidades vencidas, que não podem entrar na academia até regularizar.",
            "min": 0,
            "derived": true
          },
          "alunosInadimplentes": {
            "type": "integer",
            "required": true,
            "title": "Alunos inadimplentes",
            "description": "Quantidade de alunos com pelo menos uma mensalidade vencida e não paga.",
            "min": 0,
            "derived": true
          }
        },
        "derived": true
      }
    }
  }
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type MensalidadesAcademiaEntityPainelMensalidadesType = typeof mensalidadesAcademiaEntityPainelMensalidades;

export default mensalidadesAcademiaEntityPainelMensalidades;
