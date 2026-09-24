const { defineConfig, devices } = require('@playwright/test');

const PORT = 8765;

module.exports = defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.js/,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'node support/server.js',
    url: `http://127.0.0.1:${PORT}/impact-checklist.html`,
    env: { PORT: String(PORT) },
    reuseExistingServer: false,
  },
});
