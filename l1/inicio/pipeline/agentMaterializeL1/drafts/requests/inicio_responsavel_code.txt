/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/inicio_responsavel.ts" enhancement="_blank"/>

import type { Inicio_responsavelContracts } from '/_102047_/l2/inicio/web/contracts/inicio_responsavel.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';
import { listPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.js';
import type { ListPessoaOrganizacaoOutput } from '/_102047_/l1/inicio/layer_2_application/usecases/listPessoaOrganizacao.js';

type PessoaRecord = ListPessoaOrganizacaoOutput['items'][number];

const MAX_PAGE_SIZE = 200;
const DEFAULT_PAGE_SIZE = 20;

// Países em que o consentimento de privacidade é exigido: Brasil (LGPD) e União Europeia (GDPR).
const PAISES_COM_CONSENTIMENTO = new Set<string>([
  'BR',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

function isBlank(value: string | null | undefined): boolean {
  return value == null || String(value).trim() === '';
}

/** Todas as pessoas com o papel inicio.PessoaOrganizacao, lidas página a página pelo usecase. */
async function listarTodasPessoas(ctx: RequestContext): Promise<PessoaRecord[]> {
  const todas: PessoaRecord[] = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const result = await listPessoaOrganizacao({ page, pageSize: MAX_PAGE_SIZE }, ctx);
    for (const item of result.items) todas.push(item);
    hasMore = result.hasMore === true && result.items.length > 0;
    page += 1;
  }
  return todas;
}

/** acessoCompletoDadosMinimos: nome, país e, para Brasil/UE, consentimento de privacidade; telefone não conta. */
function calcularAcessoPessoa(pessoa: PessoaRecord): {
  acessoCompleto: boolean;
  dadosFaltantes: string[];
  consentimentoExigido: boolean;
  consentimentoPendente: boolean;
} {
  const faltantes: string[] = [];
  const nome = pessoa.details?.identification?.name;
  const pais = pessoa.details?.identification?.countryCode;
  if (isBlank(nome)) faltantes.push('nome');
  if (isBlank(pais)) faltantes.push('país');
  const consentimentoExigido = !isBlank(pais) && PAISES_COM_CONSENTIMENTO.has(String(pais).toUpperCase());
  const consent = pessoa.details?.person?.privacyConsent;
  const consentimentoValido = consent != null && Object.keys(consent).length > 0;
  const consentimentoPendente = consentimentoExigido && !consentimentoValido;
  if (consentimentoPendente) faltantes.push('consentimento de privacidade');
  return {
    acessoCompleto: faltantes.length === 0,
    dadosFaltantes: faltantes,
    consentimentoExigido,
    consentimentoPendente,
  };
}

function resumirContatos(contacts: Record<string, unknown>[] | undefined): string {
  if (contacts == null) return '';
  return contacts
    .map((c) => (c.value == null ? '' : String(c.value)))
    .filter((v) => v !== '')
    .join(', ');
}

export const requests: { [K in keyof Inicio_responsavelContracts]: (input: Inicio_responsavelContracts[K]['input'], ctx: RequestContext) => Promise<Inicio_responsavelContracts[K]['output']> } = {
  "inicio.inicio_responsavel.qryPainelResponsavel": async function (input, ctx) {
    const empresaId = ctx.sessionContext.activeCompanyId ?? ctx.sessionContext.businessContext.activeCompanyId;
    if (empresaId == null || empresaId === '') {
      throw new AppError('NOT_FOUND', 'Empresa da organização da sessão não encontrada', 404);
    }
    const empresa = await getEmpresa({ id: String(empresaId) }, ctx);

    // empresaPreparadaDadosObrigatorios / naoPedirDadoJaExistente: lista só o que a plataforma ainda não tem.
    const dadosFaltantesEmpresa: string[] = [];
    if (isBlank(empresa.details.identification.name)) dadosFaltantesEmpresa.push('nome');
    if (isBlank(empresa.details.identification.docType) || isBlank(empresa.details.identification.docId)) {
      dadosFaltantesEmpresa.push('documento');
    }
    const enderecos = empresa.details.base.addresses ?? [];
    if (enderecos.length === 0) dadosFaltantesEmpresa.push('endereço');
    const contatos = empresa.details.base.contacts ?? [];
    if (contatos.length === 0) dadosFaltantesEmpresa.push('contato');

    // acessoCompletoDadosMinimos: contagem sobre as pessoas da organização.
    const pessoas = await listarTodasPessoas(ctx);
    let totalAcessoCompleto = 0;
    let totalComDadosFaltando = 0;
    let totalConsentimentoPendente = 0;
    for (const pessoa of pessoas) {
      const acesso = calcularAcessoPessoa(pessoa);
      if (acesso.acessoCompleto) totalAcessoCompleto += 1;
      if (acesso.dadosFaltantes.length > 0) totalComDadosFaltando += 1;
      if (acesso.consentimentoPendente) totalConsentimentoPendente += 1;
    }

    return {
      empresa: {
        id: empresa.id,
        details: {
          identification: { name: empresa.details.identification.name },
          inicio: {
            preparada: dadosFaltantesEmpresa.length === 0,
            dadosFaltantes: dadosFaltantesEmpresa,
          },
        },
      },
      indicadores: {
        totalAcessoCompleto,
        totalComDadosFaltando,
        totalConsentimentoPendente,
      },
    };
  },

  "inicio.inicio_responsavel.qryPessoasAguardandoLiberacao": async function (input, ctx) {
    const page = Number.isFinite(input.page) && input.page >= 1 ? Math.floor(input.page) : 1;
    const requestedSize = Number.isFinite(input.pageSize) && input.pageSize >= 1 ? Math.floor(input.pageSize) : DEFAULT_PAGE_SIZE;
    const pageSize = Math.min(requestedSize, MAX_PAGE_SIZE);

    const todas = await listarTodasPessoas(ctx);

    // Situação na plataforma não ativa (Inactive ou Blocked). A ligação do login é decidida pela plataforma
    // (ligacaoLoginPelaPlataforma); o Início não guarda pendência. Preencher dados não concede permissões
    // (dadosNaoConcedemPermissoes): esta lista só mostra.
    const aguardando: { pessoa: PessoaRecord; status: 'Inactive' | 'Blocked' }[] = [];
    for (const pessoa of todas) {
      const status = pessoa.details?.identification?.status;
      if (status === 'Inactive' || status === 'Blocked') aguardando.push({ pessoa, status });
    }

    aguardando.sort((a, b) =>
      String(a.pessoa.details?.identification?.name ?? '').localeCompare(
        String(b.pessoa.details?.identification?.name ?? ''),
        undefined,
        { sensitivity: 'base' },
      ),
    );

    const start = (page - 1) * pageSize;
    const slice = aguardando.slice(start, start + pageSize);
    const hasMore = aguardando.length > start + pageSize;

    const items = slice.map(({ pessoa, status }) => ({
      id: pessoa.id,
      details: {
        identification: {
          name: String(pessoa.details?.identification?.name ?? ''),
          status,
        },
        base: {
          contacts: resumirContatos(pessoa.details?.base?.contacts),
        },
        inicio: {
          // acessoCompletoDadosMinimos
          dadosFaltantes: calcularAcessoPessoa(pessoa).dadosFaltantes,
        },
      },
    }));

    return { pessoas: { items, page, pageSize, hasMore } };
  },
};
