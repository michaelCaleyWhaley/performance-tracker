import playwright from "playwright";

export default async (req, res) => {
  for (const browserType of ["firefox"]) {
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://whatsmyuseragent.org/");
    await page.screenshot({ path: `example-${browserType}.png` });
    await browser.close();
  }
  res.send("working");
};
