import validator from 'validator';

export const required = value => !!value.toString().trim().length;

export const email = value => !validator.isEmail(value)
  ? `${value} is not a valid email` : '';
