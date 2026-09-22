export const descriptions = [
  "A recepcionista consulta e mantém o próprio cadastro de atuação na clínica, reunindo os dados vinculados a Profissional e a Recepcionista. A página apresenta os dados recuperados de ambos os cadastros e permite informar ou corrigir identificação — nome, código do país e, quando aplicável, tipo e número de documento — além de ocupação e consentimento de privacidade do perfil profissional; também permite preencher os dados disponíveis de base, pessoa, gerais e agenda clínica do perfil de recepcionista. Quando já houver registros, a confirmação atualiza os respectivos cadastros; quando não houver registro correspondente, permite criá-lo. A página comunica carregamento durante a consulta ou o salvamento, ausência de dados quando a consulta não retornar cadastro e erro de consulta ou de gravação com a mensagem disponível e uma forma de tentar consultar novamente. Após criar ou atualizar, o conteúdo consultado é renovado para refletir o resultado. Campos obrigatórios são identificados, valores inválidos recebem orientação associada ao campo, o status das operações é anunciado por tecnologias assistivas e todos os controles, inclusive confirmar e tentar novamente, podem ser alcançados e operados por teclado com rótulos compreensíveis."
] as const;

export const pipeline = [
  {
    "id": "dados_recepcionista__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/dados_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/dados_recepcionista.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/dados_recepcionista.ts"
    ],
    "dependsOn": [
      "dados_recepcionista__l2_shared"
    ],
    "skills": []
  }
] as const;
