import { getDbClient } from "./dbClient";
import {
  CommandInput,
  CommandResponse,
  CommandResponseVisibilityType
} from "./commandTypes";
import { handleBlessCommand } from "./bless";
import { handleCountBlessingsCommand } from "./countBlessings";

export const handleCommand = async (input: CommandInput) => {
  const db = getDbClient();

  let commandResponse: CommandResponse;
  switch (input.command) {
    case "bless":
      commandResponse = await handleBlessCommand({ input, db });
    case "count_blessings":
      commandResponse = await handleCountBlessingsCommand({ input, db });
    default:
      commandResponse = {
        responseType: CommandResponseVisibilityType.EPHEMERAL,
        text: `wtf? we don't know what to do with the command '${
          input.command
        }'`
      };

      // TODO do great stuff with the command response (like send it back to Slack)
      console.log(JSON.stringify(commandResponse, null, 2));
  }
};
