/// <mls fileReference="_102047_/l4/locacaoEquipamentos/ontology/ContratoLocacao.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosEntityContratoLocacao = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "locacaoEquipamentos",
  "entityId": "ContratoLocacao",
  "title": "Contrato de locação",
  "description": "Contrato de locação de um cliente com período de retirada e devolução prevista; passa a vigente na confirmação e é encerrado na devolução com a data real, os dias de atraso e a multa calculada.",
  "displayField": "numero",
  "relationships": {
    "cliente": {
      "relationshipId": "contratoCliente",
      "to": "Cliente",
      "via": "ContratoLocacao.clienteId",
      "cardinality": "N:1",
      "title": "Cliente do contrato",
      "description": "Cada contrato pertence a um cliente; um cliente pode ter vários contratos.",
      "mode": "fk",
      "required": true
    },
    "itens": {
      "relationshipId": "itemContrato",
      "to": "ItemContrato",
      "via": "ItemContrato.contratoId",
      "cardinality": "1:N",
      "title": "Itens do contrato",
      "description": "Equipamentos incluídos no contrato; um contrato confirmado tem um ou mais itens.",
      "mode": "fk",
      "direction": "to",
      "required": "ao confirmar o contrato"
    },
    "equipamentos": {
      "relationshipId": "equipamentosDoContrato",
      "to": "Equipamento",
      "via": "ItemContrato",
      "cardinality": "N:N",
      "title": "Equipamentos do contrato",
      "description": "Equipamentos locados neste contrato, lidos pelos itens.",
      "mode": "throughTable",
      "path": "ContratoLocacao.id -> ItemContrato.contratoId -> ItemContrato.equipamentoId -> Equipamento.id",
      "derived": true
    }
  },
  "capabilities": {
    "read.byId": "Abre o contrato pelo id para o atendente conferir equipamentos, período e multa na devolução.",
    "locate.byColumn": "Lista contratos por cliente, situação e datas de retirada ou devolução prevista, para o atendente localizar o contrato vigente.",
    "locate.byText": "Busca o contrato pelo número digitado na caixa de pesquisa da devolução.",
    "count": "Conta contratos vigentes e em atraso para os totais exibidos ao atendente e ao gerente.",
    "listByForeignKey": "Lista os contratos de um cliente e, pelos itens, o contrato de um equipamento informado pelo código.",
    "create": "O atendente cria o contrato para o cliente com a data de retirada e a data prevista de devolução.",
    "update": "O atendente ajusta período e observações enquanto o contrato está em elaboração.",
    "transition": "Move o contrato de em elaboração para vigente na confirmação e de vigente para encerrado na devolução, pelo atendente.",
    "uniqueKey": "Recusa um segundo contrato com o mesmo número.",
    "transaction": "Grava a confirmação ou a devolução do contrato junto com a mudança de situação dos equipamentos, tudo ou nada.",
    "read.mdmRecord": "Lê do cadastro mestre o nome e o documento do cliente exibidos no contrato e na lista.",
    "sequence.next": "Emite o número do contrato na criação, que o cliente informa na devolução.",
    "attach.document": "Anexa ao contrato o termo assinado pelo cliente ou fotos dos equipamentos na retirada e na devolução.",
    "comment": "O atendente deixa notas no contrato sobre negociações e ocorrências da locação.",
    "locacaoEquipamentos.calcularMulta": "Calcula, na devolução, os dias de atraso e a multa (diária × dias de atraso × 1,5) para o atendente informar ao cliente."
  },
  "rules": [
    "contratoPeriodoValido",
    "contratoExigeItens",
    "equipamentoSemSobreposicao",
    "devolucaoNaoAnteriorRetirada",
    "multaPorAtraso",
    "numeroContratoSequencial"
  ],
  "kind": "entity",
  "class": "event",
  "storage": {
    "target": "moduleDatabase",
    "table": "locacaoEquipamentos_contratolocacao",
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
      "numero": {
        "type": "string",
        "required": true,
        "unique": true,
        "indexed": true,
        "title": "Número do contrato",
        "description": "Número do contrato informado ao cliente e usado na busca da devolução; emitido pela sequência da plataforma na criação.",
        "maxLength": 30
      },
      "clienteId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Cliente"
        ],
        "title": "Cliente",
        "description": "Cliente que loca os equipamentos; nome e documento são lidos do cadastro mestre."
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "rascunho",
            "title": "Em elaboração",
            "description": "Contrato criado, recebendo itens, ainda não confirmado."
          },
          {
            "value": "vigente",
            "title": "Vigente",
            "description": "Contrato confirmado; os equipamentos estão locados."
          },
          {
            "value": "encerrado",
            "title": "Encerrado",
            "description": "Equipamentos devolvidos, data real registrada."
          }
        ],
        "title": "Situação do contrato",
        "description": "Etapa do contrato: em elaboração enquanto o atendente inclui os equipamentos, vigente após a confirmação e encerrado na devolução."
      },
      "dataRetirada": {
        "type": "date",
        "required": true,
        "indexed": true,
        "title": "Data de retirada",
        "description": "Dia em que o cliente retira os equipamentos; início do período usado para verificar sobreposição."
      },
      "dataPrevistaDevolucao": {
        "type": "date",
        "required": true,
        "indexed": true,
        "title": "Data prevista de devolução",
        "description": "Dia combinado para a devolução; fim do período contratado e base do cálculo de atraso."
      },
      "dataRealDevolucao": {
        "type": "date",
        "indexed": true,
        "title": "Data real de devolução",
        "description": "Dia em que os equipamentos foram efetivamente devolvidos; registrada pelo atendente na devolução."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Informações complementares do contrato.",
        "fields": {
          "observacoes": {
            "type": "text",
            "title": "Observações",
            "description": "Anotações do atendente sobre a locação, como condições combinadas na retirada."
          },
          "observacoesDevolucao": {
            "type": "text",
            "title": "Observações da devolução",
            "description": "Anotações registradas no momento da devolução, como o estado em que os equipamentos voltaram."
          },
          "diasContratados": {
            "type": "integer",
            "derived": true,
            "title": "Dias contratados",
            "description": "Quantidade de diárias entre a data de retirada e a data prevista de devolução."
          },
          "valorPrevisto": {
            "type": "money",
            "derived": true,
            "title": "Valor previsto da locação",
            "description": "Soma, para cada equipamento do contrato, do valor da diária multiplicado pelos dias contratados."
          },
          "diasAtraso": {
            "type": "integer",
            "derived": true,
            "title": "Dias de atraso",
            "description": "Dias entre a data prevista de devolução e a data real de devolução quando a devolução foi posterior à prevista; zero quando devolvido no prazo."
          },
          "valorMulta": {
            "type": "money",
            "derived": true,
            "title": "Multa por atraso",
            "description": "Soma das diárias dos equipamentos do contrato multiplicada pelos dias de atraso e por 1,5; zero quando não houve atraso."
          },
          "atrasado": {
            "type": "boolean",
            "derived": true,
            "title": "Em atraso",
            "description": "Contrato vigente cuja data prevista de devolução já passou sem que a devolução tenha sido registrada."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "numero"
    ]
  ],
  "lifecycleStates": [
    {
      "state": "rascunho",
      "reachedBy": "actor"
    },
    {
      "state": "vigente",
      "reachedBy": "actor"
    },
    {
      "state": "encerrado",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "ativarContrato",
      "from": [
        "rascunho"
      ],
      "to": "vigente",
      "by": [
        "atendente"
      ],
      "description": "O atendente confirma o contrato com ao menos um equipamento; o contrato passa a vigente e os equipamentos passam a locados.",
      "payload": [],
      "ruleRefs": [
        "contratoExigeItens",
        "equipamentoSemSobreposicao",
        "contratoPeriodoValido"
      ]
    },
    {
      "transitionId": "registrarDevolucao",
      "from": [
        "vigente"
      ],
      "to": "encerrado",
      "by": [
        "atendente"
      ],
      "description": "O atendente informa a data real de devolução; o sistema calcula os dias de atraso e a multa, e os equipamentos voltam a ficar disponíveis.",
      "payload": [
        "dataRealDevolucao",
        "details.observacoesDevolucao"
      ],
      "ruleRefs": [
        "devolucaoNaoAnteriorRetirada",
        "multaPorAtraso"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type LocacaoEquipamentosEntityContratoLocacaoType = typeof locacaoEquipamentosEntityContratoLocacao;

export default locacaoEquipamentosEntityContratoLocacao;
