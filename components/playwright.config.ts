import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src',
  testMatch: /.*\.e2e\.ts/,
  fullyParallel: true,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: false
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://127.0.0.1:9000'
  }
})
