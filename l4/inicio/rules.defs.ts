/// <mls fileReference="_102047_/l4/inicio/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "inicio",
  "rules": {
    "empresaPreparadaComDadosObrigatorios": "A empresa fica preparada somente quando tem nome, documento (tipo e número), pelo menos um endereço e pelo menos um contato; essa situação é calculada a partir desses dados e nunca gravada.",
    "naoPedirDadoJaExistente": "As telas pedem somente os dados obrigatórios que ainda faltam, sem pedir de novo o que a plataforma já tem sobre a empresa ou a pessoa.",
    "prepararSomenteResponsavel": "Só o responsável pela empresa pode completar os dados da empresa, convidar pessoas, acompanhar os acessos e liberar o acesso de uma pessoa.",
    "responsavelReconhecidoPelaPlataforma": "O responsável é quem a plataforma já reconhece como responsável pela empresa; ser o primeiro a entrar no app não dá esse papel.",
    "acessoCompletoDadosMinimos": "O acesso da pessoa está completo quando ela tem nome e país informados e, se o país for o Brasil ou da União Europeia, um consentimento de privacidade válido (conforme rule-person-privacy-consent-required-br-eu); o telefone é opcional e não conta.",
    "emailContaNaoEditavel": "O e-mail ligado ao cadastro da pessoa é sempre o e-mail da conta autenticada.",
    "emailDaContaNaoEditavel": "A pessoa não pode editar o e-mail da conta ao completar o acesso; ele é mostrado apenas para leitura.",
    "semDuplicarPessoaAoRepetir": "Repetir ou interromper o completar acesso, ou voltar por outro navegador, não cria outra pessoa nem outro vínculo com o e-mail; a tela mostra apenas o que ainda falta.",
    "contatoSemDuplicarAoRepetir": "Informar de novo o mesmo telefone ou contato, da empresa ou da pessoa, reaproveita o canal já ligado em vez de criar outro.",
    "preencherDadosNaoDaPermissao": "Preencher ou completar dados não concede papéis nem permissões; somente o responsável dá acesso aos módulos.",
    "pessoaCadastradaPeloEmail": "Se não existe pessoa com o e-mail da conta autenticada, a pessoa é cadastrada e ligada a esse e-mail; se existe, o cadastro existente é usado.",
    "liberacaoPeloResponsavel": "Quando a plataforma não consegue ligar o e-mail ao cadastro sozinha, a pessoa é avisada de que o responsável precisa liberar o acesso, e a liberação acontece pelo convite da plataforma para a pessoa certa, sem o módulo guardar essa pendência.",
    "conviteDaPlataformaSemGuardar": "O convite por e-mail usa a pessoa já cadastrada ou cadastra a pessoa e lhe dá o login pelo convite da plataforma, e o módulo não guarda convites.",
    "acessoCompletoSegueDireto": "Ao entrar, a pessoa com cadastro ligado ao seu e-mail e acesso completo segue direto para os módulos que pode usar."
  }
} as const satisfies Ns5Readonly<Ns5RulesArtifactV2>;

export type InicioRulesType = typeof inicioRules;

export default inicioRules;
