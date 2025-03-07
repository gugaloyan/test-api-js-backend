const User = require("../../schemas/user.schema");

/**
 * Создает новый контакт и возвращает его данные.
 * @param {Object} data
 * @return {Object}
 */
async function createOne(data) {
  try {
    const newContact = new User(data);
    await newContact.save();
    return newContact;
  } catch (error) {
    return null;
  }
}

module.exports = { createOne };
