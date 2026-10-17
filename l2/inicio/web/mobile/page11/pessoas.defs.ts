/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/pessoas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/userAccessManagement/page21.md",
    "experience": "memberDirectory"
  },
  "intent": "No celular, mostrar primeiro os pedidos de liberação e a lista de pessoas com a situação do acesso em leitura fluida e estreita (por volta de 390px, também em 360px e 430px). Ao tocar em uma pessoa, o cadastro dela abre para conferir antes de convidar.",
  "sections": [
    {
      "id": "secaoLiberacao",
      "priority": "primary",
      "purpose": "Mostrar no topo quem pediu liberação e as ações de convite, para liberar o acesso da pessoa certa rapidamente.",
      "organisms": [
        "pedidosLiberacao",
        "acoesConvite"
      ]
    },
    {
      "id": "secaoPessoas",
      "priority": "main",
      "purpose": "Mostrar a lista de pessoas em linhas empilhadas, com busca e filtro de pendentes, e em seguida o cadastro da pessoa escolhida.",
      "organisms": [
        "listaPessoas",
        "detalhePessoa"
      ]
    },
    {
      "id": "secaoConvite",
      "priority": "secondary",
      "purpose": "Permitir convidar uma pessoa pelo e-mail, com nome e país, em campos de largura total.",
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
      "text": "Pessoas que pediram liberação porque a plataforma não ligou o e-mail delas sozinha. Toque em uma para conferir o cadastro antes de convidar.",
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
        "role": "lista de pessoas adaptada à tela estreita",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "busca pelo nome",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "filtro entre acesso completo e pendente",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      }
    ],
    "detalhePessoa": [
      {
        "role": "cartão da pessoa com a situação do acesso",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
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
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "enviar convite",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "pedidosLiberacao": [
      {
        "role": "lista de pedidos de liberação",
        "preferred": "groupviewdata--ml-vertical-record-list"
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
        "preferred": "grouptriggeraction--ml-split-button",
        "alternative": "grouptriggeraction--ml-button-group"
      }
    ]
  }
} as const;
