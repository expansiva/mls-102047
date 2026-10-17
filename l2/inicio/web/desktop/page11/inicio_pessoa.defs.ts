/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/inicio_pessoa.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Receber a pessoa da organização ao entrar e mostrar de imediato se o seu acesso está completo, o que ainda falta, se o consentimento de privacidade é exigido e o que espera por ela, encaminhando-a ao Meu cadastro para completar os dados ou acompanhar a liberação.",
  "sections": [
    {
      "id": "situacaoAcesso",
      "priority": "primary",
      "purpose": "Mostrar logo no topo a situação do seu acesso: se está completo, quais dados mínimos ainda faltam e se o consentimento de privacidade é exigido pelo seu país.",
      "organisms": [
        "resumoMeuAcesso"
      ]
    },
    {
      "id": "pendencias",
      "priority": "main",
      "purpose": "Reunir o que espera por você: pedir ao responsável a liberação quando já existe outro cadastro com o seu e-mail, ou completar os dados mínimos quando o login já está ligado.",
      "organisms": [
        "pendenciasMeuAcesso"
      ]
    },
    {
      "id": "contextoEmpresa",
      "priority": "secondary",
      "purpose": "Situar a pessoa na empresa à qual pertence, com o nome da empresa e o que dela pode ser visto.",
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
        "preferred": "groupshowprogress--ml-segmented-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "Aviso de consentimento de privacidade exigido",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "destaqueEmpresa": [
      {
        "role": "Cartão com o nome da empresa",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "pendenciasMeuAcesso": [
      {
        "role": "Item pendente com descrição e ação",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Ação para seguir ao Meu cadastro",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "Aviso de liberação pelo responsável",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
