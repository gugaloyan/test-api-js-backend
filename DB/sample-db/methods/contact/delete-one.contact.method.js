const Contact = require("../../schemas/contact.schema");

/**
 * Удаляет контакт с указанным идентификатором.
 * @param {string} id
 * @return {boolean} - true, если удаление прошло успешно, иначе false.
 */
async function deleteOne(id) {
  try {
    const result = await Contact.findByIdAndDelete(id, null);
    return result !== null;
  } catch (error) {
    return false;
  }
}

module.exports = { deleteOne };
