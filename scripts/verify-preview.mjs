import assert from 'node:assert/strict';

// Integration smoke check against a running production preview; no browser state is simulated.
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
const queue = ['/pt', '/en'];
const visited = new Set();
const failures = [];
const assets = new Set();

while (queue.length) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  visited.add(path);
  try {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
    const html = await response.text();
    const locale = path.startsWith('/pt') ? 'pt-BR' : 'en';
    assert.ok(html.includes(`<html lang="${locale}"`), `${path}: wrong html language`);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: expected one h1`);
    assert.ok(/<title>[^<]*MaiMiArte<\/title>/.test(html), `${path}: missing brand in title`);
    assert.ok(/name="description" content="[^"]+"/.test(html), `${path}: missing description`);
    assert.ok(html.includes('name="robots" content="noindex, nofollow"'), `${path}: preview indexation must be off`);
    assert.ok(html.includes('rel="canonical"'), `${path}: missing canonical`);
    assert.ok(html.includes('hrefLang="pt-BR"') && html.includes('hrefLang="en"'), `${path}: missing language alternates`);
    for (const match of html.matchAll(/href="([^"#]+)"/g)) {
      const href = match[1].replaceAll('&amp;', '&');
      if (/^\/(pt|en)(?:[/?]|$)/.test(href) && !visited.has(href)) queue.push(href);
    }
    for (const match of html.matchAll(/src="(\/_next\/image[^" ]+)"/g)) assets.add(match[1].replaceAll('&amp;', '&'));
  } catch (error) { failures.push(error.message); }
}

for (const [path, expected] of [['/pt/works/not-a-project', 404], ['/pt/shop/invalid', 404], ['/pt/shop/brasil/not-a-product', 404], ['/pt/blog/not-a-post', 404], ['/fr', 404], ['/robots.txt', 200], ['/sitemap.xml', 200]]) {
  try { const response = await fetch(`${origin}${path}`); assert.equal(response.status, expected, `${path}: expected ${expected}, received ${response.status}`); }
  catch (error) { failures.push(error.message); }
}
for (const path of assets) {
  try { const response = await fetch(`${origin}${path}`); assert.equal(response.status, 200, `${path}: image failed`); assert.ok(response.headers.get('content-type')?.startsWith('image/'), `${path}: expected image`); }
  catch (error) { failures.push(error.message); }
}
const root = await fetch(origin, { redirect: 'manual' });
if (![307, 308].includes(root.status) || root.headers.get('location') !== '/pt') failures.push('Root should redirect to /pt');
console.log(JSON.stringify({ pages: visited.size, optimizedImages: assets.size, additionalRoutes: 7, failures }, null, 2));
if (failures.length) process.exitCode = 1;
