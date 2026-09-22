export const descriptions = [
  "No celular, a recepcionista prioriza a leitura do seu cadastro e a atualização dos mesmos dados de atuação na clínica, sem perder nenhuma capacidade disponível no desktop. Os dados de Profissional e Recepcionista são apresentados de modo legível no espaço reduzido, permitindo revisar e editar nome, código do país, tipo e número de documento quando informados, ocupação, consentimento de privacidade e os dados disponíveis de base, pessoa, gerais e agenda clínica. Conforme exista ou não um cadastro para cada vínculo, a confirmação atualiza o registro existente ou cria o registro correspondente. A experiência preserva o que a pessoa já digitou enquanto informa carregamento de consulta ou envio; se não houver dados, explica a ausência de cadastro, e se ocorrer falha, apresenta o erro disponível e permite uma nova consulta. Depois de uma criação ou atualização, os dados são consultados novamente para mostrar o estado atual. A ordem de leitura deixa propósito, dados e confirmação claros em telas estreitas; alvos de toque são utilizáveis, campos obrigatórios e erros são anunciados e associados aos respectivos campos, e todos os controles mantêm nomes acessíveis para leitor de tela e navegação por teclado quando houver."
] as const;

export const pipeline = [
  {
    "id": "dados_recepcionista__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/dados_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/dados_recepcionista.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/dados_recepcionista.ts"
    ],
    "dependsOn": [
      "dados_recepcionista__l2_shared"
    ],
    "skills": []
  }
] as const;
