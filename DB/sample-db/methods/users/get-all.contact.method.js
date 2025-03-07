const User = require("../../schemas/user.schema");

/**
 * Возвращает все контакты.
 * @return {Array|null}
 */
async function getAll() {
  try {
    const contacts = await User.find();
    return contacts;
  } catch (error) {
    return null;
  }
}

module.exports = { getAll };
