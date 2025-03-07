const Company = require("../../schemas/company.schema");

/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */

async function getOne(id) {
  try {
    const company = await Company.findById(id);
    return company ? company.toObject() : null;
  } catch (error) {
    console.error("Error fetching company:", error);
    return null;
  }
}

module.exports = { getOne };


