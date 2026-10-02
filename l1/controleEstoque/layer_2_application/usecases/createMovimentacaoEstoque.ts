/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MovimentacaoEstoqueRepository } from '/_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.js';
export interface CreateMovimentacaoEstoqueInput extends Record<string, unknown> {
  produtoId: string;
  movimentadoEm: string;
  details: {
    tipo: string;
    quantidade: number;
  };
}
export interface CreateMovimentacaoEstoqueOutput extends Record<string, unknown> {
  id: string;
  version: number;
  produtoId: string;
  movimentadoEm: string;
  details: {
    tipo: string;
    quantidade: number;
  };
}
export async function createMovimentacaoEstoque(input: CreateMovimentacaoEstoqueInput, ctx: RequestContext, ports: { movimentacaoEstoqueRepository: MovimentacaoEstoqueRepository }): Promise<CreateMovimentacaoEstoqueOutput> {
    const body = input;
  const record = {
    id: ctx.idGenerator.newId(),
    version: 1,
    produtoId: input.produtoId,
    movimentadoEm: input.movimentadoEm,
    details: {
      tipo: input.details.tipo,
      quantidade: input.details.quantidade,
    },
  } as MovimentacaoEstoque;
  const saved = await ports.movimentacaoEstoqueRepository.create(record);
  return {
    id: saved.id,
    version: saved.version,
    produtoId: saved.produtoId,
    movimentadoEm: saved.movimentadoEm,
    details: saved.details,
  };
}
