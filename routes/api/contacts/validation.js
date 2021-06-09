const Joi = require('joi')

const schemaCreateContacts = Joi.object({
    name: Joi.string()
    .pattern(/[A-Za-z]{1,}/)
    .min(2)
    .max(30)
    .required(),

  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .min(14)
    .max(14)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "gmail", "yandex", "mail", "co"] },
    })
    .required(),
})

const schemaUpdateContacts = Joi.object({
    name: Joi.string()
    .pattern(/[A-Za-z]{1,}/)
    .min(2)
    .max(30)
    .optional(),

  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .min(14)
    .max(14)
    .optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "gmail", "yandex", "mail", "co"] },
    })
    .optional(),
}).or('name', 'phone', 'email')

const shemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, ''),
    })
  }
}

module.exports = {
  validationCreateContacts: (req, res, next) => {
    return validate(schemaCreateContacts, req.body, next)
  },
  validationUpdateContacts: (req, res, next) => {
    return validate(schemaUpdateContacts, req.body, next)
  },
  validateUpdateStatus: (req, res, next) => {
    return validate(shemaUpdateStatus, req.body, next);
  },
}
