import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   baseURL: process.env.BASE_URL || 'http://localhost:3000',
  //   httpCredentials: {
  //     username: process.env.HTTP_USERNAME || '',
  //     password: process.env.HTTP_PASSWORD || '',
  //   },
  //   headless: true,
  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //   trace: 'on-first-retry'
  // },
  //===============================================
  use: {
    baseURL: process.env.BASE_URL || 'https://guest:welcome2qauto@qauto.forstudy.space',
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  //===============================================
  /* Configure projects for major browsers */
  projects: [
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
    //=======================================
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
    //=======================================
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
