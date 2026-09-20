const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
test('Tizen opens the canonical TV login once without retaining the launcher', () => {
  const navigations = [];
  vm.runInNewContext(fs.readFileSync('js/main.js', 'utf8'), {
    window: { location: { replace: url => navigations.push(url) } },
    document: { addEventListener() {} }, setTimeout: callback => callback(), console,
  });
  assert.deepEqual(navigations, ['https://serika.moe/login?platform=tizen']);
});
