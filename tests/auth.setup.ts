import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('登录一次，把状态存到文件', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  console.log('当前网址:', page.url());
  console.log('页面标题:', await page.title());
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);

  // 把 cookies + localStorage 一起写到文件
  await page.context().storageState({ path: authFile });
});