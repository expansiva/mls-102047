/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/createProduto.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
export interface CreateProdutoInput extends Record<string, unknown> {
  details: {
    identification: {
      name: string;
    };
    base: Record<string, unknown>;
    product: {
      unitOfMeasure: string;
    };
    general: Record<string, unknown>;
    controleEstoque: {
      quantidadeMinima: number;
    };
  };
}
export interface CreateProdutoOutput extends Record<string, unknown> {
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
export async function createProduto(input: CreateProdutoInput, ctx: RequestContext): Promise<CreateProdutoOutput> {
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
  // enforce:create
  if (true) {
    const details: Record<string, unknown> = {};
    details.subtype = "Product";
    const nameValue = readPath(body, "details.identification.name");
    if (present(nameValue)) details["name"] = nameValue;
    const unitOfMeasureValue = readPath(body, "details.product.unitOfMeasure");
    if (present(unitOfMeasureValue)) details["unitOfMeasure"] = unitOfMeasureValue;
    const created = await ctx.mdm.entity.create({ details: details as never });
    remember("createPerson", { mdmId: created.mdmId, version: created.version, details: created.details } as Record<string, unknown>);
  }
  // enforce:create end
  if (!priors["createPerson"]) remember("createPerson", null);
  const attached = await ctx.mdm.entity.attachRole(String([priors["createPerson"]].map(item => item["mdmId"]).find(value => present(value))), "controleEstoque.Produto");
  remember("attachRole", { mdmId: attached.mdmId, version: attached.version, details: attached.details } as Record<string, unknown>);
  const chosen = ["createPerson","attachRole"].map(key => priors[key]).find(item => present(item["mdmId"]));
  if (!chosen) throw new AppError('NOT_FOUND', 'Record was not found.', 404);
  return pack(chosen) as unknown as CreateProdutoOutput;
}
