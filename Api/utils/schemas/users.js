const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string();
const userNameCompanySchema = joi.string();
const userIsAdminSchema = joi.boolean();
const userCreatedKataroguSchema = joi.boolean();
const userCreatedAtSchema = joi.date();

const createUserSchema = {
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  nameCompany: userNameCompanySchema.required(),
  isAdmin: userIsAdminSchema.required(),
  createdKatarogu: userCreatedKataroguSchema.required(),
  createdAt: userCreatedAtSchema.required()
};

const updateUserSchema = {
  email: userEmailSchema,
  password: userPasswordSchema,
  nameCompany: userNameCompanySchema,
  isAdmin: userIsAdminSchema,
  createdKatarogu: userCreatedKataroguSchema,
  createdAt: userCreatedAtSchema
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema
}
