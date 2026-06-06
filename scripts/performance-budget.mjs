import { existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const configPath = join(root, "performance-budget.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));

function walk(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function sizeOf(dir) {
  return walk(join(root, dir)).reduce((sum, file) => sum + statSync(file).size, 0);
}

function mb(bytes) {
  return bytes / 1024 / 1024;
}

function kb(bytes) {
  return bytes / 1024;
}

const failures = [];

function checkMax(label, actual, max, unit = "MB") {
  if (actual > max) {
    failures.push(`${label}: ${actual.toFixed(2)} ${unit} > ${max} ${unit}`);
  }
}

checkMax("out total", mb(sizeOf("out")), config.maxOutMB);
checkMax("public/img total", mb(sizeOf("public/img")), config.maxPublicImgMB);
checkMax("public/vid total", mb(sizeOf("public/vid")), config.maxPublicVidMB);

for (const file of walk(join(root, "public/img"))) {
  const size = kb(statSync(file).size);
  checkMax(relative(root, file), size, config.maxImageKB, "KB");
}

for (const file of walk(join(root, "public/vid"))) {
  const size = kb(statSync(file).size);
  checkMax(relative(root, file), size, config.maxVideoKB, "KB");
}

if (failures.length > 0) {
  console.error("Performance budget failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Performance budget passed.");
