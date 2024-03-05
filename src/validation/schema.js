const Joi = require("joi");

const validateProduct = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "O campo 'name' é obrigatório",
    "string.empty": "O campo 'name' não pode ser vazio",
    "string.base": "O campo 'name' deve ser do tipo 'text'",
  }),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  price: Joi.number().required(),
  color: Joi.string().required(),
});

const validateProductDetails = Joi.object({
  name: Joi.string().required(),
  details: Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    color: Joi.string().required(),
  }),
  price: Joi.number().required(),
});

const validateProductData = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    data: Joi.array().items(
      Joi.object({
        price: Joi.number().required(),
        color: Joi.string().required(),
      }).required()
    ).required(),
  })
);

const validateUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateByStructure = (data, structure) => {
  return structure.validate(data, { abortEarly: false });
};



module.exports = {
  validateUser,
  validateProduct,
  validateProductDetails,
  validateProductData,
  validateByStructure,
};
