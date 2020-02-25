const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'incorrect_length';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'field_required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'field_required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'incorrect_email';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'field_required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'incorrect_length';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'field_required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'password_not_equal';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
