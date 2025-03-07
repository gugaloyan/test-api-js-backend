const companyMethods = require("../../DB/sample-db/methods/company");
const { CREATED, OK } = require("../../constants/http-codes");

/**
 * Обрабатывает данные компании и возвращает результат.
 * @param {Object} item
 * @param {string} photoUrl
 * @return {Object}
 */
function parseOne(item, photoUrl) {
  return {
    ...item,
    photos: item.photos.map((photo) => ({
      ...photo,
      name: `${photoUrl}static/${photo.name}`,
      thumbpath: `${photoUrl}static/${photo.thumbpath}`,
    })),
  };
}



/**
 * Метод для обработки получения списка компаний с фильтрацией, сортировкой и пагинацией.
 * @param {Object} filter - Параметры фильтрации для поиска компаний
 * @param {Object} options - Параметры для сортировки и пагинации
 * @returns {Object} - Возвращает список компаний, общее количество и количество страниц
 */
async function getAllCompanies(query) {

  const { status, type, sortBy = 'name', sortOrder = 'asc', page = 1, limit = 10 } = query;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (type && Array.isArray(type)) {
    filter.type = { $in: type };
  } else if (type) {
    filter.type = type;
  }

  const options = {
    sortBy,
    sortOrder,
    page:Number(page),
    limit:Number(limit)
  };

  try {
    const { companies, totalCompanies, totalPages } = await companyMethods.getCompanies(filter, options);

    return {
      page:options.page,
      companies,
      totalCompanies,
      totalPages,
    };
  } catch (error) {
    throw new Error('Error retrieving companies from service: ' + error.message);
  }
}

module.exports = {
  getAllCompanies,
  parseOne
};

