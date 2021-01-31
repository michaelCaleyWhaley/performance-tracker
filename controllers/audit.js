import reportGenerator from "./helpers/reportGenerator";
import saveReport from "./helpers/saveReport";

export default async (req, res) => {
  if (req.method !== "POST" || req.body.audit !== true) {
    res.send();
    return;
  }

  const report = await reportGenerator();
  await saveReport(report);
  console.log(`LOG: DONE`);
  res.send(report);
};
