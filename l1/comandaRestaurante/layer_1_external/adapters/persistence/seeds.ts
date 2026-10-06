/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>
import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const seedPlan = {
  "phase": "plan",
  "scenarios": [
    {
      "scenarioId": "abrirComanda",
      "tableId": "comanda",
      "source": "journey:abrirComanda",
      "constraints": [
        "ref:mesaId:Mesa",
        "state:open",
        "uniqueKeys:number"
      ],
      "refs": [
        {
          "field": "mesaId",
          "relationshipId": "comandaMesa",
          "entityId": "Mesa"
        }
      ],
      "states": [
        "open"
      ],
      "entityId": "Comanda",
      "stateField": "status"
    },
    {
      "scenarioId": "cancelarItemComanda",
      "tableId": "comanda",
      "source": "journey:cancelarItemComanda",
      "constraints": [
        "ref:mesaId:Mesa",
        "uniqueKeys:number"
      ],
      "refs": [
        {
          "field": "mesaId",
          "relationshipId": "comandaMesa",
          "entityId": "Mesa"
        }
      ],
      "states": [],
      "entityId": "Comanda",
      "stateField": "status"
    },
    {
      "scenarioId": "fecharComanda",
      "tableId": "comanda",
      "source": "journey:fecharComanda",
      "constraints": [
        "ref:mesaId:Mesa",
        "state:closed",
        "uniqueKeys:number"
      ],
      "refs": [
        {
          "field": "mesaId",
          "relationshipId": "comandaMesa",
          "entityId": "Mesa"
        }
      ],
      "states": [
        "closed"
      ],
      "entityId": "Comanda",
      "stateField": "status"
    },
    {
      "scenarioId": "lancarItemComanda",
      "tableId": "comanda",
      "source": "journey:lancarItemComanda",
      "constraints": [
        "ref:mesaId:Mesa",
        "uniqueKeys:number"
      ],
      "refs": [
        {
          "field": "mesaId",
          "relationshipId": "comandaMesa",
          "entityId": "Mesa"
        }
      ],
      "states": [],
      "entityId": "Comanda",
      "stateField": "status"
    },
    {
      "scenarioId": "lancarItemComanda",
      "tableId": "itemCardapio",
      "source": "journey:lancarItemComanda",
      "constraints": [],
      "refs": [],
      "states": [],
      "entityId": "ItemCardapio"
    },
    {
      "scenarioId": "cancelarItemComanda",
      "tableId": "itemComanda",
      "source": "journey:cancelarItemComanda",
      "constraints": [
        "ref:comandaId:Comanda",
        "ref:itemCardapioId:ItemCardapio",
        "state:canceled"
      ],
      "refs": [
        {
          "field": "comandaId",
          "relationshipId": "itemComandaComanda",
          "entityId": "Comanda"
        },
        {
          "field": "itemCardapioId",
          "relationshipId": "itemComandaItemCardapio",
          "entityId": "ItemCardapio"
        }
      ],
      "states": [
        "canceled"
      ],
      "entityId": "ItemComanda",
      "stateField": "status"
    },
    {
      "scenarioId": "lancarItemComanda",
      "tableId": "itemComanda",
      "source": "journey:lancarItemComanda",
      "constraints": [
        "ref:comandaId:Comanda",
        "ref:itemCardapioId:ItemCardapio",
        "state:launched"
      ],
      "refs": [
        {
          "field": "comandaId",
          "relationshipId": "itemComandaComanda",
          "entityId": "Comanda"
        },
        {
          "field": "itemCardapioId",
          "relationshipId": "itemComandaItemCardapio",
          "entityId": "ItemCardapio"
        }
      ],
      "states": [
        "launched"
      ],
      "entityId": "ItemComanda",
      "stateField": "status"
    },
    {
      "scenarioId": "abrirComanda",
      "tableId": "mesa",
      "source": "journey:abrirComanda",
      "constraints": [
        "uniqueKeys:code"
      ],
      "refs": [],
      "states": [],
      "entityId": "Mesa"
    }
  ]
} as const;

