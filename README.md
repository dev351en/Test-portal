# D3V3NDRA Classes — Fractions Test Series

A browser-based chapter test for **Working with Fractions** (NCERT Class 7, `gegp108`), rebuilt around a clean blue edtech interface.

**Live site:** https://mest-porutal.vercel.app/

## What is included

- **Student login** with a show/hide password control and optional "Remember me"
- **Instructions screen** with a visible honesty note
- **50 multiple-choice questions**, 4 options each
- **60-minute timer** with automatic submission at `00:00`
- **100 marks** — 2 marks per correct answer, no negative marking
- **Free navigation** — Previous, Next, Save & Next, and a question palette
- **Mark for Review** and **Clear answer** controls
- **Palette legend** for current, answered, marked, and not-answered questions
- **Submit confirmation** showing answered, unanswered, and marked counts
- **Feedback form** after submission
- **Result screen** with score, percentage, time used, and grade
- **Answer review** with the student's answer and the correct answer for every question
- **Downloadable text report** that a student can share with the teacher

Question order **and answer-option order** are shuffled per student and date, so the paper is not identical for every attempt.

## Marking and timing

| Item | Value |
|------|-------|
| Questions | 50 |
| Marks per correct answer | 2 |
| Total marks | 100 |
| Negative marking | None |
| Duration | 60 minutes |
| Auto-submit | Yes, at `00:00` |

The answer key is in `test_questions.js`. Difficulty tags (10 Easy, 25 Medium, 15 Tough) are metadata only and are not shown to students.

## Student credentials

The current demo credentials are:

- **Student ID:** `DSMG7@012`
- **Password:** `12345678`

They are defined in the `CONFIG` object near the top of `js/app.js`:

```js
const CONFIG = {
  loginId: 'DSMG7@012',
  password: '12345678',
  totalMinutes: 60,
  marksPerQ: 2
};
```

Change these values before sharing the site with a new group.

## Project structure

```text
.
├── index.html              # All screen markup
├── css/
│   └── styles.css          # Blue edtech visual system and responsive rules
├── js/
│   └── app.js              # Login, timer, exam, palette, scoring, feedback, review
├── test_questions.js       # 50-question source bank with answers
├── scripts/
│   └── export-question-sheet.js  # Builds CSV, JSON, and Google Apps Script exports
├── exports/                # Generated spreadsheet files (created by npm run export:sheet)
├── assets/
│   ├── logo-mark.png       # D3V3NDRA emblem
│   ├── logo-wordmark.png   # D3V3NDRA wordmark
│   └── fonts/              # Self-hosted Inter font files
├── vercel.json             # Static deployment + security headers
├── package.json
└── README.md
```

There is no build step. The site is plain HTML, CSS, and JavaScript.

## Run locally

From this folder, start any static file server. For example:

```bash
npx serve .
```

or, with Python installed:

```bash
python -m http.server 4175
```

Then open `http://localhost:4175/`.

Opening `index.html` directly from the filesystem may work in some browsers, but a local server is recommended so fonts and scripts load consistently.

## Deploy to Vercel

The repository is already connected to Vercel. Push changes to the `main` branch and Vercel redeploys automatically.

For a fresh project:

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Other**.
4. Leave the build command and output directory empty.
5. Deploy.

`vercel.json` intentionally has **no catch-all rewrite**. The app is a single HTML page, but `/css`, `/js`, and `/assets` must be served as real files. A catch-all route would return `index.html` for every asset request and break the styling and scripts.

## Customization

- **Branding:** replace `assets/logo-mark.png` and `assets/logo-wordmark.png`.
- **Questions and answers:** edit `test_questions.js`. Keep each correct answer index in `ans` pointing at the right entry in `opts`.
- **Timer and marks:** edit `totalMinutes` and `marksPerQ` in `js/app.js`.
- **Colors and layout:** edit `css/styles.css`.
- **Login credentials:** edit `CONFIG.loginId` and `CONFIG.password` in `js/app.js`.

## Export the question bank to a spreadsheet

`scripts/export-question-sheet.js` reads `test_questions.js` and writes spreadsheet-ready files into `exports/`. It uses only Node's built-in modules, so there is nothing to install.

```bash
npm run export:sheet
```

This creates:

| File | Purpose |
|------|---------|
| `exports/fractions-question-bank.csv` | All 50 questions with Options A–D and the correct answer |
| `exports/fractions-question-bank-answer-key.csv` | Compact answer key |
| `exports/fractions-question-bank.json` | Structured data for other tools |
| `exports/google-sheet-fractions-question-bank.gs` | Apps Script that fills and formats a Google Sheet |

### Google Sheets (automatic, one-time setup)

The `.gs` file is a complete Apps Script for Google Sheets:

1. Create a new Google Sheet.
2. Open **Extensions → Apps Script**.
3. Delete the placeholder code in `Code.gs` and paste the entire contents of `exports/google-sheet-fractions-question-bank.gs`.
4. Save, then reload the Google Sheet.
5. Use the **D3V3NDRA** menu → **Fill everything**.

The script creates three tabs:

- **Question Bank** — every question with Options A–D, plus the correct option and correct answer. The correct option cell is highlighted green, and the header row is frozen with filters enabled.
- **Answer Key** — a compact list of correct options and answers.
- **Read Me** — usage notes and the shuffle seed, if one was used.

Re-run **D3V3NDRA → Fill everything** whenever you change the source bank and paste in a freshly generated `.gs` file.

### Excel or another spreadsheet app

Import `exports/fractions-question-bank.csv` with UTF-8 encoding. The file starts with a byte-order mark, so Excel detects UTF-8 and displays symbols such as `₹` correctly. Use **Data → From Text/CSV** and choose comma as the delimiter.

### Fixed shuffled paper

The live test shuffles questions and answer-option order for each attempt, so a sheet built from source order will not match every student's on-screen option letters. To generate one fixed shuffled paper:

```bash
npm run export:sheet:shuffled
```

That writes `fractions-question-bank-shuffled.*`, `fractions-question-bank-shuffled-answer-key.csv`, and `google-sheet-fractions-question-bank-shuffled.gs`, using the seed `demo`. To use a different seed:

```bash
npm run export:sheet:shuffled -- --seed=my-paper
```

The generated Google Sheet and CSV then agree with each other, and with any attempt that uses the same seed. Regenerating with the same seed produces the same order.

## Security and honest limitations

This is a **static client-side app**, not a secure exam server:

- The login ID, password, and full answer key are visible in the page source.
- Answers, results, and feedback stay in the browser. They are **not transmitted to a teacher or saved to a database**.
- The "Download result" button creates a local text file; students must share it themselves.
- Browser controls can discourage accidental navigation, but they cannot prevent a determined student from using another device, notes, or outside help.
- Results reset when the page is refreshed, and anyone with the link can start an attempt.

For high-stakes assessment, add server-side authentication, server-held answer keys, attempt logging, and submission storage. The current version is suitable for guided classroom practice and revision.

## Live deployment note

The GitHub repository is `dev351en/Test-portal`. The Vercel project is available at:

**https://mest-porutal.vercel.app/**
