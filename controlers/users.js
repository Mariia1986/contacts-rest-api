const Users = require("../repositories/users");
const { HttpCode } = require("../helpers/constants");
const fs = require('fs/promises')
const path = require('path')
const jwt = require("jsonwebtoken");
const UploadAvatarService = require('../services/local-upload')
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

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
    const { id, email, subscription,  avatarURL } = await Users.create(req.body);
    return res.status(HttpCode.CREATE).json({
      status: "success",
      code: HttpCode.CREATE,
      data: { id, email, subscription, avatarURL},
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {

    const user = await Users.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZATED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZATED,
        message: "Invalid credentials",
      });
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    const {
      _doc: { subscription },
    } = user;

    return res.json({
      status: 'success',
      code: HttpCode.OK,
      message: 'You have logged in.',
      token,
      user: { subscription },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (e) {
    next(e);
  }
};
const current = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(HttpCode.UNAUTHORIZATED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZATED,
        message: 'Not authorized.',
      });
    }

    const { email, subscription } = req.user;

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      user: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const id = req.user.id;
    const updatedSubscription = await Users.updateSubscription(id, req.body);

    if (!updatedSubscription) {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found.' });
    }
    const { email, subscription } = updatedSubscription;
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      message: 'Contact updated.',
      payload: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS)
    const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file })

    try {
      await fs.unlink(path.join(process.env.AVATAR_OF_USERS, req.user.avatar))
    } catch (e) {
      console.log(e.message)
    }

    await Users.updateAvatar(id, avatarUrl)
    res.json({ status: 'success', code: 200, data: { avatarUrl } })
  } catch (error) {
    next(error)
  }
}




module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  avatars

};
