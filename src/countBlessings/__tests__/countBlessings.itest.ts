import { resetTestDb } from "../../test-utils";
import { handleCountBlessingsCommand } from "../";
import { getDbClient } from "../../dbClient";
import {
  CommandResponse,
  CommandResponseVisibilityType
} from "../../commandTypes";

describe("countBlessings command integration tests", () => {
  beforeEach(async () => {
    await resetTestDb();
  });

  it("can do a thing", async () => {
    expect.assertions(1);

    const db = getDbClient();
    const result = await handleCountBlessingsCommand({
      db,
      input: {
        command: "count_blessings",
        text: "",
        userId: "<@U123ABC>"
      }
    });

    const partialResult: Partial<CommandResponse> = {
      responseType: CommandResponseVisibilityType.EPHEMERAL
    };

    expect(result).toEqual(expect.objectContaining(partialResult));
  });
});
