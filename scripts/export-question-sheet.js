#!/usr/bin/env node
/* Export both assigned papers to CSV, JSON, answer keys and Google Sheets.
 * node scripts/export-question-sheet.js [--paper=class2-test-paper-1]
 * --shuffle --seed=demo creates separate practice exports. Illustrated
 * questions retain option order because their diagrams can contain letters.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'exports');
const args = process.argv.slice(2);
const shuffle = args.includes('--shuffle');
const seed = (args.find(arg => arg.startsWith('--seed=')) || '--seed=demo').slice(7);
const paperId = (args.find(arg => arg.startsWith('--paper=')) || '--paper=').slice(8);

function loadPapers() {
  const context = vm.createContext({ window: {} });
  for (const file of ['test_questions.js', 'class2_questions.js', 'js/papers.js']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
  }
  const papers = context.window.TEST_PAPERS.filter(p => !paperId || p.id === paperId);
  if (!papers.length) throw new Error(`Unknown paper: ${paperId}`);
  return papers.map(p => ({ ...p, questions: context.window[p.bank] }));
}

function assetUrl(asset) {
  return asset ? new URL(asset, 'https://mest-porutal.vercel.app/').href : '';
}

function validate(paper) {
  const questions = paper.questions;
  if (questions.length !== paper.questionCount || new Set(questions.map(q => q.id)).size !== questions.length) throw new Error(`Invalid question count/IDs: ${paper.id}`);
  let total = 0;
  for (const q of questions) {
    if (!q.q || q.opts.length !== 4 || !Number.isInteger(q.ans) || q.ans < 0 || q.ans > 3) throw new Error(`Invalid Q${q.id}`);
    q.opts.forEach((text, i) => {
      if (!text && !(q.optionImages || [])[i]) throw new Error(`Missing option Q${q.id}/${i}`);
    });
    [q.diagram, ...(q.optionImages || [])].filter(Boolean).forEach(asset => {
      if (!fs.existsSync(path.join(ROOT, asset))) throw new Error(`Missing asset: ${asset}`);
    });
    total += q.marks === undefined ? paper.defaultMarks : q.marks;
  }
  if (total !== paper.totalMarks) throw new Error(`Marks mismatch: ${paper.id}`);
}

function randomFor(value) {
  let hash = 2166136261;
  for (const char of value) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return () => {
    hash = (hash + 0x6D2B79F5) | 0;
    let t = Math.imul(hash ^ (hash >>> 15), 1 | hash);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildRows(paper) {
  const random = randomFor(`${paper.id}|${seed}`);
  return paper.questions.map((q, index) => {
    const options = q.opts.map((text, i) => ({ text: text || assetUrl((q.optionImages || [])[i]), original: i }));
    if (shuffle && !q.diagram && !q.optionImages) {
      for (let i = 3; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
    }
    const correctIndex = options.findIndex(option => option.original === q.ans);
    return { no: index + 1, id: q.id, question: q.q, options: options.map(o => o.text),
      correctIndex, correctOption: 'ABCD'[correctIndex], correctAnswer: options[correctIndex].text,
      marks: q.marks === undefined ? paper.defaultMarks : q.marks, category: q.cat,
      diagram: assetUrl(q.diagram), optionImages: (q.optionImages || []).map(assetUrl), solution: q.sol || '' };
  });
}

function csv(rows) {
  const cell = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
  return '\uFEFF' + rows.map(row => row.map(cell).join(',')).join('\r\n') + '\r\n';
}

function sheetScript(paper, rows, headers, keyHeaders) {
  return `/** D3V3NDRA Classes — Class ${paper.grade} ${paper.title}
 * Paste into Google Sheets > Extensions > Apps Script. Save, reload the sheet,
 * then D3V3NDRA > Fill everything. Illustration cells contain clickable URLs.
 */
