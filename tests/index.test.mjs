import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('known blocks', () => {
  assert.equal(api.encodeBacon('ABZ'), 'AAAAA AAAAB BBAAB');
});
test('full alphabet', () => {
  const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  assert.equal(api.decodeBacon(api.encodeBacon(t)), t);
});
test('no historical merging', () => {
  assert.notEqual(api.encodeBacon('I'), api.encodeBacon('J'));
  assert.notEqual(api.encodeBacon('U'), api.encodeBacon('V'));
});
test('empty', () => {
  assert.equal(api.decodeBacon(''), '');
});
test('reserved and grammar', () => {
  for (const t of ['BBBBB', 'AAAA', 'aaaaa', 'AAAAA  AAAAB'])
    assert.throws(() => api.decodeBacon(t));
});
test('uppercase and limits', () => {
  assert.throws(() => api.encodeBacon('a'));
  assert.throws(() => api.encodeBacon('A'.repeat(16385)));
});
