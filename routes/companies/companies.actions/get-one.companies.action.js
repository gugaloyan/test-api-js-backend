const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");
const { getUrlForRequest } = require("../../../helpers/url.helper");
const { NotFound } = require("../../../constants/errors");
const { parseOne } = require("../companies.service");

/**
 * GET /companies/:id
 * Эндпоинт получения данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getOne(req, res) {
  logger.init("get company");
  const { id } = req.params;
  console.log(">>>>",id);

  const company = await companyMethods.getOne(id);
  if (!company) {
    throw new NotFound("Company not found");
  }

  const photoUrl = getUrlForRequest(req);
  console.log("???",photoUrl);

  res.status(OK).json(parseOne(company, photoUrl));
  logger.success();
}

module.exports = {
  getOne,
};
