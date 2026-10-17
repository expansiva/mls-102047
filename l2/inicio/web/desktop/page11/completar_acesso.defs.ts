/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/completar_acesso.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/processWizard/page21.md",
    "experience": "linearStepper"
  },
  "intent": "Mostrar à pessoa se o acesso dela está completo, o que ainda falta e se o consentimento de privacidade é exigido. Ela informa só os dados mínimos que faltam e segue para os módulos que já podia usar. Se o e-mail não foi ligado ao cadastro, ela fica sabendo que o responsável precisa liberar o acesso.",
  "sections": [
    {
      "id": "situacaoAcesso",
      "priority": "primary",
      "purpose": "Mostrar logo na entrada se o acesso está completo, o que falta e se a plataforma não ligou o e-mail ao cadastro.",
      "organisms": [
        "resumoMeuAcesso",
        "avisoLiberacao"
      ]
    },
    {
      "id": "completarDados",
      "priority": "main",
      "purpose": "Pedir só os dados mínimos que faltam e concluir para seguir aos módulos.",
      "organisms": [
        "dadosMinimosForm",
        "acoesMeuAcesso"
      ]
    },
    {
      "id": "contextoCadastro",
      "priority": "secondary",
      "purpose": "Mostrar o próprio cadastro, os papéis nos módulos e a empresa da organização como referência.",
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
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "etapas mínimas concluídas",
        "preferred": "groupshowprogress--ml-segmented-progress",
        "alternative": "groupshowprogress--ml-linear-progress"
      }
    ],
    "empresaBoasVindas": [
      {
        "role": "cartão de boas-vindas da empresa",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
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
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "papéis nos módulos",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      }
    ],
    "dadosMinimosForm": [
      {
        "role": "nome",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "país",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "consentimento de privacidade",
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-boolean-segmented"
      }
    ],
    "acoesMeuAcesso": [
      {
        "role": "concluir e seguir",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
