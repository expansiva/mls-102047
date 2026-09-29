/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/adapters/persistence/movimentacaoEstoqueRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IModuleDataRuntime } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { MovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.js';
import type { MovimentacaoEstoqueRepository, MovimentacaoEstoqueFilter } from '/_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.js';

const REPOSITORY = "movimentacaoEstoque";
const PRIMARY_KEY = ["id"] as const;
const UNIQUE_KEYS: readonly (readonly string[])[] = [];
const BINDINGS = [{"field":"id","column":"id","placement":"column"},{"field":"version","column":"json:version","placement":"json"},{"field":"produtoId","column":"produtoId","placement":"column"},{"field":"movimentadoEm","column":"movimentadoEm","placement":"column"},{"field":"details.tipo","column":"json:details.tipo","placement":"json"},{"field":"details.quantidade","column":"json:details.quantidade","placement":"json"}] as const;
const JSON_COLUMN = "details";
const VERSION_FIELD = "version";

type Row = Record<string, unknown>;

function readPath(record: Row, path: string): unknown {
  let node: unknown = record;
  for (const part of path.split('.').filter(Boolean)) {
    if (!node || typeof node !== 'object') return undefined;
    node = (node as Row)[part];
  }
  return node;
}

function writePath(record: Row, path: string, value: unknown): void {
  if (value === undefined) return;
  const parts = path.split('.').filter(Boolean);
  let node = record;
  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      node[part] = value;
      return;
    }
    const next = node[part];
    if (!next || typeof next !== 'object' || Array.isArray(next)) node[part] = {};
    node = node[part] as Row;
  });
}

function jsonKey(field: string): string {
  const prefix = `${JSON_COLUMN}.`;
  return field.startsWith(prefix) ? field.slice(prefix.length) : field;
}

function columnOf(field: string): string {
  const binding = BINDINGS.find(item => item.field === field);
  return binding && binding.placement === 'column' ? binding.column : field;
}

function toRow(record: Row): Row {
  const row: Row = {};
  const details: Row = {};
  let json = false;
  for (const binding of BINDINGS) {
    const value = readPath(record, binding.field);
    if (binding.placement === 'json') {
      json = true;
      if (value !== undefined) writePath(details, jsonKey(binding.field), value);
    } else if (value !== undefined) row[binding.column] = value;
  }
  if (json) row[JSON_COLUMN] = details;
  return row;
}

function fromRow(row: Row): Row {
  const record: Row = {};
  const details = row[JSON_COLUMN];
  const bag = details && typeof details === 'object' && !Array.isArray(details) ? details as Row : {};
  for (const binding of BINDINGS) {
    const value = binding.placement === 'json' ? readPath(bag, jsonKey(binding.field)) : row[binding.column];
    if (value !== undefined) writePath(record, binding.field, value);
  }
  return record;
}

function sameIdentity(row: Row, record: Row): boolean {
  return PRIMARY_KEY.every(field => row[columnOf(field)] === readPath(record, field));
}

function rejectDuplicate(rows: readonly Row[], record: Row): void {
  // enforce:unique
  for (const key of UNIQUE_KEYS) {
    const matches = rows.filter(row => key.every(field => row[columnOf(field)] === readPath(record, field)));
    if (matches.some(row => !sameIdentity(row, record))) throw new AppError('CONFLICT', 'Unique key already stored.', 409);
  }
  // end:unique
}

function withVersion(record: Row, current: unknown): Row {
  // enforce:version
  if (!VERSION_FIELD) return record;
  const next: Row = { ...record };
  if (current === undefined) {
    if (readPath(next, VERSION_FIELD) === undefined) writePath(next, VERSION_FIELD, 1);
    return next;
  }
  const incoming = readPath(next, VERSION_FIELD);
  if (incoming === undefined) throw new AppError('PRECONDITION_UNDECLARED', 'Stored version has no incoming version.', 409);
  if (incoming !== current) throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  writePath(next, VERSION_FIELD, Number(current) + 1);
  return next;
}

export function bind(runtime: IModuleDataRuntime): MovimentacaoEstoqueRepository {
  return {
    async create(record: MovimentacaoEstoque): Promise<MovimentacaoEstoque> {
      const body = withVersion(record as unknown as Row, undefined);
      const table = await runtime.getTable<Row>(REPOSITORY);
      rejectDuplicate(await table.findMany(), body);
      const row = toRow(body);
      await table.insert({ record: row });
      return fromRow(row) as unknown as MovimentacaoEstoque;
    },
    async list(filter: MovimentacaoEstoqueFilter): Promise<MovimentacaoEstoque[]> {
      const where: Row = {};
      for (const binding of BINDINGS) {
        if (binding.placement !== 'column') continue;
        const value = readPath(filter as Row, binding.field);
        if (value !== undefined) where[binding.column] = value;
      }
      const table = await runtime.getTable<Row>(REPOSITORY);
      const rows = await table.findMany({ where });
      return rows.map(row => fromRow(row) as unknown as MovimentacaoEstoque);
    },
  };
}

export function createMovimentacaoEstoqueRepository(ctx: RequestContext): MovimentacaoEstoqueRepository {
  return bind(ctx.data.moduleData);
}
