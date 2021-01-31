import playwright from "playwright";

export default async (req, res) => {
  const browser = await playwright["chromium"].launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://example.com");
  await browser.close();
  res.send('working');
};
