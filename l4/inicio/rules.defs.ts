/// <mls fileReference="_102047_/l4/inicio/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "inicio",
  "rules": {
    "empresaPreparadaDadosObrigatorios": "A empresa só fica preparada quando tem nome, documento, ao menos um endereço e ao menos um contato registrados na plataforma.",
    "naoPedirDadoJaExistente": "O Início pede ao responsável ou à pessoa só os dados que ainda faltam e nunca pede de novo um dado que a plataforma já tem.",
    "somenteResponsavelEditaEmpresa": "Só quem a plataforma já reconhece como responsável pela empresa pode completar os dados da empresa; ser o primeiro a entrar não dá esse papel.",
    "acessoCompletoDadosMinimos": "O acesso da pessoa fica completo quando ela tem nome e país informados e, se o país for o Brasil ou um país da União Europeia, um consentimento de privacidade válido; o telefone não conta.",
    "emailContaNaoEditavel": "O e-mail da pessoa é o da conta autenticada e não pode ser editado no Início.",
    "repetirNaoDuplicaPessoa": "Repetir ou interromper o preenchimento, ou voltar por outro navegador, não cria outra pessoa nem outro vínculo e mostra apenas o que ainda falta.",
    "dadosNaoConcedemPermissoes": "Preencher dados não dá papéis nem permissões; só o responsável dá acesso aos módulos.",
    "ligacaoLoginPelaPlataforma": "Quando já existe outro cadastro com o mesmo e-mail de contato, a pessoa vê que o responsável precisa liberar seu acesso e a ligação do login é decidida pela liberação da plataforma, sem que o Início guarde a pendência ou decida a ligação.",
    "telefoneOpcional": "O telefone da pessoa é opcional e sua ausência não impede completar o acesso.",
    "telefoneSemDuplicarVinculo": "Informar novamente o telefone não cria outro registro de telefone nem outro vínculo com a pessoa.",
    "seguirDiretoSeCompleto": "Ao entrar, a pessoa com cadastro ligado ao seu e-mail e dados mínimos completos segue direto para os módulos que pode usar, sem ver o formulário."
  }
} as const satisfies Ns5Readonly<Ns5RulesArtifactV2>;

export type InicioRulesType = typeof inicioRules;

export default inicioRules;
