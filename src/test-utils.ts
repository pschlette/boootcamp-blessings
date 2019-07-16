import axios from "axios";

// Reset the test database to a default, empty state
// See https://stackoverflow.com/a/47007653/326547
export const resetTestDb = async () => {
  await axios.post(`http://${process.env.DATASTORE_EMULATOR_HOST}/reset`);
};
