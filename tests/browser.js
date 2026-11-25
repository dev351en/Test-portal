'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const root = path.resolve(__dirname, '..');
const output = process.env.PORTAL_TEST_OUTPUT || path.join(process.env.LOCALAPPDATA || process.cwd(), 'Temp/opencode/portal-v2-checks');
fs.mkdirSync(output, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.woff2': 'font/woff2' };
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
    async function makePage(viewport, options = {}) {
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
      if (options.time) await page.clock.install({ time: new Date(options.time) });
      else await page.clock.install();
      const pageUrl = new URL(url.href);
      if (options.preview === false) pageUrl.searchParams.delete('preview');
      if (options.paperId) pageUrl.searchParams.set('paper', options.paperId);
      await page.goto(pageUrl.href, { waitUntil: 'networkidle' });
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
    await login(page, 'DSMG2@001');
    assert.ok((await page.locator('#loginError').innerText()).includes('Class 2 paper is closed today'));
    assert.equal(await page.locator('#viewLogin.is-active').count(), 1);

    // Class 7 is the only paper open today.
    await login(page, 'DSMG7@012');
    await active(page, 'Instructions');
    assert.equal(await page.locator('#viewInstructions [data-paper-count]').textContent(), '50');
    assert.equal(await page.locator('#viewInstructions [data-paper-marks]').textContent(), '100');
    assert.ok((await page.locator('#viewInstructions [data-paper-title]').first().innerText()).includes('Full Syllabus'));
    assert.equal(await page.locator('#viewInstructions #viewPaperBtn').count(), 0);
    await page.screenshot({ path: path.join(output, 'class7-instructions.png'), fullPage: true });
    await page.fill('#signatureInput', 'Wrong name');
    await page.click('#startBtn');
    assert.ok(await page.locator('#signatureError').isVisible());
    await start(page);
    assert.equal(await page.locator('#paletteGrid button').count(), 50);
    assert.equal(await page.locator('#questionMarks').innerText(), '2 Marks');
    await question(page, 13);
    await page.locator('#qDiagram img').waitFor();
    const diagramBox = await page.locator('#qDiagram img').boundingBox();
    assert.ok(diagramBox && diagramBox.height <= 361 && diagramBox.width <= 921, JSON.stringify(diagramBox));
    await question(page, 0);
    await page.click('#viewPaperBtn');
    await page.locator('.paper-page').first().waitFor();
    assert.equal(await page.locator('.paper-page').count(), 3);
    assert.equal(await page.evaluate(() => window.PAPER_PAGES['class7-combined-worksheet-3'].length), 3);
    assert.ok((await page.locator('.paper-pages-note').innerText()).includes('The answer key is not part of this paper'));
    assert.ok((await page.locator('.paper-pages-download').getAttribute('href')).includes('worksheet-full-syllabus-questions-only.pdf'));
    await images(page, '.paper-page');
    await page.screenshot({ path: path.join(output, 'class7-paper-viewer.png'), fullPage: true });
    await page.getByRole('button', { name: 'Close Paper', exact: true }).click();
    const answers7 = await page.evaluate(() => window.QUESTIONS.map(q => q.ans));
    await page.locator(`[data-option="${answers7[0]}"]`).click();
    await page.click('#clearBtn');
    assert.equal(await page.locator('#statAttempted').innerText(), '0');
    await page.locator(`[data-option="${answers7[0]}"]`).click();
    await page.click('#markBtn');
    assert.equal(await page.evaluate(() => !document.dispatchEvent(new Event('copy', { cancelable: true }))), true);
    for (let i = 0; i < answers7.length; i++) {
      await question(page, i);
      await page.locator(`[data-option="${answers7[i]}"]`).click();
    }
    await submit(page, 50);
    await feedback(page);
    assert.equal(await page.locator('#resultScore').innerText(), '100 / 100');
    assert.equal(await page.locator('#resultCorrect').innerText(), '50 / 50');
    await page.screenshot({ path: path.join(output, 'class7-result.png'), fullPage: true });
    await page.click('#reviewBtn');
    assert.equal(await page.locator('.review-item').count(), 50);
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    const [textDownload] = await Promise.all([page.waitForEvent('download'), page.click('#downloadBtn')]);
    const text = fs.readFileSync(await textDownload.path(), 'utf8');
    assert.ok(text.includes('Class 7 · Full Syllabus Comprehensive Olympiad'));
    assert.ok(text.includes('Score        : 100 / 100'));
    assert.ok(text.includes('Unattempted  : 0'));
    assert.ok((await page.locator('#downloadSheetBtn').getAttribute('href')).includes('worksheet-full-syllabus-comprehensive.pdf'));
    const [grade7Pdf] = await Promise.all([page.waitForEvent('download'), page.click('#downloadSheetBtn')]);
    assert.equal(grade7Pdf.suggestedFilename(), 'Worksheet Full Syllabus Comprehensive Olympiad.pdf');
    assert.deepEqual(fs.readFileSync(await grade7Pdf.path()), fs.readFileSync(path.join(root, 'assets/worksheet-full-syllabus-comprehensive.pdf')));
    await page.click('#finishBtn');

    // The same name cannot attempt the open paper twice.
    await login(page, 'DSMG7@012');
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
        const lockText = await page.locator('#examLockText').innerText();
        assert.ok(lockText.includes(`${exit} of 5`), `exit ${exit}: ${lockText}`);
        await page.click('#examLockBtn');
        await page.locator('#examLock').waitFor({ state: 'hidden' });
        await page.waitForFunction(() => !!document.fullscreenElement);
        await page.clock.runFor(1100);
      }
    }
    await active(page, 'Feedback');
    await feedback(page);
    await page.click('#finishBtn');
    await login(page, 'DSMG7@012', 'Timer Check');
    await start(page, 'Timer Check');
    await page.clock.fastForward(3601000);
    await active(page, 'Feedback');

    // Worksheet 4 is independently assigned to the same Class 7 login.
    const worksheet4 = await makePage({ width: 1440, height: 1000 }, {
      paperId: 'class7-combined-worksheet-4'
    });
    await login(worksheet4, 'DSMG7@012', 'Worksheet 4 Check');
    await active(worksheet4, 'Instructions');
    assert.equal(await worksheet4.locator('body').getAttribute('data-paper-id'), 'class7-combined-worksheet-4');
    assert.equal(await worksheet4.locator('[data-paper-window]').innerText(), '4:00 PM – 9:00 PM');
    assert.equal(await worksheet4.locator('#viewInstructions [data-paper-count]').innerText(), '50');
    await start(worksheet4, 'Worksheet 4 Check');
    assert.equal(await worksheet4.locator('#paletteGrid button').count(), 50);
    await question(worksheet4, 21);
    await worksheet4.locator('#qDiagram img').waitFor();
    assert.ok((await worksheet4.locator('#qDiagram img').getAttribute('src')).includes('class7-worksheet4/q22.svg'));
    await worksheet4.click('#viewPaperBtn');
    await worksheet4.locator('.paper-page').first().waitFor();
    assert.equal(await worksheet4.locator('.paper-page').count(), 3);
    assert.ok((await worksheet4.locator('.paper-pages-download').getAttribute('href'))
      .includes('worksheet-combined-worksheet-4-questions-only.pdf'));
    await images(worksheet4, '.paper-page');
    await worksheet4.getByRole('button', { name: 'Close Paper', exact: true }).click();
    await submit(worksheet4, 50);
    await feedback(worksheet4);
    assert.equal(await worksheet4.locator('#resultScore').innerText(), '0 / 100');
    const worksheet4Payload = payloads.find(p => p.studentName === 'Worksheet 4 Check');
    assert.equal(worksheet4Payload.paperId, 'class7-combined-worksheet-4');
    assert.ok(worksheet4Payload.worksheetUrl.includes('worksheet-combined-worksheet-4.pdf'));

    // A live Worksheet 3 attempt is submitted at 3 PM; the login switches to
    // Worksheet 4 at 4 PM without changing the shared Class 7 credentials.
    const handoff = await makePage({ width: 1280, height: 900 }, {
      preview: false, time: '2026-11-25T09:20:00.000Z'
    });
    await login(handoff, 'DSMG7@012', 'Session Handoff Check');
    assert.equal(await handoff.locator('body').getAttribute('data-paper-id'), 'class7-combined-worksheet-3');
    await start(handoff, 'Session Handoff Check');
    await handoff.clock.runFor(11 * 60 * 1000);
    await handoff.locator('#timeGate').waitFor({ state: 'visible' });
    assert.ok((await handoff.locator('#gateMessage').innerText()).includes('next paper opens at 4:00 PM IST'));
    const handoffPayload = payloads.find(p => p.studentName === 'Session Handoff Check');
    assert.equal(handoffPayload.paperId, 'class7-combined-worksheet-3');
    assert.equal(handoffPayload.submitReason, 'window');
    await handoff.clock.runFor(59 * 60 * 1000);
    await active(handoff, 'Login');
    await login(handoff, 'DSMG7@012', 'Session Handoff Check');
    assert.equal(await handoff.locator('body').getAttribute('data-paper-id'), 'class7-combined-worksheet-4');
    assert.equal(await handoff.locator('[data-paper-window]').innerText(), '4:00 PM – 9:00 PM');
    await handoff.click('#logoutBtn');
    await login(handoff, 'DSMG7@012', 'Worksheet 4 Closing Check');
    assert.equal(await handoff.locator('body').getAttribute('data-paper-id'), 'class7-combined-worksheet-4');
    await handoff.clock.runFor(4 * 60 * 60 * 1000 + 50 * 60 * 1000);
    await start(handoff, 'Worksheet 4 Closing Check');
    await handoff.clock.runFor(11 * 60 * 1000);
    await handoff.locator('#timeGate').waitFor({ state: 'visible' });
    assert.equal(await handoff.locator('#gateTitle').innerText(), 'Test window closed');
    const closingPayload = payloads.find(p => p.studentName === 'Worksheet 4 Closing Check');
    assert.equal(closingPayload.paperId, 'class7-combined-worksheet-4');
    assert.equal(closingPayload.submitReason, 'window');

    const mobile = await makePage({ width: 390, height: 844 });
    await layout(mobile);
    await mobile.screenshot({ path: path.join(output, 'login-mobile.png'), fullPage: true });
    await login(mobile, 'DSMG7@012', 'Mobile Check');
    await layout(mobile);
    assert.equal(await mobile.locator('#viewInstructions #viewPaperBtn').count(), 0);
    await start(mobile, 'Mobile Check');
    await mobile.click('#viewPaperBtn');
    await mobile.locator('.paper-page').first().waitFor();
    assert.equal(await mobile.locator('.paper-page').count(), 3);
    await images(mobile, '.paper-page');
    await layout(mobile);
    await mobile.getByRole('button', { name: 'Close Paper', exact: true }).click();
    await question(mobile, 1);
    await layout(mobile);
    await images(mobile, '#viewExam img');
    await question(mobile, 4);
    await layout(mobile);
    await images(mobile, '#viewExam img');
    await mobile.screenshot({ path: path.join(output, 'class7-mobile.png'), fullPage: true });
    await submit(mobile, 50);
    await feedback(mobile);
    await layout(mobile);
    assert.equal(await mobile.locator('#resultScore').innerText(), '0 / 100');
    await mobile.screenshot({ path: path.join(output, 'result-mobile.png'), fullPage: true });

    assert.ok(claims.some(p => p.chapter === 'class7-combined-worksheet-3'));
    assert.ok(claims.some(p => p.chapter === 'class7-combined-worksheet-4'));
    assert.ok(!claims.some(p => p.chapter === 'class2-olympiad-35'));
    const grade7Payload = payloads.find(p => p.studentName === 'Portal Validation Student' && p.grade === 7);
    assert.equal(grade7Payload.paperId, 'class7-combined-worksheet-3');
    assert.equal(grade7Payload.score, 100);
    assert.ok(grade7Payload.worksheetUrl.includes('worksheet-full-syllabus-comprehensive.pdf'));
    const exitPayload = payloads.find(p => p.studentName === 'Exit Rule Check');
    assert.equal(exitPayload.focusLosses, 6);
    assert.equal(exitPayload.submitReason, 'leaving');
    const timerPayload = payloads.find(p => p.studentName === 'Timer Check');
    assert.equal(timerPayload.submitReason, 'time');
    assert.equal(timerPayload.timeUsed, 3600);
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(output, 'captured-submissions.json'), JSON.stringify(payloads, null, 2));
    console.log(`PASS: Worksheet 3/4 scheduling and handoff, exact previews/assets, separate attempts, downloads, fullscreen exits, timer and mobile layout. Screenshots: ${output}`);
  } finally {
    await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
