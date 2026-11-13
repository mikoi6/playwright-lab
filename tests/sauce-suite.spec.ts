// import {test, expect} from '@playwright/test';
// import {LoginPage} from './LoginPage';
// import {InventoryPage} from './InventoryPage';
// test.use({ testIdAttribute: 'data-test' });
// test('正常登陆', async({page})=>{
//     const login = new LoginPage(page);
//     await login.goto();
//     await login.login('standard_user','secret_sauce');
//     await expect(page).toHaveURL(/inventory/);
// });

// test('密码错误', async({page})=>{
//     const login = new LoginPage(page);
//     await login.goto();
//     await login.login('standard_user', 'wrong');
//     await login.expectError('do not match');
// });

// test('账号被锁', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.goto();
//     await login.login('locked_out_user', 'secret_sauce');
//     await login.expectError('locked out');
// });

// test('交互', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.goto();
//     await login.login('standard_user','secret_sauce');
//   await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
//   await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
// });

// test('异常输入', async ({ page }) => {
//   const login = new LoginPage(page);
//   await login.goto();
//   await page.getByRole('button', { name: 'Login' }).click();
//   await expect(page.getByTestId('error')).toContainText('Username is required');
// });

// test('加入背包后角标变1', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.goto();
//     await login.login('standard_user','secret_sauce');

//     const inventory = new InventoryPage(page);
//     await inventory.addBackpackToCart();
//     await inventory.expectCartCount(1);
// });

// test('排序切换', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.goto();
//     await login.login('standard_user','secret_sauce');

//     const inventory = new InventoryPage(page);
//     await inventory.sortBy('Name (A to Z)');
//     //再断言商品顺序...
// });
import { test, expect } from '../fixtures';

// 需要"已登录"的测试：要 loggedInPage
test('加入购物车后角标出现', async ({ loggedInPage }) => {
  await loggedInPage.addBackpackToCart();
  await loggedInPage.expectCartCount(1);
});

// 需要"未登录"的测试：要 loginPage，不要 loggedInPage
test('密码错误显示提示', async ({ loginPage }) => {
  await loginPage.login('standard_user', 'wrong');
  await loginPage.expectError('do not match');
});