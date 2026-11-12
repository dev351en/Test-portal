# D3V3NDRA Classes — Testing Portal

**Live:** https://mest-porutal.vercel.app/  
**Teacher preview:** https://mest-porutal.vercel.app/?preview=teacher-imo-2026

The neutral login page routes each student ID to its assigned paper. Questions,
options, diagrams and keys follow the source worksheet order exactly.

| Login ID | Paper | Questions | Marks | Duration |
|---|---|---:|---:|---|
| `DSMG7@012` | Class 7 / Grade 7 — Logical Reasoning | 50 | 100 | 60 minutes |
| `DSMG2@001` | Class 2 / Grade 2 — Mathematics, Test Paper 1 | 35 | 45 | 60 minutes |

Both logins currently use password `12345678`. Each student also enters their
full name/roll number and repeats it as their signature before starting.

## Paper-specific behaviour

- Profiles in `js/papers.js` control login, titles, grade, bank, duration, marks and PDF.
- Grade 7: 2 marks per correct answer. Grade 2: Q1–25 earn 1 each; Q26–35 earn 2 each.
- Incorrect and unattempted answers earn zero; no negative marking.
- Complete question preview before starting, including picture options.
- Colour-coded palette, answer clearing, mark-for-review, Previous and Next.
- Fullscreen/copy restrictions; five exit warnings, automatic submission on the sixth.
- Automatic submission when the timer reaches zero or the test window closes.
- Feedback, weighted result, correct/incorrect/unattempted counts and worked review.
- Paper-specific result text and prominent worksheet + answer-key PDF downloads.
- Class 2 download filename: **Worksheet Class 2 Test Paper 1.pdf**.
- Literal currency in Class 2 is excluded from MathJax processing.

## Attempts and test window

The scheduled window is **13 November 2026, 9 AM–5 PM IST**, enforced in
`middleware.js` and `js/app.js`. The teacher preview URL bypasses the time gate;
attempt checks and submission behaviour still apply. Use a distinct test name
when checking a real preview attempt.

Each name can attempt each paper once. Local registries are
`d3v3ndra.attempts.<paper-id>`. The Apps Script uses
`imo_attempt_names_<paper-id>`. The existing `logical-reasoning` ID preserves
Grade 7 attempt history; `class2-test-paper-1` has a separate registry. The
legacy `chapter` payload field is retained for endpoint compatibility. If the
remote check is unavailable, the existing local-attempt fallback applies.

## Files

| Path | Purpose |
|---|---|
| `index.html`, `css/styles.css` | Responsive login, instructions, exam and results |
| `js/papers.js` | Credential-to-paper profiles |
| `js/app.js` | Routing, state, scoring, timer, previews, review and submission |
| `test_questions.js` | Original ordered Grade 7 bank |
| `class2_questions.js` | Approved ordered Grade 2 bank |
| `assets/class2-test1/` | 15 question diagrams and 12 option illustrations |
| `assets/worksheet-class2-test-paper-1.pdf` | Approved redesigned Class 2 worksheet |
| `assets/worksheet-logical-reasoning.pdf` | Grade 7 worksheet |
| `scripts/google-apps-script-submission-email.gs` | Both-paper teacher email relay |
| `scripts/export-question-sheet.js` | Both-paper spreadsheet exports |
| `scripts/build-class2-bank.py` | Reproducible import from the worksheet project |
| `tests/` | Bank/report and browser workflow checks |

## Run and verify

No production build is required. Serve this directory with any static server:

```sh
python -m http.server 4175
```

Open `http://localhost:4175/?preview=teacher-imo-2026`.

```sh
npm install
npm test
npm run test:browser
```

The browser check starts its own local server and uses Chrome. Set `CHROME_PATH`
if Chrome is not at the Windows default location, or set `PORTAL_TEST_URL` to
check a deployment. Browser checks intercept claim/email requests to avoid
creating real attempts or sending test emails.

## Teacher email script — deployment required after updating

The frontend continues to use the configured Google Apps Script endpoint. To
activate the updated two-paper email report in the teacher's Google account:

1. Open the existing project at https://script.google.com.
2. Replace `Code.gs` with `scripts/google-apps-script-submission-email.gs`.
3. Choose **Deploy → Manage deployments → Edit → New version → Deploy**.
4. Keep **Execute as: Me**, **Who has access: Anyone**, and the same web-app URL.
5. Open the endpoint URL; the status response should contain
   `"version":"testing-portal-v2"`.

The report includes class/paper identity, weighted marks, all three answer
counts, duration, exit count, every option, diagrams/picture choices and the
matching worksheet link. HTML and plain-text reports use the same scoring.
The script accepts legacy submissions with a default of 2 marks per question.
`SUBMIT_TOKEN` must match `CONFIG.submissionToken` in `js/app.js`.

Form submission to the cross-origin relay confirms dispatch, not email delivery;
check the teacher inbox or Apps Script executions to confirm receipt.

## Spreadsheet exports

```sh
npm run export:sheet
npm run export:sheet -- --paper=class2-test-paper-1
npm run export:sheet:shuffled
```

Each paper gets `<paper-id>-question-bank.csv`, `-answer-key.csv`, `.json` and
`google-sheet-<paper-id>-question-bank.gs` under `exports/`. These include marks,
solutions and diagram/option image URLs. Paste a generated `.gs` file into a
Google Sheet's **Extensions → Apps Script**, save/reload, and choose
**D3V3NDRA → Fill everything**. Existing `fractions-*` exports are older archives.
Explicit shuffled exports are separate practice materials; illustrated options
retain their original order. The live test always uses worksheet order.

## Rebuild Class 2 assets

With PyMuPDF installed in the worksheet project's Python environment:

```sh
python scripts/build-class2-bank.py --source-dir "../DASS/D3V3NDRA Classes"
```

This validates against the original PDF and approved dataset, renders source
diagrams with transparency applied, exports picture choices, and copies the
approved redesigned PDF. It does not regenerate or rewrite the approved paper.

## Hosting

Push this folder to `dev351en/Test-portal`, branch `main`, for the connected
Vercel deployment. Static asset routes must stay intact; `vercel.json` has no
catch-all rewrite. Both the questions and credentials are browser-side, as in
the original classroom portal.
