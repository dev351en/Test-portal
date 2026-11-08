#!/usr/bin/env node
/**
 * D3V3NDRA Classes — question bank sheet exporter
 *
 * Reads test_questions.js and writes:
 *   exports/fractions-question-bank.csv
 *   exports/fractions-question-bank-answer-key.csv
 *   exports/fractions-question-bank.json
 *   exports/google-sheet-question-bank.gs
 *
 * Usage:
 *   node scripts/export-question-sheet.js
 *   node scripts/export-question-sheet.js --shuffle --seed=demo
 *
 * No npm dependencies are required.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const QUESTION_FILE = path.join(ROOT, 'test_questions.js');
const OUT_DIR = path.join(ROOT, 'exports');
const EXPECTED_COUNT = 50;

const args = process.argv.slice(2);
const shuffle = args.includes('--shuffle');
const seedArg = args.filter(argument => argument.startsWith('--seed=')).pop();
const seed = seedArg ? seedArg.slice('--seed='.length) : 'd3v3ndra';
const baseName = shuffle ? 'fractions-question-bank-shuffled' : 'fractions-question-bank';

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function loadBank() {
  if (!fs.existsSync(QUESTION_FILE)) {
    fail(`question bank not found at ${QUESTION_FILE}`);
  }
  const source = fs.readFileSync(QUESTION_FILE, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: QUESTION_FILE });
  const questions = sandbox.window.QUESTIONS;
  if (!Array.isArray(questions)) fail('test_questions.js did not expose window.QUESTIONS');
  return questions;
}

function validateBank(questions) {
  if (questions.length !== EXPECTED_COUNT) {
    fail(`expected ${EXPECTED_COUNT} questions, found ${questions.length}`);
  }
  const ids = new Set();
  questions.forEach((question, index) => {
    const label = `question ${index + 1}`;
    if (!Number.isInteger(question.id)) fail(`${label} has no numeric id`);
    if (ids.has(question.id)) fail(`${label} repeats id ${question.id}`);
    ids.add(question.id);
    if (typeof question.q !== 'string' || !question.q.trim()) fail(`${label} has no question text`);
    if (!Array.isArray(question.opts) || question.opts.length !== 4) fail(`${label} must have exactly 4 options`);
    question.opts.forEach((option, optionIndex) => {
      if (typeof option !== 'string' || !option.trim()) fail(`${label}, option ${optionIndex + 1} is empty`);
    });
    if (!Number.isInteger(question.ans) || question.ans < 0 || question.ans > 3) {
      fail(`${label} has an invalid correct answer index`);
    }
    if (typeof question.diff !== 'string' || !question.diff.trim()) fail(`${label} has no difficulty`);
    if (typeof question.cat !== 'string' || !question.cat.trim()) fail(`${label} has no category`);
  });
  return questions;
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(initialSeed) {
  let state = initialSeed;
  return function random() {
    state |= 0;
    state = (state + 0x6D2B79F5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleOptions(question, random) {
  const options = question.opts.map((text, index) => ({ text, index }));
  for (let index = options.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [options[index], options[swapIndex]] = [options[swapIndex], options[index]];
  }
  return {
    options: options.map(option => option.text),
    correctIndex: options.findIndex(option => option.index === question.ans)
  };
}

function buildRows(questions) {
  const random = mulberry32(hashString(`sheet|${seed}`));
  return questions.map((question, index) => {
    const result = shuffle
      ? shuffleOptions(question, random)
      : { options: question.opts.slice(), correctIndex: question.ans };
    return {
      no: index + 1,
      id: question.id,
      question: question.q,
      options: result.options,
      correctIndex: result.correctIndex,
      correctOption: 'ABCD'[result.correctIndex],
      correctAnswer: result.options[result.correctIndex],
      difficulty: question.diff,
      category: question.cat
    };
  });
}

function csvCell(value) {
  const text = String(value === undefined || value === null ? '' : value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function makeCsv(rows) {
  return `\uFEFF${rows.map(row => row.map(csvCell).join(',')).join('\r\n')}\r\n`;
}

function writeFile(fileName, contents) {
  const filePath = path.join(OUT_DIR, fileName);
  fs.writeFileSync(filePath, contents, 'utf8');
  return filePath;
}

function questionCsv(rows) {
  return [
    ['No.', 'ID', 'Question', 'Option A', 'Option B', 'Option C', 'Option D', 'Correct Option', 'Correct Answer', 'Difficulty', 'Category'],
    ...rows.map(row => [
      row.no,
      row.id,
      row.question,
      row.options[0],
      row.options[1],
      row.options[2],
      row.options[3],
      row.correctOption,
      row.correctAnswer,
      row.difficulty,
      row.category
    ])
  ];
}

function answerKeyCsv(rows) {
  return [
    ['No.', 'ID', 'Correct Option', 'Correct Answer', 'Difficulty', 'Category'],
    ...rows.map(row => [
      row.no,
      row.id,
      row.correctOption,
      row.correctAnswer,
      row.difficulty,
      row.category
    ])
  ];
}

function googleSheetScript(rows, generatedAt) {
  const data = JSON.stringify(rows, null, 2);
  return `/**
 * D3V3NDRA Classes — Fractions question bank
 * Generated from test_questions.js on ${generatedAt}
 * ${shuffle ? `Options are shuffled with seed "${seed}".` : 'Options use the source-bank order.'}
 *
 * HOW TO USE
 * 1. Open a Google Sheet.
 * 2. Extensions → Apps Script.
 * 3. Replace the contents of Code.gs with this file.
 * 4. Save, reload the sheet, then use:
 *      D3V3NDRA → Fill everything
 *
 * The correct option cell is highlighted green in the Question Bank sheet.
 */

