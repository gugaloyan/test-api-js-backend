const logger = require("../../../services/logger.service")(module);
const { CREATED } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");

/**
 * POST /contacts
 * Эндпоинт создания нового контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function createOne(req, res) {
  logger.init("create contact");
  const data = req.body;
  const newContact = await contactMethods.createOne(data);

  res.status(CREATED).json(newContact);
  logger.success();
}

module.exports = {
  createOne,
};
