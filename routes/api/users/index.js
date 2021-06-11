const express = require("express");
const router = express.Router();
const contrls = require("../../../controlers/users");
const upload = require('../../../helpers/upload')
const guard= require('../../../helpers/guard')
const { validationNewUser, validationLoginUser, validationSubscription } = require('./validation');

router.post('/signup',validationNewUser, contrls.register)
router.post('/login', validationLoginUser, contrls.login)
router.post('/logout', guard, contrls.logout)

router.get('/current', guard, contrls.current);
router.patch('/', guard, validationSubscription, contrls.updateSubscription);
router.patch('/avatars', guard, upload.single('avatar'), contrls.avatars)


module.exports = router


