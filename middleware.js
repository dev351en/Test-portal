/**
 * IMO Test Series — hosting-level time gate.
 *
 * The paper is available only on 12 November 2026 between
 * 9:00 AM and 5:00 PM IST (UTC+05:30). Outside that window the
 * page is replaced by a 403 (not open yet) or 404 (window closed) screen.
 *
 * Teacher preview: open any page with ?preview=teacher-imo-2026,
 * which matches CONFIG.previewKey in js/app.js.
 */

const WINDOW_START = Date.parse('2026-11-12T03:30:00.000Z'); // 9:00 AM IST
const WINDOW_END = Date.parse('2026-11-12T11:30:00.000Z');   // 5:00 PM IST
const PREVIEW_KEY = 'teacher-imo-2026';

export const config = {
  matcher: ['/', '/index', '/index.html']
};

function gateHtml(mode) {
  const expired = mode === 'after';
  const code = expired ? '404' : '403';
  const title = expired ? 'Test window closed' : 'Test not open yet';
  const message = expired
    ? 'Sorry, the test time has run out. Contact the teacher.'
    : 'The test has not started yet. It opens at 9:00 AM IST on 12 November 2026 and closes at 5:00 PM IST.';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>${code} · IMO Test Series | D3V3NDRA Classes</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;
    font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0b1f44;
    background:linear-gradient(180deg,#f9fcff,#e8f2ff)}
  .card{width:min(560px,100%);padding:48px 40px;border-radius:24px;background:#fff;
    border:1px solid #e3ecf8;box-shadow:0 34px 90px rgba(30,64,175,.16);text-align:center}
  .code{display:block;font-size:clamp(5rem,18vw,10rem);font-weight:800;letter-spacing:-.06em;
    line-height:1;color:#1d4ed8;opacity:.16}
  h1{margin:-1.4rem 0 0;font-size:1.6rem;letter-spacing:-.02em}
  p{margin:12px 0 0;font-size:.95rem;line-height:1.65;color:#6b7c9d}
  .note{margin-top:22px;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:#8ba0bf}
</style>
</head>
<body>
  <main class="card">
    <span class="code">${code}</span>
    <h1>${title}</h1>
    <p>${message}</p>
    <p class="note">D3V3NDRA Classes &middot; IMO Test Series</p>
  </main>
</body>
</html>`;
}

export default function middleware(request) {
  const url = new URL(request.url);
  if (url.searchParams.get('preview') === PREVIEW_KEY) return;

  const now = Date.now();
  if (now >= WINDOW_START && now <= WINDOW_END) return;

  const mode = now > WINDOW_END ? 'after' : 'before';
  return new Response(gateHtml(mode), {
    status: mode === 'after' ? 404 : 403,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex'
    }
  });
}