const QUESTION_ROWS = ${JSON.stringify(rows, null, 2)};
const QUESTION_HEADERS = ${JSON.stringify(headers)};
const ANSWER_HEADERS = ${JSON.stringify(keyHeaders)};
function onOpen() {
  SpreadsheetApp.getUi().createMenu('D3V3NDRA').addItem('Fill everything', 'fillEverything').addToUi();
}
function writeSheet_(name, headers, values, widths) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(name) || book.insertSheet(name);
  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#0d2a5e').setFontColor('#ffffff').setFontWeight('bold');
  // Plain text preserves source currency and avoids spreadsheet formula parsing.
  sheet.getRange(2, 1, values.length, headers.length).setNumberFormat('@').setValues(values)
    .setWrap(true).setVerticalAlignment('top');
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 34);
  widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));
  sheet.getRange(1, 1, values.length + 1, headers.length).createFilter();
  return sheet;
}
function fillEverything() {
  const questions = QUESTION_ROWS.map(r => [r.no, r.id, r.question, ...r.options, r.correctOption, r.correctAnswer, r.marks, r.category, r.diagram, r.solution]);
  const key = QUESTION_ROWS.map(r => [r.no, r.correctOption, r.correctAnswer, r.marks]);
  const sheet = writeSheet_('Question Bank', QUESTION_HEADERS, questions, [45,45,380,180,180,180,180,95,200,65,140,220,380]);
  QUESTION_ROWS.forEach((r, i) => sheet.getRange(i + 2, 4 + r.correctIndex).setBackground('#e9f9ef').setFontColor('#15803d').setFontWeight('bold'));
  writeSheet_('Answer Key', ANSWER_HEADERS, key, [45,95,260,65]);
  const notes = [
    [${JSON.stringify(`Class ${paper.grade} · ${paper.title} · ${paper.questionCount} questions · ${paper.totalMarks} marks`)}],
    ['The live portal preserves the original worksheet question and option order.'],
    [${JSON.stringify(shuffle ? `Practice export: shuffled text-only options, seed ${seed}. Illustrated options keep their source order.` : 'This export matches the live portal order.')}],
    ['Illustrations are linked in the diagram and option cells.'],
    [${JSON.stringify(`Worksheet + answer key: ${assetUrl(paper.worksheet)}`)}],
    ['Regenerate with npm run export:sheet.']
  ];
  writeSheet_('Read Me', ['D3V3NDRA Testing Portal'], notes, [720]);
  SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(sheet);
}
`;
}

fs.mkdirSync(OUT, { recursive: true });
for (const paper of loadPapers()) {
  validate(paper);
  const rows = buildRows(paper);
  const name = `${paper.id}-question-bank${shuffle ? '-shuffled' : ''}`;
  const headers = ['No.', 'ID', 'Question', 'Option A', 'Option B', 'Option C', 'Option D', 'Correct Option', 'Correct Answer', 'Marks', 'Section', 'Diagram', 'Solution'];
  const keyHeaders = ['No.', 'Correct Option', 'Correct Answer', 'Marks'];
  const files = {
    [`${name}.csv`]: csv([headers, ...rows.map(r => [r.no, r.id, r.question, ...r.options, r.correctOption, r.correctAnswer, r.marks, r.category, r.diagram, r.solution])]),
    [`${name}-answer-key.csv`]: csv([keyHeaders, ...rows.map(r => [r.no, r.correctOption, r.correctAnswer, r.marks])]),
    [`${name}.json`]: JSON.stringify({ paperId: paper.id, title: paper.title, grade: paper.grade, count: rows.length,
      totalMarks: paper.totalMarks, shuffled: shuffle, seed: shuffle ? seed : null, questions: rows }, null, 2) + '\n',
    [`google-sheet-${name}.gs`]: sheetScript(paper, rows, headers, keyHeaders)
  };
  for (const [filename, content] of Object.entries(files)) fs.writeFileSync(path.join(OUT, filename), content, 'utf8');
  console.log(`${paper.id}: exported ${rows.length} questions, ${paper.totalMarks} marks (4 files).`);
}
