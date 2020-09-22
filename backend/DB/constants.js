module.exports = {
  SQL_QUERYS: {
    USERS_TABLE_COLUMNS_TYPES: "uid VARCHAR(16) NOT NULL UNIQUE, name VARCHAR(30) NOT NULL, login VARCHAR(36) NOT NULL, pass VARCHAR(100) NOT NULL",
    DIALOGS_TABLE_COLUMNS_TYPES: `
      id VARCHAR(24) AUTO_INCREMENT PRIMARY KEY, 
      authorId VARCHAR(16) NOT NULL,
      partnerId VARCHAR(16) NOT NULL,
   `,
  },
  ERRORS_MESSAGES: {
    LOGIN_ALREADY_EXISTS: "Такой логин уже существует",
    UID_ALREADY_EXISTS: "Такой идентификатор пользователя уже существует",
    USER_NOT_FOUND: "Пользователь с таким логином не найден",
  },
  STATE: {
    SUCCESS: "SUCCESS"
  }
};