/// <mls fileReference="_102047_/l2/controleEstoque/web/mobile/page11/movimentacoes.test.ts" enhancement="_blank"/>

// GENERATED — declarative BFF test cases run server-side by the monitor Tests runner (wherever
// TESTS_ENABLED is on).
// Data, not a runnable test module: no node:test import, so scripts/run-tests.mjs never captures it.
// Params valued "<seedRef>" are ENTITY IDS this page itself reads: the runner resolves them at
// run time from the harvested output of this page's read queries (including the rows of any array in
// the envelope). "<seedValue>" is the value of that field on a seeded row; "<seedSpare>"
// is a leftover valid value for a create command (reusing a seeded unique value would collide).
// paramFieldRefs maps those params to the l4 fieldRef so the pool can match by ontology field, not by
// the input's wire name. Literals stay for free input with no entity counterpart (pagination, typed
// format, closed enum). expect.itemsKey names the collection the wire returns
// for a paginated query (the runner assumes "items" when it is absent). "actor" is this page's l4 actor:
// the run executes these cases as the seeded platform identity of that actor, so a route that reads the
// actor id from the session is runnable headless.
// untested: createMovimentacaoEstoque.input — required DTO input is not representable by the monitor flat params
export const pageTests = {
  "moduleName": "controleEstoque",
  "page": "movimentacoes",
  "variant": "page11",
  "actor": "estoquista",
  "cases": [
    {
      "id": "listMovimentacaoEstoque.ok",
      "routine": "controleEstoque.movimentacoes.qryListMovimentacaoEstoque",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array"
      }
    },
    {
      "id": "listProduto.ok",
      "routine": "controleEstoque.movimentacoes.qryListProduto",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array"
      }
    }
  ]
} as const;
