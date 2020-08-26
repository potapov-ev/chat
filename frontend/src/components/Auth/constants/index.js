//#region РЕГИСТРАЦИЯ

export const REGIS_TEXTFIELD_PLACEHOLDERS = [
  {
    name: "name",
    label: "Введите имя"
  },
  {
    name: "login",
    label: "Введите логин"
  },
  {
    name: "password",
    label: "Введите пароль",
    type: "password"
  },
  {
    name: "passwordCopy",
    label: "Повторите пароль",
    type: "password"
  },
];

export const REGIS_VALIDATE_ERRORS = {
  name: {
    empty: "Пожалуйста, введите имя"
  },
  login: {
    empty: "Пожалуйста, введите логин"
  },
  password: {
    empty: "Пожалуйста, введите пароль"
  },
  passwordCopy: {
    empty: "Пожалуйста, повторите пароль",
    notMatch: "Введенные пароли не совпадают"
  },
};

//#endregion

// #region Авторизация 

export const LOGIN_VALIDATE_ERRORS = {
  login: {
    empty: "Пожалуйста, введите логин",
  },
  password: {
    empty: "Пожалуйста, введите пароль"
  },
};

// #endregion