"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movie_1 = require("./creates/movie");
const charge_1 = require("./triggers/charge");
const zapier_platform_core_1 = require("zapier-platform-core");
const { version } = require("../package.json");
const dotenv = require("dotenv-safe");
dotenv.config();
const addApiKeyHeader = (req, z, bundle) => {
    // Hard-coded api key just to demo. DON'T do auth like this for your production app!
    req.headers = req.headers || {};
    req.headers["X-Api-Key"] = "secret";
    return req;
};
exports.default = {
    version,
    platformVersion: zapier_platform_core_1.version,
    beforeRequest: [addApiKeyHeader],
    triggers: {
        [charge_1.default.key]: charge_1.default,
    },
    creates: {
        [movie_1.default.key]: movie_1.default,
    },
};
