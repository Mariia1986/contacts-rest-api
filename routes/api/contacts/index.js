const express = require("express");
const router = express.Router();
const ctrl = require("../../../controlers/contacts");
const guard= require('../../../helpers/guard')

const {
  validationCreateContacts,
  validationUpdateContacts,
  validateUpdateStatus,
} = require("./validation.js");


router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.get('/', guard, ctrl.listContacts).post('/', guard, validationCreateContacts, ctrl.addContact)

router
  .get('/:id', guard, ctrl.getContactById)
  .delete('/:id',guard,  ctrl.removeContact)
  .put('/:id', guard,  validationUpdateContacts, ctrl.updateContact)

router.patch('/:id/favorite', guard,  validateUpdateStatus, ctrl.updateStatusContact)

module.exports = router



