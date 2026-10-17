/// <mls fileReference="_102047_/l2/inicio/web/shared/painel.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "requests": {
    "obterPainel": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "empresa",
        "acessos"
      ]
    },
    "listarPedidosLiberacao": {
      "kind": "qry",
      "trigger": "listarPedidosLiberacao",
      "returns": [
        "pedidos"
      ]
    },
    "convidarPessoaCerta": {
      "kind": "cmd",
      "trigger": "convidarPessoaCerta",
      "returns": [
        "pedido"
      ],
      "writes": "PessoaOrganizacao.create"
    }
  },
  "states": {
    "empresa": {
      "source": "obterPainel.empresa",
      "description": "Situação de preparo da empresa da organização: nome, se está preparada e os dados obrigatórios que ainda faltam.",
      "organisms": [
        "empresaPreparada"
      ]
    },
    "acessos": {
      "source": "obterPainel.acessos",
      "description": "Andamento dos acessos das pessoas da organização: contagens já calculadas e as pessoas que ainda têm pendência.",
      "organisms": [
        "acessosPessoas"
      ]
    },
    "pedidos": {
      "source": "listarPedidosLiberacao.pedidos",
      "description": "the list of Pessoa da organização cujo e-mail a plataforma não ligou sozinha ao cadastro, com nome, país, canais de contato e situação do acesso.",
      "organisms": [
        "pedidosLiberacao"
      ]
    }
  },
  "journeys": [
    {
      "step": "acompanharAcessos/listarPessoas",
      "organisms": [
        "acessosPessoas"
      ],
      "continuesIn": "pessoas"
    },
    {
      "step": "acompanharAcessos/verSituacao",
      "organisms": [
        "acessosPessoas"
      ]
    },
    {
      "step": "liberarAcesso/localizarPessoa",
      "organisms": [
        "pedidosLiberacao"
      ]
    },
    {
      "step": "liberarAcesso/conferirCadastro",
      "organisms": [
        "pedidosLiberacao"
      ]
    },
    {
      "step": "liberarAcesso/convidarPessoaCerta",
      "organisms": [
        "pedidosLiberacao"
      ]
    }
  ],
  "rules": [
    "acessoCompletoDadosMinimos",
    "contatoSemDuplicarAoRepetir",
    "conviteDaPlataformaSemGuardar",
    "emailContaNaoEditavel",
    "empresaPreparadaComDadosObrigatorios",
    "liberacaoPeloResponsavel",
    "naoPedirDadoJaExistente",
    "preencherDadosNaoDaPermissao",
    "prepararSomenteResponsavel",
    "responsavelReconhecidoPelaPlataforma",
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
