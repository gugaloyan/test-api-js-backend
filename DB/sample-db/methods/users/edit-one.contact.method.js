const User = require("../../schemas/user.schema");

/**
 * Редактирует данные контакта с указанным идентификатором и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */
async function editOne(id, data) {
  try {
    const contact = await User.findByIdAndUpdate(id, data, { new: true });
    return contact;
  } catch (error) {
    return null;
  }
}

module.exports = { editOne };
