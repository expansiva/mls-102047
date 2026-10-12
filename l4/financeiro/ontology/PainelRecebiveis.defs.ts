/// <mls fileReference="_102047_/l4/financeiro/ontology/PainelRecebiveis.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const financeiroEntityPainelRecebiveis = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "financeiro",
  "entityId": "PainelRecebiveis",
  "title": "Painel de recebíveis",
  "description": "Totais a receber, recebidos, em aberto e vencidos agrupados por período e por origem, recalculados a partir dos títulos e recebimentos.",
  "displayField": "periodo",
  "relationships": {},
  "capabilities": {
    "aggregate.byWindow": "Resume os títulos a receber e os recebimentos por dia e por origem num agregado contínuo (time_bucket + GROUP BY) declarado na persistência do módulo; alimenta o painel de recebíveis do gerente financeiro.",
    "read.window": "Lê os totais do painel para um período e uma origem, pelas colunas indexadas de período e origem; usado pela tela do painel de recebíveis e pela visão de vencidos do gerente financeiro.",
    "refresh": "Mantém o painel atualizado à medida que títulos são criados e recebimentos e estornos são registrados pelo caixa ou pelo portal do pagador, por política de atualização do agregado; executado pela plataforma, sem ação de pessoa.",
    "rebuild": "Recalcula todo o painel a partir dos títulos e recebimentos numa migração ou publicação do módulo; executado pela plataforma.",
    "resample": "Oferece o mesmo painel por mês, agregado sobre a série diária, para o gerente financeiro comparar períodos mais longos."
  },
  "rules": [
    "painelRecalculadoDeTitulosERecebimentos",
    "recebimentoEstornadoNaoContaComoRecebido",
    "tituloVencidoEmAbertoAposVencimento"
  ],
  "kind": "entity",
  "class": "supporting",
  "storage": {
    "target": "moduleDatabase",
    "table": "financeiro_painelrecebiveis",
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
      "periodo": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "title": "Período",
        "description": "Início da janela (dia) que esta linha resume, calculado a partir do vencimento dos títulos a receber e da data dos recebimentos. É a coluna de tempo da série; o gerente financeiro filtra o painel por ela.",
        "derived": true
      },
      "origem": {
        "type": "string",
        "indexed": true,
        "title": "Origem",
        "description": "Código da origem da cobrança que agrupa a linha — o módulo que gerou o título (comanda do restaurante, mensalidade da academia, ordem de serviço da assistência técnica). Indexado porque o painel é lido por origem.",
        "maxLength": 80,
        "derived": true
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Medidas",
        "description": "Totais e contagens do período e da origem, recalculados a partir dos títulos a receber e dos recebimentos. Ninguém digita nenhum destes valores.",
        "fields": {
          "totalEmitido": {
            "type": "money",
            "required": true,
            "title": "Total emitido",
            "description": "Soma do valor dos títulos a receber com vencimento no período, desta origem.",
            "derived": true
          },
          "totalRecebido": {
            "type": "money",
            "required": true,
            "title": "Total recebido",
            "description": "Soma dos recebimentos efetivados no período para títulos desta origem, incluindo baixas parciais e descontando os estornados.",
            "derived": true
          },
          "totalEstornado": {
            "type": "money",
            "required": true,
            "title": "Total estornado",
            "description": "Soma dos recebimentos estornados no período para títulos desta origem.",
            "derived": true
          },
          "totalEmAberto": {
            "type": "money",
            "required": true,
            "title": "Total em aberto",
            "description": "Saldo ainda não recebido dos títulos desta origem com vencimento no período (valor do título menos o que já foi recebido).",
            "derived": true
          },
          "totalVencido": {
            "type": "money",
            "required": true,
            "title": "Total vencido",
            "description": "Saldo em aberto dos títulos desta origem cujo vencimento já passou.",
            "derived": true
          },
          "quantidadeTitulos": {
            "type": "integer",
            "required": true,
            "title": "Quantidade de títulos",
            "description": "Número de títulos a receber desta origem com vencimento no período.",
            "min": 0,
            "derived": true
          },
          "quantidadeVencidos": {
            "type": "integer",
            "required": true,
            "title": "Quantidade de títulos vencidos",
            "description": "Número de títulos desta origem, com vencimento no período, que estão em aberto e já passaram do vencimento.",
            "min": 0,
            "derived": true
          },
          "quantidadeRecebimentos": {
            "type": "integer",
            "required": true,
            "title": "Quantidade de recebimentos",
            "description": "Número de recebimentos efetivados no período para títulos desta origem, sem contar os estornados.",
            "min": 0,
            "derived": true
          }
        },
        "derived": true
      }
    }
  }
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type FinanceiroEntityPainelRecebiveisType = typeof financeiroEntityPainelRecebiveis;

export default financeiroEntityPainelRecebiveis;
