const Joi = require('joi');

const validateProduct = (req, res, next) => {
  const product = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),  
  }).messages({
    'any.required': '{{: id="label" is required }}',
    'string.min': '{{: id="label" length must be at least 5 characters long }}',
    'number.integer': '{{: id="label" must be greater than or equal to 1 }}',
  });

  const { error } = product.validate(req.body);

  if (error) {
    next({
      statusCode: error.type,
      message: error.details[0].message,
    });
  }
  next();
};
// 400 { "message": "\"name\" is required" }
// 400 { "message": "\"quantity\" is required" }
// 422 { "message": "\"name\" length must be at least 5 characters long" }
// 422 { "message": "\"quantity\" must be greater than or equal to 1" }

const validateSale = (req, res, next) => {
  const product = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),  
  }).messages({
    'any.required': '{{: id="label" is required }}',
    'string.min': '{{: id="label" length must be at least 5 characters long }}',
    'number.integer': '{{: id="label" must be greater than or equal to 1 }}',
  });

  const { error } = product.validate(req.body);

  if (error) {
    next({
      statusCode: error.type,
      message: error.details[0].message,
    });
  }
  next();
};
// 400   { "message": "\"productId\" is required" }
// 400   { "message": "\"quantity\" is required" }
// 422 { "message": "\"quantity\" must be greater than or equal to 1" }
module.exports = { validateProduct, validateSale };