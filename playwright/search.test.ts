import { test, expect } from '@playwright/test';

// test('get records filtering by input-value', async ({ page }) => {
//     await page.goto('/searchRecordPage');
//     // 検索条件設定
//     // const placeHolder = await page.locator('input[placeholder=条件]');
//     // await placeHolder.waitFor({ state: "visible" });
//     // await page.click('input[placeholder=条件]');
//     // await page.fill('input[placeholder=条件]', 'forE2ETest');
//     await page.getByPlaceholder("条件").fill('forE2ETest');
//     await page.waitForTimeout(500);
//     // 条件の送信処理実行
//     await page.locator("text=送信");
//     await page.click("text=送信");
//     await page.waitForTimeout(1000);
//     await page.waitForSelector(`text=forE2ETest`);
//     // id情報から値を取得
//     const idVal = (await page.locator('#forE2ETest').innerText()).valueOf();
//     expect(idVal).toBe('forE2ETest');
// });