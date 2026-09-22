export const descriptions = [
  "A recepcionista usa Pacientes para localizar pacientes já associados à clínica, conferir seus dados e registrar um novo paciente para que ele possa receber consultas. A consulta de pacientes permite informar ou revisar identificador, detalhes de identificação, subtipo, nome, situação, tipo e número de documento, código do país e página; os resultados apresentam os dados retornados para a conferência. A pessoa pode iniciar o cadastro após a busca e preencher detalhes, identificação, nome obrigatório, código do país obrigatório, tipo e número de documento quando disponíveis, dados-base, aliases obrigatórios e observações, antes de registrar o paciente. Enquanto a consulta ou o cadastro estiver em andamento, o estado de processamento é comunicado; quando não houver resultados, isso é explicitado; e uma falha de consulta ou cadastro é apresentada com seu erro, preservando a possibilidade de corrigir dados e tentar novamente. A busca por paciente e o cadastro são utilizáveis por teclado, com rótulos associados aos campos, indicação dos obrigatórios, foco perceptível e mensagens de estado anunciadas por tecnologias assistivas.",
  "A mesma página permite concluir o agendamento para um paciente: a recepcionista localiza e seleciona o paciente, localiza e seleciona o profissional por identificador ou por seus detalhes de identificação — subtipo, nome, situação, documento e código do país — e consulta as consultas por identificador, paciente, profissional, data e hora agendada, situação e página para verificar horários ocupados. Então informa paciente, profissional, data e hora e situação, todos obrigatórios, e registra a consulta somente para um horário disponível. A confirmação resultante deixa claro que o agendamento foi criado; durante o envio há indicação de processamento e, se ele falhar, o erro é informado e os valores permanecem disponíveis para ajuste e nova tentativa. A mudança entre os contextos de localizar paciente, localizar profissional, criar paciente e criar consulta mantém a tarefa corrente compreensível e acessível por teclado e leitor de tela."
] as const;

export const pipeline = [
  {
    "id": "pacientes__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/pacientes.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/pacientes.ts"
    ],
    "dependsOn": [
      "pacientes__l2_shared"
    ],
    "skills": []
  }
] as const;
