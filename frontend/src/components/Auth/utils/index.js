import {
  LOGIN_VALIDATE_ERRORS,
  REGIS_VALIDATE_ERRORS
} from "Auth/constants";

export const loginValidate = values => {
  const errors = {};

  if (!values.login) {
    errors.login = LOGIN_VALIDATE_ERRORS.login.empty;
  }
  if (!values.password) {
    errors.password = LOGIN_VALIDATE_ERRORS.password.empty;
  }

  return errors;
};

export const regisValidate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = REGIS_VALIDATE_ERRORS.name.empty;
  }
  if (!values.login) {
    errors.login = REGIS_VALIDATE_ERRORS.login.empty;
  }
  if (!values.password) {
    errors.password = REGIS_VALIDATE_ERRORS.password.empty;
  }
  if (!values.passwordCopy) {
    errors.passwordCopy = REGIS_VALIDATE_ERRORS.passwordCopy.empty;
  }
  if (values.passwordCopy && (values.password !== values.passwordCopy)) {
    errors.passwordCopy = REGIS_VALIDATE_ERRORS.passwordCopy.notMatch;
  }

  return errors;
};

export const generateUID = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (let i = 0; i < 15; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

