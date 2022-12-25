import { test, expect } from '@playwright/test';

test('get records filtering by input-value', async ({ page }) => {
    await page.goto('/searchRecordPage');
    // 検索条件設定
    await page.click('input[placeholder="条件"]');
    await page.fill('input[placeholder="条件"]', "Sleep");
    await page.waitForTimeout(500);
    // 条件の送信処理実行
    await page.locator("text=送信");
    await page.click("text=送信");
    await page.waitForTimeout(1000);
    await page.waitForSelector(`text=Sleep防止`);
    // id情報から値を取得
    const idVal = (await page.locator('#Sleep防止').innerText()).valueOf();
    expect(idVal).toBe('Sleep防止');
});