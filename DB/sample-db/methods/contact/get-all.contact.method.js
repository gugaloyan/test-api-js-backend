const Contact = require("../../schemas/contact.schema");

/**
 * Возвращает все контакты.
 * @return {Array|null}
 */
async function getAll() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    return null;
  }
}

module.exports = { getAll };
