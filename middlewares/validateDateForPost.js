const Joi = require('joi');

const checkTypeDetails = ({ details }) => {
  const { type } = details[0];
  if (type === 'any.required') return 400;
  return 422;
};

const validateProduct = (req, res, next) => {
  const product = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),  
  }).messages({
    'any.required': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least 5 characters long',
    'number.min': '{{#label}} must be greater than or equal to 1',
  });

  const { error } = product.validate(req.body);
  // console.log('middlewares product', error);

  if (error) {
    next({
      statusCode: checkTypeDetails(error),
      message: error.details[0].message,
    });
  }
  next();
};
// 400 { "message": "\"name\" is required" }
// 400 { "message": "\"quantity\" is required" } - any.required
// 422 { "message": "\"name\" length must be at least 5 characters long" } - string.min
// 422 { "message": "\"quantity\" must be greater than or equal to 1" } - number.min

const validateSale = (req, res, next) => {
  const product = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),  
  }).messages({
    'any.required': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least 5 characters long',
    'number.integer': '{{#label}} must be greater than or equal to 1',
  });

  const { error } = product.validate(req.body);

  if (error) {
    next({
      statusCode: checkTypeDetails(error),
      message: error.details[0].message,
    });
  }
  next();
};
// 400   { "message": "\"productId\" is required" }
// 400   { "message": "\"quantity\" is required" }
// 422 { "message": "\"quantity\" must be greater than or equal to 1" }
module.exports = { validateProduct, validateSale };