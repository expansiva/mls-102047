/// <mls fileReference="_102047_/l2/controleEstoque/web/shared/movimentacoes.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { ControleEstoqueMovimentacoesBase } from '/_102047_/l2/controleEstoque/web/shared/movimentacoes.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: ControleEstoqueMovimentacoesBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_pageStatus = Assert<Assignable<typeof page.pageStatus, "idle" | "loading" | "empty" | "success" | "error">>;
type _State_scenary = Assert<Assignable<typeof page.scenary, "base" | "createMovimentacaoEstoque">>;
type _State_stateCreateMovimentacaoEstoqueProdutoId = Assert<Assignable<typeof page.stateCreateMovimentacaoEstoqueProdutoId, unknown>>;
type _State_stateCreateMovimentacaoEstoqueMovimentadoEm = Assert<Assignable<typeof page.stateCreateMovimentacaoEstoqueMovimentadoEm, unknown>>;
type _State_stateCreateMovimentacaoEstoqueDetailsTipo = Assert<Assignable<typeof page.stateCreateMovimentacaoEstoqueDetailsTipo, "entrada" | "saida" | null>>;
type _State_stateCreateMovimentacaoEstoqueDetailsQuantidade = Assert<Assignable<typeof page.stateCreateMovimentacaoEstoqueDetailsQuantidade, unknown>>;
type _State_stateCreateMovimentacaoEstoqueStatus = Assert<Assignable<typeof page.stateCreateMovimentacaoEstoqueStatus, "idle" | "loading" | "success" | "error">>;
type _State_stateCreateMovimentacaoEstoqueError = Assert<Assignable<typeof page.stateCreateMovimentacaoEstoqueError, unknown>>;
type _State_stateCreateMovimentacaoEstoqueResult = Assert<Assignable<typeof page.stateCreateMovimentacaoEstoqueResult, unknown>>;
type _State_stateListMovimentacaoEstoqueId = Assert<Assignable<typeof page.stateListMovimentacaoEstoqueId, unknown>>;
type _State_stateListMovimentacaoEstoqueProdutoId = Assert<Assignable<typeof page.stateListMovimentacaoEstoqueProdutoId, unknown>>;
type _State_stateListMovimentacaoEstoqueMovimentadoEm = Assert<Assignable<typeof page.stateListMovimentacaoEstoqueMovimentadoEm, unknown>>;
type _State_stateListMovimentacaoEstoquePage = Assert<Assignable<typeof page.stateListMovimentacaoEstoquePage, unknown>>;
type _State_stateListMovimentacaoEstoqueStatus = Assert<Assignable<typeof page.stateListMovimentacaoEstoqueStatus, "idle" | "loading" | "success" | "error">>;
type _State_stateListMovimentacaoEstoqueError = Assert<Assignable<typeof page.stateListMovimentacaoEstoqueError, unknown>>;
type _State_stateListMovimentacaoEstoqueResult = Assert<Assignable<typeof page.stateListMovimentacaoEstoqueResult, unknown[]>>;
type _State_stateListProdutoId = Assert<Assignable<typeof page.stateListProdutoId, unknown>>;
type _State_stateListProdutoDetailsIdentificationSubtype = Assert<Assignable<typeof page.stateListProdutoDetailsIdentificationSubtype, "Product" | null>>;
type _State_stateListProdutoDetailsIdentificationName = Assert<Assignable<typeof page.stateListProdutoDetailsIdentificationName, unknown>>;
type _State_stateListProdutoDetailsIdentificationStatus = Assert<Assignable<typeof page.stateListProdutoDetailsIdentificationStatus, "Active" | "Inactive" | "Merged" | "Blocked" | null>>;
type _State_stateListProdutoPage = Assert<Assignable<typeof page.stateListProdutoPage, unknown>>;
type _State_stateListProdutoStatus = Assert<Assignable<typeof page.stateListProdutoStatus, "idle" | "loading" | "success" | "error">>;
type _State_stateListProdutoError = Assert<Assignable<typeof page.stateListProdutoError, unknown>>;
type _State_stateListProdutoResult = Assert<Assignable<typeof page.stateListProdutoResult, unknown[]>>;
type _Action_setScenario = Assert<Assignable<typeof page.setScenario, (...args: any[]) => unknown>>;
type _Action_selectCreateMovimentacaoEstoqueProdutoId = Assert<Assignable<typeof page.selectCreateMovimentacaoEstoqueProdutoId, (...args: any[]) => unknown>>;
type _Action_setCreateMovimentacaoEstoqueMovimentadoEm = Assert<Assignable<typeof page.setCreateMovimentacaoEstoqueMovimentadoEm, (...args: any[]) => unknown>>;
type _Action_setCreateMovimentacaoEstoqueDetailsTipo = Assert<Assignable<typeof page.setCreateMovimentacaoEstoqueDetailsTipo, (...args: any[]) => unknown>>;
type _Action_setCreateMovimentacaoEstoqueDetailsQuantidade = Assert<Assignable<typeof page.setCreateMovimentacaoEstoqueDetailsQuantidade, (...args: any[]) => unknown>>;
type _Action_runCreateMovimentacaoEstoque = Assert<Assignable<typeof page.runCreateMovimentacaoEstoque, (...args: any[]) => unknown>>;
type _Action_setListMovimentacaoEstoqueId = Assert<Assignable<typeof page.setListMovimentacaoEstoqueId, (...args: any[]) => unknown>>;
type _Action_selectListMovimentacaoEstoqueProdutoId = Assert<Assignable<typeof page.selectListMovimentacaoEstoqueProdutoId, (...args: any[]) => unknown>>;
type _Action_setListMovimentacaoEstoqueMovimentadoEm = Assert<Assignable<typeof page.setListMovimentacaoEstoqueMovimentadoEm, (...args: any[]) => unknown>>;
type _Action_runListMovimentacaoEstoque = Assert<Assignable<typeof page.runListMovimentacaoEstoque, (...args: any[]) => unknown>>;
type _Action_setListProdutoId = Assert<Assignable<typeof page.setListProdutoId, (...args: any[]) => unknown>>;
type _Action_setListProdutoDetailsIdentificationSubtype = Assert<Assignable<typeof page.setListProdutoDetailsIdentificationSubtype, (...args: any[]) => unknown>>;
type _Action_setListProdutoDetailsIdentificationName = Assert<Assignable<typeof page.setListProdutoDetailsIdentificationName, (...args: any[]) => unknown>>;
type _Action_setListProdutoDetailsIdentificationStatus = Assert<Assignable<typeof page.setListProdutoDetailsIdentificationStatus, (...args: any[]) => unknown>>;
type _Action_runListProduto = Assert<Assignable<typeof page.runListProduto, (...args: any[]) => unknown>>;

export {};