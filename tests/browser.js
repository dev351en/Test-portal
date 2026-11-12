'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const root = path.resolve(__dirname, '..');
const output = process.env.PORTAL_TEST_OUTPUT || path.join(process.env.LOCALAPPDATA || process.cwd(), 'Temp/opencode/portal-v2-checks');
fs.mkdirSync(output, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.pdf': 'application/pdf', '.woff2': 'font/woff2' };
const errors = [];
const payloads = [];
const claims = [];

async function main() {
  let server;
  let base = process.env.PORTAL_TEST_URL;
  if (!base) {
    const headers = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'))).headers[0].headers;
    server = http.createServer((req, res) => {
      const url = new URL(req.url, 'http://localhost');
      const file = path.join(root, decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
      if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
      fs.readFile(file, (error, content) => {
        if (error) { res.writeHead(404).end(); return; }
        for (const header of headers) res.setHeader(header.key, header.value);
        res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
        res.end(content);
      });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${server.address().port}/`;
  }
  const url = new URL(base);
  url.searchParams.set('preview', 'teacher-imo-2026');
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  try {
    async function makePage(viewport) {
      const context = await browser.newContext({ viewport, acceptDownloads: true });
      await context.route('https://script.google.com/**', async route => {
        const request = route.request();
        if (request.method() === 'POST') {
          payloads.push(JSON.parse(new URLSearchParams(request.postData()).get('payload')));
        } else {
          claims.push(Object.fromEntries(new URL(request.url()).searchParams));
        }
        await route.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*' }, contentType: 'application/json',
          body: JSON.stringify({ ok: true, claimed: true, taken: false }) });
      });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      await page.clock.install();
      await page.goto(url.href, { waitUntil: 'networkidle' });
      return page;
    }
    async function active(page, name) { await page.locator(`#view${name}.is-active`).waitFor(); }
    async function login(page, id, name = 'Portal Validation Student', password = '12345678') {
      await page.fill('#loginId', id);
      await page.fill('#studentNameInput', name);
      await page.fill('#loginPass', password);
      await page.locator('#loginForm button[type="submit"]').click();
    }
    async function start(page, name = 'Portal Validation Student') {
      await page.fill('#signatureInput', name);
      await page.click('#startBtn');
      await active(page, 'Exam');
    }
    async function question(page, index) {
      if (!(await page.locator('#paletteGrid').isVisible())) await page.click('#paletteToggle');
      await page.locator(`[data-palette-index="${index}"]`).click();
    }
    async function images(page, selector) {
      const bad = await page.locator(selector).evaluateAll(async imgs => {
        await Promise.all(imgs.map(img => img.decode().catch(() => {})));
        return imgs.filter(img => !img.complete || !img.naturalWidth).map(img => img.src);
      });
      assert.deepEqual(bad, []);
    }
    async function layout(page) {
      const size = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
      assert.ok(size.content <= size.width + 1, JSON.stringify(size));
    }
    async function submit(page, count) {
      await question(page, count - 1);
      await page.click('#saveNextBtn');
      await page.getByRole('button', { name: 'Submit test', exact: true }).click();
      await active(page, 'Feedback');
    }
    async function feedback(page) {
      await page.click('label.radio-option:has-text("Yes") >> nth=0');
      await page.click('label.pill-option:has-text("Moderate")');
      await page.click('label.radio-option:has-text("Yes") >> nth=1');
      await page.locator('#feedbackForm button[type="submit"]').click();
      await active(page, 'Result');
    }
    const page = await makePage({ width: 1440, height: 1000 });
    assert.equal(await page.locator('#viewLogin h1').innerText(), 'Testing\nPortal');
    assert.ok(!(await page.locator('#viewLogin').innerText()).includes('Logical Reasoning'));
    await layout(page);
    await page.screenshot({ path: path.join(output, 'login-desktop.png'), fullPage: true });
    await login(page, 'DSMG2@001', 'Portal Validation Student', 'wrong');
    assert.ok(await page.locator('#loginError').isVisible());
    await login(page, 'UNKNOWN');
    assert.ok(await page.locator('#loginError').isVisible());
    await login(page, 'dsmg2@001');
    await active(page, 'Instructions');
    assert.equal(await page.locator('#viewInstructions [data-paper-count]').textContent(), '35');
    assert.equal(await page.locator('#viewInstructions [data-paper-marks]').textContent(), '45');
    await page.screenshot({ path: path.join(output, 'class2-instructions.png'), fullPage: true });
    await page.click('#viewPaperBtn');
    assert.equal(await page.locator('.paper-preview-item').count(), 35);
    assert.equal(await page.locator('.paper-preview-item img').count(), 27);
    await images(page, '.paper-preview-item img');
    assert.ok((await page.locator('.paper-preview-item').first().innerText()).includes('$100'));
    assert.equal(await page.locator('.paper-preview-item').first().locator('mjx-container').count(), 0);
    await page.getByRole('button', { name: 'Close Preview', exact: true }).click();
    await page.fill('#signatureInput', 'Wrong name');
    await page.click('#startBtn');
    assert.ok(await page.locator('#signatureError').isVisible());
    await start(page);
    assert.equal(await page.locator('#paletteGrid button').count(), 35);
    assert.equal(await page.locator('#questionMarks').innerText(), '1 Mark');
    assert.ok((await page.locator('#qText').innerText()).includes('$100'));
    await page.locator('[data-option="3"]').click();
    await page.click('#clearBtn');
    assert.equal(await page.locator('#statAttempted').innerText(), '0');
    await page.locator('[data-option="3"]').click();
    await page.click('#markBtn');
    await question(page, 1);
    assert.equal(await page.locator('#qOptions .option-image').count(), 4);
    await images(page, '#viewExam img');
    await page.screenshot({ path: path.join(output, 'class2-picture-options.png'), fullPage: true });
    await page.locator('[data-option="1"]').click();
    await question(page, 25);
    assert.equal(await page.locator('#questionMarks').innerText(), '2 Marks');
    const answer26 = await page.evaluate(() => window.CLASS2_QUESTIONS[25].ans);
    await page.locator(`[data-option="${answer26}"]`).click();
    assert.equal(await page.evaluate(() => !document.dispatchEvent(new Event('copy', { cancelable: true }))), true);
    await submit(page, 35);
    await feedback(page);
    assert.equal(await page.locator('#resultScore').innerText(), '3 / 45');
    assert.equal(await page.locator('#resultCorrect').innerText(), '2 / 35');
    assert.equal(await page.locator('#resultIncorrect').innerText(), '1');
    assert.equal(await page.locator('#resultUnattempted').innerText(), '32');
    await page.screenshot({ path: path.join(output, 'class2-result.png'), fullPage: true });
    await page.click('#reviewBtn');
    assert.equal(await page.locator('.review-item').count(), 35);
    assert.equal(await page.locator('.review-item').nth(1).locator('.option-image').count(), 2);
    await images(page, '.review-item img');
    assert.ok((await page.locator('.review-item').first().innerText()).includes('$250'));
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    const [textDownload] = await Promise.all([page.waitForEvent('download'), page.click('#downloadBtn')]);
    const text = fs.readFileSync(await textDownload.path(), 'utf8');
    assert.ok(text.includes('Class 2 · Mathematics'));
    assert.ok(text.includes('Score        : 3 / 45'));
    assert.ok(text.includes('Unattempted  : 32'));
    const [pdfDownload] = await Promise.all([page.waitForEvent('download'), page.click('#downloadSheetBtn')]);
    assert.equal(pdfDownload.suggestedFilename(), 'Worksheet Class 2 Test Paper 1.pdf');
    assert.deepEqual(fs.readFileSync(await pdfDownload.path()), fs.readFileSync(path.join(root, 'assets/worksheet-class2-test-paper-1.pdf')));
    await page.click('#finishBtn');

    // Same name, different paper: starts successfully and gets its own report.
    await login(page, 'DSMG7@012');
    await page.click('#viewPaperBtn');
    assert.equal(await page.locator('.paper-preview-item').count(), 50);
    await images(page, '.paper-preview-item img');
    await page.getByRole('button', { name: 'Close Preview', exact: true }).click();
    await start(page);
    const answers7 = await page.evaluate(() => window.QUESTIONS.map(q => q.ans));
    for (let i = 0; i < answers7.length; i++) {
      await question(page, i);
      await page.locator(`[data-option="${answers7[i]}"]`).click();
    }
    await submit(page, 50);
    await feedback(page);
    assert.equal(await page.locator('#resultScore').innerText(), '100 / 100');
    assert.equal(await page.locator('#resultCorrect').innerText(), '50 / 50');
    assert.ok((await page.locator('#downloadSheetBtn').getAttribute('href')).includes('worksheet-logical-reasoning.pdf'));
    await page.click('#finishBtn');
    await login(page, 'DSMG2@001');
    await page.fill('#signatureInput', 'Portal Validation Student');
    await page.click('#startBtn');
    assert.ok((await page.locator('#signatureError').innerText()).includes('already attempted'));
    await page.click('#logoutBtn');

    // Real fullscreen transitions: five recoverable warnings, sixth auto-submit.
    await login(page, 'DSMG7@012', 'Exit Rule Check');
    await start(page, 'Exit Rule Check');
    for (let exit = 1; exit <= 6; exit++) {
      await page.evaluate(() => document.exitFullscreen());
      if (exit <= 5) {
        await page.locator('#examLock').waitFor({ state: 'visible' });
        assert.ok((await page.locator('#examLockText').innerText()).includes(`${exit} of 5`));
        await page.click('#examLockBtn');
        await page.locator('#examLock').waitFor({ state: 'hidden' });
        await page.clock.runFor(1100);
      }
    }
    await active(page, 'Feedback');
    await feedback(page);
    await page.click('#finishBtn');
    await login(page, 'DSMG2@001', 'Timer Check');
    await start(page, 'Timer Check');
    await page.clock.fastForward(3601000);
    await active(page, 'Feedback');

    const mobile = await makePage({ width: 390, height: 844 });
    await layout(mobile);
    await mobile.screenshot({ path: path.join(output, 'login-mobile.png'), fullPage: true });
    await login(mobile, 'DSMG2@001', 'Mobile Check');
    await layout(mobile);
    await mobile.click('#viewPaperBtn');
    await images(mobile, '.paper-preview-item img');
    await layout(mobile);
    await mobile.getByRole('button', { name: 'Close Preview', exact: true }).click();
    await start(mobile, 'Mobile Check');
    await question(mobile, 1);
    await layout(mobile);
    await images(mobile, '#viewExam img');
    await mobile.screenshot({ path: path.join(output, 'class2-mobile.png'), fullPage: true });
    await submit(mobile, 35);
    await feedback(mobile);
    await layout(mobile);
    assert.equal(await mobile.locator('#resultScore').innerText(), '0 / 45');
    await mobile.screenshot({ path: path.join(output, 'result-mobile.png'), fullPage: true });

    assert.ok(claims.some(p => p.chapter === 'logical-reasoning'));
    assert.ok(claims.some(p => p.chapter === 'class2-test-paper-1'));
    const grade2Payload = payloads.find(p => p.studentName === 'Portal Validation Student' && p.grade === 2);
    assert.equal(grade2Payload.score, 3);
    assert.equal(grade2Payload.answers[0].marks, 1);
    assert.equal(grade2Payload.answers[25].marks, 2);
    assert.equal(grade2Payload.answers[1].optionImages.length, 4);
    const exitPayload = payloads.find(p => p.studentName === 'Exit Rule Check');
    assert.equal(exitPayload.focusLosses, 6);
    assert.equal(exitPayload.submitReason, 'leaving');
    const timerPayload = payloads.find(p => p.studentName === 'Timer Check');
    assert.equal(timerPayload.submitReason, 'time');
    assert.equal(timerPayload.timeUsed, 3600);
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(output, 'captured-submissions.json'), JSON.stringify(payloads, null, 2));
    console.log(`PASS: both logins, exact previews/assets, currency, weighted scoring, account switching, attempts, downloads, fullscreen exits, timer and mobile layout. Screenshots: ${output}`);
  } finally {
    await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
