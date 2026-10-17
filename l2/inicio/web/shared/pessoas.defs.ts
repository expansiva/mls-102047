/// <mls fileReference="_102047_/l2/inicio/web/shared/pessoas.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "pessoaOrganizacaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalhePessoa",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "qryPaginaPessoas": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "pessoas",
        "pedidos"
      ]
    },
    "qryBuscarPessoas": {
      "kind": "qry",
      "trigger": "qryBuscarPessoas",
      "returns": [
        "pessoas"
      ]
    },
    "qryDetalhePessoa": {
      "kind": "qry",
      "trigger": "qryDetalhePessoa",
      "returns": [
        "pessoa"
      ]
    },
    "cmdEnviarConvite": {
      "kind": "cmd",
      "trigger": "enviarConvite",
      "returns": [
        "pessoa"
      ],
      "writes": "PessoaOrganizacao.create"
    }
  },
  "states": {
    "pessoas": {
      "source": "qryPaginaPessoas.pessoas",
      "description": "the list of Pessoa da organização com a situação do cadastro e do acesso.",
      "organisms": [
        "listaPessoas"
      ]
    },
    "pessoa": {
      "source": "qryDetalhePessoa.pessoa",
      "description": "Cadastro da pessoa da organização com a situação do acesso, o que falta, a exigência de consentimento, seus contatos e a empresa.",
      "organisms": [
        "detalhePessoa"
      ]
    },
    "pedidos": {
      "source": "qryPaginaPessoas.pedidos",
      "description": "the list of Pessoa da organização com a situação do cadastro e do acesso.",
      "organisms": [
        "acoesConvite",
        "pedidosLiberacao"
      ]
    },
    "selectedPessoaOrganizacao": {
      "source": "entry.params.pessoaOrganizacaoId",
      "description": "the id of the PessoaOrganizacao selected in acoesConvite",
      "organisms": [
        "acoesConvite",
        "detalhePessoa",
        "formConvite",
        "listaPessoas",
        "pedidosLiberacao"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharAcessos/listarPessoas",
      "organisms": [
        "listaPessoas"
      ]
    },
    {
      "step": "acompanharAcessos/verSituacao",
      "organisms": [
        "listaPessoas",
        "detalhePessoa"
      ]
    },
    {
      "step": "convidarPessoas/informarEmail",
      "organisms": [
        "acoesConvite",
        "formConvite"
      ]
    },
    {
      "step": "convidarPessoas/conferirPessoa",
      "organisms": [
        "listaPessoas",
        "detalhePessoa"
      ]
    },
    {
      "step": "liberarAcesso/localizarPessoa",
      "organisms": [
        "pedidosLiberacao",
        "listaPessoas"
      ]
    },
    {
      "step": "liberarAcesso/conferirCadastro",
      "organisms": [
        "detalhePessoa"
      ]
    },
    {
      "step": "liberarAcesso/convidarPessoaCerta",
      "organisms": [
        "acoesConvite",
        "formConvite"
      ]
    }
  ],
  "rules": [
    "acessoCompletoDadosMinimos",
    "conviteDaPlataformaSemGuardar",
    "liberacaoPeloResponsavel",
    "preencherDadosNaoDaPermissao",
    "prepararSomenteResponsavel",
    "semDuplicarPessoaAoRepetir"
  ],
  "access": {
    "actors": [
      "responsavel"
    ],
    "grants": [
      "responsavelPreparaEmpresa",
      "responsavelContatosEmpresa",
      "responsavelAcompanhaPessoas"
    ]
  }
} as const;
