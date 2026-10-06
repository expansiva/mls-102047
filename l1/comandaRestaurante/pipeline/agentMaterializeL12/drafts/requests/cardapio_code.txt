/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/requests/cardapio.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  DetalhesItemCardapio,
  ItemCardapioEdicao,
  ItemCardapioResumo,
} from '/_102047_/l2/comandaRestaurante/web/contracts/cardapio.defs.js';
import {
  createItemCardapio,
  type CreateItemCardapioInput,
} from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/createItemCardapio.js';
import {
  getItemCardapio,
  type GetItemCardapioInput,
} from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/getItemCardapio.js';
import {
  listItemCardapio,
  type ListItemCardapioInput,
} from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/listItemCardapio.js';
import {
  updateItemCardapio,
  type UpdateItemCardapioInput,
} from '/_102047_/l1/comandaRestaurante/layer_2_application/usecases/updateItemCardapio.js';

const pageOf = (input: Record<string, unknown>): { page: number; pageSize: number } => ({
  page: input.page === undefined ? 1 : Number(input.page),
  pageSize: Math.min(input.pageSize === undefined ? 20 : Number(input.pageSize), 200),
});

type UsecaseItem = {
  id: string;
  version: number;
  name: string;
  details: { precoVigente: string };
};

type UsecaseItemSummary = {
  id: string;
  name: string;
  details: { precoVigente: string };
};

const resumo = (item: UsecaseItemSummary): ItemCardapioResumo => ({
  id: item.id,
  name: item.name,
  details: { details: { precoVigente: item.details.precoVigente } },
});

const edicao = (item: UsecaseItem): ItemCardapioEdicao => ({
  id: item.id,
  version: item.version,
  name: item.name,
  details: { details: { precoVigente: item.details.precoVigente } },
});

const usecaseDetails = (input: Record<string, unknown>): { precoVigente: string } => {
  const details = input.details as { details: { precoVigente: string } };
  return { precoVigente: String(details.details.precoVigente) };
};

export const requests: Record<
  string,
  (input: Record<string, unknown>, ctx: RequestContext) => Promise<Record<string, unknown>>
> = {
  'comandaRestaurante.cardapio.carregarItensCardapio': async function (input, ctx) {
    /**
     * Purpose: Carrega a página do catálogo para o caixa conferir os itens disponíveis.
     * Input: page e pageSize controlam a página solicitada, com defaults de 1 e 20.
     * Processing: Lista os itens em ordem estável, pagina o resultado e projeta id, name
     * e details.precoVigente no formato comercial da página; hasMore vem da listagem.
     * Output: A página do catálogo no formato contratado.
     */
    const page = pageOf(input);
    const listed = await listItemCardapio(
      { page: page.page, pageSize: page.pageSize } as ListItemCardapioInput,
      ctx,
    );
    return {
      pagina: {
        items: listed.items.map(resumo),
        page: page.page,
        pageSize: page.pageSize,
        hasMore: listed.hasMore,
      },
    };
  },

  'comandaRestaurante.cardapio.carregarMaisItensCardapio': async function (input, ctx) {
    /**
     * Purpose: Busca a próxima página do catálogo sem transferir todos os itens cadastrados.
     * Input: page e pageSize identificam a página e seu tamanho.
     * Processing: Lista a página em ordem estável, projeta os campos comerciais do catálogo
     * e conserva a indicação de resultados posteriores.
     * Output: Somente a página solicitada para anexação ao catálogo exibido.
     */
    const page = pageOf(input);
    const listed = await listItemCardapio(
      { page: page.page, pageSize: page.pageSize } as ListItemCardapioInput,
      ctx,
    );
    return {
      pagina: {
        items: listed.items.map(resumo),
        page: page.page,
        pageSize: page.pageSize,
        hasMore: listed.hasMore,
      },
    };
  },

  'comandaRestaurante.cardapio.obterItemCardapio': async function (input, ctx) {
    /**
     * Purpose: Obtém o item selecionado para preencher o formulário de manutenção.
     * Input: id identifica o ItemCardapio selecionado.
     * Processing: Consulta o item pelo id e projeta sua version, nome e preço vigente.
     * Output: O item no formato de edição contratado.
     */
    const item = await getItemCardapio({ id: String(input.id) } as GetItemCardapioInput, ctx);
    return { item: edicao(item) };
  },

  'comandaRestaurante.cardapio.cadastrarItemCardapio': async function (input, ctx) {
    /**
     * Purpose: Cadastra um item com nome e preço vigente para uso operacional.
     * Input: name e details.details.precoVigente são os dados informados pelo caixa.
     * Processing: Executa a criação atomicamente dentro da transação e compõe o registro criado.
     * Output: O item criado, incluindo id e version gerados.
     */
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const item = await createItemCardapio(
        { name: String(input.name), details: usecaseDetails(input) } as CreateItemCardapioInput,
        bound,
      );
      return { item: edicao(item) };
    });
  },

  'comandaRestaurante.cardapio.atualizarItemCardapio': async function (input, ctx) {
    /**
     * Purpose: Atualiza o nome e o preço vigente do item selecionado.
     * Input: id, version, name e details.details.precoVigente identificam e alteram o item.
     * Processing: Executa a atualização atomicamente dentro da transação; o usecase recusa
     * versão concorrente e a resposta projeta a nova versão persistida.
     * Output: O item atualizado para redesenhar o formulário.
     */
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const item = await updateItemCardapio(
        {
          id: String(input.id),
          version: Number(input.version),
          name: String(input.name),
          details: usecaseDetails(input),
        } as UpdateItemCardapioInput,
        bound,
      );
      return { item: edicao(item) };
    });
  },
};
