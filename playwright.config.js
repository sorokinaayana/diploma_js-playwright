import { defineConfig, devices } from '@playwright/test';
import { App } from './pages/app.js';
import { Api } from './services/api.js';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30000,
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://realworld.qa.guru', 
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
