import { CommandHandler, CommandResponseVisibilityType } from "../commandTypes";

// TODO: Read from db, generate a report (over some timespan?) of blessings
export const handleCountBlessingsCommand: CommandHandler = async ({
  input,
  db
}) => {
  return {
    responseType: CommandResponseVisibilityType.EPHEMERAL,
    text: `countBlessings: Received the command '${input.command}' with text '${
      input.text
    }'`
  };
};
