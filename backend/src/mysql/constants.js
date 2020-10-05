module.exports = {
  USERS_TABLE_COLUMNS_TYPES: `
      uid INT AUTO_INCREMENT PRIMARY KEY, 
      name VARCHAR(30) NOT NULL, 
      login VARCHAR(36) NOT NULL, 
      pass VARCHAR(100) NOT NULL
    `,
  DIALOGS_TABLE_COLUMNS_TYPES: `
      id INT AUTO_INCREMENT PRIMARY KEY, 
      authorId INT NOT NULL, 
      partnerId INT NOT NULL,
      lastUpdate VARCHAR(14) NOT NULL, 
      lastMessage TEXT, 
      FOREIGN KEY (authorId) REFERENCES users(uid)
    `,
  MESSAGES_TABLE_COLUMNS_TYPES: `
      id INT AUTO_INCREMENT PRIMARY KEY,
      type CHAR(4) NOT NULL,
      text TEXT, 
      url VARCHAR(200),
      authorId INT NOT NULL,
      dialogId INT NOT NULL,
      time CHAR(5) NOT NULL,
      isReaded BOOL,
      FOREIGN KEY (authorId) REFERENCES users(uid),
      FOREIGN KEY (dialogId) REFERENCES dialogs(id)
    `,
};
// todo удалить partnerName из DIALOGS

/* todo  строки в байт посчитать
function lengthInUtf8Bytes(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
} */