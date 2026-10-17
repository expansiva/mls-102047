/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/completar_acesso.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/processWizard/page21.md",
    "experience": "linearStepper"
  },
  "intent": "Em uma coluna fluida e estreita (por volta de 390px, também usável em 360px e 430px), mostrar primeiro se o acesso está completo e o que falta. Em seguida vêm o pedido dos dados mínimos e a ação para seguir aos módulos. O cadastro e a empresa ficam abaixo, como referência.",
  "sections": [
    {
      "id": "situacaoAcesso",
      "priority": "primary",
      "purpose": "Mostrar logo no topo se o acesso está completo, o que falta e se a plataforma não ligou o e-mail ao cadastro.",
      "organisms": [
        "resumoMeuAcesso",
        "avisoLiberacao"
      ]
    },
    {
      "id": "completarDados",
      "priority": "main",
      "purpose": "Pedir só os dados mínimos que faltam, com a ação de concluir logo abaixo e fácil de alcançar.",
      "organisms": [
        "dadosMinimosForm",
        "acoesMeuAcesso"
      ]
    },
    {
      "id": "contextoCadastro",
      "priority": "secondary",
      "purpose": "Mostrar no fim da rolagem o próprio cadastro, os papéis nos módulos e a empresa da organização.",
      "organisms": [
        "meuCadastro",
        "empresaBoasVindas"
      ]
    }
  ],
  "organisms": {
    "resumoMeuAcesso": {
      "kind": "summary",
      "text": "Mostra se o seu acesso está completo, quais dados mínimos ainda faltam e se o seu país exige o consentimento de privacidade.",
      "intents": []
    },
    "empresaBoasVindas": {
      "kind": "highlights",
      "text": "Mostra o nome e o nome comercial da empresa da organização a que você pertence, como boas-vindas.",
      "intents": []
    },
    "avisoLiberacao": {
      "kind": "inbox",
      "text": "Quando a plataforma não liga o seu e-mail ao cadastro, avisa que o responsável precisa liberar o seu acesso pelo convite da plataforma. Nada é criado enquanto você aguarda.",
      "intents": []
    },
    "meuCadastro": {
      "kind": "detail",
      "text": "Mostra o seu cadastro ligado ao e-mail da conta, que não pode ser editado aqui, com seus contatos e os papéis nos módulos que o responsável já liberou.",
      "intents": []
    },
    "dadosMinimosForm": {
      "kind": "form",
      "text": "Pede só o que falta: nome, país e, quando a lei do país exige (Brasil e União Europeia), o consentimento de privacidade. Preencher esses dados não dá novas permissões.",
      "intents": []
    },
    "acoesMeuAcesso": {
      "kind": "actions",
      "text": "Concluir com os dados informados e seguir para os módulos que você já pode usar. Se o acesso depende de liberação, a pendência fica com o responsável.",
      "intents": [
        {
          "id": "concluirMeuAcesso",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "resumoMeuAcesso": [
      {
        "role": "situação do acesso completo",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "etapas mínimas concluídas",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-segmented-progress"
      }
    ],
    "empresaBoasVindas": [
      {
        "role": "cartão de boas-vindas da empresa",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "avisoLiberacao": [
      {
        "role": "aviso de liberação pendente",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "meuCadastro": [
      {
        "role": "cartão do próprio cadastro",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "papéis nos módulos",
        "preferred": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "dadosMinimosForm": [
      {
        "role": "nome",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "país",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "consentimento de privacidade",
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-toggle-switch"
      }
    ],
    "acoesMeuAcesso": [
      {
        "role": "concluir e seguir",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
