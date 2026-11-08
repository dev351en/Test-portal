/**
 * D3V3NDRA Classes — instant submission email endpoint
 *
 * This Google Apps Script receives a finished IMO Fractions test from the portal and
 * emails the teacher a formatted report with every option marked.
 *
 * ONE-TIME SETUP
 * 1. Go to https://script.google.com and create a new project.
 * 2. Replace the contents of Code.gs with this file.
 * 3. Optional: set TEACHER_EMAIL below. If it is blank, the report is sent to
 *    the Google account that owns/deploys this script.
 * 4. Deploy -> New deployment -> Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Authorize the script, then copy the Web app URL.
 * 6. Open js/app.js, put that URL in CONFIG.submissionEndpoint, and redeploy the site.
 *
 * The app and this script must share the same SUBMIT_TOKEN.
 */

const TEACHER_EMAIL = ''; // e.g. 'teacher@example.com'. Blank = the deploying account's email.
const SUBMIT_TOKEN = 'd3v3ndra-fractions-2026';
const SUBJECT_PREFIX = 'IMO Fractions test submitted';
const TIME_ZONE = 'Asia/Kolkata';
const ATTEMPT_KEY = 'imo_attempt_names';

function doGet(e) {
  const params = (e && e.parameter) || {};
  if (params.action === 'claim') return handleClaim_(params);
  return json_({
    ok: true,
    service: 'D3V3NDRA submission email',
    message: 'Endpoint is running. The test portal sends submissions by POST.'
  });
}

function handleClaim_(params) {
  if (SUBMIT_TOKEN && params.token !== SUBMIT_TOKEN) {
    return json_({ ok: false, claimed: true, error: 'Invalid submission token.' });
  }
  const name = normalizeName_(params.name);
  if (!name) return json_({ ok: false, claimed: true, error: 'Missing name.' });

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (error) {
    return json_({ ok: false, claimed: true, error: 'Could not check the name. Please try again.' });
  }
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = readRegistry_(props);
    if (registry.some(entry => entry.name === name)) {
      return json_({ ok: true, claimed: true, taken: true });
    }
    registry.push({ name: name, at: new Date().toISOString() });
    props.setProperty(ATTEMPT_KEY, JSON.stringify(registry.slice(-300)));
    return json_({ ok: true, claimed: true, taken: false });
  } finally {
    lock.releaseLock();
  }
}

function registerAttempt_(name) {
  const normalized = normalizeName_(name);
  if (!normalized) return;
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = readRegistry_(props);
    if (registry.some(entry => entry.name === normalized)) return;
    registry.push({ name: normalized, at: new Date().toISOString() });
    props.setProperty(ATTEMPT_KEY, JSON.stringify(registry.slice(-300)));
  } catch (error) { /* storage failure must not block the email */ }
}

