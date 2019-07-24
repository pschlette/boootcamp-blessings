import { Datastore } from "@google-cloud/datastore";

export const getDbClient = () => {
  return new Datastore({ projectId: process.env.DATASTORE_PROJECT_ID });
};
