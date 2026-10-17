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
        "effect": "select:boasVindasEmpresa",
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
    "qryEmpresaPreparo": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "empresa"
      ]
    },
    "cmdSalvarDadosEmpresa": {
      "kind": "cmd",
      "trigger": "salvarDadosEmpresa",
      "returns": [
        "empresa"
      ],
      "writes": "Empresa.update"
    }
  },
  "states": {
    "empresa": {
      "source": "qryEmpresaPreparo.empresa",
      "description": "Empresa dona do app com os dados já registrados na plataforma, seus contatos ligados, o indicador de empresa preparada e os dados obrigatórios que ainda faltam.",
      "organisms": [
        "acoesEmpresa",
        "boasVindasEmpresa",
        "completarDadosEmpresa",
        "dadosFaltantesEmpresa"
      ]
    }
  },
  "journeys": [
    {
      "step": "prepararEmpresa/verBoasVindasEmpresa",
      "organisms": [
        "boasVindasEmpresa",
        "dadosFaltantesEmpresa"
      ]
    },
    {
      "step": "prepararEmpresa/completarDadosEmpresa",
      "organisms": [
        "completarDadosEmpresa",
        "acoesEmpresa"
      ]
    },
    {
      "step": "prepararEmpresa/verOrientacaoStudio",
      "organisms": [
        "boasVindasEmpresa"
      ]
    },
    {
      "step": "prepararEmpresa/verPessoasOrganizacao",
      "organisms": [
        "acoesEmpresa"
      ],
      "continuesIn": "pessoas_organizacao"
    }
  ],
  "rules": [
    "empresaPreparadaDadosObrigatorios",
    "naoPedirDadoJaExistente",
    "somenteResponsavelEditaEmpresa"
  ],
  "access": {
    "actors": [
      "responsavel"
    ],
    "grants": [
      "responsavelPrepararEmpresa"
    ]
  }
} as const;
