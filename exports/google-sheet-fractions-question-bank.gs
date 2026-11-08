/**
 * D3V3NDRA Classes — Fractions question bank
 * Generated from test_questions.js on 2026-11-08T19:26:40.101Z
 * Options use the source-bank order.
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

const QUESTION_ROWS = [
  {
    "no": 1,
    "id": 1,
    "question": "What is the product of a whole number and a fraction equal to?",
    "options": [
      "Sum of both",
      "Repeated addition of the fraction",
      "Difference",
      "Ratio"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "Repeated addition of the fraction",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 2,
    "id": 2,
    "question": "Aaron walks 3 km in 1 hour. How far does he walk in 5 hours?",
    "options": [
      "8 km",
      "12 km",
      "15 km",
      "18 km"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "15 km",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 3,
    "id": 3,
    "question": "A tortoise walks 1/4 km in 1 hour. How far does it walk in 3 hours?",
    "options": [
      "3/4 km",
      "1/4 km",
      "1/2 km",
      "1 km"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "3/4 km",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 4,
    "id": 4,
    "question": "Which operation is used to find total distance when speed per hour is a fraction?",
    "options": [
      "Addition",
      "Subtraction",
      "Multiplication",
      "Division"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "Multiplication",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 5,
    "id": 5,
    "question": "A farmer had 5 grandchildren and gave 2/3 acre of land to each. How much land in all?",
    "options": [
      "7/3 acre",
      "10/3 acre",
      "5/3 acre",
      "10 acre"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "10/3 acre",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 6,
    "id": 6,
    "question": "1 hour of internet costs ₹8. How much for 1 1/4 hours?",
    "options": [
      "₹8",
      "₹10",
      "₹12",
      "₹16"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "₹10",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 7,
    "id": 7,
    "question": "Tenzin drinks 1/2 glass of milk every day. How many glasses in a week (7 days)?",
    "options": [
      "3 glasses",
      "3 1/2 glasses",
      "4 glasses",
      "7 glasses"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "3 1/2 glasses",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 8,
    "id": 8,
    "question": "What is 1/5 × 3 equal to?",
    "options": [
      "3/5",
      "1/15",
      "5/3",
      "15"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "3/5",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 9,
    "id": 9,
    "question": "What is 2/5 × 3 equal to?",
    "options": [
      "6/5",
      "3/10",
      "6/15",
      "15/6"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "6/5",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 10,
    "id": 10,
    "question": "5 × 2/3 = ?",
    "options": [
      "10/3",
      "7/3",
      "5/6",
      "15/2"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "10/3",
    "difficulty": "Easy",
    "category": "Multiplication"
  },
  {
    "no": 11,
    "id": 11,
    "question": "What is 1/2 × 1/4 equal to?",
    "options": [
      "1/8",
      "1/6",
      "1/4",
      "1/2"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1/8",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 12,
    "id": 12,
    "question": "If a tortoise covers 2/5 km in 1 hour, how far does it cover in 3/4 of an hour?",
    "options": [
      "3/10 km",
      "8/15 km",
      "3/5 km",
      "3/20 km"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "3/10 km",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 13,
    "id": 13,
    "question": "Multiply 7 × 3/5 and choose the mixed fraction.",
    "options": [
      "4 1/5",
      "5 1/5",
      "4 2/5",
      "14/5"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "4 1/5",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 14,
    "id": 14,
    "question": "Multiply 4 × 1/3 and choose the mixed fraction.",
    "options": [
      "1 1/3",
      "1 2/3",
      "3/4",
      "5/3"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1 1/3",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 15,
    "id": 15,
    "question": "9/7 × 6 = ?",
    "options": [
      "7 5/7",
      "8 1/7",
      "7 3/7",
      "54/49"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "7 5/7",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 16,
    "id": 16,
    "question": "13/11 × 6 = ?",
    "options": [
      "7 1/11",
      "7 4/11",
      "78/66",
      "8 1/11"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "7 1/11",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 17,
    "id": 17,
    "question": "A team makes 1 km of canal in 8 days. How much does it make in one day?",
    "options": [
      "1/8 km",
      "1/4 km",
      "8 km",
      "1 km"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1/8 km",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 18,
    "id": 18,
    "question": "If the team works 5 days a week, how much canal does it make in a week?",
    "options": [
      "5/8 km",
      "1/8 km",
      "5 km",
      "1/5 km"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "5/8 km",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 19,
    "id": 19,
    "question": "Manju and two neighbours buy 5 litres of oil and share it equally among 3 families. How much does each family get for the week?",
    "options": [
      "5/3 litre",
      "3/5 litre",
      "15 litre",
      "5/6 litre"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "5/3 litre",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 20,
    "id": 20,
    "question": "How much oil will one family get in 4 weeks at the same rate?",
    "options": [
      "20/3 litre",
      "5/3 litre",
      "20 litre",
      "5/12 litre"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "20/3 litre",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 21,
    "id": 21,
    "question": "What is 1/2 ÷ 2 equal to?",
    "options": [
      "1/4",
      "1",
      "4",
      "1/2"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1/4",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 22,
    "id": 22,
    "question": "What is 5 ÷ 1/2 equal to?",
    "options": [
      "10",
      "5/2",
      "1/10",
      "2/5"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "10",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 23,
    "id": 23,
    "question": "The reciprocal of a fraction a/b (a ≠ 0, b ≠ 0) is:",
    "options": [
      "b/a",
      "a/b",
      "1/a",
      "1/b"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "b/a",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 24,
    "id": 24,
    "question": "When a non-zero fraction is multiplied by its reciprocal, the result is:",
    "options": [
      "1",
      "0",
      "the fraction itself",
      "undefined"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 25,
    "id": 25,
    "question": "The first step in dividing fractions is to find the ___ of the divisor.",
    "options": [
      "reciprocal",
      "product",
      "sum",
      "square"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "reciprocal",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 26,
    "id": 26,
    "question": "Leena made 5 cups of tea and used 1/3 cup of milk per cup. How much milk did she use in all?",
    "options": [
      "5/3 cup",
      "15 cup",
      "3/5 cup",
      "5 cup"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "5/3 cup",
    "difficulty": "Tough",
    "category": "Word problem"
  },
  {
    "no": 27,
    "id": 27,
    "question": "Safia saw the Moon set at 10 pm. The Moon sets 5/6 hour later each day. How many hours after 10 pm will it set on Thursday (4 days later)?",
    "options": [
      "10/3 hour",
      "4 hour",
      "5/6 hour",
      "10 hour"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "10/3 hour",
    "difficulty": "Tough",
    "category": "Word problem"
  },
  {
    "no": 28,
    "id": 28,
    "question": "A cake is cut into 8 equal slices. Mariam takes one slice. What fraction of the whole cake does she take?",
    "options": [
      "1/8",
      "1/4",
      "1/2",
      "1/7"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1/8",
    "difficulty": "Tough",
    "category": "Word problem"
  },
  {
    "no": 29,
    "id": 29,
    "question": "A rectangle has length 3/4 m and breadth 2/5 m. What is its area?",
    "options": [
      "3/10 m²",
      "5/9 m²",
      "8/9 m²",
      "3/5 m²"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "3/10 m²",
    "difficulty": "Tough",
    "category": "Word problem"
  },
  {
    "no": 30,
    "id": 30,
    "question": "A ribbon 5/6 m long is cut into 5 equal pieces. What is the length of each piece?",
    "options": [
      "1/6 m",
      "5 m",
      "1/5 m",
      "25/6 m"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1/6 m",
    "difficulty": "Tough",
    "category": "Division"
  },
  {
    "no": 31,
    "id": 31,
    "question": "Simplify: (2/3 × 9/4) ÷ (3/2)",
    "options": [
      "1",
      "3/2",
      "2",
      "9/8"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1",
    "difficulty": "Tough",
    "category": "Operations"
  },
  {
    "no": 32,
    "id": 32,
    "question": "Simplify: (5/6 × 3/10) ÷ (1/4)",
    "options": [
      "1",
      "2",
      "3/5",
      "10/3"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1",
    "difficulty": "Tough",
    "category": "Operations"
  },
  {
    "no": 33,
    "id": 33,
    "question": "If x = 3/4 and y = 2/5, what is x ÷ y?",
    "options": [
      "15/8",
      "8/15",
      "3/10",
      "5/6"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "15/8",
    "difficulty": "Tough",
    "category": "Operations"
  },
  {
    "no": 34,
    "id": 34,
    "question": "Which is greater: 2/3 × 4/5 or 2/3 ÷ 4/5?",
    "options": [
      "2/3 × 4/5",
      "2/3 ÷ 4/5",
      "They are equal",
      "Cannot be compared"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "2/3 ÷ 4/5",
    "difficulty": "Tough",
    "category": "Operations"
  },
  {
    "no": 35,
    "id": 35,
    "question": "A car covers 4/5 km in 1/4 hour. What is its speed in km per hour?",
    "options": [
      "16/5 km/h",
      "4/20 km/h",
      "5/16 km/h",
      "1/5 km/h"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "16/5 km/h",
    "difficulty": "Tough",
    "category": "Word problem"
  },
  {
    "no": 36,
    "id": 36,
    "question": "To calculate 2/5 × 3, we can first divide 3 by 5 and then multiply by 2. Which calculation shows this?",
    "options": [
      "3 ÷ 5 × 2",
      "5 ÷ 3 × 2",
      "3 ÷ 2 × 5",
      "2 ÷ 5 × 3"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "3 ÷ 5 × 2",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 37,
    "id": 37,
    "question": "The whole is divided into 5 rows and 4 columns. How many equal parts are created?",
    "options": [
      "20",
      "9",
      "5",
      "4"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "20",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 38,
    "id": 38,
    "question": "How many 1/4-hour intervals are there in 1/2 hour?",
    "options": [
      "2",
      "4",
      "1",
      "8"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "2",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 39,
    "id": 39,
    "question": "The mixed fraction 1 1/4 converted to an improper fraction is:",
    "options": [
      "5/4",
      "4/5",
      "5",
      "1/4"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "5/4",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 40,
    "id": 40,
    "question": "If 1/5 ÷ 3 = x, what is x?",
    "options": [
      "1/15",
      "3/5",
      "5/3",
      "15"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1/15",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 41,
    "id": 41,
    "question": "A tank holds 3/4 litre. It is filled by pouring 1/8 litre at a time. How many pours are needed to fill it?",
    "options": [
      "6",
      "4",
      "8",
      "3"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "6",
    "difficulty": "Tough",
    "category": "Division"
  },
  {
    "no": 42,
    "id": 42,
    "question": "Simplify: 7/8 × 4/21",
    "options": [
      "1/6",
      "1/8",
      "2/7",
      "3/7"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1/6",
    "difficulty": "Tough",
    "category": "Multiplication"
  },
  {
    "no": 43,
    "id": 43,
    "question": "If 5/7 of a number is 25, what is the number?",
    "options": [
      "35",
      "25",
      "5/7",
      "7/5"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "35",
    "difficulty": "Tough",
    "category": "Word problem"
  },
  {
    "no": 44,
    "id": 44,
    "question": "A recipe needs 3/4 cup of sugar for one cake. How much sugar is needed for 6 cakes?",
    "options": [
      "9/2 cup",
      "4/3 cup",
      "9 cup",
      "3/2 cup"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "9/2 cup",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 45,
    "id": 45,
    "question": "Which fraction equals its own reciprocal?",
    "options": [
      "1",
      "1/2",
      "2",
      "0"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1",
    "difficulty": "Tough",
    "category": "Division"
  },
  {
    "no": 46,
    "id": 46,
    "question": "0 divided by any non-zero fraction equals:",
    "options": [
      "0",
      "1",
      "undefined",
      "the fraction"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "0",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 47,
    "id": 47,
    "question": "Any non-zero fraction divided by itself equals:",
    "options": [
      "1",
      "0",
      "undefined",
      "itself"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1",
    "difficulty": "Medium",
    "category": "Division"
  },
  {
    "no": 48,
    "id": 48,
    "question": "Simplify: (3/5 ÷ 2/7) × (4/9)",
    "options": [
      "14/15",
      "7/15",
      "12/35",
      "21/20"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "14/15",
    "difficulty": "Tough",
    "category": "Operations"
  },
  {
    "no": 49,
    "id": 49,
    "question": "John reads 2/3 of a book in 1 hour. How much does he read in 1 1/2 hours?",
    "options": [
      "1",
      "4/3",
      "2/3",
      "3/4"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1",
    "difficulty": "Medium",
    "category": "Multiplication"
  },
  {
    "no": 50,
    "id": 50,
    "question": "A wire 10/3 m long is cut into 4 equal parts. What is the length of each part?",
    "options": [
      "5/6 m",
      "4/3 m",
      "5/3 m",
      "2/3 m"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "5/6 m",
    "difficulty": "Medium",
    "category": "Division"
  }
];

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
    ['The website shuffles question order and answer-option order per student and date. This sheet reflects the source-bank order, so option letters in a student\'s attempt may differ.'],
    [''],
    ['Regenerate this sheet'],
    ['Run npm run export:sheet to rebuild the CSV, JSON, and Google Apps Script files from test_questions.js.'],
    ['Use npm run export:sheet:shuffled for a fixed shuffled practice paper.'],
    [''],
    ['Shuffle seed: not applied']
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
