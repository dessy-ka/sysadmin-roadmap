#!/usr/bin/env node
/* global require, process, console, URL */
/* Offline content, route, import and TS/TSX syntax checks for this project. */
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = process.cwd();
const failures = [];
const report = (message) => failures.push(message);

// pnpm 11+ reads project settings from pnpm-workspace.yaml, not package.json#pnpm.
try {
  const packageManifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  if (packageManifest.pnpm) report("Remove the deprecated package.json#pnpm configuration; use pnpm-workspace.yaml.");
} catch (error) {
  report(`Could not parse package.json: ${error.message}`);
}
const pnpmWorkspaceConfigPath = path.join(root, "pnpm-workspace.yaml");
if (!fs.existsSync(pnpmWorkspaceConfigPath)) {
  report("Missing pnpm-workspace.yaml project configuration.");
} else {
  const pnpmWorkspaceConfig = fs.readFileSync(pnpmWorkspaceConfigPath, "utf8");
  if (!/overrides:\s*\n\s*["']?minimatch@\^10\.0\.0["']?:\s*["']?11\.0\.1/.test(pnpmWorkspaceConfig)) {
    report("pnpm-workspace.yaml must override minimatch@^10.0.0 to 11.0.1.");
  }
}
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const fullPath = path.join(directory, entry.name);
  if (entry.isDirectory()) return entry.name === "node_modules" || entry.name === ".next" ? [] : walk(fullPath);
  return /\.(ts|tsx)$/.test(entry.name) ? [fullPath] : [];
});
const sourceFiles = [
  ...walk(path.join(root, "app")),
  ...walk(path.join(root, "components")),
  ...walk(path.join(root, "data")),
  ...walk(path.join(root, "lib")),
  path.join(root, "next.config.ts")
].filter((file) => fs.existsSync(file));

function loadDataModule(name) {
  const filename = path.join(root, "data", `${name}.ts`);
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const sandbox = { exports: {}, require };
  vm.runInNewContext(output, sandbox, { filename });
  return sandbox.exports;
}

function walkAst(node, visit) {
  visit(node);
  ts.forEachChild(node, (child) => walkAst(child, visit));
}

function getJsxString(attribute) {
  if (!attribute.initializer) return undefined;
  if (ts.isStringLiteral(attribute.initializer) || ts.isNoSubstitutionTemplateLiteral(attribute.initializer)) return attribute.initializer.text;
  if (ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression) {
    const expression = attribute.initializer.expression;
    if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
  }
  return undefined;
}

function checkImport(sourceFile, moduleName) {
  if (!moduleName.startsWith("@/") && !moduleName.startsWith(".")) return;
  const base = moduleName.startsWith("@/")
    ? path.join(root, moduleName.slice(2))
    : path.resolve(path.dirname(sourceFile.fileName), moduleName);
  const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.jsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")];
  if (!candidates.some((candidate) => fs.existsSync(candidate))) {
    report(`Missing local import in ${path.relative(root, sourceFile.fileName)}: ${moduleName}`);
  }
}

const allIds = new Set();
const jsxElements = [];
const externalLiteralUrls = [];
for (const filename of sourceFiles) {
  const source = fs.readFileSync(filename, "utf8");
  const sourceFile = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, filename.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const transpiled = ts.transpileModule(source, {
    fileName: filename,
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX
    }
  });
  for (const diagnostic of transpiled.diagnostics || []) {
    if (diagnostic.category === ts.DiagnosticCategory.Error) {
      report(`Syntax error in ${path.relative(root, filename)}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`);
    }
  }

  walkAst(sourceFile, (node) => {
    if (ts.isStringLiteral(node) && /^https?:\/\//.test(node.text)) externalLiteralUrls.push({ filename, url: node.text });
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      checkImport(sourceFile, node.moduleSpecifier.text);
    }
    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      checkImport(sourceFile, node.moduleSpecifier.text);
    }
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const attributes = node.attributes.properties.filter(ts.isJsxAttribute);
      jsxElements.push({ filename, attributes, tagName: node.tagName.getText(sourceFile) });
      for (const attribute of attributes) {
        if (attribute.name.getText(sourceFile) === "id") {
          const id = getJsxString(attribute);
          if (id) allIds.add(id);
        }
      }
    }
  });
}

