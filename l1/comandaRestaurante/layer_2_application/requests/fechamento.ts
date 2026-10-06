/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/requests/fechamento.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { fecharComanda } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/fecharComanda.js';
import { getComanda } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/getComanda.js';
import { getItemCardapio } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/getItemCardapio.js';
import { getMesa } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/getMesa.js';
import { listComanda } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/listComanda.js';
import { listItemComanda } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/listItemComanda.js';
import { listMesa } from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/listMesa.js';
import type {
  ComandaAbertaResumo,
  ComandaParaFechamento,
  ItemComandaParaFechamento,
} from '/_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.js';

type ComandaRecord = {
  id: string;
  version: number;
  number: number;
  mesaId: string;
  status: string;
  details: {
    discountAmount?: string;
    paymentMethod?: string;
    subtotal?: string;
    totalComanda?: string;
  };
};

type ItemRecord = {
  id: string;
  comandaId: string;
  itemCardapioId: string;
  status: string;
  details: {
    quantidade: number;
    observacao?: string;
    precoUnitario: string;
  };
};

type Money = bigint;

const asComanda = (value: unknown): ComandaRecord => value as ComandaRecord;
const asItem = (value: unknown): ItemRecord => value as ItemRecord;

function cents(value: string | undefined): Money {
  if (value === undefined || value === '') return 0n;
  const negative = value.startsWith('-');
  const raw = negative ? value.slice(1) : value;
  const [whole, fraction = ''] = raw.split('.');
  const result = BigInt(whole || '0') * 100n + BigInt((fraction + '00').slice(0, 2));
  return negative ? -result : result;
}

function money(value: Money): string {
  const negative = value < 0n;
  const absolute = negative ? -value : value;
  return `${negative ? '-' : ''}${absolute / 100n}.${(absolute % 100n)
    .toString()
    .padStart(2, '0')}`;
}

function pageInput(input: Record<string, unknown>): { page: number; pageSize: number } {
  const requestedPage = Number(input.page);
  const requestedPageSize = Number(input.pageSize);
  const pageSize = Math.min(requestedPageSize, 200);
  return {
    page: requestedPage > 0 ? requestedPage : 1,
    pageSize: pageSize > 0 ? pageSize : 20,
  };
}

function listInput(
  input: Record<string, unknown>,
  page: number,
  pageSize: number,
  mesaId?: string,
): Record<string, unknown> {
  const result: Record<string, unknown> = { status: 'open', page, pageSize };
  if (input.number !== undefined) result.number = Number(input.number);
  if (mesaId !== undefined) result.mesaId = mesaId;
  return result;
}

async function mesaIdForCode(
  input: Record<string, unknown>,
  ctx: RequestContext,
): Promise<string | undefined> {
  if (input.mesaCode === undefined) return undefined;
  const result = await listMesa(
    { code: String(input.mesaCode), page: 1, pageSize: 200 },
    ctx,
  );
  const mesa = result.items[0] as { id: string } | undefined;
  return mesa?.id;
}

async function allItems(comandaId: string, ctx: RequestContext): Promise<ItemRecord[]> {
  const result = await listItemComanda(
    { comandaId, status: 'launched', page: 1, pageSize: 200 },
    ctx,
  );
  return result.items.map(asItem);
}

function subtotal(items: ItemRecord[]): Money {
  // valorTotalItemComandaCalculado and subtotalComandaCalculado: quantity times registered price, summed for non-canceled items.
  return items
    .filter((item) => item.status !== 'canceled')
    .reduce(
      (sum, item) => sum + BigInt(item.details.quantidade) * cents(item.details.precoUnitario),
      0n,
    );
}

function total(sub: Money, discount: string | undefined): Money {
  // totalComandaCalculado: subtotal minus the applied discount.
  return sub - cents(discount);
}

async function composeItems(
  items: ItemRecord[],
  ctx: RequestContext,
): Promise<ItemComandaParaFechamento[]> {
  return Promise.all(
    items
      .filter((item) => item.status === 'launched')
      .map(async (item) => {
        const menu = await getItemCardapio({ id: item.itemCardapioId }, ctx);
        // valorTotalItemComandaCalculado: quantity times the registered unit price.
        const value = BigInt(item.details.quantidade) * cents(item.details.precoUnitario);
        return {
          status: 'launched' as const,
          itemCardapioId: item.itemCardapioId,
          details: {
            details: {
              quantidade: item.details.quantidade,
              ...(item.details.observacao === undefined
                ? {}
                : { observacao: item.details.observacao }),
              precoUnitario: item.details.precoUnitario,
            },
            valorTotal: money(value),
          },
          itemCardapio: { name: menu.name },
        };
      }),
  );
}

