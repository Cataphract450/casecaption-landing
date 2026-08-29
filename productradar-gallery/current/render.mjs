import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(resolve(here, "../../../casecaption-web/package.json"));
const { chromium } = require("playwright");
const source = resolve(here, "index.html");
const output = resolve(here, "../../assets/productradar-current");

await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1180, height: 1920 },
  deviceScaleFactor: 1,
});
const runtimeErrors = [];
page.on("pageerror", (error) => runtimeErrors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") runtimeErrors.push(message.text());
});

await page.goto(`file:///${source.replaceAll("\\", "/")}`, {
  waitUntil: "networkidle",
});
await page.evaluate(() => document.fonts.ready);

const audit = await page.locator(".slide").evaluateAll((slides) =>
  slides.map((slide) => ({
    name: slide.dataset.slide,
    width: slide.getBoundingClientRect().width,
    height: slide.getBoundingClientRect().height,
    overflowX: slide.scrollWidth > slide.clientWidth,
    overflowY: slide.scrollHeight > slide.clientHeight,
    imagesLoaded: [...slide.querySelectorAll("img")].every(
      (image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0,
    ),
  })),
);

const invalidSlides = audit.filter(
  (slide) =>
    slide.width !== 1080 ||
    slide.height !== 1920 ||
    slide.overflowX ||
    slide.overflowY ||
    !slide.imagesLoaded,
);

if (audit.length !== 5 || invalidSlides.length > 0 || runtimeErrors.length > 0) {
  throw new Error(
    JSON.stringify({ audit, invalidSlides, runtimeErrors }, null, 2),
  );
}

const slides = page.locator(".slide");
for (let index = 0; index < (await slides.count()); index += 1) {
  const slide = slides.nth(index);
  const name = await slide.getAttribute("data-slide");
  await slide.screenshot({
    path: resolve(output, `${name}.png`),
    animations: "disabled",
  });
}

await browser.close();
console.log(JSON.stringify({ audit, runtimeErrors }, null, 2));
