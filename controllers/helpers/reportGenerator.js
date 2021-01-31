import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { kpiList } from "../../config";

export default async () => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--no-sandbox"],
  });
  const options = {
    logLevel: "info",
    output: "json",
    port: chrome.port,
    onlyAudits: kpiList,
  };
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
  await chrome.kill();
  return reportList;
};
