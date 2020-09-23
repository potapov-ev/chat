const mysql = require("mysql2");

const DBconfig = require("./config.json"); // вынести все общее, например создать 4 класаа, и инициализировать контруктуры
const { SQL_QUERYS } = require("./constants");


const { DIALOGS_TABLE_COLUMNS_TYPES } = SQL_QUERYS;

const createConnection = config => mysql.createConnection({ ...DBconfig, ...config });

const createDB = () => { // todo эта функция везде не нужна, придумать чо-нить
  const connection = createConnection();
  const sql = "CREATE DATABASE chat";

  connection.query(sql, error =>
    error ? console.error("Database creation error", error) : console.log("Database created")
  );
  connection.end();
};

const createDialogsTable = () => {
  const connection = createConnection(DBconfig);
  const sql = `CREATE TABLE dialogs (${DIALOGS_TABLE_COLUMNS_TYPES})`;

  connection.query(sql, error =>
    error ? console.error("Table creation error", error) : console.log("Table created")
  );
  connection.end();
};

const createDialog = data => {
  const connection = createConnection();
  const sql = "INSERT INTO dialogs(authorId, partnerId, lastUpdate) VALUES(?, ?, ?)";
  const dialogData = [data.authorId, data.partnerId, data.lastUpdate];

  connection.query(sql, dialogData, error => 
    error ? console.log("Creation dialog error", error) : console.log("Dialog created"));
  connection.end();
};

// SELECT * FROM table_name LIMIT 2,3;
// Выбирает 3 записи из таблицы, начиная с 2 записи.
const getDialogs = async userId => {
  const connection = createConnection();
  const sql = "SELECT * FROM dialogs WHERE authorId=? OR partnerId=?";
  let result = [];

  await connection.promise().query(sql, [userId, userId] ).then(dialogs => {
    result = [...dialogs[0]]
    console.log("Dialogs received")
  }).catch(error => console.log("Error getting dialogs", error));
  connection.end();
  
  return result;
};

const deleteDialog = id => {
  const connection = createConnection();
  const sql = "DELETE FROM dialogs WHERE id=?";
  
  connection.query(sql, [id], error =>
    error ? console.log("Error deleting dialogs", error) : console.log("Dialogs deleted"));
  connection.end();
};

module.exports = {
  createDialogsTable, // todo в конце убрать createTable везде
  createDialog,
  getDialogs,
  deleteDialog,
};