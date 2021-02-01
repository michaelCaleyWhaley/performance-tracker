import * as playwright from "playwright-aws-lambda";

export default async (req, res) => {
  const browser = await playwright.launchChromium({
    args: ["--remote-debugging-port=9222"],
    headless: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://www.example.com/");
  const screenshot = await page.screenshot();
  browser.close();

  res.send(screenshot);
};
