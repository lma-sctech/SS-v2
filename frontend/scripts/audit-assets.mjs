import { readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();

function walk(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function bytesToMB(bytes) {
  return Number((bytes / 1024 / 1024).toFixed(2));
}

function bytesToKB(bytes) {
  return Number((bytes / 1024).toFixed(1));
}

const files = ["public/img", "public/vid", "out", "out/_next/static"]
  .map((dir) => {
    const abs = join(root, dir);
    const entries = walk(abs);
    const total = entries.reduce((sum, file) => sum + statSync(file).size, 0);
    return { dir, files: entries.length, totalMB: bytesToMB(total) };
  });

const biggest = walk(join(root, "public"))
  .map((file) => ({ file: relative(root, file), size: statSync(file).size }))
  .sort((a, b) => b.size - a.size)
  .slice(0, 20);

console.log("Asset totals");
console.table(files);

console.log("Largest public assets");
console.table(
  biggest.map((entry) => ({
    file: entry.file,
    KB: bytesToKB(entry.size),
    MB: bytesToMB(entry.size),
  })),
);
