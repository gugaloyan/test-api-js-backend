const Contact = require("../../schemas/contact.schema");

/**
 * Редактирует данные контакта с указанным идентификатором и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */
async function editOne(id, data) {
  try {
    const contact = await Contact.findByIdAndUpdate(id, data, { new: true });
    return contact;
  } catch (error) {
    return null;
  }
}

module.exports = { editOne };
