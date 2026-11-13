import { test as base, expect } from '@playwright/test';
import { LoginPage } from './tests/LoginPage';
import { InventoryPage } from './tests/InventoryPage';

type MyFixtures = {
  loginPage: LoginPage;        // 打开登录页，但不登录
  loggedInPage: InventoryPage; // 打开并已登录，停在商品页
};

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await use(login);          // ← 这一行是分界线
  },

  loggedInPage: async ({ loginPage, page }, use) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await use(new InventoryPage(page));
  },
});

export { expect };