/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/recepcionistas.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "No celular, a gerência consulta a equipe da recepção em uma lista estreita e fluida (cerca de 390px, usável de 360px a 430px) e abre o formulário em sequência para cadastrar ou atualizar uma recepcionista.",
  "sections": [
    {
      "id": "equipeRecepcao",
      "priority": "primary",
      "purpose": "Lista empilhada da equipe da recepção, com o nome em destaque e o documento e a situação logo abaixo, para encontrar a pessoa com o polegar.",
      "organisms": [
        "recepcionistasLista"
      ]
    },
    {
      "id": "cadastroRecepcionista",
      "priority": "main",
      "purpose": "Formulário em uma coluna, abaixo da lista ou aberto ao tocar em uma recepcionista, para cadastrar ou atualizar os dados com o botão de salvar sempre ao alcance.",
      "organisms": [
        "recepcionistaFormulario"
      ]
    }
  ],
  "organisms": {
    "recepcionistasLista": {
      "kind": "list",
      "text": "Pessoas da recepção que registram matrículas, cada uma com o nome em destaque, o documento e a situação no cadastro. A busca pelo nome fica no topo; ao tocar em uma pessoa, os dados dela abrem no formulário.",
      "intents": []
    },
    "recepcionistaFormulario": {
      "kind": "form",
      "text": "Cadastrar ou atualizar uma recepcionista em campos empilhados: nome, tipo e número do documento, país, outros nomes e consentimento de privacidade (LGPD).",
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
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Lista empilhada da equipe da recepção",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Iniciar o cadastro de uma nova recepcionista",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ],
    "recepcionistaFormulario": [
      {
        "role": "Nome da recepcionista",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-radio-group"
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
        "preferred": "groupenterboolean--ml-toggle-switch",
        "alternative": "groupenterboolean--ml-checkbox-preference"
      },
      {
        "role": "Salvar o cadastro ou a atualização",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmação de que o cadastro foi salvo",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
