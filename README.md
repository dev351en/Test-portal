# D3V3NDRA Classes — Testing Portal

**Live:** https://mest-porutal.vercel.app/  
**Teacher preview:** https://mest-porutal.vercel.app/?preview=teacher-imo-2026

The neutral login page routes the Class 7 login to the scheduled paper.
Worksheet 3 runs first; after that session closes, the portal switches to
Worksheet 4 at 4 PM. Questions, options, diagrams and keys follow each source
worksheet order exactly.

| Login ID | Paper | Questions | Marks | Duration |
|---|---|---:|---:|---|
| `DSMG7@012` | Class 7 / Grade 7 — Worksheet 3 (11 AM–3 PM), then Worksheet 4 (4–9 PM) | 50 each | 100 each | 60 minutes each |
| `DSMG2@001` | Class 2 / Grade 2 — Joyful Mathematics Olympiad Benchmark | 35 | 70 | 45 minutes |

Both Class 7 sessions use password `12345678` and the existing title,
credentials, 50 MCQs, 100 marks and 60-minute duration. On **25 November 2026**,
Worksheet 3 is available **11:00 AM–3:00 PM IST**, followed by Worksheet 4
**4:00 PM–9:00 PM IST**. The same Class 7 login automatically selects the paper
for the current session. The portal displays a between-session gate from 3–4 PM
and auto-submits any Worksheet 3 test still running at 3 PM. The Class 2 profile
is retained but closed. Each student enters their full name/roll number and
repeats it as their signature before starting.

## Paper-specific behaviour

- Profiles in `js/papers.js` control login, titles, grade, bank, duration, marks and PDF.
- The two Class 7 sessions use separate question banks, diagrams, PDFs and
  attempt registries. `?preview=teacher-imo-2026&paper=class7-combined-worksheet-4`
  previews Worksheet 4; without `paper`, preview mode selects the active session
  or defaults to Worksheet 3.
- Both papers award 2 marks per correct answer (Grade 7: 100 marks; Grade 2: 70 marks).
- Incorrect and unattempted answers earn zero; no negative marking.
- Exact worksheet order for questions, options, diagrams and picture choices.
- The **View Paper** tab sits below the question number inside the running exam.
  It opens a page-by-page view of the questions-only PDF; the answer key is never
  included in that viewer and nothing can be read before **Start Test**.
- Colour-coded palette, answer clearing, mark-for-review, Previous and Next.
- Fullscreen/copy restrictions; five exit warnings, automatic submission on the sixth.
- Automatic submission when the timer reaches zero or the test window closes.
- Feedback, weighted result, correct/incorrect/unattempted counts and worked review.
- Paper-specific result text and prominent worksheet + answer-key PDF downloads.
- Class 2 download filename: **Worksheet Class 2 Mathematics Olympiad.pdf**.
- Grade 7 download filename: **Worksheet Full Syllabus Comprehensive Olympiad.pdf**.
- Literal currency in Class 2 is excluded from MathJax processing.

## Attempts and test window

The session windows are **25 November 2026, 11 AM–3 PM IST** (Worksheet 3) and
**4–9 PM IST** (Worksheet 4). `middleware.js` admits the overall 11 AM–9 PM
portal period; `js/app.js` enforces each paper's session and automatically
switches the login to the next paper. The teacher preview URL bypasses the time
gate; attempt checks and submission behaviour still apply. Use a distinct test
name when checking a real preview attempt.

Each name can attempt each paper once. Local registries are
`d3v3ndra.attempts.<paper-id>`. The Apps Script uses
`imo_attempt_names_<paper-id>`. Worksheet 3 and Worksheet 4 each use a separate
fresh Class 7 registry (`class7-combined-worksheet-3` and
`class7-combined-worksheet-4`), so a student's first-session attempt does not
block their second-session test. Worksheet 3 keeps attempts from the 19 November
paper (`class7-full-syllabus`) and the earlier Logical Reasoning paper
(`logical-reasoning`) in their old registries, so they do not block today's
re-sit. The Class 2 paper
keeps the fresh `class2-olympiad-35` ID, so the superseded
`class2-test-paper-1` registry cannot block it. The legacy `chapter` payload field
is retained for endpoint compatibility. If the remote check is unavailable, the
existing local-attempt fallback applies.

