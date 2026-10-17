/// <mls fileReference="_102047_/l2/inicio/web/mobile/page11/pessoas_organizacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/userAccessManagement/page21.md",
    "experience": "memberDirectory"
  },
  "intent": "No celular, numa coluna estreita e fluida (cerca de 390px, também usável entre 360px e 430px), o responsável procura e filtra as pessoas da organização. Ao tocar em uma pessoa, vê o que falta para ela e o andamento da liberação, que é feita pela plataforma.",
  "sections": [
    {
      "id": "secaoPessoas",
      "priority": "primary",
      "purpose": "Encontrar e filtrar as pessoas que ainda não completaram o acesso ou aguardam liberação, em uma lista compacta.",
      "organisms": [
        "listaPessoas"
      ]
    },
    {
      "id": "secaoPessoaSelecionada",
      "priority": "main",
      "purpose": "Ver em sequência os dados da pessoa tocada, o que falta e em que etapa está a liberação.",
      "organisms": [
        "detalhePessoa",
        "andamentoLiberacao"
      ]
    },
    {
      "id": "secaoAcoes",
      "priority": "secondary",
      "purpose": "Lembrar que a liberação é feita pela plataforma e oferecer o caminho de volta à preparação da empresa ou ao início.",
      "organisms": [
        "acoesLiberacao"
      ]
    }
  ],
  "organisms": {
    "listaPessoas": {
      "kind": "list",
      "text": "Lista compacta das pessoas da organização com nome e indicação de acesso completo ou pendente. Tem busca pelo nome e filtro para quem não completou o acesso ou aguarda liberação.",
      "intents": []
    },
    "detalhePessoa": {
      "kind": "detail",
      "text": "Dados da pessoa tocada: nome, país, contatos e situação, se o acesso está completo, o que falta e se o consentimento é exigido. O conteúdo do consentimento não aparece.",
      "intents": []
    },
    "acoesLiberacao": {
      "kind": "actions",
      "text": "Aviso de que o acesso de quem aguarda liberação é liberado pela plataforma, com botões para voltar à preparação da empresa ou ao início.",
      "intents": [
        {
          "id": "irPrepararEmpresa",
          "kind": "navigate",
          "to": "empresa"
        },
        {
          "id": "irInicio",
          "kind": "navigate",
          "to": "inicio_responsavel"
        }
      ]
    },
    "andamentoLiberacao": {
      "kind": "timeline",
      "text": "Etapas da liberação em formato compacto: pedido encaminhado, acesso liberado, login ligado pela plataforma e acesso completado.",
      "intents": []
    }
  },
  "molecules": {
    "listaPessoas": [
      {
        "role": "busca de pessoas",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "filtro de situação de acesso",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "lista de pessoas",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "detalhePessoa": [
      {
        "role": "cartão da pessoa",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "aviso do que falta",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "acoesLiberacao": [
      {
        "role": "navegação para empresa e início",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "orientação sobre liberação pela plataforma",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "andamentoLiberacao": [
      {
        "role": "etapas da liberação",
        "preferred": "groupnavigatesteps--ml-vertical-stepper",
        "alternative": "groupnavigatesteps--ml-compact-step-indicator"
      }
    ]
  }
} as const;
