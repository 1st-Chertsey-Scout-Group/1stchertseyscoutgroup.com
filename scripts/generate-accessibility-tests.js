import { readFile, writeFile, mkdirSync } from "fs";
import { dirname } from "path";
import { toJson } from "xml2json"

readFile('dist/sitemap-0.xml', function (err, data) {
    let obj = JSON.parse(toJson(data));

    let files = obj.urlset.url
        .flatMap((u) => u.loc)
        .map((u) => u.replace("https://1stchertseyscoutgroup.com/", ""))
        .map((u) => u.replace(/\/$/, ""))
        .map((u) => {
            return {
                path: "e2e/accessibility/" + u + "/index.spec.ts", content: `import { test, expect } from '@/../e2e/fixtures/axe.fixture';

test('should not have any automatically detectable accessibility issues', async ({ page, makeAxeBuilder }, testInfo) => {
  await page.goto('/${u}');

  const results = await makeAxeBuilder().analyze();

    await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json'
  });

  expect(results.violations).toEqual([]);
});` }
        })


    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        mkdirSync(dirname(file.path), { recursive: true });
        writeFile(file.path, file.content, function (err) {

        })

    }


});