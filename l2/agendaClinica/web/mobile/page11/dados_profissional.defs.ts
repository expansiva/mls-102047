export const descriptions = [
  "No celular, o profissional prioriza a leitura e a manutenção do próprio cadastro. A experiência torna legíveis os dados já disponíveis e oferece a edição completa dos dados de atuação clínica: identificação, nome, tipo e número de documento, código do país, dados base e pessoais, ocupação, consentimento de privacidade, informações gerais e informações da agenda clínica. O preenchimento deixa explícito que nome, código do país e ocupação são obrigatórios, sem ocultar os dados opcionais nem a capacidade de editá-los.",
  "Com espaço reduzido, a pessoa consegue avançar pela leitura e pelo preenchimento sem perder as tarefas de consultar o cadastro, criar um cadastro ausente ou atualizar um cadastro existente. Enquanto dados ou envio estão em processamento, há retorno claro de andamento e prevenção de envios duplicados. A ausência de cadastro é explicada e conduz ao preenchimento para criação. Falhas de consulta, criação ou atualização mostram o erro aplicável, mantêm os valores informados e disponibilizam nova tentativa; uma conclusão bem-sucedida atualiza a consulta dos profissionais.",
  "Os alvos de toque têm identificação inequívoca e espaço suficiente para acionamento. Rótulos, obrigatoriedade, valores de consentimento e erros são comunicados também a leitores de tela. A navegação por teclado externo conserva foco visível e sequência lógica, e atualizações de carregamento, vazio, sucesso e falha são anunciadas sem depender apenas de cor ou movimento."
] as const;

export const pipeline = [
  {
    "id": "dados_profissional__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/dados_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/dados_profissional.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/dados_profissional.ts"
    ],
    "dependsOn": [
      "dados_profissional__l2_shared"
    ],
    "skills": []
  }
] as const;
