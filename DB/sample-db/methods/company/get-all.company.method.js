const Company = require("../../schemas/company.schema"); // Your Mongoose model

/**
 * Метод для получения списка компаний с фильтрацией, сортировкой и пагинацией.
 * @param {Object} filter - Объект фильтрации для Mongoose
 * @param {Object} options - Параметры сортировки и пагинации
 * @return {Promise<Object>} - Возвращает объект с компаниями, количеством страниц и других данных
 */
async function getCompanies(filter = {}, options = { sortBy: 'name', sortOrder: 'asc', page: 1, limit: 10 }) {
  try {
    const { sortBy, sortOrder, page, limit } = options;

    const companies = await Company.find(filter)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCompanies = await Company.countDocuments(filter);

    const totalPages = Math.ceil(totalCompanies / limit);

    return {
      companies,
      totalCompanies,
      totalPages,
    };
  } catch (error) {
    console.error('Error retrieving companies: ' + error.message);
    return null;

  }
}

module.exports = {
  getCompanies
};
