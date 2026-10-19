/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/inicio_pessoa.ts" enhancement="_blank"/>

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import { listPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.js';
import type { Inicio_pessoaContracts } from '/_102047_/l2/inicio/web/contracts/inicio_pessoa.defs.js';

type Route = Inicio_pessoaContracts['inicio.inicio_pessoa.qryInicioPessoa'];
type Output = Route['output'];
type Status = Output['meuAcesso']['details']['identification']['status'];

// Brasil e países da União Europeia: exigem consentimento de privacidade.
const CONSENT_COUNTRIES: string[] = [
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function toStatus(value: string): Status {
  switch (value) {
    case 'Active':
    case 'Inactive':
    case 'Merged':
    case 'Blocked':
      return value;
    default:
      throw new AppError('INVALID_STATUS', 'Situação do cadastro da pessoa desconhecida: ' + value, 500);
  }
}

function isValidConsent(consent: Record<string, unknown> | null | undefined): boolean {
  if (consent == null) return false;
  if ('granted' in consent) return consent.granted === true;
  if ('accepted' in consent) return consent.accepted === true;
  if ('consented' in consent) return consent.consented === true;
  if (consent.revokedAt != null || consent.withdrawnAt != null) return false;
  if (typeof consent.expiresAt === 'string' && consent.expiresAt !== '') {
    const expires = Date.parse(consent.expiresAt);
    if (!Number.isNaN(expires) && expires < Date.now()) return false;
  }
  return true;
}

function contactsOf(record: { details?: unknown }): Record<string, unknown>[] {
  const details = asRecord(record.details);
  const base = details ? asRecord(details.base) : null;
  const contacts = base ? base.contacts : null;
  if (!Array.isArray(contacts)) return [];
  const out: Record<string, unknown>[] = [];
  for (const c of contacts) {
    const r = asRecord(c);
    if (r) out.push(r);
  }
  return out;
}

function emailsOf(contacts: Record<string, unknown>[]): string[] {
  const out: string[] = [];
  for (const c of contacts) {
    const raw = c.value ?? c.email;
    if (typeof raw === 'string' && raw.includes('@')) out.push(raw.trim().toLowerCase());
  }
  return out;
}

export const requests: { [K in keyof Inicio_pessoaContracts]: (input: Inicio_pessoaContracts[K]['input'], ctx: RequestContext) => Promise<Inicio_pessoaContracts[K]['output']> } = {
  'inicio.inicio_pessoa.qryInicioPessoa': async function (input, ctx) {
    const sessionPerson = ctx.sessionContext.person;
    if (sessionPerson == null) {
      throw new AppError('NOT_FOUND', 'Nenhuma pessoa da organização ligada à sessão.', 404);
    }

    // read.byId: cadastro da pessoa logada.
    const pessoa = await getPessoaOrganizacao({ id: sessionPerson.mdmId }, ctx);
    const ident = pessoa.details.identification;
    const name = typeof ident.name === 'string' ? ident.name.trim() : '';
    const countryCode = typeof ident.countryCode === 'string' ? ident.countryCode.trim().toUpperCase() : '';

    // acessoCompletoDadosMinimos: nome e país; consentimento válido se Brasil ou União Europeia; telefone não conta.
    const consentimentoExigido = countryCode !== '' && CONSENT_COUNTRIES.includes(countryCode);
    const consentOk = isValidConsent(pessoa.details.person?.privacyConsent);

    // naoPedirDadoJaExistente: só o que a plataforma ainda não tem.
    const dadosFaltantes: string[] = [];
    if (name === '') dadosFaltantes.push('nome');
    if (countryCode === '') dadosFaltantes.push('país');
    if (consentimentoExigido && !consentOk) dadosFaltantes.push('consentimento de privacidade');
    const acessoCompleto = dadosFaltantes.length === 0;

    // emailContaNaoEditavel: o e-mail vem só para leitura, extraído dos contatos.
    const contacts = contactsOf(pessoa);
    const ownEmails = emailsOf(contacts);
    const emailConta = ownEmails.length > 0 ? ownEmails[0] : sessionPerson.email;

    // ligacaoLoginPelaPlataforma: outro cadastro com o mesmo e-mail indica que o login não está ligado.
    let outroCadastroComMesmoEmail = false;
    if (emailConta != null && emailConta !== '') {
      const alvo = emailConta.trim().toLowerCase();
      let page = 1;
      let hasMore = true;
      while (hasMore && !outroCadastroComMesmoEmail) {
        const res = await listPessoaOrganizacao({ page, pageSize: 200 }, ctx);
        for (const item of res.items) {
          if (String(item.id) === String(pessoa.id)) continue;
          if (emailsOf(contactsOf(item)).includes(alvo)) {
            outroCadastroComMesmoEmail = true;
            break;
          }
        }
        hasMore = res.hasMore;
        page += 1;
      }
    }

    const pendencias: Output['pendencias'] = [];
    if (outroCadastroComMesmoEmail) {
      // ligacaoLoginPelaPlataforma: pendência calculada, sem guardar nem decidir a ligação.
      pendencias.push({
        tipo: 'pedirLiberacao',
        emailConta,
        details: { inicio: {} },
      });
    } else if (!acessoCompleto) {
      // login ligado e acesso incompleto.
      pendencias.push({
        tipo: 'completarDadosMinimos',
        emailConta,
        details: { inicio: { dadosFaltantes } },
      });
    }
    // seguirDiretoSeCompleto: acesso completo e ligado -> lista vazia.

    const identificacao: Output['meuAcesso']['details']['identification'] = {
      status: toStatus(ident.status),
    };
    if (name !== '') identificacao.name = name;
    if (countryCode !== '') identificacao.countryCode = countryCode;

    const meuAcesso: Output['meuAcesso'] = {
      id: pessoa.id,
      details: {
        identification: identificacao,
        inicio: { acessoCompleto, dadosFaltantes, consentimentoExigido },
      },
    };

    const output: Output = { meuAcesso, pendencias };

    // Empresa ligada por AssignedTo (relationshipRefs.assignments); só nome e nome fantasia (pessoaVerEmpresa).
    const refs = asRecord(pessoa.details.base.relationshipRefs);
    const assignments = refs ? refs.assignments : null;
    if (Array.isArray(assignments) && assignments.length > 0) {
      const empresa = await getEmpresa({ id: String(assignments[0]) }, ctx);
      const company: Output['meuAcesso'] extends never ? never : { tradeName?: string } = {};
      const tradeName = empresa.details.company.tradeName;
      if (tradeName != null && tradeName !== '') company.tradeName = tradeName;
      output.empresa = {
        details: {
          identification: { name: empresa.details.identification.name },
          company,
        },
      };
    }

    return output;
  },
};
