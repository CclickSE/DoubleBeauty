const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("employee", "admin"),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const productValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().min(2).max(50).required(),
    productname: Joi.string().min(1).max(50).required(),
    manufacture: Joi.string().min(1).max(50),
    price: Joi.number().min(1).required(),
    count: Joi.string().min(1).max(50),
    isNew: Joi.boolean(),
  });

  return schema.validate(data);
};

const customerValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().min(2).max(50).required(),
    CUS_NAME: Joi.string().min(1).max(50).required(),
    PHO_NUM: Joi.string().min(7).max(50),
    LEVEL: Joi.number().required(),
    CUS_LIAISON: Joi.string().min(1).max(50),
    UIN: Joi.string(),
    CITY: Joi.string(),
    DISTRICT: Joi.string(),
    ROAD: Joi.string(),
    NUM: Joi.string(),
    FLOOR: Joi.string(),
    isNew: Joi.boolean(),
  });

  return schema.validate(data);
};

const manufactureValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().min(2).max(50).required(),
    MAN_NAME: Joi.string().min(1).max(50).required(),
    PHO_NUM: Joi.string().min(7).max(50),
    MAN_LIAISON: Joi.string().min(1).max(50),
    CITY: Joi.string(),
    DISTRICT: Joi.string(),
    ROAD: Joi.string(),
    NUM: Joi.string(),
    FLOOR: Joi.string(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation = productValidation;
module.exports.customerValidation = customerValidation;
module.exports.manufactureValidation = manufactureValidation;
