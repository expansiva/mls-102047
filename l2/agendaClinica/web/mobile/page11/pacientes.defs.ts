export const descriptions = [
  "No celular, Pacientes prioriza a identificação do paciente e o avanço seguro da recepcionista entre busca, cadastro e agendamento, sem retirar nenhuma tarefa. Ela pesquisa pacientes usando identificador, detalhes de identificação, subtipo, nome, situação, tipo e número de documento, código do país e página, e lê os resultados devolvidos para reconhecer quem já está cadastrado. Pode abrir o contexto de novo paciente e informar detalhes, identificação, nome e código do país obrigatórios, além de tipo e número de documento, dados-base, aliases obrigatórios e observações quando cabíveis, para registrar ou associar o paciente à clínica. Toques acionam buscas, escolhas e registro; controles têm área de toque adequada, nomes acessíveis, ordem de foco coerente e obrigatoriedade e erros compreensíveis para leitor de tela. O processamento, a ausência de pacientes e falhas de busca ou cadastro são comunicados sem ocultar os dados já inseridos, permitindo corrigir e tentar de novo.",
  "Para marcar a consulta no espaço reduzido, a recepcionista primeiro encontra o paciente e o profissional. A pesquisa de profissionais conserva identificador, detalhes de identificação, subtipo, nome, situação, documento, código do país e página, e seus resultados permitem a seleção informada. Ela consulta as consultas existentes com identificador, paciente, profissional, data e hora agendada, situação e página para avaliar a disponibilidade do profissional. Em seguida, preenche paciente, profissional, data e hora e situação obrigatórios e confirma a criação da consulta, que só é concluída se o horário estiver disponível. O resultado confirma o agendamento; processamento e erro de criação são anunciados de forma acessível, e os valores continuam disponíveis para revisão e novo envio. Os contextos de localizar paciente, localizar profissional, criar paciente e criar consulta permanecem distinguíveis por leitura e por interação por toque."
] as const;

export const pipeline = [
  {
    "id": "pacientes__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/pacientes.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/pacientes.ts"
    ],
    "dependsOn": [
      "pacientes__l2_shared"
    ],
    "skills": []
  }
] as const;
