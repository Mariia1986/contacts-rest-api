
const Contacts = require('../repositories/contacts');
const { HttpCode} = require('../helpers/constants');

const  listContacts = async (req, res, next) => {
  
  try {
    const userId = req.user.id
    const query = req.query;
    const { docs: contacts, ...rest } = await Contacts.listContacts(userId,  query)
    return res.json({ status: 'success', code: HttpCode.OK, payload: { contacts, ...rest } });
  } catch (e) {
    next(e)
  }
}


const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const addContact= async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.addContact(userId, req.body);
    return res.status(201).json({
      status: "Success",
      code: 201,
      message: "Contact successfully created",
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const removeContact= async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateContact= async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
};
const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.updateStatusContact(userId,
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: 'error',
        code: 404,
        data: "Contact does not exist",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports ={
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
}
