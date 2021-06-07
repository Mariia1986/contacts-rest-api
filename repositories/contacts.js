const Contact=require('../model/contact')

const listContacts = async (userId) => {
  const results = await Contact.find( {owner: userId}).populate({
      path: 'owner',
      select: 'email subscription -_id',
    })
  return results
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne(contactId, {owner: userId})
  return result
};

const removeContact = async (contactId,userId ) => {
  const result = await  Contact.findOneAndRemove( contactId, {owner: userId} )
  return result
  
};

const addContact = async ( userId, body) => {
  const result = await Contact.create({ owner: userId, ...body })
  return result
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
     
     {owner: userId, _id:contactId},
    { ...body },
    { new: true },
  )
  return result
}

const updateStatusContact=async (contactId, userId, body)=> {
  const newStatus = await Contact.findOneAndUpdate(
    
    {owner: userId, _id:contactId},
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
