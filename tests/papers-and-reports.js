'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {}, console,
  Utilities: { formatDate: value => value.toISOString() } });
for (const file of ['test_questions.js', 'class2_questions.js', 'js/papers.js', 'scripts/google-apps-script-submission-email.gs']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
const papers = context.window.TEST_PAPERS;
assert.equal(papers.length, 2);
assert.equal(new Set(papers.map(p => p.loginId)).size, 2);
const grade7 = papers.find(p => p.loginId === 'DSMG7@012');
const grade2 = papers.find(p => p.loginId === 'DSMG2@001');
assert.equal(grade7.id, 'class7-full-syllabus');
assert.equal(grade7.questionCount, 50);
assert.equal(grade7.totalMarks, 100);
assert.equal(grade2.id, 'class2-test-paper-1');
assert.equal(grade2.questionCount, 35);
assert.equal(grade2.totalMarks, 45);
assert.deepEqual(Array.from(context.window.QUESTIONS.slice(0, 3), q => q.opts[0]), ['39', '24', '24']);
assert.equal(context.window.QUESTIONS[0].ans, 3);
assert.deepEqual(['Logical Reasoning', 'Mathematical Reasoning', 'Everyday Mathematics', 'HOTS']
  .map(cat => context.window.QUESTIONS.filter(q => q.cat === cat).length), [15, 20, 10, 5]);

function payload(paper, choose) {
  return { paperId: paper.id, chapter: paper.id, paperTitle: paper.title, grade: paper.grade,
    studentId: paper.loginId, studentName: 'Test <Student>', durationMinutes: 60,
    // Deliberately incorrect aggregate: reports must derive marks from answers.
    score: 999, totalMarks: 999, correct: 999, percent: 999,
    worksheetUrl: `https://mest-porutal.vercel.app/${paper.worksheet}`,
    answers: context.window[paper.bank].map((q, i) => ({ no: i + 1, q: q.q, options: q.opts,
      correct: q.ans, selected: choose(q, i), marks: q.marks ?? paper.defaultMarks,
      diagram: q.diagram ? `https://mest-porutal.vercel.app/${q.diagram}` : '',
      optionImages: (q.optionImages || []).map(src => `https://mest-porutal.vercel.app/${src}`) })) };
}

for (const paper of papers) {
  const bank = context.window[paper.bank];
  assert.equal(bank.length, paper.questionCount);
  assert.deepEqual(Array.from(bank, q => q.id), Array.from({ length: bank.length }, (_, i) => i + 1));
  assert.equal(bank.reduce((sum, q) => sum + (q.marks ?? paper.defaultMarks), 0), paper.totalMarks);
  for (const q of bank) {
    assert.equal(q.opts.length, 4);
    assert.ok(q.ans >= 0 && q.ans <= 3);
    for (const file of [q.diagram, ...(q.optionImages || [])].filter(Boolean)) assert.ok(fs.existsSync(path.join(root, file)), file);
  }
  assert.equal(fs.readFileSync(path.join(root, paper.worksheet)).subarray(0, 4).toString(), '%PDF');
  assert.equal(fs.readFileSync(path.join(root, paper.paperPdf)).subarray(0, 4).toString(), '%PDF');
  assert.ok(fs.statSync(path.join(root, paper.paperPdf)).size < fs.statSync(path.join(root, paper.worksheet)).size,
    `${paper.id}: questions-only PDF should be smaller than the full worksheet`);
  const full = context.buildReport_(payload(paper, q => q.ans));
  assert.ok(full.subject.includes(`${paper.totalMarks}/${paper.totalMarks} (100%)`));
  assert.ok(full.subject.includes(`Class ${paper.grade}`));
  assert.ok(full.html.includes('Test &lt;Student&gt;'));
  const empty = context.buildReport_(payload(paper, () => null));
  assert.ok(empty.subject.includes(`0/${paper.totalMarks} (0%)`));
  assert.ok(empty.text.includes(`Unattempted  : ${paper.questionCount}`));
}

const appSource = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
assert.ok(appSource.includes("start: '2026-11-18T03:30:00.000Z'"));
assert.ok(!appSource.includes("2026-11-13T03:30:00.000Z"));
assert.ok(fs.readFileSync(path.join(root, 'middleware.js'), 'utf8').includes("2026-11-18T03:30:00.000Z"));
assert.ok(fs.readFileSync(path.join(root, 'index.html'), 'utf8').includes('18 Nov 2026'));

const bank2 = context.window.CLASS2_QUESTIONS;
assert.equal(bank2.filter(q => q.marks === 1).length, 25);
assert.equal(bank2.filter(q => q.marks === 2).length, 10);
assert.equal(bank2.filter(q => q.diagram).length, 15);
assert.equal(bank2.reduce((sum, q) => sum + (q.optionImages || []).length, 0), 12);
const mixed = payload(grade2, (q, i) => i === 0 || i === 25 ? q.ans : i === 1 ? (q.ans + 1) % 4 : null);
const report = context.buildReport_(mixed);
assert.ok(report.subject.includes('3/45 (7%)'));
assert.ok(report.text.includes('Correct      : 2 / 35'));
assert.ok(report.text.includes('Incorrect    : 1'));
assert.ok(report.text.includes('Unattempted  : 32'));
assert.ok(report.text.includes('CORRECT (+1) / 1 marks available'));
assert.ok(report.text.includes('CORRECT (+2) / 2 marks available'));
assert.ok(report.text.includes('$100'));
assert.equal((report.html.match(/<img /g) || []).length, 27);
assert.ok(report.html.includes(grade2.worksheet));
assert.equal(context.imageHtml_('javascript:alert(1)', 'bad', true), '');
const legacy = payload(papers[0], q => q.ans);
legacy.answers.forEach(a => { delete a.marks; });
delete legacy.paperTitle;
delete legacy.grade;
assert.ok(context.buildReport_(legacy).subject.includes('100/100'));

// Attempt registries must stay independent; the old logical-reasoning registry
// remains untouched while the new paper opens a fresh registry.
const properties = new Map();
context.PropertiesService = { getScriptProperties: () => ({
  getProperty: key => properties.get(key), setProperty: (key, value) => properties.set(key, value)
}) };
context.LockService = { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) };
context.ContentService = { MimeType: { JSON: 'application/json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) };
function claim(paperId) {
  return context.handleClaim_({ paperId, name: 'Same Student', token: 'd3v3ndra-fractions-2026' });
}
assert.equal(claim('class7-full-syllabus').taken, false);
assert.equal(claim('class2-test-paper-1').taken, false);
assert.equal(claim('class7-full-syllabus').taken, true);
assert.equal(claim('class2-test-paper-1').taken, true);
assert.equal(claim('logical-reasoning').taken, false);
assert.ok(properties.has('imo_attempt_names_class7-full-syllabus'));
assert.ok(properties.has('imo_attempt_names_class2-test-paper-1'));
assert.equal(context.doGet({}).version, 'testing-portal-v2');
console.log('PASS: ordered banks/assets, weighted/legacy reports, picture options, currency and isolated attempts.');
