import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export default async (req, res) => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  // const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://example.com");
  const screen = await page.screenshot({ path: "example.png" });

  await browser.close();
  res.send(screen);
};