// Check hard-coded internal routes and anchors in JSX.
const staticRoutes = new Set(["/", "/roadmap", "/technologies", "/resources", "/schedule", "/career-center"]);
const { roadmapStages } = loadDataModule("roadmap");
const { resources } = loadDataModule("resources");
const { studySchedule } = loadDataModule("schedule");
const { technologies } = loadDataModule("technologies");
const { certifications, careerPaths, interviewQuestions, portfolioProjects } = loadDataModule("career-center");
const roadmapSlugs = new Set(roadmapStages.map((stage) => stage.slug));
const roadmapNumbers = new Set(roadmapStages.map((stage) => Number(stage.number)));
const resourceIds = new Set(resources.map((resource) => resource.id));
const technologySlugs = new Set(technologies.map((technology) => technology.slug));
const stagePathSource = fs.readFileSync(path.join(root, "components/roadmap/resources-directory.tsx"), "utf8");
const stagePathBlock = stagePathSource.match(/const stagePaths:[^=]+\=\s*\{([\s\S]*?)\};/);
const stagePathEntries = new Map();
if (!stagePathBlock) report("Could not locate the resource directory roadmap-stage route map.");
else {
  for (const match of stagePathBlock[1].matchAll(/"(\d+)"\s*:\s*"([a-z0-9-]+)"/g)) stagePathEntries.set(match[1], match[2]);
}

for (const { filename, attributes } of jsxElements) {
  const hrefAttribute = attributes.find((attribute) => attribute.name.getText() === "href");
  const href = hrefAttribute ? getJsxString(hrefAttribute) : undefined;
  if (href) {
    if (href.startsWith("https://") || href.startsWith("http://")) {
      try {
        const parsed = new URL(href);
        if (!parsed.hostname) report(`Invalid external URL in ${path.relative(root, filename)}: ${href}`);
      } catch {
        report(`Malformed external URL in ${path.relative(root, filename)}: ${href}`);
      }
    } else if (href.startsWith("/")) {
      const [pathname, hash] = href.split("#");
      const routeExists = staticRoutes.has(pathname)
        || (pathname.startsWith("/roadmap/") && roadmapSlugs.has(pathname.slice("/roadmap/".length)))
        || (pathname.startsWith("/technologies/") && technologySlugs.has(pathname.slice("/technologies/".length)));
      if (!routeExists) report(`Unresolved internal route in ${path.relative(root, filename)}: ${href}`);
      if (hash && !allIds.has(hash)) report(`Unresolved anchor in ${path.relative(root, filename)}: ${href}`);
    } else if (href.startsWith("#")) {
      const hash = href.slice(1);
      if (hash && !allIds.has(hash)) report(`Unresolved local anchor in ${path.relative(root, filename)}: ${href}`);
    }
  }

  const target = attributes.find((attribute) => attribute.name.getText() === "target");
  if (target && getJsxString(target) === "_blank") {
    const rel = attributes.find((attribute) => attribute.name.getText() === "rel");
    const relValue = rel ? getJsxString(rel) || "" : "";
    if (!relValue.split(/\s+/).includes("noopener") || !relValue.split(/\s+/).includes("noreferrer")) {
      report(`New-tab link missing rel="noopener noreferrer" in ${path.relative(root, filename)}`);
    }
  }
}

for (const { filename, url } of externalLiteralUrls) validHttps(url, `URL literal in ${path.relative(root, filename)}`);

for (const { filename, attributes, tagName } of jsxElements) {
  if (tagName === "main") {
    const id = attributes.find((attribute) => attribute.name.getText() === "id");
    if (!id || getJsxString(id) !== "main-content") report(`Main landmark in ${path.relative(root, filename)} must have id="main-content" for the skip link.`);
  }
  const controls = attributes.find((attribute) => attribute.name.getText() === "aria-controls");
  const controlsId = controls ? getJsxString(controls) : undefined;
  if (controlsId && !allIds.has(controlsId)) report(`Unresolved aria-controls target '${controlsId}' in ${path.relative(root, filename)}.`);
}

