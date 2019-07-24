import axios from "axios";
import { resetTestDb } from "../test-utils";

describe("End-to-end smoke test", () => {
  const TEST_SERVER_URL = "http://localhost:8000";
  const testAxios = axios.create({ baseURL: TEST_SERVER_URL });

  beforeEach(async () => {
    await resetTestDb();
  });

  it("can request data from test server with test db", async () => {
    expect.assertions(3);
    const result = await testAxios.get("/?count=23");
    expect(result.data).toBe("The latest bless count is missing");

    const result2 = await testAxios.get("/");
    expect(result2.data).toBe("The latest bless count is 23");

    const result3 = await testAxios.get("/?count=5");
    expect(result3.data).toBe("The latest bless count is missing");
  });
});
