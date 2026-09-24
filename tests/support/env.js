// Test-only env vars for the Impact functions. Never used in production.
module.exports = function setTestEnv(extra) {
  Object.assign(process.env, {
    IMPACT_ACCESS_CODES: JSON.stringify([
      { code: 'TEST-VALID', client: 'Test client', expires: '2099-12-31' },
      { code: 'TEST-EXPIRED', client: 'Test client', expires: '2020-01-01' },
    ]),
    HUBSPOT_IMPACT_FORM_ID: 'test-form-guid',
    IMPACT_STATS_PASSWORD: 'test-stats-password',
    RATE_LIMIT_SALT: 'test-salt',
  }, extra || {});
};
