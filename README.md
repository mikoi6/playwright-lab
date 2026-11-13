# Playwright E2E Lab

End-to-end tests for [saucedemo.com](https://www.saucedemo.com/),
written while learning Playwright and TypeScript.

## Stack
- Playwright Test
- TypeScript
- GitHub Actions (CI)

## How to run

```
npm ci
npx playwright install chromium
npx playwright test
```
## What is covered
- Login: valid user, wrong password, lockded-out user
- Inventory: add to cart, cart badge count, sorting

## Structure

```
pages/      Page Object classes
tests/      Test specs
fixtures.ts Custom fixtures (loginPage, loggedInPage)
```

## CI
Every push runs the suite on GitHub Actions.