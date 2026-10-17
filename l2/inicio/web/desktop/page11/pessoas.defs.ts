/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/pessoas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/userAccessManagement/page21.md",
    "experience": "memberDirectory"
  },
  "intent": "Mostrar ao responsável todas as pessoas da organização e a situação do acesso de cada uma, para ele saber quem falta completar, convidar novas pessoas pelo e-mail e liberar o acesso de quem pediu, sem criar cadastro duplicado.",
  "sections": [
    {
      "id": "secaoPessoas",
      "priority": "primary",
      "purpose": "Mostrar a lista de pessoas com a situação do acesso e, ao lado, o cadastro da pessoa escolhida, para conferir quem é e o que falta.",
      "organisms": [
        "listaPessoas",
        "detalhePessoa"
      ]
    },
    {
      "id": "secaoLiberacao",
      "priority": "main",
      "purpose": "Mostrar os pedidos de liberação e as ações de convite, para o responsável ligar o e-mail à pessoa certa.",
      "organisms": [
        "pedidosLiberacao",
        "acoesConvite"
      ]
    },
    {
      "id": "secaoConvite",
      "priority": "secondary",
      "purpose": "Permitir convidar uma pessoa pelo e-mail, usando o convite da plataforma, seja uma nova pessoa ou a pessoa certa de um pedido de liberação.",
      "organisms": [
        "formConvite"
      ]
    }
  ],
  "organisms": {
    "listaPessoas": {
      "kind": "list",
      "text": "Veja as pessoas da organização, localize uma pessoa pelo nome e filtre quem ainda não completou o acesso.",
      "intents": []
    },
    "detalhePessoa": {
      "kind": "detail",
      "text": "Confira o cadastro da pessoa, a situação do acesso, o que ainda falta e se o consentimento é exigido pelo país dela.",
      "intents": []
    },
    "formConvite": {
      "kind": "form",
      "text": "Informe o e-mail, o nome e o país para convidar uma pessoa pelo convite da plataforma. Se o e-mail já tiver cadastro, a plataforma usa esse cadastro e não cria outra pessoa.",
      "intents": [
        {
          "id": "enviarConvite",
          "kind": "submit"
        }
      ]
    },
    "pedidosLiberacao": {
      "kind": "inbox",
      "text": "Pessoas que pediram liberação porque a plataforma não ligou o e-mail delas sozinha. Escolha uma para conferir o cadastro antes de convidar.",
      "intents": []
    },
    "acoesConvite": {
      "kind": "actions",
      "text": "Convide uma pessoa ou convide a pessoa certa para liberar o acesso dela sem criar outro cadastro; o envio acontece pelo formulário de convite.",
      "intents": []
    }
  },
  "molecules": {
    "listaPessoas": [
      {
        "role": "tabela de pessoas com a situação do acesso",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      },
      {
        "role": "busca pelo nome",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "filtro entre acesso completo e pendente",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "detalhePessoa": [
      {
        "role": "cartão da pessoa com a situação do acesso",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "aviso do que falta e do consentimento exigido",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "formConvite": [
      {
        "role": "e-mail, nome e país da pessoa convidada",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "enviar convite",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "pedidosLiberacao": [
      {
        "role": "lista de pedidos de liberação",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      },
      {
        "role": "abrir a pessoa do pedido",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ],
    "acoesConvite": [
      {
        "role": "ações de convite",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      }
    ]
  }
} as const;
