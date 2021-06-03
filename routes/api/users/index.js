const express = require("express");
const router = express.Router();
const contrls = require("../../../controlers/users");

// const {
//   validationCreateContacts,
//   validationUpdateContacts,
//   validateUpdateStatus,
// } = require("./validation.js");


router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.post('/register',contrls.register)
router.post('/login', contrls.login)
router.post('/logout', contrls.logout)

module.exports = router


