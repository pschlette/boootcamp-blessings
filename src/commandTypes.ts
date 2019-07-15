import { Datastore } from "@google-cloud/datastore";

export enum CommandResponseVisibilityType {
  // Show the response only to the user who sent the command
  EPHEMERAL = "ephemeral",
  // Post the response publicly in the channel
  IN_CHANNEL = "in_channel"
}

// See https://api.slack.com/slash-commands#app_command_handling
export interface CommandInput {
  userId: string;
  command: string;
  text: string;
}

// See https://api.slack.com/slash-commands#responding_immediate_response
export interface CommandResponse {
  responseType: CommandResponseVisibilityType;
  text: string;
  // Attachments can probably contain other things too, idk.
  attachments?: Array<{ text: string }> | null;
}

export type CommandHandler = (params: {
  input: CommandInput;
  db: Datastore;
}) => Promise<CommandResponse>;
