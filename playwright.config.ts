import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://guest:welcome2qauto@qauto.forstudy.space',
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'selected-tests',
      testMatch: [
        'tests/homework-28/api/carUpdateNeg.spec.ts',
        'tests/homework-28/api/garage1.spec.ts',
        'tests/homework-28/api/garagePublic.spec.ts',
      ],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'ui-tests',
      use: { browserName: 'chromium' },
    },
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'garage-user',
      use: {
        storageState: 'playwright/.auth/user.json',
        ...devices['Desktop Chrome'],
      },
      dependencies: ['setup'],
    },
  ],
});
