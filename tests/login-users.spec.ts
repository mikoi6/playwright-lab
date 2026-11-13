import { test, expect } from '@playwright/test'

interface User {
    username: string;
    password: string;
    nickname?: string;
}

const users: User[] = [
    {username: 'standard_user', password: 'secret_sauce'},
    {username: 'locked_out_user', password: 'secret_sauce', nickname: '被锁定的用户'},
];

for (const u of users){
    test(`登录：${u.nickname ?? u.username}`, async ({page})=>{
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill(u.username);
        await page.getByPlaceholder('Password').fill(u.password);
        await page.getByRole('button', {name:'Login'}).click();
    })
}