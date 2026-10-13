/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/mobile/page11/meu_cadastro_dados.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/readOnlyDetailPortal/page21.md",
    "experience": "summaryFirstStatement"
  },
  "intent": "Mostrar ao atendente da recepção os seus próprios dados cadastrais numa coluna estreita e fluida de cerca de 390px, que também funciona bem em 360px e 430px, para conferir tudo rapidamente no celular.",
  "sections": [
    {
      "id": "meusDados",
      "priority": "primary",
      "purpose": "Apresentar o cadastro do atendente conectado em uma única coluna de leitura, com a identificação no topo e os demais dados empilhados logo abaixo, sem rolagem lateral.",
      "organisms": [
        "meuCadastroAtendente"
      ]
    }
  ],
  "organisms": {
    "meuCadastroAtendente": {
      "kind": "detail",
      "text": "Seus dados cadastrais como atendente da recepção, só para consulta. Os dados ficam empilhados para facilitar a leitura em telas estreitas.",
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
