const Contact=require('../model/contact')

const listContacts = async () => {
  const results = await Contact.find()
  return results
};

const getContactById = async (contactId) => {
  const result = await Contact.findOne(contactId)
  return result
};

const removeContact = async (contactId) => {
  const result = await  Contact.findOneAndRemove( contactId )
  return result
  
};

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
     contactId ,
    { ...body },
    { new: true },
  )
  return result
}

const updateStatusContact=async (contactId, body)=> {
  const newStatus = await Contact.findOneAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  return newStatus;
}




module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
