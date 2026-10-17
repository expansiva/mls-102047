/// <mls fileReference="_102047_/l2/inicio/web/shared/meu_cadastro.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "pessoaOrganizacaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:meuCadastroResumo",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "qryMeuCadastro": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "meuCadastro"
      ]
    },
    "salvarMeusDados": {
      "kind": "cmd",
      "trigger": "salvarMeusDados",
      "returns": [
        "meuCadastro"
      ],
      "writes": "PessoaOrganizacao.update"
    }
  },
  "states": {
    "meuCadastro": {
      "source": "qryMeuCadastro.meuCadastro",
      "description": "O cadastro da própria pessoa na organização, com a situação do acesso, os dados mínimos que faltam, os contatos, os vínculos e a empresa a que pertence.",
      "organisms": [
        "acoesMeuCadastro",
        "andamentoLiberacao",
        "avisoLiberacao",
        "dadosMinimosForm",
        "meuCadastroResumo"
      ]
    }
  },
  "journeys": [
    {
      "step": "aguardarLiberacaoAcesso/verAvisoLiberacao",
      "organisms": [
        "avisoLiberacao",
        "andamentoLiberacao"
      ]
    },
    {
      "step": "completarMeuAcesso/verMeuCadastro",
      "organisms": [
        "meuCadastroResumo",
        "dadosMinimosForm"
      ]
    },
    {
      "step": "completarMeuAcesso/preencherDadosMinimos",
      "organisms": [
        "dadosMinimosForm",
        "acoesMeuCadastro"
      ]
    },
    {
      "step": "completarMeuAcesso/seguirParaModulos",
      "organisms": [
        "acoesMeuCadastro"
      ],
      "continuesIn": "inicio_pessoa"
    }
  ],
  "rules": [
    "acessoCompletoDadosMinimos",
    "dadosNaoConcedemPermissoes",
    "emailContaNaoEditavel",
    "ligacaoLoginPelaPlataforma",
    "naoPedirDadoJaExistente",
    "repetirNaoDuplicaPessoa",
    "seguirDiretoSeCompleto"
  ],
  "access": {
    "actors": [
      "pessoaOrganizacao",
      "responsavel"
    ],
    "grants": [
      "responsavelPrepararEmpresa",
      "responsavelAcompanharPessoas",
      "responsavelMeuAcesso",
      "pessoaCompletarMeuAcesso",
      "pessoaVerEmpresa"
    ]
  }
} as const;
