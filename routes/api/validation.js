const Joi = require("joi");

const schemaCreateContacts = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().optional(),
  isFriend: Joi.boolean().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.number().integer().optional(),
});

const schemaUpdateContacts = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  age: Joi.number().integer().min(1900).max(2013).optional(),
  isFriend: Joi.boolean().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.number().integer().optional(),
});

const schemaStatusFriendContact = Joi.object({
  isFriend: Joi.boolean().required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: `Field: ${err.message.replace(/"/g, "")}` });
  }
};

module.exports.validateCreateContacts = (res, _req, next) => {
  return validate(schemaCreateContacts, res.body, next);
};

module.exports.validateUpdateContacts = (res, _req, next) => {
  return validate(schemaUpdateContacts, res.body, next);
};

module.exports.validateStatusFriendContacts = (res, _req, next) => {
  return validate(schemaStatusFriendContact, res.body, next);
};
