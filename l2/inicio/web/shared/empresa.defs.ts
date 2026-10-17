/// <mls fileReference="_102047_/l2/inicio/web/shared/empresa.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "empresaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:dadosEmpresa",
        "persist": true,
        "required": false
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:completarDadosEmpresa",
        "persist": false,
        "required": false
      }
    }
  },
  "requests": {
    "qryEmpresa": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "empresa"
      ]
    },
    "cmdConfirmarDadosEmpresa": {
      "kind": "cmd",
      "trigger": "confirmarDadosEmpresa",
      "returns": [
        "empresa"
      ],
      "writes": "Empresa.update"
    }
  },
  "states": {
    "empresa": {
      "source": "qryEmpresa.empresa",
      "description": "Cadastro mestre da empresa da organização, com os canais de contato ligados e a situação de preparação calculada.",
      "organisms": [
        "completarDadosEmpresa",
        "dadosEmpresa",
        "pendenciasEmpresa"
      ]
    }
  },
  "journeys": [
    {
      "step": "prepararEmpresa/abrirEmpresa",
      "organisms": [
        "dadosEmpresa"
      ]
    },
    {
      "step": "prepararEmpresa/verPendencias",
      "organisms": [
        "pendenciasEmpresa"
      ]
    },
    {
      "step": "prepararEmpresa/completarDados",
      "organisms": [
        "completarDadosEmpresa"
      ]
    },
    {
      "step": "prepararEmpresa/verOrientacao",
      "organisms": [
        "pendenciasEmpresa"
      ]
    }
  ],
  "rules": [
    "empresaPreparadaComDadosObrigatorios",
    "naoPedirDadoJaExistente",
    "preencherDadosNaoDaPermissao",
    "prepararSomenteResponsavel",
    "responsavelReconhecidoPelaPlataforma"
  ],
  "access": {
    "actors": [
      "responsavel"
    ],
    "grants": [
      "responsavelPreparaEmpresa",
      "responsavelContatosEmpresa"
    ]
  }
} as const;
