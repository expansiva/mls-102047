/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticket.ts" enhancement="_blank"/>

import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const ticketTableDef: TableDefinition = {
  moduleId: 'controleChamados',
  repositoryName: 'controleChamadosTicket',
  tableName: 'controlechamados_ticket',
  purpose: 'controle',
  description: 'Tickets. Campos não indexados são armazenados em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'ticket_id',
      postgresType: 'UUID',
      description: 'Primary key and foreign-key identifier for the ticket.',
    },
    {
      name: 'title',
      postgresType: 'TEXT',
      description: 'Searchable ticket title.',
    },
    {
      name: 'status',
      postgresType: 'TEXT',
      description: 'Ticket status.',
    },
    {
      name: 'details',
      postgresType: 'JSONB',
      nullable: true,
    },
  ],
  primaryKey: ['ticket_id'],
  indexes: [
    {
      name: 'controlechamados_ticket_title_idx',
      columns: ['title'],
    },
    {
      name: 'controlechamados_ticket_status_idx',
      columns: ['status'],
    },
  ],
  version: 1,
};
