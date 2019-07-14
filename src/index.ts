import process from "process";
import path from "path";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { getDbClient } from "./dbClient";

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

  console.log(JSON.stringify(req.query, null, 2));

  if (!req.query.test) {
    res.status(200).send();
    return;
  }

  const dbClient = getDbClient();

  const transaction = dbClient.transaction();
  const userKey = dbClient.key(["User", "@capn_hoops"]);
  console.log(`User key path: ${userKey.path}`);

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

  // let message = req.query.message || req.body.message || "Hello World!";
};
