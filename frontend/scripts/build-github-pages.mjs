import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { stageMaintenance } from "./stage-maintenance.mjs";

const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "/",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sanaaservices.com",
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
    writeFileSync(join(outDir, ".htaccess"), "DirectoryIndex index.html index.php\nOptions -Indexes\n");

    if (existsSync(join(process.cwd(), "..", "maintenance", "enabled"))) {
      stageMaintenance();
    }
  }
});
