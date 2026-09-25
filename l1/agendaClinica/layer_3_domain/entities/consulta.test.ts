/// <mls fileReference="_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.test.ts" enhancement="_blank"/>

import assert from 'node:assert/strict';
import test from 'node:test';

import { scenarioCatalog } from '/_102047_/l1/agendaClinica/materialization/agentMaterializeL1/scenarioCatalog.js';
import '/_102047_/l1/agendaClinica/layer_3_domain/entities/consulta.js';

const scenario = scenarioCatalog.scenarios.find(item => item.scenarioId === 'Consulta');

void test('Consulta keeps the catalog assertion', () => {
  if (!scenario) throw new Error('missing scenario Consulta');
  assert.equal(scenarioCatalog.store, 'memory');
  {
    const item = scenario.cases.find(entry => entry.caseId === 'Consulta.compile');
    if (!item) throw new Error('missing case Consulta.compile');
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
