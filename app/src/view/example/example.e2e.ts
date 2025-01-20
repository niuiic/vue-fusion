import { test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:9000/app/#/example')
  await page.pause()
})