const QUESTION_ROWS = ${data};

const QUESTION_HEADERS = [
  'No.', 'ID', 'Question', 'Option A', 'Option B', 'Option C', 'Option D',
  'Correct Option', 'Correct Answer', 'Difficulty', 'Category'
];

const ANSWER_HEADERS = ['No.', 'ID', 'Correct Option', 'Correct Answer', 'Difficulty', 'Category'];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('D3V3NDRA')
    .addItem('Fill everything', 'fillEverything')
    .addItem('Refresh question bank only', 'fillQuestionBank')
    .addItem('Refresh answer key only', 'fillAnswerKey')
    .addToUi();
}

function fillEverything() {
  fillQuestionBank();
  fillAnswerKey();
  fillReadMe();
  SpreadsheetApp.getActive().toast('Question bank, answer key, and notes are ready.', 'D3V3NDRA', 5);
}

function getSheet_(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function fillQuestionBank() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getSheet_(spreadsheet, 'Question Bank');
  sheet.clear();

  sheet.getRange(1, 1, 1, QUESTION_HEADERS.length).setValues([QUESTION_HEADERS]);
  const values = QUESTION_ROWS.map(function (row) {
    return [
      row.no,
      row.id,
      row.question,
      row.options[0],
      row.options[1],
      row.options[2],
      row.options[3],
      row.correctOption,
      row.correctAnswer,
      row.difficulty,
      row.category
    ];
  });
  sheet.getRange(2, 1, values.length, QUESTION_HEADERS.length).setValues(values);

  const header = sheet.getRange(1, 1, 1, QUESTION_HEADERS.length);
  header.setBackground('#1d4ed8')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);

  const dataRange = sheet.getRange(2, 1, values.length, QUESTION_HEADERS.length);
  dataRange.setVerticalAlignment('top').setWrap(true);

  const widths = [42, 42, 380, 165, 165, 165, 165, 90, 200, 80, 120];
  widths.forEach(function (width, index) {
    sheet.setColumnWidth(index + 1, width);
  });

  QUESTION_ROWS.forEach(function (row, index) {
    const rowNumber = index + 2;
    const optionColumn = 4 + row.correctIndex;
    sheet.getRange(rowNumber, optionColumn)
      .setBackground('#e9f9ef')
      .setFontColor('#15803d')
      .setFontWeight('bold');
    sheet.getRange(rowNumber, 8).setFontColor('#15803d').setFontWeight('bold');
    sheet.getRange(rowNumber, 9).setFontColor('#15803d').setFontWeight('bold');
  });

  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, values.length + 1, QUESTION_HEADERS.length).createFilter();
  spreadsheet.setActiveSheet(sheet);
}

