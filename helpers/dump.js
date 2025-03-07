const Company = require('../DB/sample-db/methods/company');
const Contact = require('./../DB/sample-db/methods/contact');
const { sampleDB } = require("../services/database.service");
const { OK } = require("../constants/http-codes");

// Sample data for Contacts
const sampleContacts = [
  { lastname: 'Smith', firstname: 'John', phone: '1234567890', email: 'john.smith@aexampleddd.com' },
  { lastname: 'Doe', firstname: 'Jane', phone: '0987654321', email: 'jane.doe@eaxamddddple.com' },
];

// Sample data for Companies
const sampleCompanies = [
  {
    name: 'Tech Corp',
    shortName: 'TC',
    businessEntity: 'LLC',
    contract: { no: '12345', issue_date: new Date() },
    type: ['agent'],
    status: 'active',
    address: '123 Tech St',
  },
  {
    name: 'Innovate Solutions',
    shortName: 'IS',
    businessEntity: 'Ltd.',
    contract: { no: '67890', issue_date: new Date() },
    type: ['contractor'],
    status: 'inactive',
    address: '456 Innovation Blvd',
  },
];

async function createDump(req,res) {
  console.log(">>>>");
  try {
    await sampleDB.connect();

    const contacts = await Contact.insertMany(sampleContacts);

    const companiesWithContacts = sampleCompanies.map((company, index) => ({
      ...company,
      contactId: contacts[index]._id,
    }));

  const companies =  await Company.insertMany(companiesWithContacts);

    console.log('Sample data inserted successfully!');
    res.status(OK).json(companies);
  } catch (error) {
    console.error('Error inserting data:', error);
    await sampleDB.disconnect();
  }
}

module.exports = { createDump};
