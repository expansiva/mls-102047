export const descriptions = [
  "O profissional consulta o próprio cadastro e mantém seus dados de atuação clínica. A página apresenta os dados disponíveis do profissional e permite informar ou alterar o conjunto de dados, incluindo identificação, nome, tipo e número de documento, código do país, dados base e pessoais, ocupação, consentimento de privacidade, informações gerais e informações da agenda clínica. Nome, código do país e ocupação são obrigatórios; os demais dados disponibilizados podem permanecer sem preenchimento quando não exigidos.",
  "Quando ainda não houver cadastro disponível, a página comunica o estado vazio e permite preencher os dados para criar o profissional. Quando houver um cadastro selecionado, seus dados podem ser alterados e enviados como atualização. Durante a consulta ou o envio, comunica que a operação está em andamento e evita que um novo envio concorra com o atual. Em caso de falha na consulta, criação ou atualização, apresenta a mensagem de erro correspondente, preserva o que foi digitado e permite tentar novamente a ação aplicável. Após uma criação ou atualização bem-sucedida, a consulta dos profissionais é renovada.",
  "Todos os campos possuem rótulos claros, indicação textual de obrigatoriedade e associação programática a mensagens de validação e erro. As ações de consultar, criar e salvar atualização podem ser executadas por teclado, com foco visível e ordem de navegação compreensível. Alterações de carregamento, vazio, sucesso e erro são anunciadas de forma acessível; campos de consentimento expõem estado e instrução para tecnologias assistivas."
] as const;

export const pipeline = [
  {
    "id": "dados_profissional__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/dados_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/dados_profissional.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/dados_profissional.ts"
    ],
    "dependsOn": [
      "dados_profissional__l2_shared"
    ],
    "skills": []
  }
] as const;
