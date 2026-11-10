# D3V3NDRA Classes — IMO Test Series (Chapter 12: Decimals)

A browser-based **International Math Olympiad (IMO)** test for **Decimals** (NCERT advanced syllabus), built from Worksheet Chapter Number 12 and rebuilt around a clean blue edtech interface. Questions and options are written in LaTeX and typeset with MathJax.

**Live site:** https://mest-porutal.vercel.app/

## What is included

- **Student login** with name/roll number, a show/hide password control, and optional "Remember me"
- **Instructions screen** with a visible honesty note
- **50 multiple-choice questions**, 4 options each
- **Full-screen exam lockdown** with copy, selection, and right-click blocking
- **Three-exit window rule** — three window exits are allowed; the fourth exit auto-submits the paper
- **Scheduled test window** — the hosted page only opens on 10 November 2026, 10:00 AM to 12:00 AM (midnight) IST
- **Signature and unique-name check** — a name can attempt the paper only once
- **Colour-coded question palette** with a matching legend on the instructions page
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
- **Worksheet PDF download** on the result screen — the full Worksheet Chapter 12 with its answer key (`assets/worksheet-chapter-12-decimals.pdf`)
- **Optional instant email report** to the teacher with every option and the student's choice marked

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

## Test window and hosting gate

The hosted site is gated by `middleware.js` (Vercel Edge Middleware) and by a client-side check in `js/app.js`:

- **10 November 2026, 10:00 AM – 12:00 AM (midnight) IST** — the portal opens normally.
- **Before 10:00 AM IST** — visitors see a **403 / Test not open yet** screen.
- **After 12:00 AM (midnight) IST** — visitors see a **404 / Test window closed** screen with “Sorry, the test time has run out. Contact the teacher.”
- If a paper is in progress when the window closes, it is auto-submitted immediately.
- Teacher preview: add `?preview=teacher-imo-2026` to the URL to open the portal outside the window. The key lives in `CONFIG.previewKey` in `js/app.js` and in `middleware.js`.

## Signature and unique attempts

The instructions page includes a **Signature** field. The student must type their full name, and it must match the name entered at login. A name can attempt **each chapter once**:

- Locally, completed sign-in names are stored per chapter in `localStorage` (`d3v3ndra.attempts.decimals`) and blocked from a second attempt on the same browser. `CONFIG.chapter` in `js/app.js` scopes the rule — changing it opens a fresh local registry.
- Globally, the portal claims the name through the Apps Script endpoint (`?action=claim&chapter=decimals`). The script keeps one name registry per chapter (`imo_attempt_names_<chapter>`). If the name is already claimed for that chapter, the student is stopped before the paper opens; the same name can attempt a different chapter once the portal chapter is switched.
- Legacy untagged registry entries are honoured as `decimals` attempts.
- If the Apps Script does not yet support `claim`, the portal falls back to the local check and still records the signature in the report.

## Full-screen exam lockdown

Pressing **Start Test** requests full screen before the paper opens. While the exam is active:

- Leaving full screen, minimizing, or switching windows triggers a blocking **Full screen required** screen. The timer keeps running, and the paper stays locked until the student returns to full screen.
- The first leave is a warning. **On the second leave, the paper is submitted automatically** and the email is sent immediately, even if the window is still minimized.
- The instructions page carries a strict invigilation notice: any anomaly, rule violation, or attempt to bypass the security measures is reported to parents/guardians and the higher authorities.
- Copy, cut, text selection, dragging, and right-click are disabled.
- Common copy, save, print, and developer-tools shortcuts are blocked, including `Ctrl+C`, `Ctrl+X`, `Ctrl+A`, `Ctrl+P`, `Ctrl+S`, `Ctrl+U`, `F12`, and `Ctrl+Shift+I/J/C`.
- Leave events are counted in the submission payload as `focusLosses`, and the email report shows the count and whether the paper was auto-submitted for leaving.

A browser cannot prevent OS-level screenshots, a second device, or a determined user with developer tools. Some mobile browsers do not support full screen; in that case the portal shows a warning and allows the student to continue without the lock. Use Chrome, Edge, or Firefox on a laptop or desktop for a locked attempt.

