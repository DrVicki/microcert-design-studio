import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(projectRoot, "docs");
const errors = [];
const checks = [];

function pass(message) {
  checks.push(message);
}

function requireFile(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(absolutePath)) errors.push(`Missing required file: ${relativePath}`);
  else pass(`${relativePath} exists`);
  return absolutePath;
}

const indexPath = requireFile("docs/index.html");
requireFile("docs/404.html");
requireFile("docs/.nojekyll");
const cssPath = requireFile("docs/assets/css/styles.css");
const dataPath = requireFile("docs/assets/js/course-data.js");
requireFile("docs/assets/js/site.js");
const guidePath = requireFile("GITHUB_PAGES.md");

if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, "utf8");
  const rootRelative = [...html.matchAll(/(?:src|href)=["']\/(?!\/)([^"']*)["']/g)].map(match => match[0]);
  if (rootRelative.length) errors.push(`Root-relative links are not project-site safe: ${rootRelative.join(", ")}`);
  else pass("index.html contains no root-relative assets or links");

  const attributes = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(match => match[1]);
  for (const value of attributes) {
    if (/^(?:https?:|mailto:|tel:|#)/.test(value)) continue;
    const clean = value.split(/[?#]/)[0];
    const absolute = path.resolve(docsRoot, clean);
    if (!fs.existsSync(absolute)) errors.push(`Linked file does not exist: ${value}`);
  }
  pass("all relative HTML assets resolve inside docs/");

  const liveUrl = "https://microcertds-vvhxhqkn.manus.space/";
  if (!html.includes(liveUrl)) errors.push("index.html does not link to the live interactive Fieldbook");
  else pass("index.html links to the live interactive Fieldbook");

  if (!/public (?:course )?companion/i.test(html)) errors.push("index.html does not identify itself as the public companion");
  else pass("index.html states the static companion boundary");

  for (const phrase of ["Knowledge checks", "Progress tracker", "Completion certificate"]) {
    if (!html.includes(phrase)) errors.push(`index.html is missing the live-course feature: ${phrase}`);
  }
  pass("index.html identifies knowledge checks, progress tracking, and certificate completion");
}

if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, "utf8");
  const cssUrls = [...css.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(match => match[1]);
  for (const value of cssUrls) {
    if (/^(?:https?:|data:)/.test(value)) continue;
    const absolute = path.resolve(path.dirname(cssPath), value);
    if (!fs.existsSync(absolute)) errors.push(`CSS asset does not exist: ${value}`);
  }
  pass("all relative CSS assets resolve");
}

if (fs.existsSync(dataPath)) {
  const source = fs.readFileSync(dataPath, "utf8");
  const context = { window: {} };
  vm.runInNewContext(source, context, { filename: dataPath });
  const course = context.window.MICROCERT_COURSE;
  const lessons = course?.studios?.flatMap(studio => studio.lessons) ?? [];
  if (course?.studios?.length !== 4) errors.push(`Expected 4 studios, found ${course?.studios?.length ?? 0}`);
  else pass("curriculum contains 4 studios");
  if (lessons.length !== 12) errors.push(`Expected 12 lessons, found ${lessons.length}`);
  else pass("curriculum contains 12 lessons");
  if (course?.studios?.[0]?.title !== "Discover the right promise") errors.push("First studio title is not aligned");
  else pass("first studio title is aligned");
  if (course?.studios?.at(-1)?.title !== "Prove readiness") errors.push("Last studio title is not aligned");
  else pass("last studio title is aligned");
  if (lessons.at(-1)?.title !== "Assemble the review dossier") errors.push("Final lesson title is not aligned");
  else pass("final lesson title is aligned");
  for (const studio of course?.studios ?? []) {
    const image = path.resolve(docsRoot, studio.image);
    if (!fs.existsSync(image)) errors.push(`Studio image does not exist: ${studio.image}`);
  }
  pass("all studio artwork resolves inside docs/");
}

if (fs.existsSync(guidePath)) {
  const guide = fs.readFileSync(guidePath, "utf8");
  const required = [
    "DrVicki/microcert-design-studio",
    "https://drvicki.github.io/microcert-design-studio/",
    "main",
    "/docs",
    "Deploy from a branch",
  ];
  for (const marker of required) {
    if (!guide.includes(marker)) errors.push(`Publishing guide is missing: ${marker}`);
  }
  if (!errors.some(error => error.startsWith("Publishing guide"))) pass("publishing guide names the exact repository, branch, folder, mode, and URL");
}

if (errors.length) {
  console.error("GitHub Pages validation failed:\n");
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`GitHub Pages validation passed (${checks.length} checks):`);
checks.forEach(check => console.log(`- ${check}`));
