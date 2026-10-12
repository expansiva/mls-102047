/// <mls fileReference="_102047_/l4/manutencaoFrota/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "manutencaoFrota",
  "rules": {
    "placaUnicaNaFrota": "Cada placa só pode estar cadastrada em um único veículo da frota.",
    "motoristaVeApenasVeiculosAtribuidos": "Na lista de veículos, o motorista vê apenas os veículos atribuídos a ele.",
    "motoristaVeSoVeiculosAtribuidos": "O motorista só consulta os dados e os abastecimentos dos veículos atribuídos a ele.",
    "motoristaSoVeiculoAtribuido": "O motorista só pode registrar abastecimento de um veículo atribuído a ele.",
    "motoristaInativoNaoRegistraAbastecimento": "Um motorista com cadastro inativo não pode registrar abastecimentos.",
    "litrosPositivos": "A quantidade de litros de um abastecimento deve ser maior que zero.",
    "valorAbastecimentoPositivo": "O valor pago em um abastecimento deve ser maior que zero.",
    "kmPainelNaoMenorQueAtual": "O km no painel informado no abastecimento não pode ser menor que a quilometragem atual do veículo.",
    "abastecimentoAtualizaKmVeiculo": "Ao registrar um abastecimento, a quilometragem atual do veículo passa a ser o km no painel informado.",
    "quilometragemNaoRegride": "A quilometragem atual de um veículo nunca pode ser alterada para um valor menor que o anterior.",
    "precoPorLitroCalculado": "O preço por litro de um abastecimento é o valor pago dividido pela quantidade de litros abastecidos.",
    "planoIntervaloObrigatorio": "Todo plano de manutenção preventiva deve ter intervalo em km, intervalo em meses ou ambos, com valores maiores que zero.",
    "proximaPreventivaCalculada": "O km previsto da próxima preventiva é o km da última preventiva somado ao intervalo em km, e a data prevista é a data da última preventiva somada ao intervalo em meses.",
    "avisoPreventivaVencidaPorKm": "O sistema avisa o gestor quando a quilometragem atual de um veículo atinge ou passa do km previsto para a próxima preventiva de um plano ativo dele.",
    "avisoPreventivaVencidaKm": "Um plano ativo é considerado vencido quando o veículo atingiu ou passou do km previsto ou quando a data prevista da próxima preventiva é anterior a hoje.",
    "kmExcedenteCalculado": "O km excedente de um plano é a quilometragem atual do veículo menos o km previsto da próxima preventiva, sendo zero quando ainda não passou, e o km restante é a diferença inversa.",
    "planoInativoSemAviso": "Planos de manutenção inativos não geram aviso de preventiva vencida.",
    "numeroOrdemSequencial": "Cada ordem de manutenção recebe na abertura um número sequencial único.",
    "ordemPreventivaExigePlano": "Uma ordem de manutenção do tipo preventiva deve estar vinculada ao plano de manutenção do mesmo veículo que a originou.",
    "ordemDefeitoSemPlano": "Uma ordem de manutenção do tipo defeito não é vinculada a nenhum plano de manutenção.",
    "oficinaInativaSemNovasOrdens": "Uma oficina com cadastro inativo não pode receber novas ordens de manutenção.",
    "concluirExigeCustoEDataSaida": "Uma ordem de manutenção só pode ser concluída com o custo e a data de saída informados.",
    "dataSaidaNaoAnteriorEntrada": "A data de saída de uma ordem de manutenção não pode ser anterior à sua data de entrada.",
    "concluirPreventivaAtualizaPlano": "Ao concluir uma ordem preventiva, a última preventiva do plano de origem passa a ser o km atual do veículo, a data de saída e a própria ordem.",
    "recalcularAposPreventiva": "Após atualizar a última preventiva de um plano, o km e a data previstos para a próxima preventiva são recalculados a partir dos intervalos do plano.",
    "diasNaOficinaCalculado": "Os dias na oficina de uma ordem são a quantidade de dias entre a data de entrada e a data de saída, ou até hoje enquanto a ordem estiver aberta.",
    "custoTotalManutencaoCalculado": "O custo total de manutenção de um veículo é a soma dos custos das suas ordens de manutenção.",
    "veiculoEmManutencao": "Um veículo está em manutenção quando possui ordem de manutenção com data de entrada e ainda sem data de saída."
  }
} as const satisfies Ns5Readonly<Ns5RulesArtifactV2>;

export type ManutencaoFrotaRulesType = typeof manutencaoFrotaRules;

export default manutencaoFrotaRules;
