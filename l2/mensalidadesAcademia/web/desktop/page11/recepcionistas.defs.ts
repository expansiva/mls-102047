/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/recepcionistas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Permitir que a gerência veja todas as recepcionistas da academia, que registram as matrículas, e cadastre uma nova pessoa ou atualize os dados de quem já está na equipe, sem sair da página.",
  "sections": [
    {
      "id": "equipeRecepcao",
      "priority": "primary",
      "purpose": "Mostrar a equipe da recepção com nome, documento e situação no cadastro, para a gerência localizar rapidamente quem deve consultar ou ajustar.",
      "organisms": [
        "recepcionistasLista"
      ]
    },
    {
      "id": "cadastroRecepcionista",
      "priority": "main",
      "purpose": "Ao lado da lista, cadastrar uma nova recepcionista ou atualizar a escolhida na lista, com nome, documento, país, outros nomes e consentimento de privacidade.",
      "organisms": [
        "recepcionistaFormulario"
      ]
    }
  ],
  "organisms": {
    "recepcionistasLista": {
      "kind": "list",
      "text": "Pessoas da recepção que registram matrículas, com nome, tipo e número de documento e situação no cadastro (ativa ou inativa). A busca pelo nome ajuda a encontrar a pessoa; ao escolher uma linha, os dados dela abrem no formulário para atualização.",
      "intents": []
    },
    "recepcionistaFormulario": {
      "kind": "form",
      "text": "Cadastrar ou atualizar uma recepcionista: nome exibido nas matrículas, tipo e número do documento para evitar cadastro duplicado, país, outros nomes pelos quais é conhecida e consentimento de privacidade (LGPD).",
      "intents": [
        {
          "id": "cadastrarRecepcionista",
          "kind": "submit"
        },
        {
          "id": "atualizarRecepcionista",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "recepcionistasLista": [
      {
        "role": "Buscar recepcionista pelo nome",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Tabela da equipe da recepção com nome, documento e situação",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      },
      {
        "role": "Iniciar o cadastro de uma nova recepcionista",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "recepcionistaFormulario": [
      {
        "role": "Nome da recepcionista",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "Tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-segmented-control"
      },
      {
        "role": "Número do documento",
        "preferred": "groupentertext--ml-cpf-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "País do documento",
        "preferred": "groupentertext--ml-enter-text"
      },
      {
        "role": "Outros nomes pelos quais é conhecida",
        "preferred": "groupentertext--ml-tag-input"
      },
      {
        "role": "Consentimento de privacidade",
        "preferred": "groupenterboolean--ml-checkbox-preference",
        "alternative": "groupenterboolean--ml-toggle-switch"
      },
      {
        "role": "Salvar o cadastro ou a atualização",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "Confirmação de que o cadastro foi salvo",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
