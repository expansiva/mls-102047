/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/requests/agenda_diaria.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Agenda_diariaContracts } from '/_102047_/l2/agendaClinica/web/contracts/agenda_diaria.defs.js';
import { getConsulta } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/getConsulta.js';
import { getPaciente } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/getPaciente.js';
import { getProfissional } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/getProfissional.js';
import { listConsulta } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/listConsulta.js';
import { registrarAtendimento } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/registrarAtendimento.js';

const MAX_PAGE_SIZE = 200;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

type ConsultaDoDia = Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarAgendaDiaria']['output']['consultas']['items'][number];
type ConsultaSelecionada = Agenda_diariaContracts['agendaClinica.agenda_diaria.carregarConsultaSelecionada']['output']['consulta'];
type ConsultaRecord = {
  id: string;
  version: number;
  pacienteId: string;
  profissionalId: string;
  scheduledAt: string;
  status: string;
  details: { attendanceNote?: string };
};

type TodayBounds = { start: number; end: number };

function authenticatedProfessionalId(ctx: RequestContext): string {
  // LOCAL TEST (07/10/2026): the VM session is a platform user, not a professional (actorId is the verified user
  // id, with no module authorities). LOCAL_TEST_ACTOR_ID (the id of a registered professional) takes its place.
  // Remove together with the commented authority checks.
  const id = process.env.LOCAL_TEST_ACTOR_ID || ctx.sessionContext.actorId;
  if (id == null || id.length === 0) {
    throw new AppError('UNAUTHENTICATED', 'O profissional autenticado não foi identificado.', 401);
  }
  return id;
}

function consultationStatus(value: string): ConsultaSelecionada['status'] {
  switch (value) {
    case 'scheduled':
    case 'confirmed':
    case 'noShow':
    case 'attended':
      return value;
    default:
      throw new AppError('INVALID_RECORD', 'A consulta possui uma situação inválida.', 500);
  }
}

function requestedPage(page: number, pageSize: number): { page: number; pageSize: number } {
  return {
    page: page > 0 ? page : DEFAULT_PAGE,
    pageSize: Math.min(pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE),
  };
}

function todayBounds(ctx: RequestContext): TodayBounds {
  const now = new Date(ctx.clock.nowIso());
  const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return { start, end: start + 24 * 60 * 60 * 1000 };
}

function isToday(scheduledAt: string, bounds: TodayBounds): boolean {
  const timestamp = new Date(scheduledAt).getTime();
  return Number.isFinite(timestamp) && timestamp >= bounds.start && timestamp < bounds.end;
}

function assertOwnToday(consulta: ConsultaRecord, ctx: RequestContext): void {
  if (
    consulta.profissionalId !== authenticatedProfessionalId(ctx) ||
    !isToday(consulta.scheduledAt, todayBounds(ctx))
  ) {
    throw new AppError('NOT_FOUND', 'A consulta não pertence à agenda de hoje do profissional.', 404);
  }
}

async function composeConsulta(consulta: ConsultaRecord, ctx: RequestContext): Promise<ConsultaSelecionada> {
  const [paciente, profissional] = await Promise.all([
    getPaciente({ id: consulta.pacienteId }, ctx),
    getProfissional({ id: consulta.profissionalId }, ctx),
  ]);

  const details: ConsultaSelecionada['details'] = { details: {} };
  if (consulta.details.attendanceNote != null) {
    details.details.attendanceNote = consulta.details.attendanceNote;
  }

  return {
    id: consulta.id,
    version: consulta.version,
    pacienteId: consulta.pacienteId,
    profissionalId: consulta.profissionalId,
    scheduledAt: consulta.scheduledAt,
    status: consultationStatus(consulta.status),
    paciente: {
      id: paciente.id,
      details: { details: { identification: { name: paciente.details.identification.name } } },
    },
    profissional: {
      id: profissional.id,
      details: { details: { identification: { name: profissional.details.identification.name } } },
    },
    details,
  };
}