function unique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) report(`Duplicate ${label}: ${[...new Set(duplicates)].join(", ")}`);
}
function validHttps(url, label) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") report(`${label} must use HTTPS: ${url}`);
  } catch {
    report(`Malformed URL for ${label}: ${url}`);
  }
}

unique(roadmapStages.map((stage) => stage.slug), "roadmap slugs");
unique(resources.map((resource) => resource.id), "resource IDs");
unique(technologies.map((technology) => technology.slug), "technology slugs");
unique(certifications.map((certification) => certification.id), "certification IDs");

for (const stage of roadmapStages) {
  for (const id of stage.resourceIds || []) if (!resourceIds.has(id)) report(`Unknown resource '${id}' referenced by roadmap stage '${stage.slug}'.`);
}
for (const resource of resources) {
  validHttps(resource.url, `resource '${resource.id}'`);
  for (const stage of resource.stages || []) {
    if (!roadmapNumbers.has(Number(stage))) report(`Unknown roadmap stage '${stage}' referenced by resource '${resource.id}'.`);
    if (!stagePathEntries.has(stage)) report(`Missing resource directory route mapping for roadmap stage '${stage}'.`);
  }
  for (const [number, slug] of stagePathEntries) {
    if (!roadmapSlugs.has(slug) || !roadmapNumbers.has(Number(number))) report(`Invalid resource directory stage route mapping: ${number} -> ${slug}.`);
  }
}
for (const month of studySchedule) {
  if (!roadmapSlugs.has(month.stageSlug)) report(`Unknown roadmap stage '${month.stageSlug}' referenced by schedule month '${month.title}'.`);
  for (const week of month.weeks) for (const id of week.resourceIds) if (!resourceIds.has(id)) report(`Unknown resource '${id}' referenced by schedule week '${week.id}'.`);
}
for (const technology of technologies) {
  for (const slug of technology.roadmapStages || []) if (!roadmapSlugs.has(slug)) report(`Unknown roadmap stage '${slug}' referenced by technology '${technology.slug}'.`);
  for (const id of technology.resourceIds || []) if (!resourceIds.has(id)) report(`Unknown resource '${id}' referenced by technology '${technology.slug}'.`);
  for (const resource of technology.resources || []) validHttps(resource.url, `technology link '${technology.slug}/${resource.label}'`);
}
for (const certification of certifications) {
  validHttps(certification.officialUrl, `certification '${certification.id}' official page`);
  validHttps(certification.objectivesUrl, `certification '${certification.id}' objectives`);
  for (const slug of certification.roadmapStages || []) if (!roadmapSlugs.has(slug)) report(`Unknown roadmap stage '${slug}' referenced by certification '${certification.id}'.`);
}

const weekCount = studySchedule.reduce((sum, month) => sum + month.weeks.length, 0);
const taskCount = studySchedule.reduce((sum, month) => sum + month.weeks.reduce((weekSum, week) => weekSum + week.tasks.length, 0), 0);
const counts = {
  roadmapStages: roadmapStages.length,
  technologies: technologies.length,
  certifications: certifications.length,
  careerPaths: careerPaths.length,
  interviewQuestions: interviewQuestions.length,
  portfolioProjects: portfolioProjects.length,
  scheduleMonths: studySchedule.length,
  scheduleWeeks: weekCount,
  scheduleTasks: taskCount,
  learningResources: resources.length
};

if (roadmapStages.length !== 8) report(`Expected 8 roadmap stages; found ${roadmapStages.length}.`);
if (technologies.length !== 16) report(`Expected 16 technology guides; found ${technologies.length}.`);
if (certifications.length !== 10) report(`Expected 10 certifications; found ${certifications.length}.`);
if (studySchedule.length !== 12 || weekCount !== 48 || taskCount !== 144) report(`Schedule structure mismatch: ${studySchedule.length} months, ${weekCount} weeks, ${taskCount} tasks.`);

if (failures.length) {
  console.error("\nSysAdmin Roadmap QA: FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nSysAdmin Roadmap QA: PASSED");
  console.log(`Checked ${sourceFiles.length} TypeScript/TSX files, local imports, internal links, anchors, new-tab link safety and cross-linked content.`);
  console.table(counts);
}
