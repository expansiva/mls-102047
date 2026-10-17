/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/inicio_responsavel.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Em tela estreita (cerca de 390px, usável de 360px a 430px), mostrar ao responsável em leitura vertical a situação da empresa, os números de acesso das pessoas e quem aguarda liberação.",
  "sections": [
    {
      "id": "preparoEmpresa",
      "priority": "primary",
      "purpose": "Abrir com a situação da empresa e o que falta, com um toque para completar.",
      "organisms": [
        "situacaoEmpresa"
      ]
    },
    {
      "id": "acessoPessoas",
      "priority": "main",
      "purpose": "Mostrar os números de acesso das pessoas em blocos curtos que fluem um abaixo do outro.",
      "organisms": [
        "indicadoresAcessoPessoas"
      ]
    },
    {
      "id": "pendenciasLiberacao",
      "priority": "secondary",
      "purpose": "Listar de forma compacta as pessoas que aguardam liberação, com acesso à página de pessoas.",
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
        "alternative": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "cartão de situação da empresa",
        "preferred": "groupviewcard--ml-vertical-card"
      }
    ],
    "indicadoresAcessoPessoas": [
      {
        "role": "contagem de pessoas por situação de acesso",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "pessoasAguardandoLiberacao": [
      {
        "role": "lista de pessoas aguardando liberação",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "abrir a pessoa para liberar",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
