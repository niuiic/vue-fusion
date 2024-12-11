import { test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:9000/website/#/example')
  await page.pause()
})
