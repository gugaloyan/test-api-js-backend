const logger = require("../../../services/logger.service")(module);
const { CREATED } = require("../../../constants/http-codes");
const userMethods = require("../../../DB/sample-db/methods/users");

/**
 * POST /users
 * Эндпоинт создания нового юсера.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function createOne(req, res) {
  logger.init("create user");
  const data = req.body;
  const newContact = await userMethods.createOne(data);

  res.status(CREATED).json(newContact);
  logger.success();
}

module.exports = {
  createOne,
};
