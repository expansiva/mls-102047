/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/requests/movimentacoes.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { listMovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.js';
import { listProduto } from '/_102047_/l1/controleEstoque/layer_2_application/usecases/listProduto.js';
import { createMovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.js';

export const requests = {
  "controleEstoque.movimentacoes.load": async function (input: Record<string, unknown>, ctx: RequestContext): Promise<Record<string, unknown>> {
  const bound: RequestContext = ctx;
  const step0 = await listMovimentacaoEstoque(input as Parameters<typeof listMovimentacaoEstoque>[0], bound, { movimentacaoEstoqueRepository: resolveRepository(bound, "MovimentacaoEstoqueRepository") } as Parameters<typeof listMovimentacaoEstoque>[2]);
  const step1 = await listProduto(input as Parameters<typeof listProduto>[0], bound);
  const out: Record<string, unknown> = {};
  out["movimentacoes"] = projectOutput((step0 && typeof step0 === 'object' ? (step0 as Record<string, unknown>).items : undefined), ["id", "produtoId", "movimentadoEm", "details.tipo", "details.quantidade"]);
  out["produtos"] = projectOutput((step1 && typeof step1 === 'object' ? (step1 as Record<string, unknown>).items : undefined), ["id", "details.identification.name", "details.identification.status", "details.product.unitOfMeasure", "details.controleEstoque.quantidadeMinima", "details.controleEstoque.saldoAtual", "details.controleEstoque.saldoAbaixoDoMinimo"]);
  return out;
  },
  "controleEstoque.movimentacoes.registrarMovimentacao": async function (input: Record<string, unknown>, ctx: RequestContext): Promise<Record<string, unknown>> {
  return ctx.data.moduleData.runInTransaction(async (tx) => {
    const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
    const step0 = await createMovimentacaoEstoque(input as Parameters<typeof createMovimentacaoEstoque>[0], bound, { movimentacaoEstoqueRepository: resolveRepository(bound, "MovimentacaoEstoqueRepository") } as Parameters<typeof createMovimentacaoEstoque>[2]);
    const out: Record<string, unknown> = {};
    out["movimentacaoEstoque"] = projectOutput(step0, ["id", "produtoId", "movimentadoEm", "details.tipo", "details.quantidade"]);
    return out;
  });
  },
};

// A path in `fields` is copied whole; an ancestor of one is walked; anything else is dropped.
function projectOutput(data: unknown, fields: readonly string[], prefix = ''): unknown {
  if (Array.isArray(data)) return data.map(item => projectOutput(item, fields, prefix));
  const source = data && typeof data === 'object' ? data as Record<string, unknown> : {};
  const projected: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(source)) {
    const path = prefix ? prefix + '.' + key : key;
    if (fields.includes(path)) projected[key] = child;
    else if (child && typeof child === 'object' && fields.some(field => field.startsWith(path + '.'))) projected[key] = projectOutput(child, fields, path);
  }
  return projected;
}
