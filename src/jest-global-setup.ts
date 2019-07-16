import path from "path";
import dotenv from "dotenv";

// Load test env vars before Jest tests run
export default async () => {
  console.log("Loading test environment variables");
  // TODO refactor this to make nice with env loading in server
  const result = dotenv.config({ path: path.join(__dirname, "../test.env") });
  console.log(JSON.stringify(result.parsed, null, 2));
};
