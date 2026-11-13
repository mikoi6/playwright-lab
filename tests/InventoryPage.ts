import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly backpackButton: Locator;
  readonly cartBadge: Locator;
  readonly sortSelect: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartBadge      = page.locator('[data-test="shopping-cart-badge"]');
    this.sortSelect     = page.locator('[data-test="product-sort-container"]');
    this.title           = page.locator('[data-test="title"]');
  }

  async addBackpackToCart() {
    await this.backpackButton.click();
  }

  async expectCartCount(n: number) {
    if (n === 0) {
      // 角标在数量为 0 时是整个元素不存在，不是文本为空
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(n));
    }
  }

  async sortBy(label: string) {
    await this.sortSelect.selectOption({ label });
  }
}