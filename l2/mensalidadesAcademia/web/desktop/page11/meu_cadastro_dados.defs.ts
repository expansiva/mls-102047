/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/desktop/page11/meu_cadastro_dados.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/readOnlyDetailPortal/page21.md",
    "experience": "summaryFirstStatement"
  },
  "intent": "Mostrar ao atendente da recepção os seus próprios dados cadastrais, já abertos ao entrar em Meu cadastro, para que ele confira as informações sem precisar procurar nada.",
  "sections": [
    {
      "id": "meusDados",
      "priority": "primary",
      "purpose": "Apresentar o cadastro do atendente conectado em modo de leitura, com a identificação em destaque no topo e os demais dados organizados logo abaixo.",
      "organisms": [
        "meuCadastroAtendente"
      ]
    }
  ],
  "organisms": {
    "meuCadastroAtendente": {
      "kind": "detail",
      "text": "Seus dados cadastrais como atendente da recepção, só para consulta. Assim você confere se suas informações na academia estão corretas.",
      "intents": []
    }
  },
  "molecules": {
    "meuCadastroAtendente": [
      {
        "role": "Exibir cada dado do cadastro como texto só de leitura, com o nome do campo",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      }
    ]
  }
} as const;
