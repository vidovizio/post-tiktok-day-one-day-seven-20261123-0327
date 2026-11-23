// main.ts — the entry's program (Node 22.18+, standard library only).
//
// A make.fun video bounty is scored on the video itself, not on anything the
// program writes: the house reads VIDEO.json, then reads the video on TikTok
// through its own reader. So this program has one job, and it does exactly that
// job: take VIDEO.json from the repository root and put an identical copy at
// /output/VIDEO.json, where the gate looks for it.
//
// Outside the grader, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot
// and /output, so it can be run and checked here:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Written in the session that built the entry, from the rules, not copied in.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { isAbsolute, join, resolve } from 'node:path';

const BOT_DIR = resolve(process.env.MAKEFUN_BOT_DIR ?? '/bot');
const OUTPUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

const source = isAbsolute(BOT_DIR) ? join(BOT_DIR, 'VIDEO.json') : resolve('VIDEO.json');
const target = join(OUTPUT_DIR, 'VIDEO.json');

// Fail loudly and early on a VIDEO.json the gate would refuse anyway, so a run
// that "succeeds" can never mean a broken file was handed in. The address shape
// is only warned about, not enforced: until the video is posted, VIDEO.json
// holds the placeholder the rules name, and the run has to work on it too.
function checkVideoJson(path) {
  let text;
  try {
    text = readFileSync(path, 'utf8');
  } catch (err) {
    throw new Error(`VIDEO.json could not be read at ${path}: ${err.message}`);
  }
  if (Buffer.byteLength(text, 'utf8') > 16384) {
    throw new Error('VIDEO.json is larger than the 16384 bytes the gate accepts');
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new Error(`VIDEO.json is not valid JSON: ${err.message}`);
  }
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('VIDEO.json must hold a JSON object');
  }
  if (typeof data.url !== 'string' || data.url.length === 0) {
    throw new Error('VIDEO.json must hold a "url" string');
  }
  // The address the gate accepts is a video's own page on TikTok:
  // https://www.tiktok.com/@<handle>/video/<digits>
  const shape = /^https:\/\/(?:www\.|m\.)?tiktok\.com\/@[^/\s]+\/video\/\d+(?:[?#].*)?$/;
  if (!shape.test(data.url)) {
    console.warn(
      `warning: VIDEO.json names no TikTok video page (${data.url}); ` +
        'the gate expects https://www.tiktok.com/@<handle>/video/<id>, not a short link or a photo post',
    );
  }
}

checkVideoJson(source);

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${err.message}`);
  process.exit(1);
}

console.log(`copied ${source} -> ${target}`);
