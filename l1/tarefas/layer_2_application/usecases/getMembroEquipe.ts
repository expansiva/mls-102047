/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface GetMembroEquipeInput extends Record<string, unknown> {
  id: string;
}

export interface GetMembroEquipeOutput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
      countryCode: string;
      tags: string[];
    };
    base: {
      contacts: Record<string, unknown>[];
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    tarefas?: Record<string, unknown>;
  };
}

export async function getMembroEquipe(input: GetMembroEquipeInput, ctx: RequestContext): Promise<GetMembroEquipeOutput> {
  const rawId = input.id;
  if (rawId === undefined || rawId === null || String(rawId) === '') {
    throw new AppError('INVALID_INPUT', 'id is required.', 400);
  }
  const mdmId = String(rawId);
  const found = await ctx.mdm.entity.get({ mdmId });
  if (!found || found.mdmId == null) {
    throw new AppError('NOT_FOUND', 'MembroEquipe was not found.', 404);
  }
  const flat = (found.details ?? {}) as Record<string, unknown>;

  const output: GetMembroEquipeOutput = {
    id: String(found.mdmId),
    version: Number(found.version),
    details: {
      identification: {
        subtype: flat.subtype == null ? 'Person' : String(flat.subtype),
        name: flat.name == null ? '' : String(flat.name),
        status: flat.status == null ? '' : String(flat.status),
        countryCode: flat.countryCode == null ? '' : String(flat.countryCode),
        tags: Array.isArray(flat.tags) ? (flat.tags as unknown[]).map((tag) => String(tag)) : [],
      },
      base: {
        contacts: Array.isArray(flat.contacts) ? (flat.contacts as Record<string, unknown>[]) : [],
      },
    },
  };

  if (flat.privacyConsent != null) {
    output.details.person = { privacyConsent: flat.privacyConsent as Record<string, unknown> };
  }
  if (flat.general != null) {
    output.details.general = flat.general as Record<string, unknown>;
  }
  if (flat.tarefas != null) {
    output.details.tarefas = flat.tarefas as Record<string, unknown>;
  }
  return output;
}
