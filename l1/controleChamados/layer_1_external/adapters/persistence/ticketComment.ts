/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketComment.ts" enhancement="_blank"/>

import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const ticketCommentTableDef: TableDefinition = {
  moduleId: 'controleChamados',
  repositoryName: 'controleChamadosTicketComment',
  tableName: 'controlechamados_ticket_comment',
  purpose: 'controle',
  description: 'Comentários associados aos tickets. Campos não indexados ficam em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'ticket_comment_id', postgresType: 'UUID' },
    { name: 'ticket_id', postgresType: 'UUID' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['ticket_comment_id'],
  indexes: [
    {
      name: 'idx_controlechamados_ticket_comment_ticket_id',
      columns: ['ticket_id'],
      unique: false,
    },
  ],
  version: 1,
};