## Files

| Path | Purpose |
|---|---|
| `index.html`, `css/styles.css` | Responsive login, instructions, exam and results |
| `js/papers.js` | Credential-to-paper profiles |
| `js/app.js` | Routing, state, scoring, timer, paper viewer, review and submission |
| `test_questions.js` | Ordered Worksheet 3 Grade 7 bank (key application-side) |
| `worksheet4_questions.js` | Ordered Worksheet 4 Grade 7 bank (key application-side) |
| `class2_questions.js` | Approved ordered Grade 2 bank |
| `js/paper_pages.js` | In-exam page images rendered from the questions-only PDFs |
| `assets/class7-worksheet3/` | 9 standalone SVG Worksheet 3 diagrams |
| `assets/class7-worksheet4/` | 10 standalone SVG Worksheet 4 diagrams |
| `assets/class2-olympiad/` | 15 standalone SVG question diagrams |
| `assets/worksheet-class2-olympiad.pdf` | Approved Class 2 Olympiad worksheet |
| `assets/worksheet-full-syllabus-comprehensive.pdf` | Grade 7 worksheet (result download) |
| `assets/worksheet-combined-worksheet-4.pdf` | Worksheet 4 (result download) |
| `assets/*-questions-only.pdf` | Questions-only viewer PDFs for both papers |
| `scripts/google-apps-script-submission-email.gs` | Both-paper teacher email relay |
| `scripts/export-question-sheet.js` | Both-paper spreadsheet exports |
| `scripts/build-full-syllabus-paper.py` | Both banks, diagrams, viewer PDFs and page images |
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
`SUBMIT_TOKEN` must match `CONFIG.submissionToken` in `js/app.js`. The active
endpoint reports `"version":"testing-portal-v2"`; the portal points at it in
`CONFIG.submissionEndpoint`.

Form submission to the cross-origin relay confirms dispatch, not email delivery;
check the teacher inbox or Apps Script executions to confirm receipt.

## Spreadsheet exports

```sh
npm run export:sheet
npm run export:sheet -- --paper=class2-olympiad-35
npm run export:sheet:shuffled
```

Each paper gets `<paper-id>-question-bank.csv`, `-answer-key.csv`, `.json` and
`google-sheet-<paper-id>-question-bank.gs` under `exports/`. These include marks,
solutions and diagram/option image URLs. Paste a generated `.gs` file into a
Google Sheet's **Extensions → Apps Script**, save/reload, and choose
**D3V3NDRA → Fill everything**. Existing `fractions-*` exports are older archives.
Explicit shuffled exports are separate practice materials; illustrated options
retain their original order. The live test always uses worksheet order.

## Rebuild paper assets

Both banks, diagram assets, result worksheets, questions-only viewer PDFs and
page images (run with the worksheet project's PyMuPDF environment):

```sh
python scripts/build-full-syllabus-paper.py --source-dir "../DASS/D3V3NDRA Classes"
```

The script checks the Grade 7 Worksheet 3 set, then verifies all 35 Class 2
questions, both printed answer-key matrices, the 15/20/10/5 Grade 7 split,
100 marks and 9 Grade 7 figures. It rebuilds `test_questions.js` and
`class2_questions.js`, asserts that each viewer PDF contains no answer-key
material, then renders the page images used by **View Paper**. The result-stage
worksheets still include the official keys and worked solutions; the in-exam
viewer never does.

## Hosting

Push this folder to `dev351en/Test-portal`, branch `main`, for the connected
Vercel deployment. Static asset routes must stay intact; `vercel.json` has no
catch-all rewrite. Both the questions and credentials are browser-side, as in
the original classroom portal.
