/* D3V3NDRA Classes — IMO Test Series (Chapter 8: Working with Decimals)
   Browser-based Olympiad test. No backend: answers and credentials are in the page source. */
(() => {
  'use strict';

  const CONFIG = {
    loginId: 'DSMG7@012',
    password: '12345678',
    totalMinutes: 60,
    marksPerQ: 2,
    storageKey: 'd3v3ndra.student',
    // One attempt per chapter per name/device. Changing the chapter name opens
    // a fresh attempt registry, so the same student can attempt each chapter once.
    chapter: 'decimals',
    attemptsKey: 'd3v3ndra.attempts.decimals',
    // Paste the Google Apps Script Web app URL here to email each submission.
    // Leave blank to keep the test working without email delivery.
    submissionEndpoint: 'https://script.google.com/macros/s/AKfycbysYy6f6_RPPgmFYO3VQwJDDe0SBL1GFEX9wkKMEj3Z10yros4BwJ-tA0vHjW_rRUfhvA/exec',
    // Must match SUBMIT_TOKEN in scripts/google-apps-script-submission-email.gs.
    submissionToken: 'd3v3ndra-fractions-2026',
    // Test window: 10 November 2026, 10:00 AM to 12:00 AM midnight IST (UTC+05:30) — open for testing.
    testWindow: {
      start: '2026-11-10T04:30:00.000Z',
      end: '2026-11-10T18:30:00.000Z'
    },
    // Teacher-only preview bypass for the time gate: open the site with
    // ?preview=teacher-imo-2026 to check the portal before/after the window.
    previewKey: 'teacher-imo-2026'
  };

  const ICONS = {
    user: '<path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    eye: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="m3 3 18 18"/><path d="M10.6 6.7A10.9 10.9 0 0 1 12 6.5c6.5 0 10 5.5 10 5.5a17.6 17.6 0 0 1-3.2 3.8"/><path d="M6.2 6.8C3.8 8.3 2 12 2 12s3.5 6.5 10 6.5c1.5 0 2.9-.3 4.2-.8"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    sigma: '<path d="M18 5H7l6 7-6 7h11"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/>',
    barChart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 9h6M9 13h6M9 17h4"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a3 3 0 0 0 3 3h1M16 6h4v2a3 3 0 0 1-3 3h-1"/><path d="M12 13v4M9 21h6M10 17h4"/>',
    flag: '<path d="M5 21V4"/><path d="M5 5c4-2 7 2 11 0v8c-4 2-7-2-11 0"/>',
    bookOpen: '<path d="M12 6c-2-2-5-2-7-2v14c2 0 5 0 7 2 2-2 5-2 7-2V4c-2 0-5 0-7 2Z"/><path d="M12 6v14"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    eraser: '<path d="m4 16 8-10 7 6-6 8H7l-3-4Z"/><path d="M8 20h11"/>',
    fullscreen: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
    fullscreenExit: '<path d="M3 8h5V3M21 8h-5V3M3 16h5v5M21 16h-5v5"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    message: '<path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/><path d="M8 10h8M8 14h5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    alert: '<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
    play: '<path d="m8 5 11 7-11 7V5Z"/>'
  };

  const state = {
    studentId: '',
    studentName: '',
    signature: '',
    paper: [],
    answers: new Map(),
    marked: new Set(),
    visited: new Set(),
    current: 0,
    remaining: CONFIG.totalMinutes * 60,
    endsAt: 0,
    startedAt: 0,
    submittedAt: 0,
    timerId: null,
    running: false,
    starting: false,
    submitted: false,
    lockVisible: false,
    lockEnabled: true,
    focusWarning: false,
    focusLosses: 0,
    leaveEpisode: false,
    submitReason: '',
    feedback: null,
    result: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function icon(name, size = 20) {
    return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  }

  function hydrateIcons(root = document) {
    $$('[data-icon]', root).forEach(el => {
      el.innerHTML = icon(el.dataset.icon, Number(el.dataset.iconSize) || 20);
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function fractionMarkup(num, den) {
    return `<span class="frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
  }

  function formatMath(text) {
    let out = escapeHtml(text);
    const hasLatex = /[$\\]/.test(text) && /\$|\\\(|\\\[/.test(text);
    if (!hasLatex) {
      out = out.replace(/(^|[\s(])(\d+)\s+(\d+)\/(\d+)(?![\d/])/g, (match, prefix, whole, num, den) =>
        `${prefix}<span class="mixed"><span class="whole">${whole}</span>${fractionMarkup(num, den)}</span>`
      );
      out = out.replace(/(^|[\s(])(\d+)\/(\d+)(?![\d/])/g, (match, prefix, num, den) =>
        `${prefix}${fractionMarkup(num, den)}`
      );
    }
    return out.replace(/m²/g, 'm<sup>2</sup>');
  }

  function formatTime(totalSeconds) {
    const safe = Math.max(0, totalSeconds);
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function formatDuration(totalSeconds) {
    const safe = Math.max(0, Math.round(totalSeconds));
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    if (minutes === 0) return `${seconds} sec`;
    if (seconds === 0) return `${minutes} min`;
    return `${minutes} min ${seconds} sec`;
  }

  function showView(name) {
    $$('.view').forEach(view => view.classList.toggle('is-active', view.id === `view${name}`));
    $('#appHeader').hidden = name === 'Login';
    window.scrollTo(0, 0);
  }

  function setHeader(mode) {
    const modes = {
      instructions: { title: 'IMO Test Series', pill: 'Chapter 8 · Decimals', sep: false, timer: false, fs: false, student: true, logout: true },
      exam: { title: 'IMO Test Series', pill: 'Working with Decimals', sep: true, timer: true, fs: false, student: false, logout: true },
      feedback: { title: 'Test Review & Feedback', pill: 'IMO Test Series', sep: false, timer: false, fs: false, student: true, logout: false },
      result: { title: 'Test Result', pill: 'Decimals', sep: false, timer: false, fs: false, student: true, logout: false }
    };
    const config = modes[mode];
    if (!config) return;
    $('#headerTitle').textContent = config.title;
    $('#headerSep').hidden = !config.sep;
    $('#headerPill').textContent = config.pill;
    $('#timerPill').hidden = !config.timer;
    $('#fsBtn').hidden = !config.fs;
    $('#studentChip').hidden = !config.student;
    $('#logoutBtn').hidden = !config.logout;
    $('#studentName').textContent = state.studentName || state.studentId;
  }

  function safeStorageGet(key) {
    try { return localStorage.getItem(key) || ''; } catch (error) { return ''; }
  }

  function safeStorageSet(key, value) {
    try {
      if (value) localStorage.setItem(key, value);
      else localStorage.removeItem(key);
    } catch (error) { /* storage can be unavailable */ }
  }

  function normalizeName(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function readAttempts() {
    try {
      const stored = safeStorageGet(CONFIG.attemptsKey);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function hasAttemptedLocally(name) {
    const normalized = normalizeName(name);
    return readAttempts().some(entry => normalizeName(entry) === normalized);
  }

  function rememberAttempt(name) {
    const cleaned = String(name || '').trim();
    if (!cleaned) return;
    const attempts = readAttempts();
    if (attempts.some(entry => normalizeName(entry) === normalizeName(cleaned))) return;
    attempts.push(cleaned);
    safeStorageSet(CONFIG.attemptsKey, JSON.stringify(attempts));
  }

  function showSignatureError(message) {
    const error = $('#signatureError');
    if (!error) return;
    error.textContent = message;
    error.hidden = false;
    const input = $('#signatureInput');
    if (input) input.focus();
  }

  function hideSignatureError() {
    const error = $('#signatureError');
    if (error) error.hidden = true;
  }

  function validateSignature() {
    const input = $('#signatureInput');
    const value = input ? input.value.trim() : '';
    if (!value) {
      showSignatureError('Type your full name as your signature before starting the test.');
      return '';
    }
    if (normalizeName(value) !== normalizeName(state.studentName)) {
      showSignatureError('The signature must match the full name you entered at login.');
      return '';
    }
    if (hasAttemptedLocally(value)) {
      showSignatureError('This name has already attempted this paper on this device. Contact your teacher.');
      return '';
    }
    hideSignatureError();
    return value;
  }

  function claimAttempt(name) {
    const endpoint = String(CONFIG.submissionEndpoint || '').trim();
    if (!endpoint) return Promise.resolve({ ok: true, checked: false });
    let url;
    try {
      url = new URL(endpoint, window.location.href);
    } catch (error) {
      return Promise.resolve({ ok: true, checked: false });
    }
    url.searchParams.set('action', 'claim');
    url.searchParams.set('name', String(name || '').trim());
    url.searchParams.set('chapter', String(CONFIG.chapter || '').trim());
    url.searchParams.set('token', CONFIG.submissionToken);
    const request = fetch(url.toString(), { method: 'GET', redirect: 'follow' })
      .then(response => response.json())
      .then(data => {
        if (data && data.claimed === true) return { ok: !data.taken, checked: true, taken: !!data.taken };
        return { ok: true, checked: false };
      })
      .catch(() => ({ ok: true, checked: false }));
    const timeout = new Promise(resolve => {
      window.setTimeout(() => resolve({ ok: true, checked: false, timedOut: true }), 6000);
    });
    return Promise.race([request, timeout]);
  }

  function isPreviewMode() {
    try {
      return new URLSearchParams(window.location.search).get('preview') === CONFIG.previewKey;
    } catch (error) {
      return false;
    }
  }

  function withinTestWindow(now) {
    const stamp = now || Date.now();
    return stamp >= Date.parse(CONFIG.testWindow.start) && stamp <= Date.parse(CONFIG.testWindow.end);
  }

  function showTimeGate(mode) {
    const gate = $('#timeGate');
    if (!gate) return;
    const expired = mode === 'after';
    $('#gateCode').textContent = expired ? '404' : '403';
    $('#gateTitle').textContent = expired ? 'Test window closed' : 'Test not open yet';
    $('#gateMessage').textContent = expired
      ? 'Sorry, the test time has run out. Contact the teacher.'
      : 'The test has not started yet. It opens at 10:00 AM IST on 10 November 2026 and closes at 12:00 AM (midnight) IST.';
    gate.hidden = false;
    $('#appHeader').hidden = true;
    $$('.view').forEach(view => view.classList.remove('is-active'));
  }

  function hideTimeGate() {
    const gate = $('#timeGate');
    if (gate) gate.hidden = true;
  }

  function enforceTestWindow() {
    if (isPreviewMode()) {
      hideTimeGate();
      return;
    }
    const now = Date.now();
    const start = Date.parse(CONFIG.testWindow.start);
    const end = Date.parse(CONFIG.testWindow.end);
    if (now < start) {
      showTimeGate('before');
      return;
    }
    if (now > end) {
      if (state.running && !state.submitted) submitTest(true, 'window');
      showTimeGate('after');
      return;
    }
    hideTimeGate();
    const hasActiveView = $$('.view').some(view => view.classList.contains('is-active'));
    if (!hasActiveView) showView('Login');
  }

  function showLoginError(message) {
    const error = $('#loginError');
    const form = $('#loginForm');
    error.textContent = message;
    error.hidden = false;
    form.classList.remove('shake');
    void form.offsetWidth;
    form.classList.add('shake');
  }

  function hideLoginError() {
    $('#loginError').hidden = true;
    $('#loginForm').classList.remove('shake');
  }

  function handleLogin(event) {
    event.preventDefault();
    const id = $('#loginId').value.trim();
    const name = $('#studentNameInput').value.trim();
    const password = $('#loginPass').value;

    if (!id || !name || !password) {
      showLoginError('Enter your name, student ID, and password to continue.');
      (!id ? $('#loginId') : !name ? $('#studentNameInput') : $('#loginPass')).focus();
      return;
    }

    if (id.toUpperCase() !== CONFIG.loginId.toUpperCase() || password !== CONFIG.password) {
      showLoginError('Incorrect student ID or password. Please check with your teacher and try again.');
      $('#loginPass').select();
      return;
    }

    hideLoginError();
    state.studentId = id;
    state.studentName = name;
    safeStorageSet(CONFIG.storageKey, $('#rememberMe').checked ? id : '');
    $('#studentName').textContent = name;
    setHeader('instructions');
    showView('Instructions');
    $('#startBtn').focus();
  }

  function togglePasswordVisibility() {
    const input = $('#loginPass');
    const button = $('#togglePass');
    const reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    button.innerHTML = icon(reveal ? 'eyeOff' : 'eye', 18);
    button.setAttribute('aria-label', reveal ? 'Hide password' : 'Show password');
    input.focus();
  }

  function openForgotModal() {
    openModal({
      title: 'Forgot password?',
      body: '<p>Test credentials are issued by your teacher. Please contact D3V3NDRA Classes to get them reset.</p><div class="modal-note">This browser-based test cannot reset passwords on its own.</div>',
      actions: [{ label: 'Got it', variant: 'primary' }]
    });
  }

  function requestLogout() {
    if (state.running && !state.submitted) {
      openModal({
        title: 'Leave the test?',
        body: '<p>Your attempt is still in progress. Signing out will discard all answers and stop the timer.</p><div class="modal-note warn">This cannot be undone.</div>',
        actions: [
          { label: 'Keep testing', variant: 'ghost' },
          { label: 'Sign out', variant: 'danger', onClick: resetToLogin }
        ]
      });
      return;
    }
    resetToLogin();
  }

  function resetToLogin() {
    stopTimer();
    removeUnloadGuard();
    closeModal();
    state.running = false;
    state.submitted = true;
    hideExamLock();
    exitFullscreen();
    const relayFrame = document.getElementById('submissionRelay');
    if (relayFrame) relayFrame.remove();
    state.studentId = '';
    state.studentName = '';
    state.signature = '';
    state.paper = [];
    state.answers.clear();
    state.marked.clear();
    state.visited.clear();
    state.current = 0;
    state.remaining = CONFIG.totalMinutes * 60;
    state.endsAt = 0;
    state.startedAt = 0;
    state.submittedAt = 0;
    state.running = false;
    state.starting = false;
    state.submitted = false;
    state.lockVisible = false;
    state.lockEnabled = true;
    state.focusWarning = false;
    state.focusLosses = 0;
    state.leaveEpisode = false;
    state.submitReason = '';
    state.feedback = null;
    state.result = null;

    $('#feedbackForm').reset();
    $('#feedbackError').hidden = true;
    $('#feedbackText').value = '';
    $('#examShell').classList.remove('palette-open');
    $('#studentNameInput').value = '';
    $('#signatureInput').value = '';
    hideSignatureError();
    $('#loginPass').value = '';
    $('#loginPass').type = 'password';
    $('#togglePass').innerHTML = icon('eye', 18);
    $('#togglePass').setAttribute('aria-label', 'Show password');
    hideLoginError();

    const remembered = safeStorageGet(CONFIG.storageKey);
    $('#loginId').value = remembered;
    $('#rememberMe').checked = !!remembered;
    showView('Login');
    $('#loginId').focus();
  }

  function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
  }

  function fullscreenSupported() {
    const element = document.documentElement;
    return !!(element.requestFullscreen || element.webkitRequestFullscreen || element.msRequestFullscreen);
  }

  function enterFullscreen() {
    const element = document.documentElement;
    const request = element.requestFullscreen || element.webkitRequestFullscreen || element.msRequestFullscreen;
    if (!request) return Promise.resolve(false);
    if (getFullscreenElement()) return Promise.resolve(true);
    let attempt;
    try {
      const result = request.call(element);
      attempt = result && typeof result.then === 'function'
        ? result.then(() => true).catch(() => false)
        : Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
    const timeout = new Promise(resolve => {
      window.setTimeout(() => resolve(!!getFullscreenElement()), 2500);
    });
    return Promise.race([attempt, timeout]);
  }

  function exitFullscreen() {
    const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (!getFullscreenElement() || !exit) return;
    try {
      const result = exit.call(document);
      if (result && typeof result.then === 'function') result.catch(() => {});
    } catch (error) { /* ignore */ }
  }

  function updateFullscreenButton() {
    const fullscreen = !!getFullscreenElement();
    const button = $('#fsBtn');
    if (!button) return;
    button.innerHTML = icon(fullscreen ? 'fullscreenExit' : 'fullscreen', 19);
    button.setAttribute('aria-label', fullscreen ? 'Exit full screen' : 'Enter full screen');
  }

  function showExamLock(message) {
    if (state.submitted || !state.lockEnabled) return;
    const lock = $('#examLock');
    if (!lock) return;
    closeModal();
    if (message) $('#examLockText').textContent = message;
    lock.hidden = false;
    state.lockVisible = true;
    document.body.classList.add('exam-locked');
    $('#appHeader').setAttribute('inert', '');
    $('#viewExam').setAttribute('inert', '');
    $('#examLockBtn').focus();
  }

  function hideExamLock() {
    const lock = $('#examLock');
    state.lockVisible = false;
    document.body.classList.remove('exam-locked');
    $('#appHeader').removeAttribute('inert');
    $('#viewExam').removeAttribute('inert');
    if (lock) lock.hidden = true;
  }

  function handleFullscreenChange() {
    updateFullscreenButton();
    if (!state.running || state.submitted || !state.lockEnabled) {
      hideExamLock();
      return;
    }
    if (getFullscreenElement()) {
      hideExamLock();
      resetLeaveEpisodeSoon();
      return;
    }
    noteFocusLoss();
    if (!state.submitted) {
      showExamLock(`You left full screen. Warning ${state.focusLosses} of 3 — the fourth exit will auto-submit your paper.`);
    }
  }

  function toggleFullscreen() {
    if (!getFullscreenElement()) {
      enterFullscreen().then(entered => {
        if (!entered) toast('Full screen is not available in this browser.', 'error');
      });
    } else {
      exitFullscreen();
    }
  }

  function initHeader() {
    $('#logoutBtn').addEventListener('click', requestLogout);
    $('#fsBtn').addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    updateFullscreenButton();
  }

  function initExamLock() {
    $('#examLockBtn').addEventListener('click', () => {
      enterFullscreen().then(entered => {
        if (entered) {
          hideExamLock();
        } else {
          toast('Full screen was blocked. Please allow full screen and try again.', 'error');
        }
      });
    });
  }

  function initLogin() {
    const remembered = safeStorageGet(CONFIG.storageKey);
    if (remembered) {
      $('#loginId').value = remembered;
      $('#rememberMe').checked = true;
    }
    $('#loginForm').addEventListener('submit', handleLogin);
    $('#togglePass').addEventListener('click', togglePasswordVisibility);
    $('#forgotBtn').addEventListener('click', openForgotModal);
    ['#loginId', '#loginPass'].forEach(selector => {
      $(selector).addEventListener('input', hideLoginError);
    });
  }

  function initInstructions() {
    $('#startBtn').addEventListener('click', startTest);
    $('#signatureInput').addEventListener('input', hideSignatureError);
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    return function random() {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildPaper(studentId) {
    const bank = Array.isArray(window.QUESTIONS) ? window.QUESTIONS.slice() : [];
    if (bank.length === 0) return [];
    const day = new Date().toISOString().slice(0, 10);
    const random = mulberry32(hashString(`${studentId}|${day}|decimals`));
    for (let i = bank.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [bank[i], bank[j]] = [bank[j], bank[i]];
    }
    return bank.map(question => {
      const options = question.opts.map((text, index) => ({ text, index }));
      for (let i = options.length - 1; i > 0; i -= 1) {
        const j = Math.floor(random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      return {
        ...question,
        opts: options.map(option => option.text),
        ans: options.findIndex(option => option.index === question.ans)
      };
    });
  }

  function currentQuestion() {
    return state.paper[state.current] || null;
  }

  function startTest() {
    if (state.running || state.starting) return;
    if (!withinTestWindow() && !isPreviewMode()) {
      enforceTestWindow();
      return;
    }

    const signature = validateSignature();
    if (!signature) return;
    state.signature = signature;

    const paper = buildPaper(state.studentId);
    if (paper.length !== 50) {
      openModal({
        title: 'Question bank unavailable',
        body: '<p>The test could not load all 50 questions. Please refresh the page and try again.</p>',
        actions: [{ label: 'Close', variant: 'primary' }]
      });
      return;
    }

    if (!fullscreenSupported()) {
      openModal({
        title: 'Full screen not supported',
        body: '<p>This browser cannot lock the test to full screen. For a locked attempt, use Chrome, Edge, or Firefox on a laptop or desktop.</p><div class="modal-note warn">You can continue without the lock, but switching windows cannot be prevented.</div>',
        actions: [
          { label: 'Cancel', variant: 'ghost' },
          { label: 'Continue without lock', variant: 'primary', onClick: () => verifyAndBegin(paper, false) }
        ]
      });
      return;
    }

    state.starting = true;
    const startButton = $('#startBtn');
    if (startButton) startButton.disabled = true;

    enterFullscreen().then(entered => {
      if (!entered) {
        openModal({
          title: 'Full screen is required',
          body: '<p>The test opens in full screen so the paper stays locked. Click Try again and allow full screen if your browser asks.</p><div class="modal-note warn">If full screen keeps failing, use Chrome, Edge, or Firefox.</div>',
          actions: [{ label: 'Try again', variant: 'primary', onClick: startTest }]
        });
        return;
      }
      return verifyAndBegin(paper, true);
    }).finally(() => {
      state.starting = false;
      if (startButton) startButton.disabled = false;
    });
  }

  function verifyAndBegin(paper, lockEnabled) {
    return claimAttempt(state.signature).then(result => {
      if (!result.ok) {
        if (lockEnabled) exitFullscreen();
        showSignatureError('This name has already been used to attempt this paper. Contact the teacher.');
        return;
      }
      rememberAttempt(state.signature);
      beginTest(paper, lockEnabled);
    });
  }

  function beginTest(paper, lockEnabled) {
    if (state.running) return;
    state.paper = paper;
    state.lockEnabled = lockEnabled !== false;
    state.answers.clear();
    state.marked.clear();
    state.visited.clear();
    state.current = 0;
    state.remaining = CONFIG.totalMinutes * 60;
    state.startedAt = Date.now();
    state.endsAt = state.startedAt + CONFIG.totalMinutes * 60 * 1000;
    state.submittedAt = 0;
    state.running = true;
    state.submitted = false;
    state.lockVisible = false;
    state.focusWarning = false;
    state.focusLosses = 0;
    state.leaveEpisode = false;
    state.submitReason = '';
    state.feedback = null;
    state.result = null;
    state.visited.add(state.paper[0].id);

    hideExamLock();
    $('#feedbackForm').reset();
    $('#feedbackError').hidden = true;
    $('#feedbackText').value = '';
    $('#examShell').classList.remove('palette-open');
    $('#timerPill').classList.remove('is-warning');
    $('#timerText').textContent = formatTime(state.remaining);

    buildPalette();
    renderExam();
    setHeader('exam');
    showView('Exam');
    addUnloadGuard();
    startTimer();
    toast('Test started — 60 minutes remaining.');
  }

  function buildPalette() {
    const grid = $('#paletteGrid');
    grid.innerHTML = state.paper.map((question, index) =>
      `<button type="button" class="pal-btn" data-palette-index="${index}" aria-label="Question ${index + 1}">${index + 1}</button>`
    ).join('');
  }

  function updatePalette() {
    const total = state.paper.length;
    const answered = state.answers.size;
    const percent = total ? Math.round((answered / total) * 100) : 0;
    const buttons = $$('#paletteGrid .pal-btn');

    buttons.forEach((button, index) => {
      const question = state.paper[index];
      if (!question) return;
      const isAnswered = state.answers.has(question.id);
      const isMarked = state.marked.has(question.id);
      const isVisited = state.visited.has(question.id);
      const isCurrent = index === state.current;
      button.className = 'pal-btn';
      if (isVisited) button.classList.add('is-visited');
      if (isAnswered) button.classList.add('is-answered');
      if (isMarked) button.classList.add('is-marked');
      if (isCurrent) button.classList.add('is-current');
      button.setAttribute('aria-current', isCurrent ? 'true' : 'false');
      const status = isAnswered ? 'answered' : isMarked ? 'marked for review' : isVisited ? 'not answered' : 'not visited';
      button.setAttribute('aria-label', `Question ${index + 1}, ${status}`);
    });

    $('#paletteCount').textContent = `${answered} / ${total}`;
    $('#progressCount').textContent = `${answered} / ${total}`;
    $('#progressFill').style.width = `${percent}%`;

    const unattempted = total - answered;
    const markedCount = state.marked.size;
    const statAttempted = $('#statAttempted');
    const statUnattempted = $('#statUnattempted');
    const statMarked = $('#statMarked');
    if (statAttempted) statAttempted.textContent = String(answered);
    if (statUnattempted) statUnattempted.textContent = String(unattempted);
    if (statMarked) statMarked.textContent = String(markedCount);
  }

  function renderExam() {
    const question = currentQuestion();
    if (!question) return;
    state.visited.add(question.id);
    const selected = state.answers.get(question.id);
    const marked = state.marked.has(question.id);
    const last = state.current === state.paper.length - 1;

    $('#qNo').textContent = String(state.current + 1);
    $('#qText').innerHTML = formatMath(question.q);
    $('#qOptions').innerHTML = question.opts.map((option, index) => {
      const letter = 'ABCD'[index];
      const active = selected === index;
      return `<button type="button" class="option${active ? ' is-selected' : ''}" data-option="${index}" role="radio" aria-checked="${active ? 'true' : 'false'}">
        <span class="option-radio"></span>
        <span class="option-letter">${letter}.</span>
        <span class="option-text">${formatMath(option)}</span>
      </button>`;
    }).join('');

    $('#markBadge').hidden = !marked;
    $('#prevBtn').disabled = state.current === 0;
    $('#nextBtn').disabled = last;
    $('#clearBtn').disabled = selected === undefined;
    $('#markBtn').classList.toggle('is-active', marked);
    $('#markBtn').innerHTML = `${icon('flag', 16)}${marked ? 'Marked for Review' : 'Mark for Review'}`;
    $('#saveNextBtn').innerHTML = last
      ? `Submit Test ${icon('check', 17)}`
      : `Save &amp; Next${icon('chevronRight', 17)}`;

    updatePalette();

    // Typeset LaTeX after both the question and its options are in the DOM.
    // MathJax failure must never block the exam.
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      MathJax.typesetPromise([document.getElementById('qText'), document.getElementById('qOptions')]).catch(() => { });
    }
  }

  function selectOption(index) {
    const question = currentQuestion();
    if (!question) return;
    state.answers.set(question.id, index);
    $$('#qOptions .option').forEach((button, optionIndex) => {
      const active = optionIndex === index;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-checked', active ? 'true' : 'false');
    });
    $('#clearBtn').disabled = false;
    updatePalette();
  }

  function goToQuestion(index) {
    if (index < 0 || index >= state.paper.length) return;
    state.current = index;
    state.visited.add(state.paper[index].id);
    renderExam();
    if (window.matchMedia('(max-width: 980px)').matches) {
      $('#examShell').classList.remove('palette-open');
    }
  }

  function markCurrentQuestion() {
    const question = currentQuestion();
    if (!question) return;
    if (state.marked.has(question.id)) {
      state.marked.delete(question.id);
      toast('Removed from review.', 'info');
    } else {
      state.marked.add(question.id);
      toast('Marked for review.');
    }
    renderExam();
  }

  function clearCurrentAnswer() {
    const question = currentQuestion();
    if (!question) return;
    if (!state.answers.has(question.id)) return;
    state.answers.delete(question.id);
    $$('#qOptions .option').forEach(button => {
      button.classList.remove('is-selected');
      button.setAttribute('aria-checked', 'false');
    });
    $('#clearBtn').disabled = true;
    updatePalette();
    toast('Answer cleared.', 'info');
  }

  function saveAndNext() {
    if (state.current === state.paper.length - 1) {
      openSubmitModal();
      return;
    }
    state.current += 1;
    state.visited.add(currentQuestion().id);
    renderExam();
  }

  function initExam() {
    $('#qOptions').addEventListener('click', event => {
      const button = event.target.closest('.option');
      if (!button) return;
      selectOption(Number(button.dataset.option));
    });

    $('#paletteGrid').addEventListener('click', event => {
      const button = event.target.closest('.pal-btn');
      if (!button) return;
      goToQuestion(Number(button.dataset.paletteIndex));
    });

    $('#prevBtn').addEventListener('click', () => goToQuestion(state.current - 1));
    $('#nextBtn').addEventListener('click', () => goToQuestion(state.current + 1));
    $('#saveNextBtn').addEventListener('click', saveAndNext);
    $('#markBtn').addEventListener('click', markCurrentQuestion);
    $('#clearBtn').addEventListener('click', clearCurrentAnswer);
    $('#paletteToggle').addEventListener('click', () => {
      const open = $('#examShell').classList.toggle('palette-open');
      if (open) window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    $('#paletteClose').addEventListener('click', () => {
      $('#examShell').classList.remove('palette-open');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function startTimer() {
    stopTimer();
    tickTimer();
    state.timerId = window.setInterval(tickTimer, 1000);
  }

  function tickTimer() {
    if (!state.running) return;
    const remaining = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
    state.remaining = remaining;
    $('#timerText').textContent = formatTime(remaining);
    $('#timerPill').classList.toggle('is-warning', remaining <= 300);
    if (remaining <= 0) {
      stopTimer();
      submitTest(true);
    }
  }

  function stopTimer() {
    if (state.timerId) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function beforeUnloadHandler(event) {
    if (!state.running || state.submitted) return;
    event.preventDefault();
    event.returnValue = '';
  }

  function addUnloadGuard() {
    window.addEventListener('beforeunload', beforeUnloadHandler);
  }

  function removeUnloadGuard() {
    window.removeEventListener('beforeunload', beforeUnloadHandler);
  }

  let modalState = null;
  let toastTimer = null;
  let leaveEpisodeTimer = null;

  function openModal({ title, body, actions = [], size = '' }) {
    closeModal();
    const previousFocus = document.activeElement;
    const root = $('#modalRoot');
    const actionsHtml = actions.map((action, index) => {
      const variant = action.variant === 'primary' ? 'btn-primary' : action.variant === 'danger' ? 'btn-clear' : 'btn-ghost';
      return `<button type="button" class="btn ${variant}" data-modal-action="${index}">${action.label}</button>`;
    }).join('');

    root.innerHTML = `<div class="modal-overlay" data-modal-overlay>
      <div class="modal ${size === 'lg' ? 'modal-lg' : ''}" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-head">
          <h2 id="modalTitle">${escapeHtml(title)}</h2>
          <button type="button" class="icon-btn" data-modal-close aria-label="Close dialog">${icon('x', 18)}</button>
        </div>
        <div class="modal-body">${body}</div>
        <div class="modal-actions">${actionsHtml}</div>
      </div>
    </div>`;
    root.hidden = false;
    document.body.classList.add('modal-open');

    const overlay = $('[data-modal-overlay]', root);
    const dialog = $('.modal', root);
    const close = () => closeModal();

    $('[data-modal-close]', root).addEventListener('click', close);
    overlay.addEventListener('click', event => {
      if (event.target === overlay) close();
    });
    $$('[data-modal-action]', root).forEach(button => {
      button.addEventListener('click', () => {
        const action = actions[Number(button.dataset.modalAction)];
        closeModal();
        if (action && typeof action.onClick === 'function') action.onClick();
      });
    });

    const keyHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = $$('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])', dialog)
        .filter(element => !element.disabled && element.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', keyHandler, true);
    modalState = { previousFocus, keyHandler };

    window.requestAnimationFrame(() => {
      const target = $('.btn-primary', root) || $('[data-modal-close]', root);
      if (target) target.focus();
    });
  }

  function closeModal() {
    const root = $('#modalRoot');
    if (modalState) {
      document.removeEventListener('keydown', modalState.keyHandler, true);
      const previousFocus = modalState.previousFocus;
      modalState = null;
      document.body.classList.remove('modal-open');
      root.hidden = true;
      root.innerHTML = '';
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    } else {
      document.body.classList.remove('modal-open');
      root.hidden = true;
      root.innerHTML = '';
    }
  }

  function openSubmitModal() {
    const total = state.paper.length;
    const answered = state.answers.size;
    const marked = state.marked.size;
    const unanswered = total - answered;
    const body = `<p>You have answered <b>${answered}</b> of <b>${total}</b> questions.</p>
      ${unanswered > 0 ? `<p><b>${unanswered}</b> question${unanswered === 1 ? '' : 's'} will be left unanswered and score zero.</p>` : '<p>All questions have an answer.</p>'}
      ${marked > 0 ? `<p><b>${marked}</b> question${marked === 1 ? '' : 's'} are marked for review. You can still go back before submitting.</p>` : ''}
      <div class="modal-note ${unanswered > 0 ? 'warn' : ''}">You cannot change answers after submission.</div>`;
    openModal({
      title: 'Submit your test?',
      body,
      actions: [
        { label: 'Keep working', variant: 'ghost' },
        { label: 'Submit test', variant: 'primary', onClick: () => submitTest(false) }
      ]
    });
  }

  function submitTest(auto, reason) {
    if (state.submitted) return;
    state.submitted = true;
    state.running = false;
    state.submitReason = reason || (auto ? 'time' : 'manual');
    state.submittedAt = Date.now();
    stopTimer();
    removeUnloadGuard();
    closeModal();
    hideExamLock();
    exitFullscreen();

    const total = state.paper.length;
    const answered = state.answers.size;
    const marked = state.marked.size;
    $('#sumAnswered').textContent = String(answered);
    $('#sumMarked').textContent = String(marked);
    $('#sumUnanswered').textContent = String(total - answered);
    $('#feedbackForm').reset();
    $('#feedbackError').hidden = true;
    $('#feedbackText').value = '';
    state.feedback = null;
    state.result = null;

    const result = computeResult();
    state.result = result;

    setHeader('feedback');
    showView('Feedback');

    const emailed = sendSubmissionEmail(result);
    if (reason === 'leaving') {
      toast('You left the test window twice. Your paper was submitted automatically.', 'error');
    } else if (reason === 'window') {
      toast('The test window has closed. Your paper was submitted automatically.', 'error');
    } else if (auto) {
      toast(emailed
        ? 'Time is up. Test auto-submitted and emailed to your teacher.'
        : 'Time is up. Your test was submitted automatically.');
    } else {
      toast(emailed
        ? 'Test submitted. Your answers have been emailed to your teacher.'
        : 'Test submitted successfully.');
    }
  }

  function initFeedback() {
    $('#feedbackForm').addEventListener('change', () => {
      $('#feedbackError').hidden = true;
    });
    $('#feedbackForm').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const liked = form.querySelector('input[name="liked"]:checked');
      const difficulty = form.querySelector('input[name="difficulty"]:checked');
      const accessible = form.querySelector('input[name="accessible"]:checked');
      const error = $('#feedbackError');

      if (!liked || !difficulty || !accessible) {
        error.textContent = 'Please answer the three feedback questions above.';
        error.hidden = false;
        error.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      error.hidden = true;
      state.feedback = {
        liked: liked.value,
        difficulty: difficulty.value,
        accessible: accessible.value,
        comments: $('#feedbackText').value.trim()
      };
      state.result = computeResult();
      renderResult();
      setHeader('result');
      showView('Result');
      toast('Feedback recorded. Here is your result.');
    });
  }

  function computeResult() {
    const details = state.paper.map((question, index) => {
      const your = state.answers.get(question.id);
      return { question, index, your, ok: your === question.ans };
    });
    const correct = details.filter(item => item.ok).length;
    const attempted = details.filter(item => item.your !== undefined).length;
    const totalMarks = state.paper.length * CONFIG.marksPerQ;
    const score = correct * CONFIG.marksPerQ;
    const percent = totalMarks ? Math.round((score / totalMarks) * 100) : 0;
    const timeUsed = Math.max(0, Math.min(
      CONFIG.totalMinutes * 60,
      Math.round((state.submittedAt - state.startedAt) / 1000)
    ));
    return { details, correct, attempted, total: state.paper.length, totalMarks, score, percent, timeUsed };
  }

  function buildSubmissionPayload(result) {
    return {
      token: CONFIG.submissionToken,
      chapter: CONFIG.chapter,
      studentId: state.studentId,
      studentName: state.studentName,
      signature: state.signature,
      submittedAt: new Date(state.submittedAt).toISOString(),
      startedAt: new Date(state.startedAt).toISOString(),
      score: result.score,
      totalMarks: result.totalMarks,
      percent: result.percent,
      correct: result.correct,
      attempted: result.attempted,
      total: result.total,
      timeUsed: result.timeUsed,
      marked: state.marked.size,
      focusLosses: state.focusLosses,
      submitReason: state.submitReason,
      site: window.location.origin,
      answers: result.details.map(item => ({
        no: item.index + 1,
        q: item.question.q,
        options: item.question.opts.slice(),
        selected: item.your === undefined ? null : item.your,
        correct: item.question.ans,
        ok: item.ok
      }))
    };
  }

  function sendSubmissionEmail(result) {
    const endpoint = String(CONFIG.submissionEndpoint || '').trim();
    if (!endpoint) {
      console.info('D3V3NDRA: submission email endpoint is not configured.');
      return false;
    }

    let action;
    try {
      action = new URL(endpoint, window.location.href).href;
    } catch (error) {
      console.error('D3V3NDRA: the submission email endpoint is not a valid URL.', error);
      return false;
    }

    let frame = document.getElementById('submissionRelay');
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = 'submissionRelay';
      frame.name = 'submissionRelay';
      frame.hidden = true;
      frame.style.display = 'none';
      frame.setAttribute('aria-hidden', 'true');
      frame.tabIndex = -1;
      document.body.appendChild(frame);
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;
    form.target = frame.name;
    form.acceptCharset = 'UTF-8';
    form.hidden = true;
    form.style.display = 'none';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'payload';
    input.value = JSON.stringify(buildSubmissionPayload(result));
    form.appendChild(input);
    document.body.appendChild(form);

    try {
      form.submit();
    } catch (error) {
      console.error('D3V3NDRA: could not send the submission email.', error);
      form.remove();
      return false;
    }

    window.setTimeout(() => form.remove(), 60000);
    return true;
  }

  function gradeFor(percent) {
    if (percent >= 90) return { grade: 'Outstanding!', message: 'A superb result. You have a strong command of decimals.' };
    if (percent >= 75) return { grade: 'Excellent!', message: 'Great work. Review the few questions you missed to reach the top.' };
    if (percent >= 60) return { grade: 'Good work!', message: 'A solid result. A little more practice will make it excellent.' };
    if (percent >= 40) return { grade: 'Keep going!', message: 'You are getting there. Review the worked answers and try again.' };
    return { grade: 'Needs practice', message: 'Do not worry. Review the chapter and attempt the test again when ready.' };
  }

  function renderResult() {
    const result = state.result;
    if (!result) return;
    const grading = gradeFor(result.percent);
    const date = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

    const identity = state.studentName ? `${state.studentName} · ${state.studentId}` : state.studentId;
    $('#resultStudent').textContent = `${identity} · ${date}`;
    $('#resultPct').textContent = `${result.percent}%`;
    $('#resultScore').textContent = `${result.score} / ${result.totalMarks}`;
    $('#scoreRing').style.setProperty('--pct', String(result.percent));
    $('#resultGrade').textContent = grading.grade;
    $('#resultMessage').textContent = `${grading.message} You answered ${result.correct} of ${result.total} correctly.`;
    $('#resultCorrect').textContent = `${result.correct} / ${result.total}`;
    $('#resultTime').textContent = formatDuration(result.timeUsed);
    $('#resultMarked').textContent = String(state.marked.size);
  }

  function initResult() {
    $('#reviewBtn').addEventListener('click', openReviewModal);
    $('#finishBtn').addEventListener('click', resetToLogin);
    $('#downloadBtn').addEventListener('click', downloadResult);
  }

  function openReviewModal() {
    const result = state.result;
    if (!result) return;
    const incorrect = result.details.filter(item => item.your !== undefined && !item.ok).length;
    const skipped = result.details.filter(item => item.your === undefined).length;
    const items = result.details.map(item => {
      const question = item.question;
      const answered = item.your !== undefined;
      const statusClass = item.ok ? 'ok' : answered ? 'bad' : 'skip';
      const statusText = item.ok ? 'Correct' : answered ? 'Incorrect' : 'Not answered';
      const yourText = answered
        ? `${'ABCD'[item.your]}. ${formatMath(question.opts[item.your])}`
        : 'Not answered';
      const correctText = `${'ABCD'[question.ans]}. ${formatMath(question.opts[question.ans])}`;
      return `<div class="review-item">
        <div class="review-item-head"><span>Question ${item.index + 1}</span><span class="review-status ${statusClass}">${statusText}</span></div>
        <div class="review-q">${formatMath(question.q)}</div>
        <div class="review-answers">
          <span>Your answer: <b>${yourText}</b></span>
          <span>Correct answer: <b class="answer-correct">${correctText}</b></span>
        </div>
      </div>`;
    }).join('');

    openModal({
      title: 'Review your answers',
      size: 'lg',
      body: `<div class="review-summary"><span><b>${result.correct}</b> correct</span><span><b>${incorrect}</b> incorrect</span><span><b>${skipped}</b> not answered</span></div><div class="review-list">${items}</div>`,
      actions: [{ label: 'Close', variant: 'primary' }]
    });
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      MathJax.typesetPromise([document.getElementById('modalRoot')]).catch(() => { /* LaTeX failure must not block the review */ });
    }
  }

  function downloadResult() {
    const result = state.result;
    if (!result) return;
    const grading = gradeFor(result.percent);
    const date = new Date().toLocaleString();
    const lines = [
      'D3V3NDRA CLASSES — DECIMALS TEST SERIES',
      'Result report',
      '========================================',
      `Student name : ${state.studentName || 'Not provided'}`,
      `Student ID   : ${state.studentId}`,
      `Submitted    : ${date}`,
      `Score        : ${result.score} / ${result.totalMarks} (${result.percent}%)`,
      `Correct      : ${result.correct} / ${result.total}`,
      `Attempted    : ${result.attempted} / ${result.total}`,
      `Time used    : ${formatDuration(result.timeUsed)}`,
      `Grade        : ${grading.grade.replace('!', '')}`,
      '',
      'Feedback',
      '----------------------------------------',
      `Likes the exam : ${state.feedback ? state.feedback.liked : 'Not provided'}`,
      `Difficulty     : ${state.feedback ? state.feedback.difficulty : 'Not provided'}`,
      `Accessible     : ${state.feedback ? state.feedback.accessible : 'Not provided'}`,
      `Comments       : ${state.feedback && state.feedback.comments ? state.feedback.comments : 'None'}`,
      '',
      'Answer review',
      '----------------------------------------'
    ];

    result.details.forEach(item => {
      const question = item.question;
      const answered = item.your !== undefined;
      const status = item.ok ? 'CORRECT' : answered ? 'INCORRECT' : 'NOT ANSWERED';
      lines.push(`${item.index + 1}. [${status}] ${question.q}`);
      lines.push(`   Your answer   : ${answered ? `${'ABCD'[item.your]}. ${question.opts[item.your]}` : '—'}`);
      if (!item.ok) lines.push(`   Correct answer: ${'ABCD'[question.ans]}. ${question.opts[question.ans]}`);
      lines.push('');
    });

    const blob = new Blob([lines.join('\r\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeId = state.studentId.replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '') || 'student';
    link.href = url;
    link.download = `decimal-result-${safeId}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Result downloaded.');
  }

  function toast(message, type = 'success') {
    const element = $('#toast');
    element.innerHTML = `${icon(type === 'error' ? 'alert' : type === 'info' ? 'info' : 'check', 16)}<span>${escapeHtml(message)}</span>`;
    element.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => element.classList.remove('is-visible'), 2800);
  }

  function noteFocusLoss() {
    if (!state.running || state.submitted) return;
    if (state.leaveEpisode) return;
    state.leaveEpisode = true;
    state.focusLosses += 1;
    state.focusWarning = true;
    if (state.focusLosses > 3) autoSubmitForLeaving();
  }

  function autoSubmitForLeaving() {
    if (!state.running || state.submitted) return;
    state.focusWarning = false;
    submitTest(true, 'leaving');
  }

  function resetLeaveEpisodeSoon() {
    window.clearTimeout(leaveEpisodeTimer);
    leaveEpisodeTimer = window.setTimeout(() => {
      if (!state.running || state.submitted) return;
      if (document.visibilityState !== 'visible') return;
      if (state.lockEnabled && !getFullscreenElement()) return;
      state.leaveEpisode = false;
    }, 900);
  }

  function showFocusWarning() {
    if (!state.running || state.submitted || !state.focusWarning) return;
    state.focusWarning = false;
    if (state.lockVisible) return;
    if (state.lockEnabled && !getFullscreenElement()) return;
    if (!$('#modalRoot').hidden) return;
    openModal({
      title: 'Test window left',
      body: `<p>You switched away from the test window. This is exit ${state.focusLosses} of 3 — you may leave up to three times, and the timer keeps running.</p><div class="modal-note warn">A fourth exit will auto-submit your paper immediately.</div>`,
      actions: [{ label: 'Continue test', variant: 'primary' }]
    });
  }

  function blockExamClipboard(event) {
    if (!state.running || state.submitted) return;
    event.preventDefault();
  }

  function initIntegrityGuard() {
    document.addEventListener('visibilitychange', () => {
      if (!state.running || state.submitted) return;
      if (document.hidden) {
        noteFocusLoss();
        return;
      }
      resetLeaveEpisodeSoon();
      if (state.lockEnabled && !getFullscreenElement()) {
        showExamLock(`You left the test window. Exit ${state.focusLosses} of 3 — the fourth exit will auto-submit your paper.`);
      } else {
        showFocusWarning();
      }
    });

    window.addEventListener('blur', () => {
      if (!state.running || state.submitted || state.lockVisible || document.hidden) return;
      noteFocusLoss();
    });

    window.addEventListener('focus', () => {
      if (!state.running || state.submitted || state.lockVisible) return;
      resetLeaveEpisodeSoon();
      showFocusWarning();
    });

    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('copy', blockExamClipboard);
    document.addEventListener('cut', blockExamClipboard);
    document.addEventListener('dragstart', blockExamClipboard);
    document.addEventListener('selectstart', blockExamClipboard);

    document.addEventListener('keydown', event => {
      if (!state.running || state.submitted) return;
      const key = String(event.key || '').toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const blocked = event.key === 'F12'
        || (ctrl && event.shiftKey && ['i', 'j', 'c', 's'].includes(key))
        || (ctrl && ['a', 'c', 'x', 'u', 's', 'p'].includes(key));
      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
  }

  function init() {
    hydrateIcons();
    initHeader();
    initLogin();
    initInstructions();
    initExam();
    initExamLock();
    initIntegrityGuard();
    initFeedback();
    initResult();
    showView('Login');
    enforceTestWindow();
    window.setInterval(enforceTestWindow, 30000);
  }

  document.addEventListener('DOMContentLoaded', init);
})();


