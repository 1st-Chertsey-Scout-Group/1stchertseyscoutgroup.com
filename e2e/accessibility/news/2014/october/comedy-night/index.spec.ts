import { test, expect } from '@/../e2e/fixtures/axe.fixture';

test('should not have any automatically detectable accessibility issues', async ({ page, makeAxeBuilder }, testInfo) => {
  await page.goto('/news/2014/october/comedy-night');

  const results = await makeAxeBuilder().analyze();

    await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json'
  });

  expect(results.violations).toEqual([]);
});