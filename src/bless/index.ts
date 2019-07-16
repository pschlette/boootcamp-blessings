import { CommandHandler, CommandResponseVisibilityType } from "../commandTypes";

// TODO log the blessing in the db and send back a simple success response
export const handleBlessCommand: CommandHandler = async ({ input, db }) => {
  return {
    responseType: CommandResponseVisibilityType.IN_CHANNEL,
    text: `bless: Received the command '${input.command}' with text '${
      input.text
    }'`
  };
};
