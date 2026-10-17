/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/inicio_pessoa.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Em uma tela estreita e fluida (cerca de 390px, usável de 360px a 430px), mostrar primeiro a situação do seu acesso e o que espera por você, com um toque para ir ao Meu cadastro, deixando o contexto da empresa por último.",
  "sections": [
    {
      "id": "situacaoAcesso",
      "priority": "primary",
      "purpose": "Mostrar em poucas linhas se o seu acesso está completo, o que falta e se o consentimento é exigido.",
      "organisms": [
        "resumoMeuAcesso"
      ]
    },
    {
      "id": "pendencias",
      "priority": "main",
      "purpose": "Listar em sequência vertical o que espera por você, cada item com uma ação clara para seguir ao Meu cadastro.",
      "organisms": [
        "pendenciasMeuAcesso"
      ]
    },
    {
      "id": "contextoEmpresa",
      "priority": "secondary",
      "purpose": "Mostrar de forma compacta a empresa à qual você pertence.",
      "organisms": [
        "destaqueEmpresa"
      ]
    }
  ],
  "organisms": {
    "resumoMeuAcesso": {
      "kind": "summary",
      "text": "Veja se o seu acesso está completo, quais dados ainda faltam e se o consentimento é exigido.",
      "intents": [
        {
          "id": "abrirMeuCadastroResumo",
          "kind": "navigate",
          "to": "meu_cadastro"
        }
      ]
    },
    "destaqueEmpresa": {
      "kind": "highlights",
      "text": "Saiba se a empresa já está preparada e quais dados dela ainda faltam.",
      "intents": []
    },
    "pendenciasMeuAcesso": {
      "kind": "inbox",
      "text": "O que espera por você: encaminhar ao responsável o pedido de liberação quando já existe outro cadastro com o seu e-mail, ou completar os dados mínimos quando o login já estiver ligado.",
      "intents": [
        {
          "id": "completarDadosMinimos",
          "kind": "navigate",
          "to": "meu_cadastro"
        },
        {
          "id": "encaminharPedidoLiberacao",
          "kind": "navigate",
          "to": "meu_cadastro"
        }
      ]
    }
  },
  "molecules": {
    "resumoMeuAcesso": [
      {
        "role": "Progresso dos dados mínimos do acesso",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-segmented-progress"
      },
      {
        "role": "Aviso de consentimento de privacidade exigido",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "destaqueEmpresa": [
      {
        "role": "Cartão compacto com o nome da empresa",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "pendenciasMeuAcesso": [
      {
        "role": "Item pendente com descrição e ação",
        "preferred": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Ação para seguir ao Meu cadastro",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Aviso de liberação pelo responsável",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
