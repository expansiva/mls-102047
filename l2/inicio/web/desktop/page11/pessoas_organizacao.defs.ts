/// <mls fileReference="_102047_/l2/inicio/web/desktop/page11/pessoas_organizacao.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/userAccessManagement/page21.md",
    "experience": "memberDirectory"
  },
  "intent": "Mostrar ao responsável todas as pessoas da organização, destacando quem ainda não completou o acesso ou aguarda liberação. Ao selecionar uma pessoa, ele vê o que falta para ela, se o consentimento é exigido e em que ponto está a liberação, que é feita pela plataforma.",
  "sections": [
    {
      "id": "secaoPessoas",
      "priority": "primary",
      "purpose": "Encontrar rapidamente as pessoas da organização e filtrar as que ainda não completaram o acesso ou aguardam liberação.",
      "organisms": [
        "listaPessoas"
      ]
    },
    {
      "id": "secaoPessoaSelecionada",
      "priority": "main",
      "purpose": "Entender a situação da pessoa selecionada: dados, acesso completo ou não, o que falta e se o consentimento é exigido.",
      "organisms": [
        "detalhePessoa",
        "andamentoLiberacao"
      ]
    },
    {
      "id": "secaoAcoes",
      "priority": "secondary",
      "purpose": "Orientar a liberação do acesso pela plataforma e permitir voltar à preparação da empresa ou ao início.",
      "organisms": [
        "acoesLiberacao"
      ]
    }
  ],
  "organisms": {
    "listaPessoas": {
      "kind": "list",
      "text": "Lista das pessoas da organização com nome, país, situação na plataforma e se o acesso está completo. Dá para procurar pelo nome e filtrar quem ainda não completou o acesso ou aguarda liberação; quem tem dados faltando aparece em destaque.",
      "intents": []
    },
    "detalhePessoa": {
      "kind": "detail",
      "text": "Dados da pessoa selecionada: nome, país, contatos e situação. Mostra se o acesso está completo, a lista do que ainda falta e se o consentimento de privacidade é exigido pela lei do país, sem mostrar o conteúdo do consentimento.",
      "intents": []
    },
    "acoesLiberacao": {
      "kind": "actions",
      "text": "Orienta como liberar o acesso de uma pessoa que aguarda liberação: isso é feito pela liberação da plataforma. Também permite voltar à preparação da empresa, para completar os dados que faltam, ou ao início.",
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
      "text": "Etapas da liberação do acesso da pessoa selecionada: pedido encaminhado, acesso liberado, login ligado pela plataforma e acesso completado, mostrando em qual etapa ela está.",
      "intents": []
    }
  },
  "molecules": {
    "listaPessoas": [
      {
        "role": "busca e filtro de pessoas",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "filtro de situação de acesso",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "tabela de pessoas",
        "preferred": "groupviewtable--ml-side-detail-table",
        "alternative": "groupviewtable--ml-data-table"
      }
    ],
    "detalhePessoa": [
      {
        "role": "cartão da pessoa",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "aviso do que falta",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "acoesLiberacao": [
      {
        "role": "navegação para empresa e início",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "orientação sobre liberação pela plataforma",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "andamentoLiberacao": [
      {
        "role": "etapas da liberação",
        "preferred": "groupnavigatesteps--ml-horizontal-stepper",
        "alternative": "groupnavigatesteps--ml-vertical-stepper"
      }
    ]
  }
} as const;
