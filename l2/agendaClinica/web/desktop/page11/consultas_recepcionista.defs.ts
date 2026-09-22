export const descriptions = [
  "A recepcionista consulta as consultas da clínica para agendar um paciente com um profissional em data e horário disponíveis e, para uma consulta localizada, registrar a confirmação por telefone ou a falta do paciente.",
  "A consulta informa paciente, profissional, data e horário agendados e situação. A busca de consultas aceita identidade da consulta, paciente, profissional, data e horário, situação e página de resultados. Para localizar pacientes e profissionais durante o agendamento, estão disponíveis os respectivos dados de identificação, incluindo identificação, subtipo, nome, situação, tipo e número de documento e código do país, além da página de resultados.",
  "A recepcionista pode alterar os critérios e consultar as consultas, abrir e conferir a consulta selecionada, e avançar pelos resultados. Ao agendar, localiza e seleciona paciente e profissional, confere os horários já ocupados do profissional na data pretendida e preenche paciente, profissional, data e horário e situação para registrar a consulta. O agendamento só é concluído quando não existe outra consulta do mesmo profissional naquele horário. Para uma consulta selecionada, pode registrar a confirmação telefônica ou a falta; após cada registro, a relação de consultas é atualizada.",
  "Durante o carregamento, o andamento da consulta de dados ou do registro é comunicado e a mesma operação não deve ser repetida. Sem consultas para os critérios, é informado que não há resultados. Falhas de consulta ou de registro são apresentadas de forma compreensível, inclusive quando o horário não está disponível, permitindo revisar os critérios ou dados e tentar novamente. O sucesso comunica o registro realizado e reflete a consulta criada ou atualizada.",
  "A interação é utilizável por teclado e ponteiro. Rótulos e instruções deixam claros os dados de paciente, profissional, data e horário, os campos obrigatórios do agendamento e que confirmação e falta exigem uma consulta selecionada. Tecnologias assistivas recebem atualizações de carregamento, vazio, erro e sucesso, com foco seguindo a sequência de consulta, seleção e ação."
] as const;

export const pipeline = [
  {
    "id": "consultas_recepcionista__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/consultas_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/consultas_recepcionista.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas_recepcionista.ts"
    ],
    "dependsOn": [
      "consultas_recepcionista__l2_shared"
    ],
    "skills": []
  }
] as const;
