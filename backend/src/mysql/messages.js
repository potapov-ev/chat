const mysql = require("mysql2");
const { STATE } = require("../core/constants");
const DBconfig = require("./config.json");
const { MESSAGES_TABLE_COLUMNS_TYPES } = require("./constants");

const _result = {
  state: STATE.LOADING,
  error: {},
  data: null
};

// #region Служебные
const createConnection = config => mysql.createConnection({ ...DBconfig, ...config });

const createMessagesTable = () => {
  const connection = createConnection(DBconfig);
  const sql = `CREATE TABLE messages (${MESSAGES_TABLE_COLUMNS_TYPES})`;

  connection.query(sql, error =>
    error ? console.error("Table creation error", error) : console.log("Table created")
  );
  connection.end();
};
// #endregion


const addMessage = async message => {
  const connection = createConnection();
  const sql = "INSERT INTO messages(text, authorId, dialogId, time, isReaded) VALUES(?, ?, ?, ?, ?)";
  const data = [message.text, message.authorId, message.dialogId, message.time, message.isReaded];// todo написать везде data
  let result = STATE.ERROR;

  await connection.promise().query(sql, data)
    .then(() => {
      result.state = STATE.SUCCESS;
      console.log("Message added");
    })
    .catch(error => {
      result.state = STATE.ERROR;
      result.error = error;
      console.log("Error adding a message", error);
    });
  connection.end();

  return result;
};

const updateStatus = async ({ id, isReaded }) => {
  const connection = createConnection();
  const sql = "UPDATE messages SET isReaded=? WHERE id=?";
  const data = [isReaded, id];// todo написать везде data
  const result = { ..._result };

  await connection.promise().query(sql, data)
    .then(() => {
      result.state = STATE.SUCCESS;
      console.log("Message updated");
    })
    .catch(error => {
      result.state = STATE.ERROR;
      result.error = error;
      console.log("Error updating a message", error);
    });
  connection.end();

  return result;
};

const getMessages = async dialogId => {
  const connection = createConnection();
  const sql = "SELECT * FROM messages WHERE dialogId=?";
  const result = { ..._result };

  await connection.promise().query(sql, [dialogId]).then(results => {
    result.state = STATE.SUCCESS;
    result.data = [...results[0]];
    console.log("Messages received");
  }).catch(error => {
    result.state = STATE.ERROR;
    result.error = error;
    console.log("Error receiving messages", error);
  });
  connection.end();
  /* todo во всех ошибках добавить префикс DB console.error*/
  
  return result;
};

const deleteMessage = async id => {
  const connection = createConnection();
  const sql = "DELETE FROM messages WHERE id=?";
  const result = { ..._result };

  await connection.promise().query(sql, [id])
    .then(() => {
      result.state = STATE.SUCCESS;
      console.log("Message deleted")
    })
    .catch(error => {
      result.state = STATE.ERROR;
      result.error = error;
      console.log("Error deleting a message", error);
    });
  connection.end();

  return result;
};

module.exports = {
  addMessage,
  updateStatus,
  getMessages,
  deleteMessage,
  createMessagesTable
};
