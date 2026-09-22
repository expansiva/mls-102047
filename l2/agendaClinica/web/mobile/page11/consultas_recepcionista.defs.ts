export const descriptions = [
  "No celular, a recepcionista executa as mesmas tarefas: encontra consultas, pacientes e profissionais; agenda uma consulta em horário livre; confirma por telefone uma consulta selecionada; ou registra a falta do paciente.",
  "Em espaço reduzido, a leitura prioriza os dados decisivos da consulta — paciente, profissional, data e horário e situação — e conserva os dados de identificação necessários para localizar pacientes e profissionais. Também permanecem disponíveis os critérios de consulta por identidade, paciente, profissional, data e horário, situação e página, bem como a verificação dos horários ocupados antes do agendamento.",
  "Por toque, a recepcionista ajusta os critérios das consultas e navega pelos resultados, escolhe a consulta para conferência e para as ações de confirmação ou falta, e inicia o agendamento. No agendamento, seleciona paciente e profissional, informa data e horário e situação, e somente registra quando o horário do profissional estiver livre. As buscas de paciente e profissional permitem informar identificação, subtipo, nome, situação, tipo e número de documento, código do país e página. Os alvos de toque são claros sem eliminar qualquer ação disponível.",
  "O carregamento da busca, de pacientes, de profissionais ou de um registro é anunciado, evitando toques repetidos. Quando não houver consultas correspondentes, uma mensagem explica o resultado vazio. Erros permanecem perceptíveis para correção e nova tentativa, inclusive se o horário escolhido já estiver ocupado. Depois de criar, confirmar ou registrar falta, os resultados de consultas são atualizados e o êxito é comunicado.",
  "A ordem de leitura por leitor de tela acompanha a prioridade dos dados da consulta e das ações. Controles têm nome acessível, campos obrigatórios recebem indicação antes do envio e as ações de confirmação e falta informam a necessidade de selecionar uma consulta. Estados de carregamento, resultado vazio, erro e sucesso são anunciados de modo acessível."
] as const;

export const pipeline = [
  {
    "id": "consultas_recepcionista__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/consultas_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/consultas_recepcionista.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas_recepcionista.ts"
    ],
    "dependsOn": [
      "consultas_recepcionista__l2_shared"
    ],
    "skills": []
  }
] as const;
