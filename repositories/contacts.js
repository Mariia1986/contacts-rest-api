const Contact=require('../model/contact')

const listContacts = async (userId, query) => {
  const { sortBy, sortByDesc, favorite = null, limit = 5, offset = 0 } = query;
  const searchOptions = { owner: userId };
  if (favorite !== null) {
    searchOptions.favorite = favorite;
  }

  return await Contact.paginate(searchOptions, {
    limit,
    offset,
    sort: { ...(sortBy ? { [sortBy]: 1 } : {}), ...(sortByDesc ? { [sortByDesc]: -1 } : {}) },
    populate: {
      path: 'owner',
      select: 'email subscription',
    },
  });
  
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
