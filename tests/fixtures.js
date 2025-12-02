import { test as base } from '@playwright/test';
import { App } from '../pages/app.js';
import { Api } from '../services/api.js';

export const test = base.extend({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
  
  api: async ({ request }, use) => {
    const token = await Api.getToken(request);
    const api = new Api(request, token);
    await use(api);
  },
});

export { expect } from '@playwright/test';
