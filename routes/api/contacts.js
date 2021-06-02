const express = require("express");
const router = express.Router();
const ctrl = require("../../controlers/contacts");

const {
  validationCreateContacts,
  validationUpdateContacts,
  validateUpdateStatus,
} = require("./validation.js");


router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.get('/', ctrl.listContacts).post('/', validationCreateContacts, ctrl.addContact)

router
  .get('/:id',  ctrl.getContactById)
  .delete('/:id',  ctrl.removeContact)
  .put('/:id',   validationUpdateContacts, ctrl.updateContact)

router.patch('/:id/favorite',  validateUpdateStatus, ctrl.updateStatusContact)

module.exports = router



