import { test, expect } from '@playwright/test';

test('go to /', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector(`text=Select Page`);
  await page.waitForSelector(`text=Records List Page`);
  await page.waitForSelector(`text=Line Chart`);
});

test('go to /inputRecordPage', async ({ page }) => {
  await page.goto('/inputRecordPage');

  await page.waitForSelector(`text=記録追加`);
});

test('go to /searchRecordPage', async ({ page }) => {
  await page.goto('/searchRecordPage');

  await page.waitForSelector(`text=記録検索`);
});

test('go to /targetRecordPage/1', async ({ page }) => {
  const res = await page.goto('/targetRecordPage/1');

  await page.waitForSelector(`text=予期せぬエラーが発生しました`);
  expect(res?.status()).toBe(200);
});

test('test 404', async ({ page }) => {
  const res = await page.goto('/post/not-found');
  expect(res?.status()).toBe(404);
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
