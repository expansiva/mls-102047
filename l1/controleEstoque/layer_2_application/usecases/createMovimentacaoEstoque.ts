/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { CreateMovimentacaoEstoqueInput as CreateMovimentacaoEstoqueInput_0, CreateMovimentacaoEstoqueOutput as CreateMovimentacaoEstoqueOutput_0 } from '/_102047_/l2/controleEstoque/web/contracts/movimentacoes.defs.js';
import type { CreateMovimentacaoEstoqueInput as CreateMovimentacaoEstoqueInput_1, CreateMovimentacaoEstoqueOutput as CreateMovimentacaoEstoqueOutput_1 } from '/_102047_/l2/controleEstoque/web/contracts/produtos.defs.js';
import type { MovimentacaoEstoqueRepository } from '/_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.js';
export async function createMovimentacaoEstoque(input: CreateMovimentacaoEstoqueInput_0 | CreateMovimentacaoEstoqueInput_1, ctx: RequestContext, ports: { movimentacaoEstoqueRepository: MovimentacaoEstoqueRepository }): Promise<CreateMovimentacaoEstoqueOutput_0 | CreateMovimentacaoEstoqueOutput_1> {
    const body = input as MovimentacaoEstoque;
  const record: MovimentacaoEstoque = {
    id: ctx.idGenerator.newId(),
    version: 1,
    produtoId: input.produtoId,
    movimentadoEm: input.movimentadoEm,
    details: {
      tipo: input.details.tipo,
      quantidade: input.details.quantidade,
    },
  };
  return ports.movimentacaoEstoqueRepository.create(record);
}
