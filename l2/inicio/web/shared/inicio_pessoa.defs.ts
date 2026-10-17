/// <mls fileReference="_102047_/l2/inicio/web/shared/inicio_pessoa.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "requests": {
    "qryInicioPessoa": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "meuAcesso",
        "pendencias",
        "empresa"
      ]
    }
  },
  "states": {
    "meuAcesso": {
      "source": "qryInicioPessoa.meuAcesso",
      "description": "Cadastro da pessoa da organização ligada à sessão, com a situação dos seus dados mínimos.",
      "organisms": [
        "pendenciasMeuAcesso",
        "resumoMeuAcesso"
      ]
    },
    "pendencias": {
      "source": "qryInicioPessoa.pendencias",
      "description": "the list of Algo que espera pela pessoa para concluir o seu acesso: pedir a liberação ao responsável ou completar os dados mínimos.",
      "organisms": [
        "pendenciasMeuAcesso"
      ]
    },
    "empresa": {
      "source": "qryInicioPessoa.empresa",
      "description": "Empresa à qual a pessoa pertence, com os campos que a pessoa pode ver.",
      "organisms": [
        "destaqueEmpresa"
      ]
    }
  },
  "journeys": [
    {
      "step": "aguardarLiberacaoAcesso/verAvisoLiberacao",
      "organisms": [
        "pendenciasMeuAcesso",
        "resumoMeuAcesso"
      ]
    },
    {
      "step": "completarMeuAcesso/verMeuCadastro",
      "organisms": [
        "resumoMeuAcesso",
        "pendenciasMeuAcesso"
      ]
    },
    {
      "step": "completarMeuAcesso/preencherDadosMinimos",
      "organisms": [
        "pendenciasMeuAcesso"
      ],
      "continuesIn": "meu_cadastro"
    },
    {
      "step": "completarMeuAcesso/seguirParaModulos",
      "organisms": [
        "resumoMeuAcesso"
      ]
    }
  ],
  "rules": [
    "acessoCompletoDadosMinimos",
    "emailContaNaoEditavel",
    "ligacaoLoginPelaPlataforma",
    "naoPedirDadoJaExistente",
    "seguirDiretoSeCompleto"
  ],
  "access": {
    "actors": [
      "pessoaOrganizacao"
    ],
    "grants": [
      "pessoaCompletarMeuAcesso",
      "pessoaVerEmpresa"
    ]
  }
} as const;
