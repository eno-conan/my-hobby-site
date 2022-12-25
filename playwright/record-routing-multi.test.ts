import { test, expect } from '@playwright/test';

test('go to /targetRecordPage/XXX and to Top Page', async ({ page }) => {
  await page.goto('/searchRecordPage');
  const id = await page.getByTestId('account-delete-confirm');
  await page.locator("text=Sleep防止");
  await page.click("text=Sleep防止");
  await page.waitForTimeout(500);
  await page.click("text=詳細確認");
  await page.waitForTimeout(3000);
  await page.waitForSelector(`text=Sleep防止`);
  const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';
  await expect(page).toHaveURL(new RegExp(`${baseUrl}/targetRecordPage/[0-9]`));
  const a = await page.click("text=Top");
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(new RegExp(`${baseUrl}`));
});

test('go to /targetRecordPage/XXX and to SearchRecord Page', async ({ page }) => {
  await page.goto('/searchRecordPage');
  const id = await page.getByTestId('account-delete-confirm');
  await page.locator("text=Sleep防止");
  await page.click("text=Sleep防止");
  await page.waitForTimeout(500);
  await page.click("text=詳細確認");
  await page.waitForTimeout(3000);
  await page.waitForSelector(`text=Sleep防止`);
  const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';
  await expect(page).toHaveURL(new RegExp(`${baseUrl}/targetRecordPage/[0-9]`));
  const a = await page.click("text=searchRecordPage");
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(new RegExp(`${baseUrl}/searchRecordPage`));
});

// test('add a post', async ({ page, browser }) => {
//   const nonce = `${Math.random()}`;

//   await page.goto('/');
//   await page.fill(`[name=title]`, nonce);
//   await page.fill(`[name=text]`, nonce);
//   await page.click(`form [type=submit]`);
//   await page.waitForLoadState('networkidle');
//   await page.reload();

//   expect(await page.content()).toContain(nonce);

//   const ssrContext = await browser.newContext({
//     javaScriptEnabled: false,
//   });
//   const ssrPage = await ssrContext.newPage();
//   await ssrPage.goto('/');

//   expect(await ssrPage.content()).toContain(nonce);
// });

// test('server-side rendering test', async ({ page, browser }) => {
//   // add a post
//   const nonce = `${Math.random()}`;

//   await page.goto('/');
//   await page.fill(`[name=title]`, nonce);
//   await page.fill(`[name=text]`, nonce);
//   await page.click(`form [type=submit]`);
//   await page.waitForLoadState('networkidle');

//   // load the page without js
//   const ssrContext = await browser.newContext({
//     javaScriptEnabled: false,
//   });
//   const ssrPage = await ssrContext.newPage();
//   await ssrPage.goto('/');
//   expect(await ssrPage.content()).toContain(nonce);
// });
