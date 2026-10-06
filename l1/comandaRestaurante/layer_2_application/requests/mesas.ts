/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/requests/mesas.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listMesa } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/listMesa.js';
import { createMesa } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/createMesa.js';
import { updateMesa } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/updateMesa.js';
import { listComanda } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/listComanda.js';
import type { MesaResumo } from '/_102047_/l2/comandaRestaurante/web/contracts/mesas.defs.js';

type MesaRecord = {
  id: string;
  version: number;
  code: string;
};

type ComandaRecord = {
  mesaId: string;
  status: string;
};

async function loadAllMesas(ctx: RequestContext): Promise<MesaRecord[]> {
  const records: MesaRecord[] = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const result = await listMesa(
      { page, pageSize: 200 },
      ctx,
    );
    records.push(...(result.items as unknown as MesaRecord[]));
    hasMore = result.hasMore;
    page += 1;
  }
  return records;
}

async function loadOpenMesaIds(ctx: RequestContext): Promise<Set<string>> {
  const openMesaIds = new Set<string>();
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const result = await listComanda(
      { status: 'open', page, pageSize: 200 } as unknown as Parameters<typeof listComanda>[0],
      ctx,
    );
    for (const comanda of result.items as unknown as ComandaRecord[]) {
      if (comanda.status === 'open') openMesaIds.add(comanda.mesaId);
    }
    hasMore = result.hasMore;
    page += 1;
  }
  return openMesaIds;
}

function composeMesa(mesa: MesaRecord, openMesaIds: Set<string>): MesaResumo {
  // Mesa.disponivel: mesaDisponivelParaAbrirComanda — available iff it has no open comanda.
  return {
    id: mesa.id,
    version: mesa.version,
    code: mesa.code,
    details: { disponivel: !openMesaIds.has(mesa.id) },
  };
}

async function composeCreatedOrUpdatedMesa(
  mesa: MesaRecord,
  ctx: RequestContext,
): Promise<MesaResumo> {
  const openMesaIds = await loadOpenMesaIds(ctx);
  return composeMesa(mesa, openMesaIds);
}

export const requests: Record<
  string,
  (input: Record<string, unknown>, ctx: RequestContext) => Promise<Record<string, unknown>>
> = {
  'comandaRestaurante.mesas.carregarMesas': async function (
    input: Record<string, unknown>,
    ctx: RequestContext,
  ): Promise<Record<string, unknown>> {
    void input;
    const mesas = await loadAllMesas(ctx);
    const openMesaIds = await loadOpenMesaIds(ctx);
    const ordered = [...mesas].sort((left, right) => left.code.localeCompare(right.code));
    return {
      mesas: ordered.map((mesa) => composeMesa(mesa, openMesaIds)),
    };
  },

  'comandaRestaurante.mesas.criarMesa': async function (
    input: Record<string, unknown>,
    ctx: RequestContext,
  ): Promise<Record<string, unknown>> {
    const code = String(input.code);
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = {
        ...ctx,
        data: { ...ctx.data, moduleData: tx },
      };
      const created = await createMesa({ code, details: {} }, bound);
      const mesa = await composeCreatedOrUpdatedMesa(
        created as unknown as MesaRecord,
        bound,
      );
      return { mesa };
    });
  },

  'comandaRestaurante.mesas.atualizarMesa': async function (
    input: Record<string, unknown>,
    ctx: RequestContext,
  ): Promise<Record<string, unknown>> {
    const id = String(input.id);
    const version = Number(input.version);
    const code = String(input.code);
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = {
        ...ctx,
        data: { ...ctx.data, moduleData: tx },
      };
      const updated = await updateMesa({ id, version, code, details: {} }, bound);
      const mesa = await composeCreatedOrUpdatedMesa(
        updated as unknown as MesaRecord,
        bound,
      );
      return { mesa };
    });
  },
};
