// import * as playwright from "playwright-aws-lambda";

// export default async (req, res) => {
//   const browser = await playwright.launchChromium({
//     headless: false,
//   });

//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto("http://www.example.com/");
//   // const screenshot = await page.screenshot();
//   // browser.close();

//   res.send();
// };

const playwright = require("playwright");

export default async (req, res) => {
  const browser = await playwright["chromium"].launch({
    args: ["--remote-debugging-port=9222"],
  });
  const page = await browser.newPage();
  await page.goto("https://angular.io/");

  await browser.close();
  res.send();
};
