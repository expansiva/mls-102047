/// <mls fileReference="_102047_/l4/inicio/module.defs.ts" enhancement="_blank"/>

import type { Ns5ModuleArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inicioModule = {
  "schemaVersion": "2026-09-10-ns5-module-v2",
  "moduleName": "inicio",
  "title": "Início",
  "userLanguage": "pt-BR",
  "productLanguages": [
    "pt-BR"
  ],
  "defaultLanguage": "pt-BR",
  "sourcePrompt": "Módulo Início: a primeira tela do app de uma empresa. Dá boas-vindas, ajuda o responsável a preparar a empresa e deixa cada pessoa completar o próprio acesso. Não tem IA nem processo com etapas: são telas e ações simples. Pessoas: o responsável pela empresa e a pessoa da organização. O responsável é quem a plataforma já reconhece como responsável; ser o primeiro a entrar não dá esse papel. Toda pessoa autenticada e aceita na organização é pessoa da organização; o responsável também é. O convite para entrar na organização é feito fora do Início, antes do login: quem chega aqui já foi convidado e já entrou. O Início não convida ninguém e não recebe aviso de convite aceito: a pessoa já chega cadastrada e ligada ao login pela plataforma. Preparar a empresa (responsável): confirma os dados da empresa que faltam (nome, documento, endereço, contato), sem pedir de novo o que a plataforma já tem. Vê as pessoas da organização e quais ainda não completaram o acesso. No fim, a tela mostra um texto fixo de orientação com o link para criar o primeiro módulo no Studio; os módulos da empresa são da plataforma e o módulo não os guarda. A empresa fica marcada como preparada quando os dados obrigatórios estão completos. Completar meu acesso (pessoa da organização): ao entrar, se a pessoa já tem cadastro ligado ao seu e-mail e os dados mínimos completos, segue direto para os módulos que pode usar. Se falta algo, a tela pede só o que falta: nome, telefone opcional, país e o consentimento de privacidade quando a lei do país exige (Brasil e União Europeia). O e-mail é o da conta autenticada e não pode ser editado. Se não há pessoa com esse e-mail, a plataforma cadastra a pessoa e a liga ao e-mail. Se a plataforma não conseguir ligar o e-mail sozinha porque já existe outro cadastro com esse e-mail de contato, a pessoa vê que o responsável precisa liberar o seu acesso, e o responsável libera o acesso dela pela liberação da plataforma, que resolve a qual cadastro o login fica ligado; o módulo não guarda essa pendência nem decide como ligar. Repetir ou interromper não cria outra pessoa nem outro vínculo; voltar por outro navegador mostra o que ainda falta. Preencher dados não dá papéis nem permissões; quem dá acesso aos módulos é o responsável."
} as const satisfies Ns5Readonly<Ns5ModuleArtifact>;

export type InicioModuleType = typeof inicioModule;

export default inicioModule;
