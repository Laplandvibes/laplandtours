/**
 * Refresh this repo's VENDORED copy of the monorepo shared/ library.
 *
 * Why vendoring: src/ imports shared components (Footer, CookieBanner,
 * NewsletterPopup, NotFound, Legal/*, ...) which live in the PRIVATE parent
 * monorepo (Laplandvibes/lv-ops) at ../shared — a directory that does not
 * exist in this GitHub repo. A committed vendored copy under src/shared/ +
 * scripts/_prerender_routes.mjs is what lets GitHub Actions build this site
 * from a plain checkout, with no cross-repo token. (Same pattern as the hub,
 * laplandtours, laplandnightlife and laplandwellness.)
 *
 * This script keeps that copy fresh. It runs automatically before every local
 * `npm run build` / `npm run dev` (pre-scripts):
 *   - In the local monorepo: copies ../shared/<file> over each file we already
 *     vendor, plus ../_prerender_routes.mjs. Commit whatever it changes!
 *   - In CI / a standalone clone: ../shared doesn't exist → exits 0 and the
 *     committed snapshot is used as-is.
 *
 * 🔴 REFRESH-ONLY, NOT A MIRROR (differs from the hub's sync-shared.mjs).
 * It updates the files this repo ALREADY vendors and never pulls in new ones.
 * The monorepo shared/ also holds things this site does not use (resortHubs/,
 * ads/, DealAlertCapture, ...); mirroring them wholesale would put them under
 * src/ where `tsc -b` type-checks them and Tailwind's @source "./shared/**"
 * scans them, i.e. new build failures and dead CSS for zero benefit.
 *
 * Vendoring a NEW shared file (when you add an import for it):
 *   cp ../shared/<file> src/shared/<file> && git add src/shared/<file>
 * From then on this script keeps it in sync automatically.
 *
 * 🔴 READS THE MONOREPO'S COMMITTED STATE (`git show HEAD:shared/<file>`), NOT
 * its working tree. Several agent sessions edit the monorepo shared/ at the
 * same time, so the working tree routinely holds someone else's half-finished
 * change; copying that in would ship it live from this repo. Canonical ==
 * committed. Uncommitted upstream work is reported as a warning instead, so
 * you can wait for it to land and re-run. (Verified 2026-07-26: a first
 * version of this script read the working tree and pulled in another session's
 * in-flight PartnerSlot/NewsletterPopup edit.)
 *
 * NEVER edit files under src/shared/ by hand — edit the monorepo ../shared,
 * COMMIT there, then re-run `npm run sync:shared` (or any build). Manual edits
 * are overwritten.
 */
import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const monorepoShared = resolve(repoRoot, '..', 'shared');
const monorepoPrerender = resolve(repoRoot, '..', '_prerender_routes.mjs');
const vendoredShared = join(repoRoot, 'src', 'shared');
const vendoredPrerender = join(repoRoot, 'scripts', '_prerender_routes.mjs');

const MARKER = '_VENDORED-DO-NOT-EDIT.md';

if (!existsSync(monorepoShared)) {
  console.log('[sync-shared] ../shared not found (CI / standalone checkout) — using committed vendored copy.');
  if (!existsSync(vendoredShared)) {
    console.error('[sync-shared] FATAL: src/shared/ is missing too. The vendored copy was never committed.');
    console.error('[sync-shared] Run `npm run sync:shared` in the local monorepo and commit src/shared/.');
    process.exit(1);
  }
  process.exit(0);
}

/** Every vendored file, relative to src/shared (recursive, marker excluded). */
function vendoredFiles(dir = vendoredShared) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return vendoredFiles(p);
    return e.name === MARKER ? [] : [relative(vendoredShared, p)];
  });
}

const monorepoRoot = resolve(repoRoot, '..');

