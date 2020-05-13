const joi = require('@hapi/joi');
const { userIdSchema } = require('./users');
const kataroguIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const kataroguNameSchema = joi.string().max(30);
const kataroguLogoSourceSchema = joi.string().uri();
const kataroguIsActiveSchema = joi.boolean();
const kataroguPhysicalStoreSchema = joi.boolean();
const kataroguProvinceSchema = joi.string().max(35);
const kataroguCitySchema = joi.string().max(35);
const kataroguMainStreetSchema = joi.string().max(30);
const kataroguSecondaryStreetSchema = joi.string().max(30);
const kataroguAttentionSchema = joi.string().max(7);
const kataroguSinceSchema = joi.string().max(5);
const kataroguUntilSchema = joi.string().max(5);
const kataroguWhatsappNameSchema = joi.string().max(30);
const kataroguWhatsappNumberSchema = joi.string().max(13);
const kataroguFacebookUsernameSchema = joi.string();
const kataroguFacebookUrlSchema = joi.string().uri();
const kataroguInstagramUsernameSchema = joi.string();
const kataroguCreatedAtSchema = joi.date();

const createKataroguSchema = {
  //userId: userIdSchema.required(),
  name: kataroguNameSchema.required(),
  logoSource: kataroguLogoSourceSchema,
  isActive: kataroguIsActiveSchema.required(),
  physicalStore: kataroguPhysicalStoreSchema.required(),
  direction: {
    province: kataroguProvinceSchema,
    city: kataroguCitySchema,
    mainStreet: kataroguMainStreetSchema,
    secondaryStreet: kataroguSecondaryStreetSchema,
  },
  attention: kataroguAttentionSchema,
  schedule: {
    since: kataroguSinceSchema,
    until: kataroguUntilSchema,
  },
  contact: {
    whatsapp: {
      name: kataroguWhatsappNameSchema,
      number: kataroguWhatsappNumberSchema.required(),
    },
    facebook: {
      username: kataroguFacebookUsernameSchema,
      url: kataroguFacebookUrlSchema,
    },
    instagram: {
      username: kataroguInstagramUsernameSchema,
    },
  },
  createdAt: kataroguCreatedAtSchema.required(),
};

const createCompleteKataroguSchema = {
  //userId: userIdSchema.required(),
  name: kataroguNameSchema.required(),
  logoSource: kataroguLogoSourceSchema,
  isActive: kataroguIsActiveSchema.required(),
  physicalStore: kataroguPhysicalStoreSchema.required(),
  direction: {
    province: kataroguProvinceSchema.required(),
    city: kataroguCitySchema.required(),
    mainStreet: kataroguMainStreetSchema.required(),
    secondaryStreet: kataroguSecondaryStreetSchema.required(),
  },
  attention: kataroguAttentionSchema.required(),
  schedule: {
    since: kataroguSinceSchema.required(),
    until: kataroguUntilSchema.required(),
  },
  contact: {
    whatsapp: {
      name: kataroguWhatsappNameSchema,
      number: kataroguWhatsappNumberSchema.required(),
    },
    facebook: {
      username: kataroguFacebookUsernameSchema,
      url: kataroguFacebookUrlSchema,
    },
    instagram: {
      username: kataroguInstagramUsernameSchema,
    },
  },
  createdAt: kataroguCreatedAtSchema.required(),
};

const updateKataroguSchema = {
  //userId: userIdSchema,
  name: kataroguNameSchema,
  logoSource: kataroguLogoSourceSchema,
  isActive: kataroguIsActiveSchema,
  physicalStore: kataroguPhysicalStoreSchema,
  direction: {
    province: kataroguProvinceSchema,
    city: kataroguCitySchema,
    mainStreet: kataroguMainStreetSchema,
    secondaryStreet: kataroguSecondaryStreetSchema,
  },
  attention: kataroguAttentionSchema,
  schedule: {
    since: kataroguSinceSchema,
    until: kataroguUntilSchema,
  },
  contact: {
    whatsapp: {
      name: kataroguWhatsappNameSchema,
      number: kataroguWhatsappNumberSchema,
    },
    facebook: {
      username: kataroguFacebookUsernameSchema,
      url: kataroguFacebookUrlSchema,
    },
    instagram: {
      username: kataroguInstagramUsernameSchema,
    },
  },
  createdAt: kataroguCreatedAtSchema,
};

module.exports = {
  kataroguIdSchema,
  createKataroguSchema,
  createCompleteKataroguSchema,
  updateKataroguSchema,
};
