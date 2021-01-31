import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL || "mongodb://localhost:27017";
const dbName = "performance";

export default async (report) => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const collection = db.collection("audits");
  await collection.insertOne(report);
  client.close();
  return;
};
