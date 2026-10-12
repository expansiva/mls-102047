/// <mls fileReference="_102047_/l4/manutencaoFrota/ontology/Abastecimento.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaEntityAbastecimento = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "manutencaoFrota",
  "entityId": "Abastecimento",
  "title": "Abastecimento",
  "description": "Registro de abastecimento de um veículo feito pelo motorista, com data, litros, valor e km no painel.",
  "displayField": "dataAbastecimento",
  "relationships": {
    "veiculo": {
      "relationshipId": "abastecimentoVeiculo",
      "to": "Veiculo",
      "via": "Abastecimento.veiculoId",
      "cardinality": "N:1",
      "title": "Veículo abastecido",
      "description": "Cada abastecimento pertence a um veículo; um veículo tem muitos abastecimentos.",
      "mode": "fk",
      "required": true
    },
    "motorista": {
      "relationshipId": "abastecimentoMotorista",
      "to": "Motorista",
      "via": "Abastecimento.motoristaId",
      "cardinality": "N:1",
      "title": "Motorista que registrou",
      "description": "Cada abastecimento é registrado por um motorista; um motorista registra muitos abastecimentos.",
      "mode": "fk",
      "required": true
    }
  },
  "capabilities": {
    "create": "Grava o novo abastecimento com data, litros, valor e km no painel; usado pelo motorista ao lançar o abastecimento do veículo que dirige.",
    "transaction": "Grava o abastecimento e atualiza a quilometragem atual do veículo numa só operação, tudo ou nada; usado no lançamento feito pelo motorista.",
    "read.byId": "Lê um abastecimento pelo id para conferência ou correção; usado pelo motorista e pelo gestor.",
    "locate.byColumn": "Lista abastecimentos filtrados por veículo, motorista e data, ordenados pela data; o motorista vê só os dos veículos atribuídos a ele e o gestor vê todos.",
    "listByForeignKey": "Lista os abastecimentos de um veículo na tela do veículo, ou de vários veículos de uma vez; usado pelo gestor e pelo motorista.",
    "count": "Conta os abastecimentos de um filtro para o total no cabeçalho da lista; usado pelo gestor.",
    "update": "Corrige litros, valor, data ou km no painel de um abastecimento lançado com erro; usado pelo gestor.",
    "delete": "Remove um abastecimento lançado em duplicidade; usado pelo gestor.",
    "read.mdmRecord": "Lê no cadastro mestre o nome do motorista que registrou cada abastecimento para exibir na lista; usado pelo gestor.",
    "manutencaoFrota.atualizarKmVeiculo": "Ao gravar o abastecimento, leva o km no painel informado para a quilometragem atual do veículo, o que alimenta o aviso de preventiva vencida por km; executado pelo módulo no lançamento do motorista."
  },
  "rules": [
    "motoristaSoVeiculoAtribuido",
    "kmPainelNaoMenorQueAtual",
    "abastecimentoAtualizaKmVeiculo",
    "litrosPositivos",
    "valorAbastecimentoPositivo"
  ],
  "kind": "entity",
  "class": "event",
  "storage": {
    "target": "moduleDatabase",
    "table": "manutencaoFrota_abastecimento",
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
      "veiculoId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Veiculo"
        ],
        "title": "Veículo",
        "description": "Veículo abastecido; deve ser um dos veículos atribuídos ao motorista que registra."
      },
      "motoristaId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Motorista"
        ],
        "title": "Motorista",
        "description": "Motorista que registrou o abastecimento; define o escopo do que cada motorista vê."
      },
      "dataAbastecimento": {
        "type": "date",
        "required": true,
        "indexed": true,
        "title": "Data do abastecimento",
        "description": "Dia em que o veículo foi abastecido; ordena e filtra o histórico de abastecimentos."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Dados do abastecimento",
        "description": "Litros, valor e km no painel informados pelo motorista.",
        "fields": {
          "litros": {
            "type": "number",
            "required": true,
            "title": "Litros",
            "description": "Quantidade de combustível abastecida, em litros.",
            "min": 0.01
          },
          "valor": {
            "type": "money",
            "required": true,
            "title": "Valor",
            "description": "Valor total pago pelo abastecimento.",
            "min": 0.01
          },
          "kmPainel": {
            "type": "integer",
            "required": true,
            "title": "Km no painel",
            "description": "Quilometragem marcada no painel do veículo no momento do abastecimento; passa a ser a quilometragem atual do veículo.",
            "min": 0
          },
          "precoPorLitro": {
            "type": "money",
            "derived": true,
            "title": "Preço por litro",
            "description": "Valor pago no abastecimento dividido pela quantidade de litros abastecidos."
          }
        }
      }
    }
  }
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type ManutencaoFrotaEntityAbastecimentoType = typeof manutencaoFrotaEntityAbastecimento;

export default manutencaoFrotaEntityAbastecimento;
