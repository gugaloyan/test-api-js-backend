const Company = require("../../schemas/company.schema");

/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */


async function create(data) {
  try {
    const company = new Company(data);
    const savedCompany = await company.save();
    return savedCompany.toObject(); // Сохраняем компанию и возвращаем её данные
  } catch (error) {
    console.error("Error creating company:", error);
    return null;
  }
}

/**
 * Вставляет несколько компаний в базу данных.
 * @param {Array} companies Массив объектов компаний.
 * @return {Array|null} Возвращает массив вставленных компаний или null в случае ошибки.
 */
async function insertMany(companies) {
  try {
    const insertedCompanies = await Company.insertMany(companies,{ lean: true });
    return insertedCompanies;
  } catch (error) {
    console.error("Error inserting companies:", error);
    return null;
  }
}

module.exports = { create , insertMany};


