const joi = require('@hapi/joi');

const { kataroguIdSchema } = require('./katarogu');
const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productNameSchema = joi.string().max(35);
const productDescriptionSchema = joi.string().max(300);
const productPriceSchema = joi.number().min(0);
const productCodSchema = joi.number();
const productCreatedAtSchema = joi.date();

const createProductSchema = {
  //kataroguId: kataroguIdSchema.required(),
  name: productNameSchema.required(),
  description: productDescriptionSchema.required(),
  price: productPriceSchema.required(),
  cod: productCodSchema.required(),
  createdAt: productCreatedAtSchema.required(),
};

const updateProductSchema = {
  name: productNameSchema,
  description: productDescriptionSchema,
  price: productPriceSchema,
  cod: productCodSchema,
  createdAt: productCreatedAtSchema,
}


module.exports = {
  productIdSchema,
  createProductSchema,
  updateProductSchema
}