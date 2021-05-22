const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contacts = require("./contacts.json");
const contactPath = path.join(__dirname, "/contacts.json");

const readData=async ()=>{
  const data = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(data);
}


const listContacts = async () => {
   return await readData()
};

const getContactById = async (contactId) => {
  const contacts = await readData()
  const [contact] = contacts.filter((el) => el.id.toString() === contactId.toString());
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const index = contacts.findIndex((contact) => contact.id.toString() === contactId.toString())
  if (index !== -1) {
    const contact = contacts.splice(index, 1)
    await fs.writeFile(contactPath, JSON.stringify(contacts,null,2))
    return contact
  }
  return null
  
};

const addContact = async (body) => {
  const contacts = await readData();
  const newContact={id:uuidv4(), ...body
  }
  contacts.push(newContact)
  await fs.writeFile(contactPath, JSON.stringify(contacts,null,2))
return newContact
};

const updateContact = async (contactId, body) => {
  const contacts = await readData();
  const [result] = contacts.filter((el) => el.id.toString() === contactId.toString())
  if (result) {
    Object.assign(result, body)
    await fs.writeFile(contactPath, JSON.stringify(contacts,null,2))
  }
  return result
}
  




module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
