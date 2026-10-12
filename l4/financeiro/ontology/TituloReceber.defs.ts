/// <mls fileReference="_102047_/l4/financeiro/ontology/TituloReceber.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const financeiroEntityTituloReceber = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "financeiro",
  "entityId": "TituloReceber",
  "title": "Título a receber",
  "description": "Cobrança nascida em outro módulo (comanda fechada, mensalidade gerada, ordem de serviço entregue) com pagador, valor, vencimento e origem. O saldo em aberto, a quitação e o vencimento são derivados dos recebimentos.",
  "displayField": "numero",
  "relationships": {
    "pagador": {
      "relationshipId": "tituloPagador",
      "to": "Pagador",
      "via": "TituloReceber.pagadorId",
      "cardinality": "N:1",
      "title": "Pagador do título",
      "description": "Cada título pertence a um pagador; o portal mostra ao pagador apenas os títulos ligados a ele.",
      "mode": "fk",
      "required": true
    },
    "recebimentos": {
      "relationshipId": "recebimentoTitulo",
      "to": "Recebimento",
      "via": "Recebimento.tituloId",
      "cardinality": "1:N",
      "title": "Recebimentos do título",
      "description": "Recebimentos totais ou parciais (e seus estornos) que baixam o saldo do título.",
      "mode": "fk",
      "direction": "to",
      "required": true
    }
  },
  "capabilities": {
    "create": "Registra o título quando a comanda fechada, a mensalidade gerada ou a ordem de serviço entregue chega do módulo de origem (entrada automática, upsert pela origem e referência).",
    "sequence.next": "Emite o número do título na entrada, pela sequência financeiro.TituloReceber da plataforma, para o caixa, o gerente e o pagador citarem.",
    "uniqueKey": "Recusa um segundo título com o mesmo número e uma segunda entrada da mesma cobrança (origem + referência na origem).",
    "read.byId": "Abre o título para o caixa conferir antes de receber, para o gerente detalhar um vencido e para o pagador conferir antes de pagar.",
    "locate.byColumn": "Lista títulos filtrados por pagador, origem, emissão e vencimento, ordenados por vencimento; usado pelo caixa, pelo gerente na busca de vencidos e pelo pagador no portal (escopo próprio pelo pagador).",
    "locate.byText": "Encontra o título pelo número digitado na busca do caixa.",
    "count": "Conta os títulos do filtro para o cabeçalho das listas e o indicador de vencidos do gerente.",
    "listByForeignKey": "Lista os títulos de um pagador para o extrato do gerente e o portal do pagador, e os recebimentos de cada título de uma vez.",
    "read.mdmRecord": "Lê o nome e o documento do pagador no cadastro mestre para exibir na lista do caixa, no extrato e no detalhe do título.",
    "update": "Atualiza descrição, vencimento ou observações quando o módulo de origem reenvia a cobrança antes de qualquer recebimento.",
    "comment": "Permite ao caixa e ao gerente deixar notas de cobrança no título.",
    "financeiro.extratoPagador": "Monta o extrato de um pagador no período, com títulos, recebimentos, estornos e saldo, para o gerente financeiro ver, imprimir ou baixar.",
    "financeiro.titulosVencidos": "Lista os títulos com saldo em aberto e vencimento anterior a hoje para o gerente financeiro acompanhar."
  },
  "rules": [
    "tituloOrigemUnica",
    "tituloValorPositivo",
    "tituloNumeroPorSequencia",
    "pagadorVeSoPropriosTitulos",
    "recebimentoNaoExcedeSaldo",
    "tituloQuitadoNaoRecebe",
    "tituloComRecebimentoNaoAltera"
  ],
  "writer": "inbound",
  "kind": "entity",
  "class": "core",
  "storage": {
    "target": "moduleDatabase",
    "table": "financeiro_tituloreceber",
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
        "title": "Número do título",
        "description": "Número que o caixa, o gerente e o pagador citam para localizar o título; emitido pela sequência da plataforma na entrada do título.",
        "maxLength": 20
      },
      "pagadorId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Pagador"
        ],
        "title": "Pagador",
        "description": "Pessoa que deve o título; caminho do escopo 'próprios títulos' no portal e chave do extrato por pagador."
      },
      "origem": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "restaurante",
            "title": "Restaurante (comanda fechada)"
          },
          {
            "value": "academia",
            "title": "Academia (mensalidade gerada)"
          },
          {
            "value": "assistenciaTecnica",
            "title": "Assistência técnica (ordem de serviço entregue)"
          }
        ],
        "title": "Origem",
        "description": "Módulo onde a cobrança nasceu; usada para filtrar e agrupar o painel de recebíveis por origem."
      },
      "origemReferenciaId": {
        "type": "string",
        "required": true,
        "indexed": true,
        "title": "Referência na origem",
        "description": "Identificador da comanda, mensalidade ou ordem de serviço no módulo de origem; junto com a origem impede que a mesma cobrança entre duas vezes.",
        "maxLength": 80
      },
      "emissao": {
        "type": "date",
        "required": true,
        "indexed": true,
        "title": "Data de emissão",
        "description": "Data em que a cobrança chegou ao financeiro; usada para recortar o painel e o extrato por período."
      },
      "vencimento": {
        "type": "date",
        "required": true,
        "indexed": true,
        "title": "Vencimento",
        "description": "Data limite de pagamento; filtrada para localizar títulos vencidos e ordenar a fila do caixa."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Detalhes",
        "description": "Dados do título que são exibidos mas não filtrados.",
        "fields": {
          "valor": {
            "type": "money",
            "required": true,
            "title": "Valor do título",
            "description": "Valor total cobrado, como informado pelo módulo de origem.",
            "min": 0.01
          },
          "descricao": {
            "type": "string",
            "required": true,
            "title": "Descrição",
            "description": "Texto da cobrança exibido ao caixa, no extrato e no portal, por exemplo 'Mensalidade outubro/2026' ou 'Comanda mesa 12'.",
            "maxLength": 200
          },
          "rotuloOrigem": {
            "type": "string",
            "title": "Rótulo da origem",
            "description": "Número legível do documento de origem (número da comanda, da OS ou da mensalidade) para conferência pelo caixa e pelo pagador.",
            "maxLength": 80
          },
          "observacoes": {
            "type": "text",
            "title": "Observações",
            "description": "Informações adicionais enviadas pelo módulo de origem sobre a cobrança."
          },
          "valorRecebido": {
            "type": "money",
            "derived": true,
            "title": "Valor recebido",
            "description": "Soma dos recebimentos deste título que não foram estornados."
          },
          "saldoAberto": {
            "type": "money",
            "derived": true,
            "title": "Saldo em aberto",
            "description": "Valor do título menos a soma dos recebimentos não estornados deste título."
          },
          "quitado": {
            "type": "boolean",
            "derived": true,
            "title": "Quitado",
            "description": "Verdadeiro quando os recebimentos não estornados somam o valor do título, deixando o saldo em zero."
          },
          "recebidoParcialmente": {
            "type": "boolean",
            "derived": true,
            "title": "Recebido parcialmente",
            "description": "Há ao menos um recebimento não estornado, mas o saldo em aberto ainda é maior que zero."
          },
          "vencido": {
            "type": "boolean",
            "derived": true,
            "title": "Vencido",
            "description": "Ainda tem saldo em aberto e o vencimento é anterior a hoje."
          },
          "diasEmAtraso": {
            "type": "integer",
            "derived": true,
            "title": "Dias em atraso",
            "description": "Quantidade de dias entre o vencimento e hoje, quando o título está vencido; zero nos demais casos."
          }
        }
      }
    }
  }
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type FinanceiroEntityTituloReceberType = typeof financeiroEntityTituloReceber;

export default financeiroEntityTituloReceber;
