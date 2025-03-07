const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");
const { NotFound } = require("../../../constants/errors");

/**
 * DELETE /contacts/:id
 * Эндпоинт удаления контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function deleteOne(req, res) {
  logger.init("delete contact");
  const { id } = req.params;

  const contact = await contactMethods.getOne(id);
  if (!contact) {
    throw new NotFound("Contact not found");
  }

  contactMethods.deleteOne(id);

  res.status(OK).json({ message: "Contact deleted successfully" });
  logger.success();
}

module.exports = {
  deleteOne,
};