## Student credentials

The current demo credentials are:

- **Student ID:** `DSMG7@012`
- **Password:** `12345678`
- **Full Name / Roll No.:** entered by each student on the login screen

The name/roll number is the student's identity on the emailed report. The shared login ID and password are defined in the `CONFIG` object near the top of `js/app.js`:

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
│   ├── export-question-sheet.js  # Builds CSV, JSON, and Google Apps Script exports
│   └── google-apps-script-submission-email.gs  # Emails each submitted answer sheet
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

## Email each submission to the teacher

The portal can email you a complete answer sheet the moment a student submits. The report lists every question, every option, the student's chosen option, and the correct option, with a score summary at the top.

This uses a small Google Apps Script Web App as the relay. There is no paid backend, and the email is sent from your own Google account. This is a separate script from the question-bank sheet exporter.

### One-time setup

1. Open https://script.google.com and create a new project.
2. Replace the contents of `Code.gs` with `scripts/google-apps-script-submission-email.gs`.
3. Optional: set `TEACHER_EMAIL` at the top of the script. If it is blank, the report is emailed to the Google account that deploys the script.
4. Click **Deploy → New deployment → Web app**.
5. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
6. Authorize the script and copy the **Web app URL**.
7. Open `js/app.js` and paste that URL into `CONFIG.submissionEndpoint`:

```js
submissionEndpoint: 'https://script.google.com/macros/s/PASTE-YOUR-DEPLOYMENT-ID/exec',
```

8. Redeploy the site. Submit one test attempt to confirm the email arrives.

The app and the Apps Script must use the same `SUBMIT_TOKEN`. The default is `d3v3ndra-fractions-2026` in both files. Change it in both places if you want a different value.

### What the email contains

The report is sent as soon as the paper is submitted, before the optional feedback form.

- Student name/roll number, student ID, submission time, score, percentage, correct/attempted counts, time used, and marked count
- Window-leave count, plus an auto-submit note if the student left twice
- All 50 questions in the order the student saw them
- All four options for each question, with the student's choice and the correct answer clearly marked
- Correct options highlighted green; wrong selections highlighted red
- A plain-text version of the same report for email clients that do not render HTML

### Important notes

- The Apps Script must be deployed with access set to **Anyone**; otherwise a student's browser cannot reach it without a Google sign-in.
- The web app URL and `SUBMIT_TOKEN` are visible in the page source, so the endpoint is not a secure server. The token only reduces accidental or casual spam.
- Consumer Gmail accounts can send about 100 emails per day through Apps Script. For larger classes, use a Google Workspace account or split the test across days.
- If you change the Apps Script later, deploy a new version and keep the same Web app URL if possible.
- `vercel.json` allows form posts and frames only to `script.google.com` and Google's user-content domain. If you use a different relay service, update the Content Security Policy as well.

## Security and honest limitations

This is a **static client-side app**, not a secure exam server:

- The login ID, password, and full answer key are visible in the page source.
- The name/roll number is self-reported at login. The app cannot verify that a student entered their real identity.
- If `CONFIG.submissionEndpoint` is configured, the student ID, score, and full answer sheet are sent through Google Apps Script and emailed to the teacher. Otherwise they stay in the browser.
- The site itself does not save submissions to a database. Google processes the relayed report and emails it to the teacher.
- The "Download result" button still creates a local text file as a student-side backup.
- Browser controls can discourage accidental navigation, but they cannot prevent a determined student from using another device, notes, or outside help.
- Full-screen, copy, and right-click restrictions are browser-level deterrents. They do not stop OS screenshots, screen recording, developer tools, or a second device.
- Results reset when the page is refreshed, and anyone with the link can start an attempt.

For high-stakes assessment, add server-side authentication, server-held answer keys, attempt logging, and submission storage. The current version is suitable for guided classroom practice and revision.

## Live deployment note

The GitHub repository is `dev351en/Test-portal`. The Vercel project is available at:

**https://mest-porutal.vercel.app/**