function normalizeName_(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function readRegistry_(props) {
  try {
    const raw = props.getProperty(ATTEMPT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function doPost(e) {
  try {
    const raw = e && e.parameter ? e.parameter.payload : '';
    if (!raw) throw new Error('Missing submission payload.');

    let data;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      throw new Error('Submission payload is not valid JSON.');
    }

    if (SUBMIT_TOKEN && data.token !== SUBMIT_TOKEN) {
      throw new Error('Invalid submission token.');
    }

    const recipient = getRecipient_();
    const report = buildReport_(data);

    MailApp.sendEmail({
      to: recipient,
      subject: report.subject,
      body: report.text,
      htmlBody: report.html,
      name: 'D3V3NDRA Classes'
    });

    registerAttempt_(String(data.signature || data.studentName || ''));

    return json_({ ok: true, emailedTo: recipient });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: String((error && error.message) || error) });
  }
}

function getRecipient_() {
  const configured = String(TEACHER_EMAIL || '').trim();
  if (configured) return configured;

  let email = '';
  try {
    email = Session.getEffectiveUser().getEmail();
  } catch (error) { /* fall through */ }
  if (!email) {
    try {
      email = Session.getActiveUser().getEmail();
    } catch (error) { /* fall through */ }
  }
  if (!email) {
    throw new Error('Set TEACHER_EMAIL in the Apps Script, or deploy it from the teacher Google account.');
  }
  return email;
}

function buildReport_(data) {
  const studentId = String(data.studentId || 'Unknown student');
  const studentName = String(data.studentName || '').trim();
  const signature = String(data.signature || '').trim();
  const answers = Array.isArray(data.answers) ? data.answers : [];
  const totals = {
    score: number_(data.score),
    totalMarks: number_(data.totalMarks),
    percent: number_(data.percent),
    correct: number_(data.correct),
    attempted: number_(data.attempted),
    total: number_(data.total) || answers.length,
    marked: number_(data.marked),
    leaves: number_(data.focusLosses),
    reason: String(data.submitReason || '')
  };
  const submittedAt = formatDate_(data.submittedAt);
  const timeUsed = formatDuration_(data.timeUsed);
  const identity = studentName ? `${studentName} — ${studentId}` : studentId;
  const subject = `${SUBJECT_PREFIX} — ${identity} — ${totals.score}/${totals.totalMarks} (${totals.percent}%)`;
  const questionBlocks = answers.map((answer, index) => buildQuestionHtml_(answer, index)).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml_(subject)}</title>
<style>
  body { margin:0; padding:0; background:#eef4ff; font-family:Arial,Helvetica,sans-serif; color:#1f2937; }
  .wrap { max-width:760px; margin:0 auto; padding:24px 12px; }
  .hero { background:#0d2a5e; color:#ffffff; padding:26px 30px; border-radius:14px 14px 0 0; }
  .eyebrow { margin:0 0 6px; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#93c5fd; }
  .hero h1 { margin:0; font-size:24px; line-height:1.25; }
  .hero p { margin:8px 0 0; font-size:13px; color:#c7d7f5; }
  .card { background:#ffffff; padding:24px 30px; border:1px solid #dbe5f4; border-top:0; border-radius:0 0 14px 14px; }
  .summary { width:100%; border-collapse:collapse; }
  .summary td { padding:7px 0; border-bottom:1px solid #eef2f7; font-size:12px; color:#64748b; }
  .summary td.value { text-align:right; font-size:13px; font-weight:600; color:#1f2937; }
  .summary td.score { color:#1d4ed8; font-weight:700; }
  .legend { margin:24px 0 12px; padding:12px 14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; line-height:1.6; color:#475569; }
  .green { color:#15803d; font-weight:bold; }
  .red { color:#b91c1c; font-weight:bold; }
  .q { margin:0 0 18px; padding:0 0 18px; border-bottom:1px solid #eef2f7; }
  .q-head { margin-bottom:8px; }
  .q-no { display:inline-block; background:#1d4ed8; color:#ffffff; font-size:11px; font-weight:700; padding:4px 8px; border-radius:6px; }
  .q-status { display:inline-block; margin-left:6px; background:#f1f5f9; color:#64748b; font-size:11px; font-weight:700; padding:4px 8px; border-radius:6px; }
  .q-status.ok { background:#e9f9ef; color:#15803d; }
  .q-status.bad { background:#fef2f2; color:#b91c1c; }
  .q-text { margin:0 0 8px; font-size:14px; line-height:1.55; font-weight:600; color:#1f2937; }
  .opt { margin:5px 0; padding:9px 11px; border:1px solid #e2e8f0; border-radius:8px; background:#ffffff; font-size:13px; line-height:1.45; color:#334155; }
  .letter { display:inline-block; min-width:19px; font-weight:700; }
  .opt-correct { background:#f0fdf4; border-color:#bbf7d0; color:#14532d; font-weight:600; }
  .opt-selected-correct { background:#e9f9ef; border-color:#86efac; color:#14532d; font-weight:600; }
  .opt-selected-wrong { background:#fef2f2; border-color:#fecaca; color:#7f1d1d; font-weight:600; }
  .badge { display:inline-block; margin-left:6px; padding:2px 7px; border-radius:999px; font-size:10px; font-weight:700; white-space:nowrap; }
  .badge-correct { background:#dcfce7; color:#15803d; }
  .badge-wrong { background:#fee2e2; color:#b91c1c; }
  .footer { margin:24px 0 0; padding-top:16px; border-top:1px solid #e2e8f0; font-size:11px; line-height:1.6; color:#64748b; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="hero">
      <p class="eyebrow">D3V3NDRA Classes</p>
      <h1>IMO Fractions test submission</h1>
      <p>${escapeHtml_(identity)} · ${escapeHtml_(submittedAt)}</p>
    </div>
    <div class="card">
      ${summaryHtml_(studentName, studentId, signature, totals, submittedAt, timeUsed)}
      <div class="legend">
        <b>How to read this report:</b> every option is listed in the order the student saw it.
        <span class="green">Green</span> marks the correct option.
        <span class="red">Red</span> marks a wrong option chosen by the student.
        A green <b>&ldquo;Student answer · Correct&rdquo;</b> badge means the student chose the right option.
      </div>
      ${questionBlocks}
      <p class="footer">This report was generated automatically by the D3V3NDRA IMO test portal when the paper was submitted.</p>
    </div>
  </div>
</body>
</html>`;

  return {
    subject,
    html,
    text: buildTextReport_(data, totals, submittedAt, timeUsed)
  };
}

function summaryHtml_(studentName, studentId, signature, totals, submittedAt, timeUsed) {
  const row = (label, value, className) => `<tr>
    <td>${escapeHtml_(label)}</td>
    <td class="value${className ? ` ${className}` : ''}">${escapeHtml_(value)}</td>
  </tr>`;

  return `<table role="presentation" class="summary">
    ${studentName ? row('Student name', studentName) : ''}
    ${signature ? row('Signature', signature) : ''}
    ${row('Student ID', studentId)}
    ${row('Submitted', submittedAt)}
    ${row('Score', `${totals.score} / ${totals.totalMarks} (${totals.percent}%)`, 'score')}
    ${row('Correct answers', `${totals.correct} / ${totals.total}`)}
    ${row('Attempted', `${totals.attempted} / ${totals.total}`)}
    ${row('Time used', timeUsed)}
    ${row('Marked for review', String(totals.marked))}
    ${row('Window left', `${totals.leaves} time${totals.leaves === 1 ? '' : 's'}`)}
    ${totals.reason === 'leaving' ? row('Auto-submitted', 'Left the test window twice') : ''}
  </table>`;
}

function buildQuestionHtml_(answer, index) {
  const no = number_(answer.no) || index + 1;
  const options = Array.isArray(answer.options) ? answer.options : [];
  const selected = validIndex_(answer.selected, options.length);
  const correct = validIndex_(answer.correct, options.length);
  const hasSelection = selected !== null;
  const isCorrect = hasSelection && selected === correct;
  const status = !hasSelection ? 'Not answered' : isCorrect ? 'Correct' : 'Incorrect';
  const statusClass = !hasSelection ? '' : isCorrect ? ' ok' : ' bad';
  const points = isCorrect ? '+2' : '0';

  const optionRows = options.map((option, optionIndex) => {
    const isSelected = selected === optionIndex;
    const isCorrectOption = correct === optionIndex;
    let className = 'opt';
    let badge = '';

    if (isSelected && isCorrectOption) {
      className += ' opt-selected-correct';
      badge = badgeHtml_('✓ Student answer · Correct', 'badge-correct');
    } else if (isSelected) {
      className += ' opt-selected-wrong';
      badge = badgeHtml_('✗ Student answer', 'badge-wrong');
    } else if (isCorrectOption) {
      className += ' opt-correct';
      badge = badgeHtml_('✓ Correct answer', 'badge-correct');
    }

    return `<div class="${className}">
      <span class="letter">${String.fromCharCode(65 + optionIndex)}.</span>
      <span>${escapeHtml_(option)}</span>
      ${badge}
    </div>`;
  }).join('');

  return `<div class="q">
    <div class="q-head">
      <span class="q-no">Q${no}</span>
      <span class="q-status${statusClass}">${status} · ${points} marks</span>
    </div>
    <p class="q-text">${escapeHtml_(answer.q)}</p>
    ${optionRows}
  </div>`;
}

function badgeHtml_(text, className) {
  return ` <span class="badge ${className}">${text}</span>`;
}

function buildTextReport_(data, totals, submittedAt, timeUsed) {
  const studentId = String(data.studentId || 'Unknown student');
  const studentName = String(data.studentName || '').trim();
  const signature = String(data.signature || '').trim();
  const answers = Array.isArray(data.answers) ? data.answers : [];
  const lines = [
    'D3V3NDRA CLASSES — IMO FRACTIONS TEST SUBMISSION',
    '================================================',
    `Student name : ${studentName || 'Not provided'}`,
    `Signature    : ${signature || 'Not provided'}`,
    `Student ID   : ${studentId}`,
    `Submitted    : ${submittedAt}`,
    `Score        : ${totals.score} / ${totals.totalMarks} (${totals.percent}%)`,
    `Correct      : ${totals.correct} / ${totals.total}`,
    `Attempted    : ${totals.attempted} / ${totals.total}`,
    `Time used    : ${timeUsed}`,
    `Marked       : ${totals.marked}`,
    `Window left  : ${totals.leaves} time(s)`,
    ...(totals.reason === 'leaving' ? ['Auto-submit  : Left the test window twice'] : []),
    '',
    'OPTIONS: [STUDENT ANSWER] = chosen by the student; [CORRECT ANSWER] = right option.',
    ''
  ];

  answers.forEach((answer, index) => {
    const no = number_(answer.no) || index + 1;
    const options = Array.isArray(answer.options) ? answer.options : [];
    const selected = validIndex_(answer.selected, options.length);
    const correct = validIndex_(answer.correct, options.length);
    const hasSelection = selected !== null;
    const isCorrect = hasSelection && selected === correct;
    const status = !hasSelection ? 'NOT ANSWERED' : isCorrect ? 'CORRECT (+2)' : 'INCORRECT (0)';

    lines.push(`Q${no}. ${String(answer.q || '')}`);
    options.forEach((option, optionIndex) => {
      const tags = [];
      if (selected === optionIndex) tags.push('STUDENT ANSWER');
      if (correct === optionIndex) tags.push('CORRECT ANSWER');
      lines.push(`   ${String.fromCharCode(65 + optionIndex)}) ${option}${tags.length ? `  [${tags.join(' | ')}]` : ''}`);
    });
    lines.push(`   Result: ${status}`);
    lines.push('');
  });

  lines.push('Generated automatically by the D3V3NDRA IMO test portal.');
  return lines.join('\n');
}

function validIndex_(value, length) {
  if (value === null || value === undefined || value === '') return null;
  const index = Number(value);
  return Number.isInteger(index) && index >= 0 && index < length ? index : null;
}

function number_(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatDate_(value) {
  const date = value ? new Date(value) : new Date();
  if (isNaN(date.getTime())) return String(value || '');
  return Utilities.formatDate(date, TIME_ZONE, 'dd MMM yyyy, hh:mm a');
}

function formatDuration_(seconds) {
  const total = Math.max(0, Math.round(number_(seconds)));
  const minutes = Math.floor(total / 60);
  const remaining = total % 60;
  if (!minutes) return `${remaining} sec`;
  if (!remaining) return `${minutes} min`;
  return `${minutes} min ${remaining} sec`;
}

function escapeHtml_(value) {
  return String(value === null || value === undefined ? '' : value).replace(/[&<>"']/g, function (char) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
  });
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
