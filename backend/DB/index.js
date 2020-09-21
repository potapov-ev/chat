const mysql = require("mysql2");

const DBconfig = require("./config.json");
const { ERRORS_MESSAGES, STATE } = require("./constants");


const {
  LOGIN_ALREADY_EXISTS,
  UID_ALREADY_EXISTS,
  USER_NOT_FOUND
} = ERRORS_MESSAGES;
const { SUCCESS } = STATE

const createConnection = config => mysql.createConnection({ ...DBconfig, ...config });

const createDB = name => {
  const connection = createConnection();
  const sql = `CREATE DATABASE ${name}`;

  connection.query(sql, error =>
    error ? console.error("Database creation error", error) : console.log("Database created")
  );
  connection.end();
};

const createTable = config => {
  const { connectionConfig, name, columns } = config;
  const connection = createConnection(connectionConfig);
  const sql = `CREATE TABLE ${name} (${columns})`;

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

const getUsers = async () => {
  const connection = createConnection();
  const sql = "SELECT uid, name, login, pass FROM users";
  let users = [];

  await connection.promise().query(sql).then(res => users = [...res[0]])
  connection.end()

  return users;
};

const addUser = async user => {
  const connection = createConnection();
  const sql = "INSERT INTO users(uid, name, login, pass) VALUES(?, ?, ?, ?)";
  const userData = [user.uid, user.name, user.login, user.pass];

  connection.query(sql, userData, error =>
    error ? console.error("Error adding user", error) : console.log("User added")
  );
  connection.end();
};

const deleteUser = uid => {
  const connection = createConnection();
  const sql = "DELETE FROM users WHERE uid = ?";

  connection.query(sql, [uid], error =>
    error ? console.log("User deletion error", error) : console.log("User deleted")
  );
  connection.end();
};

const getUser = async userLogin => {
  const users = await getUsers();
  const checkThisLogin = ({ login }) => login === userLogin;
  const getError = () => ({
    error: USER_NOT_FOUND
  });

  return users.find(checkThisLogin) || getError();
};

const hasUserLogin = async userLogin => {
  const users = await getUsers();
  const checkThisLogin = ({ login }) => login === userLogin;
  const hasThisUser = users.some(checkThisLogin);

  return hasThisUser;
};

module.exports = {
  createDB,
  createTable,
  clearUsersTable,
  addUser,
  getUsers,
  deleteUser,
  getUser,
  hasUserLogin
};