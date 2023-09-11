import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  //retries: 1,
  //workers: 6,
  timeout: 30 * 1000,   //timeout for full test
  reporter: 'html',
  expect: {
    timeout: 5000,      //timeout for elements
  },
  projects: [
    {
      name: 'Chrome execution',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        
      }
    },
    /*
    {
      name: 'Edge execution',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        
        viewport: {width:720, height:720}
        ...devices['iPhone 11']
        permissions: ['geolocation'] 
        video: 'retain-on-failure'
      }
    }
    */
  ],
});
