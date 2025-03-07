const { Router } = require("express");
const actions = require("./contacts.actions");
const validator = require("./contacts.validator");

module.exports = Router()
  .get("/contacts/:id", ...validator.getOne, actions.getOne)
  .get("/contacts", actions.getAll)
  .patch("/contacts/:id", ...validator.editOne, actions.editOne)
  .post("/contacts", ...validator.createOne, actions.createOne)
  .delete ("/contacts/:id", ...validator.deleteOne, actions.deleteOne);
