const { sampleDB } = require("../../services/datab  ase.service");

function connectionFactory() {
  const { connection } = sampleDB;

  // conn.model("SampleModel", require("./schemas/SampleModel"), "collection");

  return connection;
}

module.exports = connectionFactory;
