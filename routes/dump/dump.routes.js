const { Router } = require("express");
const actions = require("../../helpers/dump");

module.exports = Router()
  .get("/dump", actions.createDump)

