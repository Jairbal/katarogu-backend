const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validate(data, schema) {
  const { error } = joi.object(schema).validate(data);
  return error;
}

function validationHandler(schema, check = 'body') {
  return function(req, res, next) {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)): next();
  }
}

function validationHandlerKatarogu(schema1, schema2, check = 'body') {
  return function(req, res, next) {
    let error;
    if(req.body.physicalStore){
    error = validate(req[check], schema1);
    }else {
       error = validate(req[check], schema2);
    }

    error ? next(boom.badRequest(error)): next();
  }
}


module.exports = {
  validationHandler,
  validationHandlerKatarogu
};