async function composeFull(
  comanda: ComandaRecord,
  ctx: RequestContext,
): Promise<ComandaParaFechamento> {
  const items = await allItems(comanda.id, ctx);
  const sub = subtotal(items);
  const openAtMesa = await listComanda(
    { status: 'open', mesaId: comanda.mesaId, page: 1, pageSize: 200 } as never,
    ctx,
  );
  // fechamentoLiberaMesa: the mesa is available after closing when no open comanda remains linked to it.
  const disponivel = openAtMesa.items.length === 0;
  return {
    id: comanda.id,
    version: comanda.version,
    number: comanda.number,
    status: comanda.status as 'open' | 'closed',
    details: {
      details: {
        ...(comanda.details.discountAmount === undefined
          ? {}
          : { discountAmount: comanda.details.discountAmount }),
        ...(comanda.details.paymentMethod === undefined
          ? {}
          : {
              paymentMethod: comanda.details.paymentMethod as
                | 'cash'
                | 'debitCard'
                | 'creditCard'
                | 'pix',
            }),
      },
      subtotal: money(sub),
      totalComanda: money(total(sub, comanda.details.discountAmount)),
    },
    items: await composeItems(items, ctx),
    mesa: { disponivel },
  };
}

async function composeSummaries(
  items: ComandaRecord[],
  ctx: RequestContext,
): Promise<ComandaAbertaResumo[]> {
  return Promise.all(
    items.map(async (comanda) => {
      const lines = await allItems(comanda.id, ctx);
      const mesa = await getMesa({ id: comanda.mesaId }, ctx);
      const sub = subtotal(lines);
      return {
        id: comanda.id,
        number: comanda.number,
        mesaId: comanda.mesaId,
        status: 'open' as const,
        details: {
          totalComanda: money(total(sub, comanda.details.discountAmount)),
        },
        mesa: { code: mesa.code },
      };
    }),
  );
}

async function openPage(
  input: Record<string, unknown>,
  ctx: RequestContext,
): Promise<{ openComandas: { items: ComandaAbertaResumo[]; page: number; pageSize: number; hasMore: boolean } }> {
  const { page, pageSize } = pageInput(input);
  const mesaId = await mesaIdForCode(input, ctx);
  const result = await listComanda(listInput(input, page, pageSize, mesaId) as never, ctx);
  const items = await composeSummaries(result.items.map(asComanda), ctx);
  return {
    openComandas: { items, page, pageSize, hasMore: result.hasMore },
  };
}

export const requests: Record<
  string,
  (input: Record<string, unknown>, ctx: RequestContext) => Promise<Record<string, unknown>>
> = {
  /** Carrega as comandas abertas paginadas e, se informado, a comanda selecionada composta para fechamento. */
  'comandaRestaurante.fechamento.carregarFechamento': async function (input, ctx) {
    const openComandas = await openPage(input, ctx);
    if (input.comandaId === undefined) return openComandas;
    const comanda = asComanda(await getComanda({ id: String(input.comandaId) }, ctx));
    if (comanda.status !== 'open') return openComandas;
    return { ...openComandas, selectedComanda: await composeFull(comanda, ctx) };
  },

  /** Busca a primeira janela das comandas abertas usando os filtros informados. */
  'comandaRestaurante.fechamento.buscarComandasAbertas': async function (input, ctx) {
    return openPage(input, ctx);
  },

  /** Carrega uma janela adicional das comandas abertas usando os filtros ativos. */
  'comandaRestaurante.fechamento.carregarMaisComandasAbertas': async function (input, ctx) {
    return openPage(input, ctx);
  },

  /** Obtém uma comanda aberta com itens, pagamento, totais e disponibilidade da mesa calculados. */
  'comandaRestaurante.fechamento.obterComandaParaFechamento': async function (input, ctx) {
    const comanda = asComanda(await getComanda({ id: String(input.id) }, ctx));
    if (comanda.status !== 'open') {
      throw new AppError('NOT_FOUND', 'Comanda aberta não encontrada', 404);
    }
    return { comanda: await composeFull(comanda, ctx) };
  },

  /** Valida pagamento e desconto, fecha a comanda atomicamente e retorna a confirmação recalculada. */
  'comandaRestaurante.fechamento.fecharComandaPaga': async function (input, ctx) {
    const details = input.details as Record<string, unknown>;
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = {
        ...ctx,
        data: { ...ctx.data, moduleData: tx },
      };
      const current = asComanda(await getComanda({ id: String(input.id) }, bound));
      const lines = await allItems(current.id, bound);
      const sub = subtotal(lines);
      const paymentMethod = details.paymentMethod;
      if (typeof paymentMethod !== 'string' || paymentMethod.length === 0) {
        throw new AppError(
          'PAYMENT_REQUIRED',
          'Forma de pagamento é obrigatória',
          400,
          { ruleId: 'pagamentoObrigatorioNoFechamento' },
        );
      }
      const discountAmount =
        details.discountAmount === undefined ? undefined : String(details.discountAmount);
      if (cents(discountAmount) > sub) {
        throw new AppError(
          'DISCOUNT_EXCEEDS_SUBTOTAL',
          'Desconto não pode exceder o subtotal',
          400,
          { ruleId: 'descontoNaoExcedeSubtotal' },
        );
      }
      const closed = asComanda(
        await fecharComanda(
          {
            id: current.id,
            version: Number(input.version),
            details: { discountAmount, paymentMethod },
          },
          bound,
        ),
      );
      // fechamentoLiberaMesa: composeFull calculates availability from the absence of open comandas after the transition.
      return { comanda: await composeFull(closed, bound) };
    });
  },
};
