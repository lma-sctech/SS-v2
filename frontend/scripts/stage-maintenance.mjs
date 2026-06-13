import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const frontendDir = resolve(scriptDir, "..");
const repositoryDir = resolve(frontendDir, "..");
const maintenanceDir = join(repositoryDir, "maintenance");
const outDir = join(frontendDir, "out");

const maintenanceFiles = [
  [join(maintenanceDir, "index.html"), join(outDir, "index.html")],
  [join(maintenanceDir, "index.html"), join(outDir, "404.html")],
  [join(maintenanceDir, ".htaccess"), join(outDir, ".htaccess")],
  [join(maintenanceDir, "sanaa-logo-640.png"), join(outDir, "sanaa-logo-640.png")],
  [join(maintenanceDir, "maintenance-hero.jpg"), join(outDir, "maintenance-hero.jpg")],
];

export function stageMaintenance() {
  mkdirSync(outDir, { recursive: true });

  for (const [source, destination] of maintenanceFiles) {
    if (!existsSync(source)) {
      throw new Error(`Missing maintenance asset: ${source}`);
    }

    copyFileSync(source, destination);
  }

  console.log("Maintenance page staged in frontend/out.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  stageMaintenance();
}
