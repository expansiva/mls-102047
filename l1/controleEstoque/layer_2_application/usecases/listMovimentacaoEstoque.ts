/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ListMovimentacaoEstoqueInput as ListMovimentacaoEstoqueInput_0, ListMovimentacaoEstoqueOutput as ListMovimentacaoEstoqueOutput_0 } from '/_102047_/l2/controleEstoque/web/contracts/movimentacoes.defs.js';
import type { ListMovimentacaoEstoqueInput as ListMovimentacaoEstoqueInput_1, ListMovimentacaoEstoqueOutput as ListMovimentacaoEstoqueOutput_1 } from '/_102047_/l2/controleEstoque/web/contracts/produtos.defs.js';
import type { MovimentacaoEstoqueRepository } from '/_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.js';
export async function listMovimentacaoEstoque(input: ListMovimentacaoEstoqueInput_0 | ListMovimentacaoEstoqueInput_1, ctx: RequestContext, ports: { movimentacaoEstoqueRepository: MovimentacaoEstoqueRepository }): Promise<ListMovimentacaoEstoqueOutput_0 | ListMovimentacaoEstoqueOutput_1> {
    const filled = (value: unknown): boolean => value !== undefined && value !== null && value !== '';
  const body = input as MovimentacaoEstoque;
  const where: Record<string, unknown> = {};
  if (filled(body.id)) where.id = body.id;
  if (filled(body.produtoId)) where.produtoId = body.produtoId;
  if (filled(body.movimentadoEm)) where.movimentadoEm = body.movimentadoEm;
  const found = await ports.movimentacaoEstoqueRepository.list(where);
  return found;
}
