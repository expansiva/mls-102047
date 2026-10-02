/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/getProduto.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
export interface GetProdutoInput extends Record<string, unknown> {
  id: string;
}
export interface GetProdutoOutput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
    };
    base: Record<string, unknown>;
    product: {
      unitOfMeasure: string;
    };
    general: Record<string, unknown>;
    controleEstoque: {
      quantidadeMinima: number;
      saldoAtual: number;
      saldoAbaixoDoMinimo: boolean;
    };
  };
}
export async function getProduto(input: GetProdutoInput, ctx: RequestContext): Promise<GetProdutoOutput> {
    const body = input as unknown as Record<string, unknown>;
  const present = (value: unknown): boolean => value !== undefined && value !== null && value !== '';
  const readPath = (source: unknown, path: string): unknown => {
    let node: unknown = source;
    for (const part of path.split('.')) {
      if (!node || typeof node !== 'object') return undefined;
      node = (node as Record<string, unknown>)[part];
    }
    return node;
  };
  const writePath = (source: Record<string, unknown>, path: string, value: unknown): void => {
    const parts = path.split('.');
    let node = source;
    for (let index = 0; index < parts.length - 1; index += 1) {
      const part = parts[index];
      const child = node[part];
      if (!child || typeof child !== 'object' || Array.isArray(child)) node[part] = {};
      node = node[part] as Record<string, unknown>;
    }
    node[parts[parts.length - 1]] = value;
  };
  const nest = (flat: unknown): Record<string, unknown> => {
    const source = flat && typeof flat === 'object' ? flat as Record<string, unknown> : {};
    const details: Record<string, unknown> = {};
    const leaves = [["subtype","identification.subtype"],["name","identification.name"],["status","identification.status"],["base","base"],["unitOfMeasure","product.unitOfMeasure"],["general","general"],["quantidadeMinima","controleEstoque.quantidadeMinima"],["saldoAtual","controleEstoque.saldoAtual"],["saldoAbaixoDoMinimo","controleEstoque.saldoAbaixoDoMinimo"]] as ReadonlyArray<readonly [string, string]>;
    for (const [tail, path] of leaves) {
      if (tail && source[tail] !== undefined) writePath(details, path, source[tail]);
    }
    return details;
  };
  const pack = (row: Record<string, unknown>) => ({ id: String(row.mdmId ?? ''), version: Number(row.version ?? 0), details: nest(row.details) });
  const priors: Record<string, Record<string, unknown>> = {};
  let current: Record<string, unknown> | null = null;
  const remember = (id: string, value: Record<string, unknown> | null): void => {
    priors[id] = value ?? {};
    if (value && present(value.mdmId)) current = value;
  };
  if (present(readPath(body, "id"))) {
    const found = await ctx.mdm.entity.get({ mdmId: String(readPath(body, "id")) });
    remember("get", found ? { mdmId: found.mdmId, version: found.version, details: found.details } as Record<string, unknown> : null);
  }
  if (!(present(readPath(body, "id")))) remember("get", null);
  const chosen = ["get"].map(key => priors[key]).find(item => present(item["mdmId"]));
  if (!chosen) throw new AppError('NOT_FOUND', 'Record was not found.', 404);
  return pack(chosen) as unknown as GetProdutoOutput;
}
