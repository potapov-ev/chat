const mysql = require("mysql2");
const DBconfig = require("./config.json");
const { USERS_TABLE_COLUMNS_TYPES } = require("./constants");
const { STATE } = require("../core/constants");

const _result = {
  state: STATE.LOADING,
  error: {},
  data: null
};

// #region Служебные
const createDB = () => {
  const connection = createConnection();
  const sql = "CREATE DATABASE chat";

  connection.query(sql, error =>
    error ? console.error("Database creation error", error) : console.log("Database created")
  );
  connection.end();
};

const createUsersTable = () => {
  const connection = createConnection(DBconfig);
  const sql = `CREATE TABLE users (${USERS_TABLE_COLUMNS_TYPES})`;

  connection.query(sql, error =>
    error ? console.error("Table creation error", error) : console.log("Table created")
  );
  connection.end();
};

const clearUsersTable = () => {
  const connection = createConnection();
  const sql = "DELETE FROM users";

  connection.query(sql, error => error ? console.error("Error clearing the table", error) : console.log("Table cleared"));
  connection.end();
}
// #endregion

const createConnection = config => mysql.createConnection({ ...DBconfig, ...config });

const getUsers = async (uid = -1) => {
  const connection = createConnection();
  const sql = "SELECT uid, name, login, pass FROM users WHERE uid != ?";
  const result = { ..._result };

  await connection.promise().query(sql, [uid])
    .then(res => {
      result.state = STATE.SUCCESS;
      result.data = [...res[0]];
      console.log("Users received");
    })
    .catch(error => {
      result.state = STATE.ERROR;
      result.error = error;
      console.log("User receipt error", error);
    });
  connection.end()

  return result;
};

const addUser = async user => {
  const connection = createConnection();
  const sql = "INSERT INTO users(name, login, pass) VALUES(?, ?, ?)"; // !!! 9 цифр в user.uid
  const userData = [user.name, user.login, user.pass];
  const result = { ..._result };

  await connection.promise().query(sql, userData)
    .then(() => {
      result.state = STATE.SUCCESS;
      console.log("User added");
    })
    .catch(error => {
      result.state = STATE.ERROR;
      result.error = error;
      console.log("Error adding user", error);
    });
  connection.end();

  return result;
};

const deleteUser = uid => {
  const connection = createConnection();
  const sql = "DELETE FROM users WHERE uid = ?";
  const result = { ..._result };

  connection.promise().query(sql, [uid])
    .then(() => {
      result.state = STATE.SUCCESS;
      console.log("User deleted");
    })
    .catch(error => {
      result.state = STATE.ERROR;
      result.error = error;
      console.log("User deletion error", error);
    });
  connection.end();

  return result;
};

// todo этим 2 функциям тут не место
const getUser = async userLogin => {
  const USER_NOT_FOUND = "Пользователь с таким логином не найден";
  const checkThisLogin = ({ login }) => login === userLogin;
  const result = { ..._result };

  const users = (await getUsers()).data;
  const user = users.find(checkThisLogin);
  
  if (user) {
    result.data = user;
    result.state = STATE.SUCCESS;
  } else {
    result.state = STATE.ERROR;
    result.error = USER_NOT_FOUND;
  }

  return result;
};

const hasUserLogin = async userLogin => {
  const users = (await getUsers()).data;
  const checkThisLogin = ({ login }) => login === userLogin;
  const hasThisUser = users.some(checkThisLogin);

  return hasThisUser;
};

module.exports = {
  addUser,
  getUsers,
  deleteUser,
  getUser,
  hasUserLogin
};