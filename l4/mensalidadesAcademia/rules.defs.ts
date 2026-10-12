/// <mls fileReference="_102047_/l4/mensalidadesAcademia/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "mensalidadesAcademia",
  "rules": {
    "planoValorPositivo": "O valor do plano deve ser maior que zero.",
    "planoDiaVencimentoValido": "O dia de vencimento do plano deve ser um dia do mês entre 1 e 31; nos meses mais curtos, o vencimento cai no último dia do mês.",
    "planoNomeUnico": "Não pode haver dois planos com o mesmo nome na academia.",
    "planoInativoNaoMatricula": "Um plano inativo não pode receber novas matrículas.",
    "umaMatriculaAtivaPorAluno": "Um aluno pode ter no máximo uma matrícula ativa por vez.",
    "matriculaDataInicioObrigatoria": "Toda matrícula deve ter uma data de início, a partir da qual passa a receber mensalidades.",
    "gerarApenasMatriculasAtivas": "As mensalidades do mês são geradas somente para matrículas ativas com data de início até o mês de referência.",
    "mensalidadeUnicaPorMatriculaMes": "Cada matrícula pode ter no máximo uma mensalidade por mês de referência; gerar novamente o mesmo mês não duplica mensalidades já geradas.",
    "valorDaMensalidadeDoPlano": "O valor da mensalidade é copiado do valor do plano no momento da geração e não muda se o plano for alterado depois.",
    "vencimentoNoDiaDoPlano": "O vencimento da mensalidade é o dia de vencimento do plano dentro do mês de referência.",
    "mensalidadeVencidaAposVencimento": "Uma mensalidade não paga cuja data de vencimento já passou fica vencida.",
    "mensalidadePagaQuandoQuitada": "Uma mensalidade fica paga quando a soma dos pagamentos registrados para ela alcança o valor cobrado.",
    "pagamentoValorPositivo": "O valor de um pagamento deve ser maior que zero.",
    "pagamentoSomenteMensalidadeAberta": "Só é possível registrar pagamento para mensalidade em aberto ou vencida, nunca para mensalidade já paga.",
    "pagamentoQuitaMensalidade": "Ao registrar um pagamento, a mensalidade passa a paga quando o total pago alcança o valor cobrado; caso contrário, mantém o saldo devedor.",
    "alunoBloqueadoComDuasVencidas": "O aluno com duas ou mais mensalidades vencidas fica bloqueado.",
    "alunoBloqueadoDuasVencidas": "A matrícula do aluno é considerada bloqueada enquanto ele tiver duas ou mais mensalidades vencidas.",
    "alunoBloqueadoNaoPodeEntrar": "O aluno bloqueado não pode entrar na academia até regularizar as mensalidades vencidas.",
    "alunoBloqueadoNaoEntra": "Só é liberado para entrada o aluno com matrícula ativa e que não esteja bloqueado.",
    "desbloqueioAposRegularizacao": "O aluno deixa de estar bloqueado quando, após os pagamentos, passa a ter menos de duas mensalidades vencidas.",
    "alunoInadimplenteComUmaVencida": "O aluno é inadimplente quando tem ao menos uma mensalidade vencida e não paga.",
    "cancelamentoEncerraMensalidadesFuturas": "Ao cancelar a matrícula, não são geradas mensalidades para meses posteriores à data de cancelamento.",
    "cancelamentoEncerraGeracaoFutura": "Somente matrícula ativa pode ser cancelada, e o cancelamento encerra a geração de mensalidades futuras.",
    "matriculaCanceladaEncerraGeracao": "Uma matrícula cancelada nunca é incluída na geração de mensalidades.",
    "painelTotalAreceber": "O total a receber no mês é a soma dos saldos das mensalidades com vencimento no mês de referência que ainda não foram quitadas.",
    "painelTotalRecebido": "O total recebido no mês é a soma dos valores dos pagamentos com data de pagamento dentro do mês de referência."
  }
} as const satisfies Ns5Readonly<Ns5RulesArtifactV2>;

export type MensalidadesAcademiaRulesType = typeof mensalidadesAcademiaRules;

export default mensalidadesAcademiaRules;
