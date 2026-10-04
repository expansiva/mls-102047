/// <mls fileReference="_102047_/l2/comandaRestaurante/web/shared/mesas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "mesaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:mesaForm",
        "persist": true
      }
    }
  },
  "forms": {
    "createMesa": {
      "organism": "mesaForm",
      "submit": "createMesa"
    },
    "updateMesa": {
      "organism": "mesaForm",
      "submit": "updateMesa"
    }
  },
  "requests": {
    "carregarMesas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "mesas"
      ]
    },
    "criarMesa": {
      "kind": "cmd",
      "trigger": "createMesa",
      "returns": [
        "mesa"
      ],
      "writes": "Mesa.create"
    },
    "atualizarMesa": {
      "kind": "cmd",
      "trigger": "updateMesa",
      "returns": [
        "mesa"
      ],
      "writes": "Mesa.update"
    }
  },
  "states": {
    "mesas": {
      "source": "carregarMesas.mesas",
      "description": "Dados de uma mesa necessários para a lista da casa, para a seleção no formulário e para o redesenho após o cadastro ou a atualização."
    },
    "selectedMesa": {
      "source": "entry.params.mesaId",
      "description": "Dados de uma mesa necessários para a lista da casa, para a seleção no formulário e para o redesenho após o cadastro ou a atualização."
    }
  },
  "functions": {
    "carregarMesas": {
      "description": "Carrega o salão para o caixa consultar as mesas da casa e selecionar uma mesa para manutenção.",
      "calls": "carregarMesas",
      "sets": "mesas"
    },
    "criarMesa": {
      "description": "Cadastra uma mesa para a operação e devolve o registro completo para a página redesenhar.",
      "calls": "criarMesa"
    },
    "atualizarMesa": {
      "description": "Atualiza o código de uma mesa selecionada e devolve seu estado completo para a página redesenhar a seleção e sua linha.",
      "calls": "atualizarMesa"
    }
  },
  "journeys": [],
  "rules": {
    "carregarMesas": [],
    "criarMesa": [],
    "atualizarMesa": []
  },
  "access": {
    "actors": [
      "caixa"
    ],
    "grants": [
      "caixaFechamentoEcadastroOperacional"
    ]
  }
} as const;