export const certificationFixture = {
  "schemaVersion": "2026-09-27-m1-certification-fixture-v1",
  "phase": "plan",
  "targets": [
    "memory",
    "development"
  ],
  "datasets": [
    {
      "supportId": "data:Comanda",
      "entityId": "Comanda",
      "tableId": "comanda",
      "dependsOn": [
        "Mesa"
      ],
      "sourceRefs": [
        "grant:caixaFechamentoEcadastroOperacional",
        "grant:garcomAtendimentoComandas",
        "journey:abrirComanda/criarComanda",
        "journey:abrirComanda/localizarMesaDisponivel",
        "journey:cancelarItemComanda/cancelarItemErrado",
        "journey:cancelarItemComanda/conferirItemLancado",
        "journey:cancelarItemComanda/localizarComandaParaCorrecao",
        "journey:fecharComanda/conferirTotalComanda",
        "journey:fecharComanda/fecharComandaPaga",
        "journey:fecharComanda/localizarComandaParaFechamento",
        "journey:lancarItemComanda/adicionarItemComanda",
        "journey:lancarItemComanda/consultarItemCardapio",
        "journey:lancarItemComanda/localizarComandaAberta",
        "ontology:Comanda/lifecycleStates/open",
        "organism:highlights",
        "relationship:Comanda/comandaMesa",
        "relationship:Comanda/itemComandaComanda",
        "relationship:ItemComanda/itemComandaComanda",
        "relationship:Mesa/comandaMesa"
      ]
    },
    {
      "supportId": "data:ItemCardapio",
      "entityId": "ItemCardapio",
      "tableId": "itemCardapio",
      "dependsOn": [],
      "sourceRefs": [
        "grant:caixaFechamentoEcadastroOperacional",
        "grant:garcomAtendimentoComandas",
        "journey:abrirComanda/criarComanda",
        "journey:abrirComanda/localizarMesaDisponivel",
        "journey:cancelarItemComanda/cancelarItemErrado",
        "journey:cancelarItemComanda/conferirItemLancado",
        "journey:cancelarItemComanda/localizarComandaParaCorrecao",
        "journey:fecharComanda/conferirTotalComanda",
        "journey:fecharComanda/fecharComandaPaga",
        "journey:fecharComanda/localizarComandaParaFechamento",
        "journey:lancarItemComanda/adicionarItemComanda",
        "journey:lancarItemComanda/consultarItemCardapio",
        "journey:lancarItemComanda/localizarComandaAberta",
        "organism:form",
        "relationship:Comanda/itemComandaComanda",
        "relationship:ItemCardapio/itemComandaItemCardapio",
        "relationship:ItemComanda/itemComandaItemCardapio"
      ]
    },
    {
      "supportId": "data:ItemComanda",
      "entityId": "ItemComanda",
      "tableId": "itemComanda",
      "dependsOn": [
        "Comanda",
        "ItemCardapio"
      ],
      "sourceRefs": [
        "grant:caixaFechamentoEcadastroOperacional",
        "grant:garcomAtendimentoComandas",
        "journey:abrirComanda/criarComanda",
        "journey:abrirComanda/localizarMesaDisponivel",
        "journey:cancelarItemComanda/cancelarItemErrado",
        "journey:cancelarItemComanda/conferirItemLancado",
        "journey:cancelarItemComanda/localizarComandaParaCorrecao",
        "journey:fecharComanda/conferirTotalComanda",
        "journey:fecharComanda/fecharComandaPaga",
        "journey:fecharComanda/localizarComandaParaFechamento",
        "journey:lancarItemComanda/adicionarItemComanda",
        "journey:lancarItemComanda/consultarItemCardapio",
        "journey:lancarItemComanda/localizarComandaAberta",
        "ontology:ItemComanda/lifecycleStates/launched",
        "organism:highlights",
        "relationship:Comanda/itemComandaComanda",
        "relationship:ItemCardapio/itemComandaItemCardapio",
        "relationship:ItemComanda/itemComandaComanda",
        "relationship:ItemComanda/itemComandaItemCardapio"
      ]
    },
    {
      "supportId": "data:Mesa",
      "entityId": "Mesa",
      "tableId": "mesa",
      "dependsOn": [],
      "sourceRefs": [
        "grant:caixaFechamentoEcadastroOperacional",
        "grant:garcomAtendimentoComandas",
        "journey:abrirComanda/criarComanda",
        "journey:abrirComanda/localizarMesaDisponivel",
        "journey:cancelarItemComanda/cancelarItemErrado",
        "journey:cancelarItemComanda/conferirItemLancado",
        "journey:cancelarItemComanda/localizarComandaParaCorrecao",
        "journey:fecharComanda/conferirTotalComanda",
        "journey:fecharComanda/fecharComandaPaga",
        "journey:fecharComanda/localizarComandaParaFechamento",
        "journey:lancarItemComanda/adicionarItemComanda",
        "journey:lancarItemComanda/consultarItemCardapio",
        "journey:lancarItemComanda/localizarComandaAberta",
        "organism:form",
        "organism:highlights",
        "relationship:Comanda/comandaMesa",
        "relationship:Mesa/comandaMesa"
      ]
    }
  ],
  "runtime": [
    {
      "supportId": "identity:caixa",
      "kind": "identity",
      "entityId": "",
      "actorRefs": [
        "caixa"
      ],
      "gap": "PERSON_ENTITY_UNDECLARED: actor caixa declares no personEntity; the test identity cannot be bound",
      "owner": "runtime"
    },
    {
      "supportId": "identity:garcom",
      "kind": "identity",
      "entityId": "",
      "actorRefs": [
        "garcom"
      ],
      "gap": "PERSON_ENTITY_UNDECLARED: actor garcom declares no personEntity; the test identity cannot be bound",
      "owner": "runtime"
    }
  ],
  "gaps": []
} as const;

export function applicableSeeds(mode: string): TableSeedRows[] {
  if (mode !== 'development' && mode !== 'presentation') return [];
  return [];
}
