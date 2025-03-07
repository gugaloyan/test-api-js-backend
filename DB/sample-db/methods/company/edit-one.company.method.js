const Company = require("../../schemas/company.schema");

/**
 * Редактирует данные компании с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */

async function editOne(id, data) {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(id, data, { new: true });
    return updatedCompany ? updatedCompany.toObject() : null;
  } catch (error) {
    console.error("Error updating company:", error);
    return null;
  }
}

module.exports = { editOne };
