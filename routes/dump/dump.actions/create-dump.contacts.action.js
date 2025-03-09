const logger = require("../../../services/logger.service")(module);
const { CREATED } = require("../../../constants/http-codes");
const dumpMethods = require("../../../DB/sample-db/methods/contact");

/**
 * POST /dump
 * Эндпоинт создания нового контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function createDump(req, res) {
  logger.init("create dump");
  const data = req.body;
  const newContact = await contactMethods.createOne(data);

  res.status(CREATED).json(newContact);
  logger.success();
}

module.exports = {
  createOne,
};
