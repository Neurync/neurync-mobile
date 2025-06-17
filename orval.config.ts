import { SERVER_PORT } from "./src/env";

export default {
  neuryncApi: {
    input: `http://localhost:${SERVER_PORT}/docs/json`,
    output: {
      mode: "tags-split",
      target: "./src/services/api/endpoints",
      schemas: "./src/services/api/schemas",
      client: "axios",
    },
  },
};
