import process from "process";
import path from "path";
import dotenv from "dotenv";
import { Request, Response } from "express";

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

exports.blessings = (req: Request, res: Response) => {
  console.log(process.env.NODE_ENV);
  let message = req.query.message || req.body.message || "Hello World!";
  res.status(200).send(message);
};
