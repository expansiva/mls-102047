/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/consultas.test.ts" enhancement="_blank"/>

import assert from 'node:assert/strict';
import test from 'node:test';

import { scenarioCatalog } from '/_102047_/l1/agendaClinica/materialization/agentMaterializeL1/scenarioCatalog.js';
import { routes } from '/_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/consultas.js';

const scenario = scenarioCatalog.scenarios.find(item => item.scenarioId === 'consultas');

void test('consultas keeps the catalog assertion', () => {
  if (!scenario) throw new Error('missing scenario consultas');
  assert.equal(scenarioCatalog.store, 'memory');
  void routes;
  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.auth.cmdCreateConsulta');
    if (!item) throw new Error('missing case consultas.auth.cmdCreateConsulta');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.cmdCreateConsulta");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.auth.cmdRegistrarFalta');
    if (!item) throw new Error('missing case consultas.auth.cmdRegistrarFalta');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.cmdRegistrarFalta");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.auth.cmdUpdateConsulta');
    if (!item) throw new Error('missing case consultas.auth.cmdUpdateConsulta');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.cmdUpdateConsulta");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.auth.qryListConsulta');
    if (!item) throw new Error('missing case consultas.auth.qryListConsulta');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.qryListConsulta");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.auth.qryListPaciente');
    if (!item) throw new Error('missing case consultas.auth.qryListPaciente');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.qryListPaciente");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.auth.qryListProfissional');
    if (!item) throw new Error('missing case consultas.auth.qryListProfissional');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.qryListProfissional");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.compile');
    if (!item) throw new Error('missing case consultas.compile');
    assert.equal(item.gate, 'compile');
    assert.equal(item.expect.ok, true);
    assert.equal(item.expect.status, 0);
    assert.equal(item.expect.errorCode, null);
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.contract.cmdCreateConsulta.pacienteId');
    if (!item) throw new Error('missing case consultas.contract.cmdCreateConsulta.pacienteId');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.cmdCreateConsulta");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.contract.cmdRegistrarFalta.id');
    if (!item) throw new Error('missing case consultas.contract.cmdRegistrarFalta.id');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.cmdRegistrarFalta");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.contract.cmdUpdateConsulta.id');
    if (!item) throw new Error('missing case consultas.contract.cmdUpdateConsulta.id');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.cmdUpdateConsulta");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.contract.qryListConsulta.id');
    if (!item) throw new Error('missing case consultas.contract.qryListConsulta.id');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.qryListConsulta");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.contract.qryListPaciente.id');
    if (!item) throw new Error('missing case consultas.contract.qryListPaciente.id');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.qryListPaciente");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'consultas.contract.qryListProfissional.id');
    if (!item) throw new Error('missing case consultas.contract.qryListProfissional.id');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.consultas.qryListProfissional");
  }
});
