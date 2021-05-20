const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contacts = require("./contacts.json");
const contactPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return JSON.parse(contact);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newContacts = contacts.filter(({ id }) => id !== contactId);
  changeContact(contactPath, JSON.parse(newContacts));
  return contacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact={id:uuidv4(), ...body
  }
const newContacts=[...contacts, newContact]
changeContact(contactPath, newContacts);
return contacts
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
 
  // const index = contacts.findIndex(({ id }) => id.toString() === contactId);
  // if (index === -1) return;
  // contacts[index] = {...contacts[index], ...body };
  // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
  // return contacts[index];
};

function  changeContact(path, arr) {
  const contacts = JSON.stringify(arr, null, 2);
  fs.writeFile(path, contacts, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
