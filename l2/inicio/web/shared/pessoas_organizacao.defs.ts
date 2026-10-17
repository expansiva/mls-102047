/// <mls fileReference="_102047_/l2/inicio/web/shared/pessoas_organizacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "empresaId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:acoesLiberacao",
        "persist": true,
        "required": false
      },
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
    "abrirPessoasOrganizacao": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "empresa",
        "pessoas"
      ]
    },
    "buscarPessoas": {
      "kind": "qry",
      "trigger": "buscarPessoas",
      "returns": [
        "pessoas"
      ]
    },
    "obterPessoa": {
      "kind": "qry",
      "trigger": "obterPessoa",
      "returns": [
        "pessoa"
      ]
    }
  },
  "states": {
    "pessoas": {
      "source": "abrirPessoasOrganizacao.pessoas",
      "description": "the list of Pessoa da organização em forma resumida: nome, país, situação na plataforma e situação do acesso.",
      "organisms": [
        "listaPessoas"
      ]
    },
    "pessoa": {
      "source": "obterPessoa.pessoa",
      "description": "Pessoa da organização com dados, contatos, situação do acesso, o que falta, exigência de consentimento e etapa da liberação do acesso.",
      "organisms": [
        "acoesLiberacao",
        "andamentoLiberacao",
        "detalhePessoa"
      ]
    },
    "empresa": {
      "source": "abrirPessoasOrganizacao.empresa",
      "description": "Situação de preparo da empresa dona do app: se está preparada e quais dados obrigatórios ainda faltam.",
      "organisms": [
        "acoesLiberacao"
      ]
    },
    "selectedPessoaOrganizacao": {
      "source": "entry.params.pessoaOrganizacaoId",
      "description": "the id of the PessoaOrganizacao selected in listaPessoas",
      "organisms": [
        "detalhePessoa",
        "listaPessoas"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharAcessoPessoas/localizarPessoas",
      "organisms": [
        "listaPessoas"
      ]
    },
    {
      "step": "acompanharAcessoPessoas/inspecionarPessoa",
      "organisms": [
        "detalhePessoa",
        "andamentoLiberacao",
        "acoesLiberacao"
      ]
    },
    {
      "step": "prepararEmpresa/verPessoasOrganizacao",
      "organisms": [
        "listaPessoas",
        "detalhePessoa"
      ]
    },
    {
      "step": "prepararEmpresa/verBoasVindasEmpresa",
      "organisms": [],
      "continuesIn": "inicio_responsavel"
    },
    {
      "step": "prepararEmpresa/completarDadosEmpresa",
      "organisms": [
        "acoesLiberacao"
      ],
      "continuesIn": "empresa"
    },
    {
      "step": "prepararEmpresa/verOrientacaoStudio",
      "organisms": [],
      "continuesIn": "empresa"
    }
  ],
  "rules": [
    "acessoCompletoDadosMinimos",
    "dadosNaoConcedemPermissoes",
    "empresaPreparadaDadosObrigatorios",
    "ligacaoLoginPelaPlataforma"
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
