const Users = require("../repositories/users");
const {HttpCode} = require("../helpers/constants");
const jwt=require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email is already used",
      });
    }
    const {id,  email, subscribe } = await Users.create(req.body);
    return res.status(HttpCode.CREATE).json({
      status: "success",
      code: HttpCode.CREATE,
      data: {id,  email, subscribe },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
    try {
        const user = await Users.findByEmail(req.body.email);
        const isValidPassword= await user?.isValidPassword(req.body.password)
        if (!user|| !isValidPassword) {
          return res.status(HttpCode.UNAUTHORIZATED).json({
            status: "error",
            code: HttpCode.UNAUTHORIZATED,
            message: "Invalid credentials",
          });
        }
       const id=user.id
       const payload={id}
       const token=jwt.sign(payload, SECRET_KEY,{expirensIn:'2h'})
       await user.updateToken(id, token)
       
      } catch (e) {
        next(e);
      }
};

const logout = async (req, res, next) => {
  try {
    const contacts = await Users.listContacts();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  register,
  login,
  logout,
};
