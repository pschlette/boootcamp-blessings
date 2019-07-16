import { Datastore } from "@google-cloud/datastore";

export const getDbClient = () => {
  return new Datastore();
};
