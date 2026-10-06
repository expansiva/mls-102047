/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/createItemComanda.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ItemComanda } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/itemComanda.js';
import type { ItemComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/itemComandaRepository.js';
import type { ComandaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/comandaRepository.js';
import type { ItemCardapioRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/itemCardapioRepository.js';
export interface CreateItemComandaInput extends Record<string, unknown> {
comandaId: string;
itemCardapioId: string;
status: string;
details: {
quantidade: number;
observacao?: string;
precoUnitario: string;
};
}
export interface CreateItemComandaOutput extends Record<string, unknown> {
id: string;
version: number;
comandaId: string;
itemCardapioId: string;
status: string;
details: {
quantidade: number;
observacao?: string;
precoUnitario: string;
valorTotal?: string;
};
}

export async function createItemComanda(input: CreateItemComandaInput, ctx: RequestContext): Promise<CreateItemComandaOutput> {
const comandaId = String(input.comandaId);
const itemCardapioId = String(input.itemCardapioId);
const inputDetails: Record<string, unknown> = input.details;
const quantidade = Number(inputDetails.quantidade);
const observacao = inputDetails.observacao === undefined ? undefined : String(inputDetails.observacao);

if (!comandaId || !itemCardapioId || !Number.isInteger(quantidade) || quantidade < 1) {
throw new AppError('INVALID_ITEM_COMANDA', 'The comanda, menu item, and quantity are required and valid.', 400);
}

const comandaRepository = resolveRepository<ComandaRepository>(ctx, 'ComandaRepository');
const comandas = await comandaRepository.list({ id: comandaId });
if (comandas.length === 0) {
throw new AppError('NOT_FOUND', 'The comanda does not exist.', 404);
}
if (comandas[0].status !== 'open') {
throw new AppError('ITEMS_ONLY_IN_OPEN_COMANDA', 'An item can only be launched in an open comanda.', 409, { ruleId: 'itensSomenteEmComandaAberta' });
}

const menuRepository = resolveRepository<ItemCardapioRepository>(ctx, 'ItemCardapioRepository');
const menuItems = await menuRepository.list({ id: itemCardapioId });
if (menuItems.length === 0) {
throw new AppError('NOT_FOUND', 'The menu item does not exist.', 404);
}
// precoUnitarioRegistradoNoLancamento: the unit price is the menu item's current price at launch.
const precoVigente = menuItems[0].details.precoVigente;
const vigente = precoVigente === undefined || precoVigente === null ? undefined : String(precoVigente);
if (vigente === undefined) {
throw new AppError('INVALID_MENU_ITEM_PRICE', 'The current menu item price is unavailable.', 400, { ruleId: 'precoUnitarioRegistradoNoLancamento' });
}

const valorTotal = String(quantidade * Number(vigente));
if (!Number.isFinite(Number(valorTotal))) {
throw new AppError('INVALID_MENU_ITEM_PRICE', 'The current menu item price is invalid.', 400, { ruleId: 'precoUnitarioRegistradoNoLancamento' });
}
const record: ItemComanda = {
id: ctx.idGenerator.newId(),
version: 1,
comandaId,
itemCardapioId,
status: 'launched',
details: {
quantidade,
...(observacao !== undefined ? { observacao } : {}),
precoUnitario: vigente,
},
};
const repository = resolveRepository<ItemComandaRepository>(ctx, 'ItemComandaRepository');
const saved = await repository.create(record);
return {
id: saved.id,
version: saved.version,
comandaId: saved.comandaId,
itemCardapioId: saved.itemCardapioId,
status: saved.status,
details: {
quantidade: saved.details.quantidade,
...(saved.details.observacao !== undefined ? { observacao: saved.details.observacao } : {}),
precoUnitario: saved.details.precoUnitario,
valorTotal: String(saved.details.quantidade * Number(saved.details.precoUnitario)),
},
};
}
