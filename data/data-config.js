const knex = require("knex")("production");
const config = require("../knexfile");
const env = process.env.NODE_ENV || "development";

module.exports = knex(config[env]);