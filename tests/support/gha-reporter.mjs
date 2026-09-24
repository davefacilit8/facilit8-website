// node --test reporter: on GitHub Actions, turns each failing test into an
// "::error" annotation (readable on the run page and via the public API).
// Elsewhere it prints nothing; the spec reporter handles normal output.

function esc(s) {
  return String(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}

export default async function* ghaReporter(source) {
  for await (const e of source) {
    if (e.type !== 'test:fail' || !process.env.GITHUB_ACTIONS) continue;
    if (e.data.details && e.data.details.type === 'suite') continue;
    const err = e.data.details && e.data.details.error;
    const cause = err && err.cause ? err.cause : err;
    const msg = cause ? (cause.message || String(cause)) : 'failed';
    const title = esc(String(e.data.name).replace(/[:,]/g, ' '));
    yield `::error title=${title}::${esc(msg.slice(0, 2000))}\n`;
  }
}
