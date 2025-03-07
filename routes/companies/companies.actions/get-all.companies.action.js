const companiesService = require("../companies.service");
const { OK, INTERNAL_ERROR } = require("../../../constants/http-codes");

/**
 * Контроллер для получения списка компаний
 * @param {Object} req - объект запроса, содержащий параметры фильтрации и пагинации
 * @param {Object} res - объект ответа
 */
async function getAll(req, res) {

  try {
    const { companies, totalCompanies, totalPages,page } = await companiesService.getAllCompanies(req.query);

    res.status(OK).json({
      companies,
      currentPage: page,
      totalPages,
      totalCompanies,
    });
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: "Error retrieving companies",
      error: error.message
    });
  }
}

module.exports = {
  getAll
};
