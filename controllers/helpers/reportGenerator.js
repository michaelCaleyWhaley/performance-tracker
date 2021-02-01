import * as playwright from "playwright-aws-lambda";
import lighthouse from "lighthouse";
// import * as chromeLauncher from "chrome-launcher";
import { kpiList } from "../../config";

export default async () => {
  const browser = await playwright.launchChromium({
    headless: true,
    args: ["--remote-debugging-port=9222"],
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  // const chrome = await chromeLauncher.launch({
  //   chromeFlags: ["--headless", "--no-sandbox"],
  // });
  const options = {
    logLevel: "info",
    output: "json",
    port: 9222,
    onlyAudits: kpiList,
  };
  // const options = {
  //   logLevel: "info",
  //   output: "json",
  //   port: chrome.port,
  //   onlyAudits: kpiList,
  // };
  const runnerResult = await lighthouse("https://www.riverisland.com", options);

  const { report } = runnerResult;
  const { audits } = JSON.parse(report);

  const reportList = kpiList.reduce(
    (accumulator, kpi) => {
      const { id, numericValue } = audits[kpi];
      accumulator[id] = numericValue;
      return accumulator;
    },
    { date: Date.now() }
  );
  await browser.close();
  // await chrome.kill();
  return reportList;
};