/** Committed (HEAD) content of a monorepo path, or null if git can't provide it. */
function committed(monorepoRelPath) {
  const r = spawnSync('git', ['-C', monorepoRoot, 'show', `HEAD:${monorepoRelPath}`], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  return r.status === 0 ? r.stdout : null;
}

/** True when the monorepo working tree differs from HEAD for this path. */
function hasUncommittedUpstream(monorepoRelPath) {
  const r = spawnSync('git', ['-C', monorepoRoot, 'status', '--porcelain', '--', monorepoRelPath], {
    encoding: 'utf8',
  });
  return r.status === 0 && r.stdout.trim() !== '';
}

/** Line-ending-insensitive compare: this repo checks out CRLF, the monorepo is LF. */
const sameText = (a, b) => a.replace(/\r\n/g, '\n') === b.replace(/\r\n/g, '\n');

const updated = [];
const stale = [];
const wip = [];
const noGit = [];

for (const rel of vendoredFiles()) {
  const monorepoRel = `shared/${rel.replace(/\\/g, '/')}`;
  const dest = join(vendoredShared, rel);
  const head = committed(monorepoRel);

  if (head === null) {
    // Not in HEAD: either deleted/renamed upstream, or git is unavailable.
    if (existsSync(join(monorepoShared, rel))) noGit.push(rel);
    else stale.push(rel);
    continue;
  }
  if (hasUncommittedUpstream(monorepoRel)) wip.push(rel);
  if (!sameText(head, readFileSync(dest, 'utf8'))) {
    writeFileSync(dest, head);
    updated.push(rel);
  }
}

const headPrerender = committed('_prerender_routes.mjs');
if (headPrerender !== null) {
  if (hasUncommittedUpstream('_prerender_routes.mjs')) wip.push('../_prerender_routes.mjs');
  if (!existsSync(vendoredPrerender) || !sameText(headPrerender, readFileSync(vendoredPrerender, 'utf8'))) {
    writeFileSync(vendoredPrerender, headPrerender);
    updated.push('../scripts/_prerender_routes.mjs');
  }
} else if (existsSync(monorepoPrerender)) {
  noGit.push('../_prerender_routes.mjs');
}

writeFileSync(
  join(vendoredShared, MARKER),
  [
    '# Vendored copy — do not edit',
    '',
    'These files are copies of the monorepo `../shared/` (source of truth for the',
    'whole LV ecosystem), taken from its **committed** state (`git show HEAD:...`),',
    'never from its working tree. They are committed here so GitHub Actions can',
    'build this repo standalone, without access to the private parent monorepo.',
    '',
    'Edit the monorepo `shared/` instead, COMMIT there, then run',
    '`npm run sync:shared` (also runs automatically before every local build/dev)',
    'and commit the refreshed copies here.',
    '',
    'Only the files listed below are vendored, on purpose — this is a refresh, not a',
    'mirror. To vendor a new one: `cp ../shared/<file> src/shared/<file>` and commit.',
    '',
    ...vendoredFiles().sort().map((f) => `- ${f.replace(/\\/g, '/')}`),
    '',
    'Generated by `scripts/sync-shared.mjs`.',
    '',
  ].join('\n'),
);

const total = vendoredFiles().length;
if (updated.length) {
  console.log(`[sync-shared] Refreshed ${updated.length}/${total} vendored file(s) from ../shared:`);
  updated.forEach((f) => console.log(`  • ${f.replace(/\\/g, '/')}`));
  console.log('[sync-shared] Commit these so CI builds the same code.');
} else {
  console.log(`[sync-shared] ${total} vendored file(s) already up to date with ../shared.`);
}
if (wip.length) {
  console.warn(`[sync-shared] NOTE: ${wip.length} file(s) have UNCOMMITTED changes in the monorepo — synced from HEAD, that work is NOT included:`);
  wip.forEach((f) => console.warn(`  • ${f.replace(/\\/g, '/')}`));
  console.warn('[sync-shared] Commit them in the monorepo and re-run to pick them up.');
}
if (stale.length) {
  console.warn(`[sync-shared] WARNING: ${stale.length} vendored file(s) no longer exist in ../shared at HEAD (renamed or deleted upstream?):`);
  stale.forEach((f) => console.warn(`  • ${f.replace(/\\/g, '/')}`));
}
if (noGit.length) {
  console.warn(`[sync-shared] WARNING: could not read ${noGit.length} file(s) from monorepo git HEAD (git missing, or file untracked) — left untouched:`);
  noGit.forEach((f) => console.warn(`  • ${f.replace(/\\/g, '/')}`));
}
