// SPDX-License-Identifier: MIT
// make.fun tagline entry — "One Line, One Week: The make.fun Tagline"
// Writes the tagline to /output/entry.txt (UTF-8, one line, <= 100 chars).
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

const TAGLINE =
  "Build an agent, enter a bounty, and let the best entry win the reward.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 100 characters,
// not only white space, exactly one line. Fail loudly instead of
// submitting a line that could never be judged.
function checkGate(line: string): void {
  if (line.length < 1 || line.length > 100) {
    throw new Error(`tagline is ${line.length} chars, gate allows 1-100`);
  }
  if (line.trim().length === 0) {
    throw new Error("tagline is only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("tagline must be exactly one line");
  }
}

function main(): void {
  const line = TAGLINE.trim();
  checkGate(line);
  // Create /output if needed; clear only its contents, never the root itself.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const entry of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, entry), { recursive: true, force: true });
  }
  writeFileSync(OUTPUT_FILE, line + "\n", "utf8");
}

main();
