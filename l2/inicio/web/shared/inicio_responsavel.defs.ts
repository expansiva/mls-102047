/// <mls fileReference="_102047_/l2/inicio/web/shared/inicio_responsavel.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "pessoaOrganizacaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:indicadoresAcessoPessoas",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "qryPainelResponsavel": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "empresa",
        "indicadores"
      ]
    },
    "qryPessoasAguardandoLiberacao": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "pessoas"
      ]
    }
  },
  "states": {
    "empresa": {
      "source": "qryPainelResponsavel.empresa",
      "description": "Situação de preparo da empresa dona do app: nome, se está preparada e quais dados obrigatórios faltam.",
      "organisms": [
        "situacaoEmpresa"
      ]
    },
    "indicadores": {
      "source": "qryPainelResponsavel.indicadores",
      "description": "Contagens da situação de acesso das pessoas da organização.",
      "organisms": [
        "indicadoresAcessoPessoas"
      ]
    },
    "pessoas": {
      "source": "qryPessoasAguardandoLiberacao.pessoas",
      "description": "the list of Pessoa da organização cujo acesso aguarda liberação pela plataforma, com nome, situação, contatos e dados mínimos que faltam.",
      "organisms": [
        "pessoasAguardandoLiberacao"
      ]
    }
  },
  "journeys": [
    {
      "step": "prepararEmpresa/verBoasVindasEmpresa",
      "organisms": [
        "situacaoEmpresa"
      ]
    },
    {
      "step": "prepararEmpresa/completarDadosEmpresa",
      "organisms": [
        "situacaoEmpresa"
      ],
      "continuesIn": "empresa"
    },
    {
      "step": "prepararEmpresa/verOrientacaoStudio",
      "organisms": [
        "situacaoEmpresa"
      ],
      "continuesIn": "empresa"
    },
    {
      "step": "prepararEmpresa/verPessoasOrganizacao",
      "organisms": [
        "indicadoresAcessoPessoas",
        "pessoasAguardandoLiberacao"
      ],
      "continuesIn": "pessoas_organizacao"
    },
    {
      "step": "acompanharAcessoPessoas/localizarPessoas",
      "organisms": [
        "indicadoresAcessoPessoas"
      ],
      "continuesIn": "pessoas_organizacao"
    },
    {
      "step": "acompanharAcessoPessoas/inspecionarPessoa",
      "organisms": [
        "pessoasAguardandoLiberacao"
      ],
      "continuesIn": "pessoas_organizacao"
    }
  ],
  "rules": [
    "acessoCompletoDadosMinimos",
    "dadosNaoConcedemPermissoes",
    "empresaPreparadaDadosObrigatorios",
    "ligacaoLoginPelaPlataforma",
    "naoPedirDadoJaExistente"
  ],
  "access": {
    "actors": [
      "responsavel"
    ],
    "grants": [
      "responsavelPrepararEmpresa",
      "responsavelAcompanharPessoas",
      "responsavelMeuAcesso"
    ]
  }
} as const;