function fillAnswerKey() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getSheet_(spreadsheet, 'Answer Key');
  sheet.clear();

  sheet.getRange(1, 1, 1, ANSWER_HEADERS.length).setValues([ANSWER_HEADERS]);
  const values = QUESTION_ROWS.map(function (row) {
    return [row.no, row.id, row.correctOption, row.correctAnswer, row.difficulty, row.category];
  });
  sheet.getRange(2, 1, values.length, ANSWER_HEADERS.length).setValues(values);

  const header = sheet.getRange(1, 1, 1, ANSWER_HEADERS.length);
  header.setBackground('#0d2a5e')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);
  sheet.getRange(2, 1, values.length, ANSWER_HEADERS.length).setVerticalAlignment('top').setWrap(true);

  const widths = [45, 45, 95, 210, 85, 130];
  widths.forEach(function (width, index) {
    sheet.setColumnWidth(index + 1, width);
  });

  QUESTION_ROWS.forEach(function (row, index) {
    sheet.getRange(index + 2, 3).setFontColor('#15803d').setFontWeight('bold');
    sheet.getRange(index + 2, 4).setFontColor('#15803d').setFontWeight('bold');
  });

  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, values.length + 1, ANSWER_HEADERS.length).createFilter();
}

function fillReadMe() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getSheet_(spreadsheet, 'Read Me');
  sheet.clear();
  sheet.setColumnWidth(1, 640);

  const lines = [
    ['D3V3NDRA Classes — Fractions Question Bank'],
    [''],
    ['Generated from test_questions.js for the Working with Fractions chapter test.'],
    [''],
    ['Question Bank sheet'],
    ['One question per row, with Options A–D. The correct option is highlighted green and also listed in the Correct Option and Correct Answer columns.'],
    [''],
    ['Answer Key sheet'],
    ['A compact version with just the question number, correct option, correct answer, difficulty, and category.'],
    [''],
    ['Live test behaviour'],
    ['The website shuffles question order and answer-option order per student and date. This sheet reflects the ${shuffle ? 'fixed shuffled paper generated with the seed shown below' : 'source-bank order'}, so option letters in a student\\'s attempt may differ.'],
    [''],
    ['Regenerate this sheet'],
    ['Run npm run export:sheet to rebuild the CSV, JSON, and Google Apps Script files from test_questions.js.'],
    ['Use npm run export:sheet:shuffled for a fixed shuffled practice paper.'],
    [''],
    ['Shuffle seed: ${shuffle ? seed : 'not applied'}']
  ];
  sheet.getRange(1, 1, lines.length, 1).setValues(lines);
  sheet.getRange(1, 1).setFontSize(16).setFontWeight('bold').setFontColor('#0b1f44');
  sheet.getRange(5, 1).setFontWeight('bold').setFontColor('#1d4ed8');
  sheet.getRange(9, 1).setFontWeight('bold').setFontColor('#1d4ed8');
  sheet.getRange(12, 1).setFontWeight('bold').setFontColor('#1d4ed8');
  sheet.getRange(15, 1).setFontWeight('bold').setFontColor('#1d4ed8');
  sheet.getRange(1, 1, lines.length, 1).setWrap(true).setVerticalAlignment('top');
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Question Bank') || sheet);
}
`;
}

function main() {
  const questions = validateBank(loadBank());
  const rows = buildRows(questions);
  const generatedAt = new Date().toISOString();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const written = [
    writeFile(`${baseName}.csv`, makeCsv(questionCsv(rows))),
    writeFile(`${baseName}-answer-key.csv`, makeCsv(answerKeyCsv(rows))),
    writeFile(`${baseName}.json`, `${JSON.stringify({
      generatedAt,
      source: 'test_questions.js',
      shuffled: shuffle,
      seed: shuffle ? seed : null,
      count: rows.length,
      questions: rows
    }, null, 2)}\n`),
    writeFile(`google-sheet-${baseName}.gs`, googleSheetScript(rows, generatedAt))
  ];

  console.log(`Exported ${rows.length} questions${shuffle ? ` with shuffled options (seed: ${seed})` : ''}.`);
  written.forEach(filePath => console.log(`  ${path.relative(ROOT, filePath)}`));
  console.log('\nGoogle Sheets: paste the .gs file into Extensions → Apps Script, save, reload the sheet, then use D3V3NDRA → Fill everything.');
}

main();
