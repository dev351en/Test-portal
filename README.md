# D3V3NDRA Classes — Online Testing Platform

A secure, state-of-the-art virtual testing platform for the **Working with Fractions** chapter (NCERT Class 7, `gegp108`).

- **50 Multiple Choice Questions** (4 options each, 1 correct)
- **100 Marks** — 2 marks per correct answer, no negative marking
- **+5 bonus** if completed 10+ minutes early
- **60-minute timer** with auto-submission
- **Full-screen lock** — minimizing or switching tabs ends the test immediately
- **No copy/paste** — clipboard, right-click, drag, and keyboard shortcuts disabled
- **No going back** — one question per page, forward-only navigation
- **No calculator** — mathematics test, rough work on paper only
- **D3V3NDRA Classes branding** on every page

---

## Question Distribution (per AGENTS.md protocol)

| Level | Count | Description |
|-------|-------|-------------|
| Easy | 10 | Direct recall, foundational speed math |
| Medium | 20 | Multi-step problem solving, estimation |
| Tough / Achievers | 20 | Class 10 HOTS — cryptarithms, optimization, structural invariants |

Questions are deterministically interleaved so difficulty is unpredictable. Difficulty labels are **not** shown on the paper.

---

## Flow

1. **Login Page** — Login ID + Password
2. **Instruction Page 1** — Timing, marking scheme, bonus, format
3. **Instruction Page 2** — Rules & conduct (no back, no calculator, no copying, full-screen, minimize ends test)
4. **50 Question Pages** — One question per page, select an option to continue
5. **Review Page** — Rate the platform, continue online testing? + feedback
6. **Result Page** — Score / 100, percentage, grade, time taken

---

## Login Credentials

Edit `index.html` to change credentials:

```javascript
const CORRECT_LOGIN = "DSMG7@012";
const CORRECT_PASS = "12345678";
```

---

## Deploy on Vercel

### Option A: Vercel Dashboard (Recommended)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **Add New → Project** and import your GitHub repo.
4. Select the `d3v3ndra-online-test` folder (or the root if that's all that's in the repo).
5. Framework Preset: **Other** (or leave blank).
6. Build Command: (leave empty) | Output Directory: (leave empty / root)
7. Click **Deploy**.

Your test will be live at a `https://*.vercel.app` link.

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from inside the project folder
vercel
```

### Option C: GitHub Pages

1. Push to GitHub.
2. Settings → Pages → Build from `main` branch, `/root` folder.
3. Your site is live at `https://<user>.github.io/<repo>/`.

---

## File Structure

```
d3v3ndra-online-test/
├── index.html          # Entry point (test platform)
├── test_questions.js   # 50 MCQs (Easy/Medium/Tough)
├── logo.png            # D3V3NDRA Classes brand logo
├── katex.min.js        # LaTeX math rendering
├── katex.min.css       # KaTeX styles
├── vercel.json         # Vercel deployment config
├── package.json        # Project metadata
└── .gitignore          # Git ignore rules
```

---

## Customization

- **Logo:** Replace `logo.png` with your own branding image.
- **Questions:** Edit `test_questions.js` to add/modify questions.
- **Styling:** Edit the `<style>` block in `index.html`.
- **Timer / Marks:** Change `TOTAL_MINUTES`, `MARKS_PER_Q`, `EARLY_BONUS_MIN`, `EARLY_BONUS` at the top of the script.

---

## Security Notes

This is a client-side (static HTML/JS) test. For high-stakes production use, consider adding server-side answer validation and user authentication. The current version locks the browser during the test but stores answers in memory.
