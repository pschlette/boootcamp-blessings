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
  // requests to the server when it starts up. They don't have a user-agent
  // header. Respond with a blank 200.
  if (!req.headers["user-agent"]) {
    res.status(200).send();
    return;
  }

  // TODO Parse Slack's slash command request and call `handleCommand`

  // Some goofing around with Datastore
  try {
    const dbClient = getDbClient();

    const userKey = dbClient.key(["TestUser", "@capn_hoops"]);

    // Read and update a test count within a transaction
    const [data] = (await dbClient.get(userKey)) as Array<null | {
      count: number | null;
    }>;

    const newCount = parseInt(req.query["count"], 10);

    await dbClient.save({
      key: userKey,
      data: {
        count: isNaN(newCount) ? null : newCount
      }
    });

    res
      .status(200)
      .send(
        `The latest bless count is ${
          data && data.count ? data.count : "missing"
        }`
      );
  } catch (e) {
    res.status(200).send(`Couldn't connect to db: ${e}`);
  }
};
