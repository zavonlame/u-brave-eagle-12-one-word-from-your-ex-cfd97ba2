// One Word From Your Ex — u-brave-eagle-12-one-word-from-your-ex-cfd97ba2
// Writes the single word an ex would use to describe the entrant to
// <output dir>/entry.txt. Self-contained: Node 22 stdlib only, no network,
// no child_process, no Chrome. The word is embedded here as a literal —
// this program reads NO files at runtime, so it runs identically whatever
// directory the grader starts it from.
//
// Why this word: an ex would not call you "toxic" or "immature" — those are
// diagnoses, not a sting. "Afterthought" is the verdict after the fact:
// you were not the plan, you were the thing remembered too late. It lands
// in one beat, it is painfully true, and everyone has been somebody's
// afterthought at least once. The field already holds Almost, Placeholder,
// ghost and forgettable — this one is unclaimed and sharper than all four.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: exactly one word, 11 characters, inside the 1–24 gate.
const WORD = "Afterthought";

// The gate, from the kit's RULES.txt: /output/entry.txt must hold UTF-8
// text of 1 to 24 characters, not only white space. Count code points so
// the check means what the gate means, and reject anything that is not a
// single word with no spaces.
function checkWord(word: string): void {
  const size = [...word].length;
  if (size < 1 || size > 24) {
    throw new Error(`entry must be 1-24 characters, got ${size}`);
  }
  if (word.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word with no spaces");
  }
}

checkWord(WORD);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, WORD, "utf8");
// Read it back: the file the judge sees must be byte-identical to the
// word above, with nothing appended (no trailing newline, no extra text).
if (readFileSync(target, "utf8") !== WORD) {
  throw new Error("entry.txt round-trip mismatch");
}
