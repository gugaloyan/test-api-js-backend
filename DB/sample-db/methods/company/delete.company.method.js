const Company = require("../../schemas/company.schema");

/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */


async function deleteOne(id) {
  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    return deletedCompany ? deletedCompany.toObject() : null;
  } catch (error) {
    console.error("Error deleting company:", error);
    return null;
  }
}

module.exports = { deleteOne };



