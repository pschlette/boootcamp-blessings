import axios from "axios";
import { resetTestDb } from "../test-utils";

describe("End-to-end smoke test", () => {
  const TEST_SERVER_URL = "http://localhost:8000";
  const testAxios = axios.create({ baseURL: TEST_SERVER_URL });

  beforeEach(async () => {
    await resetTestDb();
  });

  it("can request data from test server with test db", async () => {
    expect.assertions(2);
    const result = await testAxios.get("/?test=yes");
    expect(result.data).toBe("The bless count is 0");

    const result2 = await testAxios.get("/?test=yes");
    expect(result2.data).toBe("The bless count is 1");
  });
});