async function todayConsultas(
  input: { page: number; pageSize: number },
  ctx: RequestContext,
): Promise<{ items: ConsultaDoDia[]; page: number; pageSize: number; hasMore: boolean }> {
  const professionalId = authenticatedProfessionalId(ctx);
  const bounds = todayBounds(ctx);
  const records: ConsultaRecord[] = [];
  let sourcePage = 1;
  let hasMore = true;

  while (hasMore) {
    const result = await listConsulta(
      { profissionalId: professionalId, page: sourcePage, pageSize: MAX_PAGE_SIZE },
      ctx,
    );
    records.push(
      ...result.items
        .filter((item) => isToday(item.scheduledAt, bounds))
        .map((item) => ({
          id: item.id,
          version: item.version,
          pacienteId: item.pacienteId,
          profissionalId: item.profissionalId,
          scheduledAt: item.scheduledAt,
          status: item.status,
          details: item.details,
        })),
    );
    hasMore = result.hasMore;
    sourcePage += 1;
  }

  records.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  const page = requestedPage(input.page, input.pageSize);
  const start = (page.page - 1) * page.pageSize;
  const selected = records.slice(start, start + page.pageSize);
  const items: ConsultaDoDia[] = await Promise.all(
    selected.map(async (consulta): Promise<ConsultaDoDia> => {
      const paciente = await getPaciente({ id: consulta.pacienteId }, ctx);
      return {
        id: consulta.id,
        pacienteId: consulta.pacienteId,
        profissionalId: consulta.profissionalId,
        scheduledAt: consulta.scheduledAt,
        status: consultationStatus(consulta.status),
        paciente: {
          id: paciente.id,
          details: { details: { identification: { name: paciente.details.identification.name } } },
        },
      };
    }),
  );

  return {
    items,
    page: page.page,
    pageSize: page.pageSize,
    hasMore: start + page.pageSize < records.length,
  };
}

export const requests: { [K in keyof Agenda_diariaContracts]: (input: Agenda_diariaContracts[K]['input'], ctx: RequestContext) => Promise<Agenda_diariaContracts[K]['output']> } = {
  /** Carrega a agenda própria de hoje, resolve o paciente e pagina as consultas por horário. */
  'agendaClinica.agenda_diaria.carregarAgendaDiaria': async function (input, ctx) {
    return { consultas: await todayConsultas(input, ctx) };
  },

  /** Repete o filtro da agenda própria de hoje para carregar a página solicitada. */
  'agendaClinica.agenda_diaria.carregarMaisConsultasDoDia': async function (input, ctx) {
    return { consultas: await todayConsultas(input, ctx) };
  },

  /** Abre uma consulta própria de hoje e resolve paciente, profissional e anotação. */
  'agendaClinica.agenda_diaria.carregarConsultaSelecionada': async function (input, ctx) {
    const consulta = await getConsulta({ id: input.consultaId }, ctx);
    assertOwnToday(consulta, ctx);
    return { consulta: await composeConsulta(consulta, ctx) };
  },

  /** Registra atomicamente o atendimento e compõe a consulta atualizada. */
  'agendaClinica.agenda_diaria.registrarAtendimento': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await getConsulta({ id: input.id }, bound);
      assertOwnToday(current, bound);

      if (current.status !== 'scheduled' && current.status !== 'confirmed') {
        throw new AppError(
          'INVALID_TRANSITION',
          'A consulta não pode ser registrada como atendida a partir da situação atual.',
          409,
          { ruleId: 'transicaoConsultaValida' },
        );
      }
      if (input.details.details.attendanceNote.trim().length === 0) {
        throw new AppError(
          'VALIDATION_ERROR',
          'O registro do atendimento exige uma anotação.',
          400,
          { ruleId: 'anotacaoObrigatoriaNoAtendimento' },
        );
      }

      const updated = await registrarAtendimento(
        {
          id: String(input.id),
          version: Number(input.version),
          details: { attendanceNote: input.details.details.attendanceNote },
        },
        bound,
      );
      return { consulta: await composeConsulta(updated, bound) };
    });
  },
};
