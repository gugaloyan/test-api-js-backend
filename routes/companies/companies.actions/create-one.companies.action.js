const logger = require("../../../services/logger.service")(module);
const { CREATED, OK } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");
const { parseOne } = require("../companies.service");
const { getUrlForRequest } = require("../../../helpers/url.helper");

/**
 * POST /companies
 * Эндпоинт создания компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function createOne(req, res) {
  logger.init("create company");
  const data = req.body
  console.log(data);

  const newCompany = await companyMethods.create(data);

  res.status(CREATED).json(newCompany);
  logger.success();
}

module.exports = {
  createOne,
};
