import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import puppeteer from "puppeteer";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { embeddedInterCss } from "./embedInterFonts.ts";
import { ResumeShell } from "./ResumeShell.tsx";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

async function main() {
  const readmePath = join(projectRoot, "README.md");
  const outDir = join(projectRoot, "dist");
  const outPath = join(outDir, "EduardoBorgesResume.pdf");

  const md = await readFile(readmePath, "utf8");
  const markdownHtml = await marked.parse(md, { gfm: true });
  const embeddedFontFaces = await embeddedInterCss(projectRoot);

  const doc =
    "<!DOCTYPE html>" +
    renderToStaticMarkup(
      <ResumeShell
        markdownHtml={String(markdownHtml)}
        embeddedFontFaces={embeddedFontFaces}
      />,
    );

  const isCi = Boolean(process.env.CI);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH?.trim() || undefined,
    args: [
      ...(isCi
        ? [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
          ]
        : []),
      "--disable-lcd-text",
    ],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(doc, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "18mm", bottom: "18mm", left: "20mm", right: "20mm" },
    });
    await mkdir(outDir, { recursive: true });
    await writeFile(outPath, pdf);
  } finally {
    await browser.close();
  }

  console.log(`PDF DONE: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
