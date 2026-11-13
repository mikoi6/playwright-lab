import {Page, test, expect, Locator} from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage : Locator;

    constructor(page: Page){
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name : 'Login'});
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(user: string, pass: string){
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async expectError(text: string){
        await expect(this.errorMessage).toContainText(text);
    }

}
