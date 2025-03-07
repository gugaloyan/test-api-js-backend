const Contact = require("../../schemas/contact.schema");

/**
 * Создает новый контакт и возвращает его данные.
 * @param {Object} data
 * @return {Object}
 */
async function createOne(data) {
  try {
    const newContact = new Contact(data);
    await newContact.save();
    return newContact;
  } catch (error) {
    return null;
  }
}

/**
 * Вставляет несколько контактов в базу данных.
 * @param {Array} contacts Массив объектов контактов.
 * @return {Array|null} Возвращает вставленные контакты или null в случае ошибки.
 */
async function insertMany(contacts) {
  try {
    const insertedContacts = await Contact.insertMany(contacts, { lean: true });
    return insertedContacts; // Возвращаем вставленные контакты
  } catch (error) {
    console.error("Ошибка при вставке контактов:", error);
    return null;
  }
}

module.exports = { createOne, insertMany };
