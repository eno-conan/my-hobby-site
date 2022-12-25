import { test, expect } from '@playwright/test';

test('go to /targetRecordPage/XXX and to Top Page', async ({ page }) => {
  await page.goto('/searchRecordPage');
  await page.getByTestId('check-record');
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
