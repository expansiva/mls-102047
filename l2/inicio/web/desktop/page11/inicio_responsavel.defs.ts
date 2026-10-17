/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/inicio_responsavel.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Dar ao responsável, logo ao entrar, uma visão de onde está a preparação da empresa e o acesso das pessoas da organização, indicando o que falta e para onde seguir.",
  "sections": [
    {
      "id": "preparoEmpresa",
      "priority": "primary",
      "purpose": "Mostrar primeiro se a empresa já está preparada e quais dados obrigatórios ainda faltam, pois isso é o primeiro passo do responsável.",
      "organisms": [
        "situacaoEmpresa"
      ]
    },
    {
      "id": "acessoPessoas",
      "priority": "main",
      "purpose": "Resumir em números como está o acesso das pessoas da organização.",
      "organisms": [
        "indicadoresAcessoPessoas"
      ]
    },
    {
      "id": "pendenciasLiberacao",
      "priority": "secondary",
      "purpose": "Listar as pessoas que aguardam a liberação do acesso para o responsável identificá-las e seguir à liberação.",
      "organisms": [
        "pessoasAguardandoLiberacao"
      ]
    }
  ],
  "organisms": {
    "situacaoEmpresa": {
      "kind": "summary",
      "text": "Veja se a empresa já está preparada e quais dados dela ainda faltam (nome, documento, endereço, contato), com acesso direto para completar.",
      "intents": [
        {
          "id": "irPrepararEmpresa",
          "kind": "navigate",
          "to": "empresa"
        }
      ]
    },
    "indicadoresAcessoPessoas": {
      "kind": "highlights",
      "text": "Quantas pessoas da organização já completaram o acesso, quantas ainda têm dados faltando e quantas precisam dar consentimento.",
      "intents": [
        {
          "id": "verPessoasOrganizacao",
          "kind": "navigate",
          "to": "pessoas_organizacao"
        }
      ]
    },
    "pessoasAguardandoLiberacao": {
      "kind": "inbox",
      "text": "Pessoas que aguardam você liberar o acesso: identifique a pessoa pelo nome e contato e libere pela liberação da plataforma.",
      "intents": [
        {
          "id": "abrirPessoaParaLiberar",
          "kind": "navigate",
          "to": "pessoas_organizacao"
        }
      ]
    }
  },
  "molecules": {
    "situacaoEmpresa": [
      {
        "role": "progresso dos dados obrigatórios da empresa",
        "preferred": "groupshowprogress--ml-segmented-progress",
        "alternative": "groupshowprogress--ml-linear-progress"
      },
      {
        "role": "cartão de situação da empresa",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "indicadoresAcessoPessoas": [
      {
        "role": "contagem de pessoas por situação de acesso",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "pessoasAguardandoLiberacao": [
      {
        "role": "lista de pessoas aguardando liberação",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "abrir a pessoa para liberar",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ]
  }
} as const;
