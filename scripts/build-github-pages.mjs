import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "/SS-v2",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lma-sctech.github.io/SS-v2",
};

const isWindows = process.platform === "win32";
const command = isWindows ? process.env.ComSpec ?? "cmd.exe" : "npm";
const args = isWindows ? ["/d", "/s", "/c", "npm.cmd run build"] : ["run", "build"];
const child = spawn(command, args, {
  env,
  shell: false,
  stdio: "inherit",
});

child.on("exit", (code) => {
  if (code !== 0) {
    process.exit(code ?? 1);
  }

  const outDir = join(process.cwd(), "out");
  if (existsSync(outDir)) {
    writeFileSync(join(outDir, ".nojekyll"), "");
  }
});
