import { resetTestDb } from "../../test-utils";
import { handleBlessCommand } from "../";
import { getDbClient } from "../../dbClient";
import {
  CommandResponse,
  CommandResponseVisibilityType
} from "../../commandTypes";

describe("bless command integration tests", () => {
  beforeEach(async () => {
    await resetTestDb();
  });

  it("can do a thing", async () => {
    expect.assertions(1);

    const db = getDbClient();
    const result = await handleBlessCommand({
      db,
      input: {
        command: "bless",
        text: "@capn_hoops thank you",
        userId: "<@U123ABC>"
      }
    });

    const partialResult: Partial<CommandResponse> = {
      responseType: CommandResponseVisibilityType.IN_CHANNEL
    };

    expect(result).toEqual(expect.objectContaining(partialResult));
  });
});
