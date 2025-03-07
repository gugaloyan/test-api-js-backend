const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");
const { NotFound } = require("../../../constants/errors");

/**
 * GET /contacts
 * Эндпоинт получения всех контактов.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getAll(req, res) {
  logger.init("get all contacts");


  const contacts = await contactMethods.getAll();

  if (!contacts || contacts.length === 0) {
    res.status(OK).json([]);
    logger.info("No contacts found.");
    return;
  }

  res.status(OK).json(contacts);
  logger.success();
}

module.exports = {
  getAll,
};
