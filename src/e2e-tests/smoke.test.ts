import axios from "axios";

describe("End-to-end smoke test", () => {
  const TEST_SERVER_URL = "http://localhost:8000";
  const testAxios = axios.create({ baseURL: TEST_SERVER_URL });

  it("can request data from test server", async () => {
    expect.assertions(1);
    const result = await testAxios.get("http://localhost:8000/?message=hello");
    expect(result.data).toBe("hello");
  });
});
