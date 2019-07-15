import process from "process";
import path from "path";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { getDbClient } from "./dbClient";

// TODO make this env handling garbage better
const nodeEnvToEnvFilename: Record<string, string | undefined> = {
  production: "./production.env",
  development: "./development.env",
  test: "./test.env"
};

const nodeEnv = process.env.NODE_ENV;
const envFilename = nodeEnvToEnvFilename[nodeEnv || ""];
if (envFilename) {
  dotenv.config({ path: path.join(process.cwd(), envFilename) });
} else {
  throw new Error(
    `Expected NODE_ENV to be 'test', 'development', or 'production'. Found ${nodeEnv}`
  );
}

exports.blessings = async (req: Request, res: Response) => {
  console.log(`Environment is ${process.env.NODE_ENV}`);

  // For some reason the google cloud functions emulator sends some empty
  // requests to the server when it starts up. Respond with a blank 200
  if (!req.headers["accept"]) {
    res.status(200).send();
    return;
  }

  // TODO Parse Slack's slash command request and call `handleCommand`

  // Test interacting with Datastore
  const dbClient = getDbClient();

  const userKey = dbClient.key(["TestUser", "@capn_hoops"]);

  // Read and update a test count within a transaction
  const transaction = dbClient.transaction();
  await transaction.run();
  const [data] = (await transaction.get(userKey)) as Array<null | {
    count: number;
  }>;
  res.status(200).send(`The bless count is ${data ? data.count : 0}`);
  transaction.save({
    key: userKey,
    data: {
      count: (data ? data.count : 0) + 1
    }
  });
  await transaction.commit();
};
