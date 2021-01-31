import puppeteer from "puppeteer";

export default async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://example.com");
  const screen = await page.screenshot({ path: "example.png" });

  await browser.close();
  res.send(screen);
};
