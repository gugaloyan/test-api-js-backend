const config = require("./config.global");

config.log.console = true;
config.log.debug = true;

config.sample_db = "mongodb://localhost:27017/sampleDB";

config.jwt.secretKey = "jwt-test-secretKey";
config.jwt.verify.maxAge = 604800;

module.exports = config;
