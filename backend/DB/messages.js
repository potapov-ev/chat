const mysql = require("mysql2");

const DBconfig = require("./config.json"); // вынести все общее, например создать 4 класаа, и инициализировать контруктуры
const { SQL_QUERYS } = require("./constants");


const { MESSAGES_TABLE_COLUMNS_TYPES } = SQL_QUERYS;

const createConnection = config => mysql.createConnection({ ...DBconfig, ...config });

const createMessagesTable = () => {
  const connection = createConnection(DBconfig);
  const sql = `CREATE TABLE messages (${MESSAGES_TABLE_COLUMNS_TYPES})`;

  connection.query(sql, error =>
    error ? console.error("Table creation error", error) : console.log("Table created")
  );
  connection.end();
};

const addMessage = message => {
  const connection = createConnection();
  const sql = "INSERT INTO messages(text, authorId, dialogId, time, isReaded) VALUES(?, ?, ?, ?, ?)";
  const data = [message.text, message.authorId, message.dialogId, message.time, message.isReaded];// todo написать везде data

  connection.query(sql, data, error => 
    error ? console.log("Error adding a message", error) : console.log("Message added"));
  connection.end();
};

const updateStatus = ({ id, isReaded }) => {
  const connection = createConnection();
  const sql = "UPDATE messages SET isReaded=? WHERE id=?";
  const data = [isReaded, id];// todo написать везде data

  connection.query(sql, data, error => 
    error ? console.log("Error updating a message", error) : console.log("Message updated"));
  connection.end();
};

const getMessages = async dialogId => {
  const connection = createConnection();
  const sql = "SELECT * FROM messages WHERE dialogId=?";
  let result = [];

  await connection.promise().query(sql, [dialogId], (error, results) => {
    if (error) { /* todo во всех ошибках добавить префикс DB console.error*/
      console.log("Error receiving messages", error);
    } else {
      result = [...results];
      console.log("Messages received");
    }
  });
  connection.end();

  return result;
};

const deleteMessage = id => {
  const connection = createConnection();
  const sql = "DELETE FROM messages WHERE id=?";

  connection.query(sql, [id], error => 
    error ? console.log("Error deleting a message", error) : console.log("Message deleted")
  );
  connection.end();
};

module.exports = {
  addMessage,
  updateStatus
};