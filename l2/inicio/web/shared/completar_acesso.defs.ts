/// <mls fileReference="_102047_/l2/inicio/web/shared/completar_acesso.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "pessoaOrganizacaoId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:dadosMinimosForm",
        "persist": true,
        "required": false
      }
    }
  },
  "requests": {
    "obterMeuAcesso": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "pessoa",
        "emailLigado",
        "empresa"
      ]
    },
    "concluirMeuAcesso": {
      "kind": "cmd",
      "trigger": "concluirMeuAcesso",
      "returns": [
        "pessoa"
      ],
      "writes": "PessoaOrganizacao.update"
    }
  },
  "states": {
    "pessoa": {
      "source": "obterMeuAcesso.pessoa",
      "description": "Cadastro da pessoa da organização ligado ao e-mail da conta, com a situação calculada do acesso.",
      "organisms": [
        "acoesMeuAcesso",
        "avisoLiberacao",
        "dadosMinimosForm",
        "meuCadastro",
        "resumoMeuAcesso"
      ]
    },
    "empresa": {
      "source": "obterMeuAcesso.empresa",
      "description": "Resumo da empresa da organização: nome e nome fantasia.",
      "organisms": [
        "empresaBoasVindas"
      ]
    },
    "emailLigado": {
      "source": "obterMeuAcesso.emailLigado",
      "description": "the emailLigado that obterMeuAcesso returns",
      "organisms": [
        "avisoLiberacao"
      ]
    },
    "selectedPessoaOrganizacao": {
      "source": "entry.params.pessoaOrganizacaoId",
      "description": "the id of the PessoaOrganizacao selected in resumoMeuAcesso",
      "organisms": [
        "dadosMinimosForm",
        "resumoMeuAcesso"
      ]
    }
  },
  "journeys": [
    {
      "step": "completarMeuAcesso/verMeuCadastro",
      "organisms": [
        "resumoMeuAcesso",
        "meuCadastro",
        "empresaBoasVindas"
      ]
    },
    {
      "step": "completarMeuAcesso/informarDados",
      "organisms": [
        "dadosMinimosForm",
        "acoesMeuAcesso"
      ]
    },
    {
      "step": "completarMeuAcesso/seguirModulos",
      "organisms": [
        "acoesMeuAcesso"
      ],
      "continuesIn": "painel"
    },
    {
      "step": "pedirLiberacao/verAviso",
      "organisms": [
        "avisoLiberacao"
      ]
    }
  ],
  "rules": [
    "acessoCompletoDadosMinimos",
    "acessoCompletoSegueDireto",
    "emailContaNaoEditavel",
    "liberacaoPeloResponsavel",
    "naoPedirDadoJaExistente",
    "pessoaCadastradaPeloEmail",
    "preencherDadosNaoDaPermissao",
    "semDuplicarPessoaAoRepetir"
  ],
  "access": {
    "actors": [
      "pessoaOrganizacao"
    ],
    "grants": [
      "pessoaCompletaMeuAcesso",
      "pessoaVeEmpresa"
    ]
  }
} as const;
