const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string();
const userNameCompanySchema = joi.string();
/* const userIsAdminSchema = joi.boolean();
const userCreatedKataroguSchema = joi.boolean();
const userCreatedAtSchema = joi.date(); */

const createUserSchema = {
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  nameCompany: userNameCompanySchema.required(),
};

const updateUserSchema = {
  email: userEmailSchema,
  password: userPasswordSchema,
  nameCompany: userNameCompanySchema,
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema
}
