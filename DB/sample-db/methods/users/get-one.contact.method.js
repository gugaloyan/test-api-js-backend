const User = require("../../schemas/user.schema");
/**
 * Возвращает данные контакта с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */
async function getOne(id) {
  try {
    const contact = await User.findById(id);
    return contact ? contact : null;
  } catch (error) {
    return null;
  }
}

module.exports = { getOne };
