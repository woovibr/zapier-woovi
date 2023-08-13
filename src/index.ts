import { Bundle, HttpRequestOptions, ZObject } from "zapier-platform-core";

import MovieCreate from "./creates/movie";
import ChargeTrigger from "./triggers/charge";
import { version as platformVersion } from "zapier-platform-core";

const { version } = require("../package.json");

import * as dotenv from "dotenv-safe";
dotenv.config();

const addApiKeyHeader = (
  req: HttpRequestOptions,
  z: ZObject,
  bundle: Bundle
) => {
  // Hard-coded api key just to demo. DON'T do auth like this for your production app!
  req.headers = req.headers || {};
  req.headers["X-Api-Key"] = "secret";
  return req;
};

export default {
  version,
  platformVersion,

  beforeRequest: [addApiKeyHeader],

  triggers: {
    [ChargeTrigger.key]: ChargeTrigger,
  },

  creates: {
    [MovieCreate.key]: MovieCreate,
  },
};
