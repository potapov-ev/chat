const mysql = require("mysql2");
const DBconfig = require("./config.json");
const { DIALOGS_TABLE_COLUMNS_TYPES } = require("./constants");
const { STATE } = require("../core/constants");

const _result = {
  state: STATE.LOADING,
  error: {},
  data: null
};

// #region Служебные 
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
// #endregion

const createDialog = async data => {
  const connection = createConnection();
  const sql = `INSERT INTO dialogs(authorId, partnerId, partnerName, lastUpdate, lastMessage)
    VALUES(?, ?, ?, ?, ?)`;
  const dialogData = [
    data.authorId, 
    data.partnerId, 
    data.partnerName, 
    data.lastUpdate,
    data.lastMessage
  ];
  let result = { ..._result };

  await connection.promise().query(sql, dialogData)
    .then((results) => {
      result.state = STATE.SUCCESS;
      result.data = { ...data, id: results[0].insertId };
      console.log("Dialog created");
    })
    .catch(error => {
      result.state = STATE.ERROR;
      result.error = error;
      console.log("Creation dialog error", error);
    });
  connection.end();

  return result;
};

// SELECT * FROM table_name LIMIT 2,3;
// Выбирает 3 записи из таблицы, начиная с 2 записи.
const getDialogs = async userId => {
  const connection = createConnection();
  const sql = "SELECT * FROM dialogs WHERE authorId=? OR partnerId=? ORDER BY lastUpdate DESC";
  let result = { ..._result };

  await connection.promise().query(sql, [userId, userId] )
  .then(dialogs => {
    result.data = [...dialogs[0]];
    result.state = STATE.SUCCESS;
    console.log("Dialogs received")
  })
  .catch(error => {
    result.state = STATE.ERROR;
    result.error = error;
    console.log("Error getting dialogs", error);
  });
  connection.end();
  
  return result;
};

const deleteDialog = async id => {
  const connection = createConnection();
  const sql = "DELETE FROM dialogs WHERE id=?";
  let result = { ..._result };

  await connection.promise().query(sql, [id])
    .then(() => {
      result.STATE.SUCCESS;
      console.log("Dialogs deleted")
    })
    .catch(error => {
      result.state = STATE.ERROR;
      result.error = error;
      console.log("Error deleting dialogs", error)
    });
  connection.end();

  return result;
};

module.exports = {
  createDialog,
  getDialogs,
  deleteDialog,
  createDialogsTable, // todo убрать
};