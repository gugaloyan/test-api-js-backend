// services/database.service.js
const mongoose = require("mongoose");
const dbsConfig = require("../config").dbs;
const logger = require("./logger.service")(module);

/**
 * Базовый класс сервиса работы с базой данных
 */
class Database {
  #uri;

  constructor(config) {
    this.#uri = config.uri;
  }

  /**
   * Открывает соединение с БД.
   * @return {Promise<void>}
   */
  async connect() {
    try {
      await mongoose.connect(this.#uri, );
      logger.info(`Connected to database`);
    } catch (error) {
      logger.error(`Unable to connect to database:`, error.message);
    }
  }

  /**
   * Закрывает соединение с БД.
   * @return {Promise<void>}
   */
  async disconnect() {
    try {
      await mongoose.disconnect();
      logger.info(`Disconnected from database`);
    } catch (error) {
      logger.error(`Unable to disconnect from database:`, error.message);
    }
  }
}

const sampleDB = new Database(dbsConfig.sample_db);

module.exports = { sampleDB };
