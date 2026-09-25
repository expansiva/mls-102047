/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.test.ts" enhancement="_blank"/>

import assert from 'node:assert/strict';
import test from 'node:test';

import { scenarioCatalog } from '/_102047_/l1/agendaClinica/materialization/agentMaterializeL1/scenarioCatalog.js';
import { pendingConsultaRepository } from '/_102047_/l1/agendaClinica/layer_2_application/ports/consultaRepository.js';

const scenario = scenarioCatalog.scenarios.find(item => item.scenarioId === 'ConsultaRepository');

void test('ConsultaRepository keeps the catalog assertion', () => {
  if (!scenario) throw new Error('missing scenario ConsultaRepository');
  assert.equal(scenarioCatalog.store, 'memory');
  void pendingConsultaRepository;
  {
    const item = scenario.cases.find(entry => entry.caseId === 'ConsultaRepository.compile');
    if (!item) throw new Error('missing case ConsultaRepository.compile');
    assert.equal(item.gate, 'compile');
    assert.equal(item.expect.ok, true);
    assert.equal(item.expect.status, 0);
    assert.equal(item.expect.errorCode, null);
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "");
  }
});
